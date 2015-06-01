var handlers = {};
var clapList = [];
var fs = require('fs');

handlers['POST /addClap'] = function(req, res) {
  var clapMessage;

  req.on('data', function(chunk) {
     clapMessage = chunk.toString();
   });

   req.on('end', function() {
     res.writeHead(200, "OK", {'Content-Type': 'text/html'});
     res.end(clapMessage);
   });

};

handlers.generic = function(req, res) {
  fs.readFile(__dirname + req.url, function(err, data){
      if (err){
          res.end();
      } else {
          var ext = req.url.split('.')[1];
          res.writeHead(200, {'Content-Type' : 'text/' + ext});
          res.end(data);
      }
  });
};

module.exports = handlers;
