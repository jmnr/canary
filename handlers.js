var handlers = {};
var clapList = [];
var fs = require('fs');

handlers['POST /addClap'] = function(req, res) {
  var clapMessage;
  console.log(req);

  req.on('data', function(chunk) {
     console.log("Received body data:");
     console.log(chunk.toString());
     clapMessage = chunk.toString();
   });

   req.on('end', function() {
     // empty 200 OK response for now
     res.writeHead(200, "OK", {'Content-Type': 'text/html'});
     res.end(clapMessage);
   });

}

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
}

module.exports = handlers;
