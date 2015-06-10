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
    console.log("newClap:", newClap);
  });
  req.on('end', function() {
    newClap = JSON.parse(newClap);
    newClap.userId = req.headers.cookie.split('=')[1];
    newClap.time = new Date().getTime();
    redisCrd.create(newClap, function(clap) {
      res.writeHead(200, "OK", {'Content-Type': 'text/html'});
      res.end(JSON.stringify(clap)); //sends back new tweet for display
    });
  });
};

handlers['GET /allClaps'] = function(req, res) {
  redisCrd.read(function(data){
    res.end(JSON.stringify(data));
  });
};

handlers['POST /delete'] = function(req, res) {
  var time;
  req.on('data', function(chunk) {
    time = chunk + ''; //turns clap input box buffer into text
  });
  req.on('end', function() {
    redisCrd.delete(time, function(reply){
      res.end(reply.toString());
    });
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
