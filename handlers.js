var handlers = {};
var clapList = [];
var fs = require('fs');

handlers['POST /addClap'] = function(req, res) {
  if (req.body) {
    res.writeHead(200, {'Content-Type' : 'text'});
    clapList.push(req.data);
    res.end(clapList[clapList.length-1]);
  }
  else {
    res.end();
  }
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
