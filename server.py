import json
import os
import re
import ssl
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs, quote
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

PORT = 8000
ROOT = os.path.dirname(os.path.abspath(__file__))


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == '/api/search':
            self.handle_search(parsed)
            return
        if parsed.path == '/api/llm-config':
            self.handle_llm_config()
            return
        if parsed.path == '/api/image-proxy':
            self.handle_image_proxy(parsed)
            return

        path = parsed.path
        if path in ('', '/'):
            path = '/index.html'
        full_path = os.path.normpath(ROOT + path)
        if not full_path.startswith(ROOT):
            self.send_error(403)
            return
        if os.path.isdir(full_path):
            full_path = os.path.join(full_path, 'index.html')
        if not os.path.exists(full_path):
            self.send_error(404)
            return

        ext = os.path.splitext(full_path)[1].lower()
        mime = {
            '.html': 'text/html; charset=utf-8',
            '.css': 'text/css; charset=utf-8',
            '.js': 'application/javascript; charset=utf-8',
            '.json': 'application/json; charset=utf-8',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.svg': 'image/svg+xml',
        }.get(ext, 'application/octet-stream')

        with open(full_path, 'rb') as f:
            body = f.read()
        self.send_response(200)
        self.send_header('Content-Type', mime)
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path == '/api/llm':
            self.handle_llm(parsed)
            return
        self.send_json({'status': -1, 'msg': 'unknown endpoint'}, status=404)

    def handle_search(self, parsed):
        params = parse_qs(parsed.query)
        key = params.get('key', [''])[0] or os.environ.get('CNBKSY_API_KEY', '') or '6a1473357ee6c85e1f810475e9392529a05ce00e'
        search_content = params.get('searchContent', [''])[0]
        if not search_content:
            self.send_json({'status': -1, 'msg': '缺少 searchContent'}, status=400)
            return
        if not key:
            self.send_json({
                'status': -1,
                'msg': '博物馆后台尚未配置全国报刊索引 API Key，请联系管理员在服务器环境变量 CNBKSY_API_KEY 中设置。',
                'entity': []
            })
            return

        target = 'https://data.cnbksy.com/competitionSearch?key={}&searchContent={}'.format(
            quote(key, safe=''),
            quote(search_content, safe=''),
        )
        req = Request(target, headers={'User-Agent': 'Mozilla/5.0'})
        try:
            context = ssl._create_unverified_context()
            with urlopen(req, timeout=30, context=context) as resp:
                body = resp.read().decode('utf-8', 'ignore')
        except HTTPError as e:
            body = e.read().decode('utf-8', 'ignore')
            self.send_json(json.loads(body) if body.startswith('{') else {'status': -1, 'msg': body}, status=e.code)
            return
        except URLError as e:
            self.send_json({'status': -1, 'msg': str(e.reason)}, status=502)
            return

        try:
            payload = json.loads(body)
        except Exception:
            payload = {'status': -1, 'msg': body}
        self.send_json(payload)

    def handle_llm_config(self):
        config = self.get_llm_config()
        self.send_json(config)

    def handle_image_proxy(self, parsed):
        params = parse_qs(parsed.query)
        target_url = params.get('url', [''])[0]
        if not target_url:
            self.send_json({'status': -1, 'msg': '缺少 url 参数'}, status=400)
            return

        try:
            req = Request(target_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urlopen(req, timeout=30, context=ssl._create_unverified_context()) as resp:
                body = resp.read()
                content_type = resp.headers.get('Content-Type', 'image/jpeg')
                ext = os.path.splitext(urlparse(target_url).path)[1].lower()
                if ext in {'.jpg', '.jpeg'}:
                    content_type = 'image/jpeg'
                elif ext == '.png':
                    content_type = 'image/png'
                elif ext == '.webp':
                    content_type = 'image/webp'
                elif ext == '.gif':
                    content_type = 'image/gif'
                elif ext == '.svg':
                    content_type = 'image/svg+xml'
                self.send_response(200)
                self.send_header('Content-Type', content_type)
                self.send_header('Content-Length', str(len(body)))
                self.end_headers()
                self.wfile.write(body)
        except Exception as exc:
            self.send_json({'status': -1, 'msg': str(exc)}, status=502)

    def handle_llm(self, parsed):
        length = int(self.headers.get('Content-Length', '0'))
        body = self.rfile.read(length).decode('utf-8', 'ignore') if length else '{}'
        try:
            payload = json.loads(body) if body else {}
        except Exception:
            payload = {}

        text = payload.get('text', '')
        mode = payload.get('mode', 'ancient')
        style = payload.get('style', '古今标点文脉馆')
        poet = payload.get('poet')
        habit = payload.get('habit')
        config = self.get_llm_config()

        if not config['configured']:
            fallback = self.fallback_output(text, mode)
            self.send_json({
                'output': f'{fallback}\n\n【提示】当前未配置在线大模型，已回退到本地样式生成。可在环境变量中配置 OpenAI 或 Azure OpenAI 后启用真实在线模型。',
                'provider': 'fallback',
                'configured': False,
                'message': '未配置在线大模型'
            })
            return

        try:
            if config['provider'] == 'azure':
                result = self.call_azure_openai(config, text, mode, style)
            else:
                result = self.call_openai(config, text, mode, style, poet=poet, habit=habit)
            self.send_json({
                'output': result,
                'provider': config['provider'],
                'configured': True,
                'model': config.get('model') or config.get('deployment')
            })
        except Exception as exc:
            fallback = self.fallback_output(text, mode)
            self.send_json({
                'output': f'{fallback}\n\n【提示】在线模型调用失败：{exc}',
                'provider': 'fallback',
                'configured': False,
                'message': str(exc)
            })

    def get_llm_config(self):
        deepseek_key = os.environ.get('DEEPSEEK_API_KEY') or os.environ.get('OPENAI_API_KEY') or 'sk-991473f5243d45c6afe3139764eaa936'
        if deepseek_key:
            return {
                'provider': 'openai',
                'configured': True,
                'model': os.environ.get('OPENAI_MODEL') or os.environ.get('DEEPSEEK_MODEL') or 'deepseek-chat',
                'base_url': os.environ.get('OPENAI_BASE_URL') or os.environ.get('DEEPSEEK_BASE_URL') or 'https://api.deepseek.com/v1/chat/completions'
            }

        azure_key = os.environ.get('AZURE_OPENAI_API_KEY')
        azure_endpoint = os.environ.get('AZURE_OPENAI_ENDPOINT')
        azure_deployment = os.environ.get('AZURE_OPENAI_DEPLOYMENT')
        if azure_key and azure_endpoint and azure_deployment:
            return {
                'provider': 'azure',
                'configured': True,
                'deployment': azure_deployment,
                'endpoint': azure_endpoint.rstrip('/'),
                'api_version': os.environ.get('AZURE_OPENAI_API_VERSION', '2024-02-01')
            }

        return {
            'provider': 'disabled',
            'configured': False,
            'message': '未配置在线模型环境变量'
        }

    def fallback_output(self, text, mode):
        base = (text or '请先输入一段可标点的文字。').strip()
        if not base:
            base = '请先输入一段可标点的文字。'
        plain = re.sub(r'[，；：、。！？\s]', '', base)
        if mode == 'pre-qin':
            return plain + '\n\n（先秦无标点——纯字连排，靠语气断句。）'
        elif mode == 'tang-song':
            pairs = [plain[i:i+4] for i in range(0, len(plain), 4)]
            return '、'.join(pairs) + '。\n\n（唐宋句读——以顿号分切，句号收束。）'
        elif mode == 'ming-qing':
            return '。'.join(plain[i:i+6] for i in range(0, len(plain), 6)) + '。\n\n（明清圈点——密集句号模拟圈点标注。）'
        elif mode == 'tongdian':
            return re.sub(r'([，；：、。！？])', r'\1\n', base).replace('\n\n\n', '\n\n')
        else:  # modern
            return re.sub(r'([，；：、。！？])', r'\1 ', base).replace('  ', ' ').strip()

    def call_openai(self, config, text, mode, style, poet=None, habit=None):
        if poet and habit:
            system = (
                f'你是"{style}"的标点风格助手。请严格模仿{poet}的标点习惯：{habit}。'
                f'你需要输出一段经过标点处理的文本，使其标点节奏、停顿方式、句长分布完全符合该作家的真实写作逻辑。'
                f'只输出标点处理后的文本本身，不要加任何解释、前言或后记。'
            )
        else:
            mode_instructions = {
                'pre-qin': '先秦无标点：去掉输入文字中所有标点，纯字连排，仅靠文言语气词和四字节奏暗示停顿。',
                'tang-song': '唐宋句读：将文字按四至六字为一读，用顿号"、"分切短读，以句号"。"收束每句。保留对仗与节奏感。',
                'ming-qing': '明清圈点：文字间以句号密集点断，模拟朱笔圈点效果，句短而有力，读如古籍刻本。',
                'modern': '民国新式标点：使用现代标点符号体系，逗号分句、句号收段，层次清晰、符合民国报刊排版规范。',
                'tongdian': '通典断句：以史书断句法处理，每句独立成行，句号后换行，保留典籍的庄严与节奏。'
            }
            instruction = mode_instructions.get(mode, mode_instructions['modern'])
            system = f'你是"{style}"的展陈式标点助手。请按照"{instruction}"的规则，将输入文字改写为对应风格的标点版本。只输出处理后的文本，不要添加解释。'
        body = {
            'model': config['model'],
            'messages': [
                {'role': 'system', 'content': system},
                {'role': 'user', 'content': f'请根据{mode}模式改写以下文字：\n\n{text}' }
            ],
            'temperature': 0.7,
        }
        req = Request(
            config['base_url'],
            data=json.dumps(body).encode('utf-8'),
            headers={'Authorization': f'Bearer {os.environ.get("DEEPSEEK_API_KEY") or os.environ.get("OPENAI_API_KEY") or "sk-991473f5243d45c6afe3139764eaa936"}', 'Content-Type': 'application/json'},
            method='POST'
        )
        with urlopen(req, timeout=45, context=ssl._create_unverified_context()) as resp:
            raw = json.loads(resp.read().decode('utf-8', 'ignore'))
        if 'choices' not in raw:
            raise Exception(json.dumps(raw, ensure_ascii=False))
        return raw['choices'][0]['message']['content']

    def call_azure_openai(self, config, text, mode, style):
        target = f"{config['endpoint']}/openai/deployments/{config['deployment']}/chat/completions?api-version={config['api_version']}"
        body = {
            'messages': [
                {'role': 'system', 'content': f'你是“{style}”的展陈式标点助手。请将输入文字改写为更像古籍或民国文献的标点版本，保持文气，不要添加多余解释。'},
                {'role': 'user', 'content': f'请根据{mode}模式改写以下文字：\n\n{text}' }
            ],
            'temperature': 0.7,
        }
        req = Request(
            target,
            data=json.dumps(body).encode('utf-8'),
            headers={'api-key': os.environ.get('AZURE_OPENAI_API_KEY'), 'Content-Type': 'application/json'},
            method='POST'
        )
        with urlopen(req, timeout=45, context=ssl._create_unverified_context()) as resp:
            payload = json.loads(resp.read().decode('utf-8', 'ignore'))
        return payload['choices'][0]['message']['content']

    def send_json(self, payload, status=200):
        body = json.dumps(payload, ensure_ascii=False).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format, *args):
        return


if __name__ == '__main__':
    server = ThreadingHTTPServer(('0.0.0.0', PORT), Handler)
    print(f'Serving at http://127.0.0.1:{PORT}')
    server.serve_forever()
