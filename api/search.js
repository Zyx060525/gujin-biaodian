const http = require('http');
const { URL } = require('url');
const https = require('https');

const server = http.createServer((req, res) => {
  const parsed = new URL(req.url, 'http://localhost');
  if (parsed.pathname === '/api/search') {
    const key = parsed.searchParams.get('key');
    const searchContent = parsed.searchParams.get('searchContent');
    if (!key || !searchContent) {
      res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ status: -1, msg: '缺少 key 或 searchContent' }));
      return;
    }

    const target = `https://data.cnbksy.com/competitionSearch?key=${encodeURIComponent(key)}&searchContent=${encodeURIComponent(searchContent)}`;
    https.get(target, (proxyRes) => {
      let data = '';
      proxyRes.on('data', (chunk) => { data += chunk; });
      proxyRes.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(data);
      });
    }).on('error', (err) => {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ status: -1, msg: err.message }));
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ status: -1, msg: 'Not found' }));
});

server.listen(3000, () => {
  console.log('API proxy listening on http://localhost:3000');
});
