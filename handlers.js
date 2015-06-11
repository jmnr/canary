var handlers = {};
var fs = require('fs');
var redisCrd = require('./redisCrd.js');

handlers['POST /addClap'] = function(req, res) {
  var newClap;

  req.on('data', function(chunk) {
    newClap = chunk;
    if(newClap.message.indexOf("<") > -1 || newClap.message.indexOf(">") > -1) {
      newClap.message = newClap.message.replace(/</g, "&lt").replace(/>/g, "&gt");
    }
  });

  req.on('end', function() {
    newClap = JSON.parse(newClap);
    redisCrd.create(newClap, res);
  });
};

handlers['GET /allClaps'] = function(req, res) {
  redisCrd.read(res);
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
    redisCrd.delete(time, res);
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
