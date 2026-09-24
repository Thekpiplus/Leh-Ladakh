const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const host = "127.0.0.1";
const port = Number(process.env.PORT) || 8080;

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
};

const send = (res, status, body, headers = {}) => {
  res.writeHead(status, headers);
  res.end(body);
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url || "/", `http://${host}`);
  let filePath = decodeURIComponent(url.pathname);
  if (filePath.endsWith("/")) filePath += "index.html";

  const absolute = path.normalize(path.join(root, filePath));
  if (!absolute.startsWith(root)) {
    send(res, 403, "Forbidden");
    return;
  }

  fs.stat(absolute, (err, stat) => {
    const target = !err && stat.isDirectory() ? path.join(absolute, "index.html") : absolute;
    fs.readFile(target, (readErr, data) => {
      if (readErr) {
        send(res, 404, "Not found");
        return;
      }
      send(res, 200, data, {
        "Content-Type": types[path.extname(target).toLowerCase()] || "application/octet-stream",
        "Cache-Control": "no-store",
      });
    });
  });
});

server.listen(port, host, () => {
  console.log(`Leh Spirit local site: http://${host}:${port}/`);
});
