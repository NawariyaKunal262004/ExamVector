const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, 'index.html');
  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Server Error: ' + err.message);
      return;
    }
    
    res.writeHead(200, { 
      'Content-Type': 'text/html',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(content);
  });
});

server.listen(3000, () => {
  console.log('🚀 ExamVector Platform running at http://localhost:3000');
  console.log('📋 All sections available: Home, School Boards, Universities, Competitive, Recruitment, Help, Contact');
});
