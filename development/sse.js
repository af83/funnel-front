var http = require('http');
var sys = require('sys');
var fs = require('fs');

http.createServer(function(req, res) {
  debugHeaders(req);

  if (req.headers.accept &&
      req.headers.accept == 'text/event-stream' &&
      req.url == '/events')
  {
    sendSSE(req, res);
  } else {
    res.writeHead(404);
    res.end();
  }

}).listen(8000);

console.log("started listening on port 8000");

function sendSSE(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  var id = (new Date()).toLocaleTimeString();

  setInterval(function() {
    constructSSE(res, id, (new Date()).toLocaleTimeString());
  }, 5000);

  constructSSE(res, id, (new Date()).toLocaleTimeString());
}

function constructSSE(res, id, data) {
  res.write('id: ' + id + '\n');
  res.write("data: " + data + '\n\n');
}

function debugHeaders(req) {
  console.log('URL: ' + req.url);
  for (var key in req.headers) {
    console.log(key + ': ' + req.headers[key]);
  }
  console.log('\n\n');
}
