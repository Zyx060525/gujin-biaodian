import json
import os
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs

PORT = 8010

class Handler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path != '/api/llm':
            self.send_error(404)
            return
        length = int(self.headers.get('Content-Length', '0'))
        body = self.rfile.read(length).decode('utf-8', 'ignore')
        try:
            payload = json.loads(body)
        except Exception:
            payload = {'text': body}

        text = payload.get('text', '')
        mode = payload.get('mode', 'ancient')
        style = payload.get('style', '古典')

        if not text:
            self.send_json({'output': '请输入正文内容。'})
            return

        if mode == 'modern':
            output = f"[{style}]民国式标点版本\n{text.replace('，', '， ').replace('。', '。 ')}" 
        else:
            output = f"[{style}]古式句读版本\n{text.replace('，', '，\n').replace('。', '。\n')}"

        self.send_json({'output': output})

    def send_json(self, payload):
        body = json.dumps(payload, ensure_ascii=False).encode('utf-8')
        self.send_response(200)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format, *args):
        return

if __name__ == '__main__':
    server = ThreadingHTTPServer(('0.0.0.0', PORT), Handler)
    print(f'LLM proxy listening on http://127.0.0.1:{PORT}')
    server.serve_forever()
