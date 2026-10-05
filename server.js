const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const PUBLIC_DIR = __dirname;

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];

  // Route aliases
  if (urlPath === '/' || urlPath === '') {
    urlPath = '/index.html';
  } else if (urlPath === '/login') {
    urlPath = '/login.html';
  } else if (urlPath === '/admin') {
    urlPath = '/admin.html';
  } else if (urlPath === '/recognition') {
    urlPath = '/recognition.html';
  } else if (urlPath === '/projects') {
    urlPath = '/projects.html';
  } else if (urlPath.startsWith('/projects/')) {
    urlPath = '/project.html';
  } else if (urlPath === '/blog') {
    urlPath = '/blog.html';
  } else if (urlPath.startsWith('/cohorts/')) {
    urlPath = '/cohort.html';
  }

  const filePath = path.join(PUBLIC_DIR, urlPath);
  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'text/html';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1><p>The requested route does not exist.</p><a href="/">Return Home</a>');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`USTH TIM Web Server running at http://localhost:${PORT}/`);
  console.log(`- Portfolio: http://localhost:${PORT}/`);
  console.log(`- Login:     http://localhost:${PORT}/login`);
  console.log(`- Admin:     http://localhost:${PORT}/admin`);
  console.log(`- Recognition: http://localhost:${PORT}/recognition`);
  console.log(`- Projects:  http://localhost:${PORT}/projects`);
  console.log(`- Blog:      http://localhost:${PORT}/blog`);
  console.log(`- Cohort 01: http://localhost:${PORT}/cohorts/cohort-01`);
  console.log(`- Cohort 02: http://localhost:${PORT}/cohorts/cohort-02`);
});
