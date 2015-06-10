var handlers = {};
var fs = require('fs');
var redisCrd = require('./redisCrd.js');

handlers['POST /addClap'] = function(req, res) {
  var newClap;

  req.on('data', function(chunk) {
    newClap = chunk + ''; //turns clap input box buffer into text
    if(newClap.indexOf("<") > -1) {
      newClap = newClap.replace("<", "&lt");
    }
    if(newClap.indexOf(">") > -1) {
      newClap = newClap.replace(">", "&gt");
    }
  });
  req.on('end', function() {
    newClap = JSON.parse(newClap);
    newClap.cookie = req.headers.cookie.split('=')[1];
    redisCrd.write(newClap, res);
  });
};

handlers['GET /allClaps'] = function(req, res) {
  redisCrd.readAll(res);
};

handlers['GET /cookie'] = function(req, res) { //not needed anymore, doing cookies on client side
  if(req.headers.cookie === undefined) {
    var obj = handlers.addCookie();
    res.writeHead(200, obj);
  }
  res.end(false);
};

handlers['POST /delete'] = function(req, res) {
  var time;
  req.on('data', function(chunk) {
    time = chunk + ''; //turns clap input box buffer into text
  });
  req.on('end', function() {
    redisCrd.remove(time, res);
  });
};

handlers.generic = function(req, res) {
  fs.readFile(__dirname + req.url, function(err, data){
    if (err){
      res.end();
    }
    else {
      var ext = req.url.split('.')[1];
      res.writeHead(200, {'Content-Type' : 'text/' + ext});
      res.end(data);
    }
  });
};

module.exports = handlers;
