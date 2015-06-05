var handlers = {};
var fs = require('fs');
var redis = require("redis"),
    client = redis.createClient();

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
    var multi = client.multi();
    multi.get("tweetcount", function(err, reply) {
      var id = Number(reply) + 1;
       id=id.toString();
        client.hmset(id, clapObj);
      });
    multi.incr("tweetcount");
    multi.exec(function (err, replies) {
            console.log("replies recieved");
    });

    // console.log("####new clap:" ,clapObj);
    res.writeHead(200, "OK", {'Content-Type': 'text/html'});
    res.end(JSON.stringify(clapObj)); //sends back new tweet for display
  });

};

handlers['GET /allClaps'] = function(req, res) {
  var responses = [];
  client.get("tweetcount", function(err, reply) {
    var tweetnumber = Number(reply);
    console.log("tweetcount: ", tweetnumber);
    for (var i = tweetnumber; i > 0; i--) {
      console.log("i:", i);
      client.hgetall(i, function(err, obj) {
        console.log("obj:",obj);
        responses.push(obj);
        if (responses.length === tweetnumber) {
          console.log("Responses:", responses);
          // res.end(JSON.stringify([{time: 1, userId: 1234567890, message: "hello"}]));
            res.end(JSON.stringify(responses));
          }
        });
      }

    });
  };

handlers['GET /cookie'] = function(req, res) {
  var cookie = req.headers.cookie.split('=')[1];
  if(cookie === undefined) {cookie = false;}
  res.end(cookie);
};

handlers.generic = function(req, res) {
  fs.readFile(__dirname + req.url, function(err, data){
    // if (err){
    //   res.end();
    // }
    // else {
      var ext = req.url.split('.')[1];
      res.writeHead(200, {'Content-Type' : 'text/' + ext});
      res.end(data);
    // }
  });
};

module.exports = handlers;
