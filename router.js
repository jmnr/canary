var handlers = require('./handlers');
var fs = require('fs');
var index = fs.readFileSync(__dirname + '/index.html');

function routing(config) {
  "use strict";
  handlers = handlers(config);
  return {
    router: function (req, res){
      if (req.url.length === 1) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(index.toString());
      }

      else {
        var route = req.method + " " + req.url;
        var endRoute = handlers[route];
        if (endRoute) {
          endRoute(req, res);
        } else {
          handlers.generic(req, res);
        }
      }
    }
  };
}

module.exports = routing;