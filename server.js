var http = require("http");
var handlers = require('./handler.js');

http.createServer(function handle (req, res){

  var route = req.method + " " + req.url;

  var handler = handlers[route];
  if (handler) {
    handler(req, res);
  } else {
    handlers.generic(req, rel);
  }
}).listen(8000);
