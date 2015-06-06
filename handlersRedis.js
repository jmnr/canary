var handlers = {};
var fs = require('fs');
var redis = require("redis");
// var client = redis.createClient();
var url = require('url');
var redisURL = url.parse(process.env.REDISCLOUD_URL);
var client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
client.auth(redisURL.auth.split(":")[1]);

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
    // console.log("####new clap:" ,clapObj);
    res.writeHead(200, "OK", {'Content-Type': 'text/html'});
    res.end(JSON.stringify(clapObj)); //sends back new tweet for display
  });

};

handlers['GET /allClaps'] = function(req, res) {
  var responses = [];

  client.sort("tweets", function(err, data) {
    var tweetnumber = data.length;
    // console.log(data);
    for (var i=(tweetnumber-1); i>=0; i--) {
      client.hgetall(data[i], function(err, obj) {
        // console.log("obj:",obj);
        responses.push(obj);
        if (responses.length === tweetnumber) {
          // console.log("Responses:", responses);
          // res.end(JSON.stringify([{time: 1, userId: 1234567890, message: "hello"}]));
          res.end(JSON.stringify(responses));
        }
      });
    }

  });

  // client.get("tweetcount", function(err, reply) {
  //   var tweetnumber = Number(reply);
  //   console.log("tweetcount: ", tweetnumber);
  //   for (var i = tweetnumber; i > 0; i--) {
  //     console.log("i:", i);
  //     client.hgetall(i, function(err, obj) {
  //       console.log("obj:",obj);
  //       responses.push(obj);
  //       if (responses.length === tweetnumber) {
  //         console.log("Responses:", responses);
  //         // res.end(JSON.stringify([{time: 1, userId: 1234567890, message: "hello"}]));
  //           res.end(JSON.stringify(responses));
  //         }
  //       })
  //     }
  //
  //   })
};


handlers['GET /cookie'] = function(req, res) {
  var cookie = req.headers.cookie.split('=')[1];
  if(cookie === undefined) {cookie = false;}
  res.end(cookie);
};

handlers['POST /delete'] = function(req, res) {
  var time;
  req.on('data', function(chunk) {
    time = chunk + ''; //turns clap input box buffer into text
    console.log(time);
  });

  req.on('end', function() {
    client.srem("tweets", -1, time);
    res.end();
  })
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
