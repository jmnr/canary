var handlers = {};
var fs = require('fs');
var redisCrd = require('./redisCrd.js');

handlers['POST /addClap'] = function(req, res) {
  var newClap = {};
  req.on('data', function(chunk) {
    newClap = chunk + ''; //turns clap input box buffer into text
  });
  var cookie = req.headers.cookie.split('=')[1];
  req.on('end', function() {
    newClap = JSON.parse(newClap);
    console.log("newClap server:", newClap);
    newClap.cookie = cookie;
    redisCrd.write(newClap, res);
  });
};

handlers['GET /allClaps'] = function(req, res) {
  redisCrd.readAll(res);
};

handlers['GET /cookie'] = function(req, res) {
  var cookie = req.headers.cookie ? req.headers.cookie.split('=')[1] : false ;
  res.end(cookie);
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
