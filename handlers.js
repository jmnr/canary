var handlers = {};
var fs = require('fs');
var redis = require("redis");

//local
var client = redis.createClient();
//local

//heroku
// var url = require('url');
// var redisURL = url.parse(process.env.REDISCLOUD_URL);
// var client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
// client.auth(redisURL.auth.split(":")[1]);
//heroku

handlers['POST /addClap'] = function(req, res) {
  var newClap;
  var cookie = req.headers.cookie.split('=')[1];
  
  req.on('data', function(chunk) {
    newClap = chunk + ''; //turns clap input box buffer into text
  });

  req.on('end', function() {
    var clapTime = new Date().getTime();
    var clapObj = {
      "userId": cookie,
      "message": newClap,
      "time": clapTime
    };
    client.hmset(clapTime, clapObj);
    client.sadd("tweets", clapTime);
    res.writeHead(200, "OK", {'Content-Type': 'text/html'});
    res.end(JSON.stringify(clapObj)); //sends back new tweet for display
  });
};

handlers['GET /allClaps'] = function(req, res) {
  var responses = [];

  client.sort("tweets", function(err, data) { //what is tweets in this context
    var tweetnumber = data.length;
    var callback = function(err, obj) {
      responses.push(obj);
      if (responses.length === tweetnumber) {
        res.end(JSON.stringify(responses));
      }
    };
    for (var i = (tweetnumber - 1); i >= 0; i--) {
      client.hgetall(data[i], callback);
    }
  });
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
    client.srem("tweets", -1, time);
    res.end();
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
