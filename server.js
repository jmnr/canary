var http = require("http");
var handlers = require('./handlers.js');
var fs = require('fs');
var index = fs.readFileSync(__dirname + '/index.html');
          
http.createServer(function handle (req, res){
  if (req.url.length === 1) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(index.toString());
  }

  else {
    var route = req.method + " " + req.url;
    var handler = handlers[route];
    if (handler) {
      handler(req, res);
    } else {
      handlers.generic(req, res);
    }
  }
}).listen(8000);