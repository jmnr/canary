var handlers = {};
var fs = require('fs');
var redis = require("redis"),
    client = redis.createClient();

handlers['POST /addClap'] = function(req, res) {
  var newClap;

  req.on('data', function(chunk) {
    newClap = chunk + ''; //turns clap input box buffer into text
  });

  req.on('end', function() {
    var clapTime = new Date().getTime();
    var stamp = new Date().toUTCString();
    var clapObj = {
            "cookie": "chocolate chips",
             "message": newClap,
              "time": stamp
            };
    var multi = client.multi();
    multi.get("tweetcount", function(err, reply) {
      var id = Number(reply) + 1;
       id=id.toString();
        client.hmset(id, clapObj);
      })
    multi.incr("tweetcount");
    multi.exec(function (err, replies) {
            console.log("replies recieved");
    });

    console.log("####new clap:" ,clapObj);
    res.writeHead(200, "OK", {'Content-Type': 'text/html'});
    res.end(JSON.stringify(clapObj)); //sends back new tweet for display
  });

};

handlers['GET /allClaps'] = function(req, res) {
  var responses = [];
  client.get("tweetcount", function(err, reply) {
    var tweetnumber = reply;
    console.dir("tweetnumber: ", tweetnumber);
    for(var i= tweetnumber; i>tweetnumber-10; i--) {
      console.log("i:", i);
      client.hgetall(i.toString(), function(err, obj) {
        console.log("responsesinloop:", responses);
        responses.push(obj);
        if (i === 4) {
          console.log("last tweetnumber:", i);
          console.log("Responses:", responses);
            res.end(JSON.stringify(responses));
          }
        })
      }
    })
  }


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
