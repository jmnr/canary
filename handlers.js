var handlers = {};
var clapList = [];
var fs = require('fs');

handlers['POST /addClap'] = function(req, res) {

  req.on('error', function(err) {
   console.log('problem with request: ' + err.message);
   });

  req.on('data', function(chunk) {
     clapList.push(chunk.toString());
   });

  req.on('end', function() {
     res.writeHead(200, "OK", {'Content-Type': 'text/html'});
     res.end(clapList[(clapList.length)-1]);
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
