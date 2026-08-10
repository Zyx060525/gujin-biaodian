from pathlib import Path
from pypdf import PdfReader

pdf_path = Path('上海图书馆开放数据竞赛-全国报刊索引开放数据接口（API）说明书.pdf')
print('exists', pdf_path.exists())
reader = PdfReader(str(pdf_path))
print('pages', len(reader.pages))
text = ''
for i, page in enumerate(reader.pages, 1):
    t = page.extract_text() or ''
    text += f'--- PAGE {i} ---\n{t}\n'
    if i >= 20:
        break
print(text[:40000])
