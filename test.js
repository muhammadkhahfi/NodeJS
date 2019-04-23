var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!');
}).listen(5050);

//console.log("tesss");

function intervalFunc() {
  console.log('Cant stop me now!');
}

setInterval(intervalFunc, 1500);
