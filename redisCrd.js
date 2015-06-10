var redis = require("redis");
var geolocation = require("./geolocation.js");

//local
// var client = redis.createClient();
//local

// //heroku
var url = require('url');
var redisURL = url.parse(process.env.REDISCLOUD_URL);
var client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
client.auth(redisURL.auth.split(":")[1]);
// //heroku

var redisCrd = {
  write: function(clap, res) {
    var clapObj = {
            userId: clap.cookie,
            message: clap.message,
            time: new Date().getTime(),
            lat: clap.lat,
            lon: clap.lon
            };
    console.log("clapObj:",clapObj);
    client.hmset(clapObj.time, clapObj, function(err){
      res.writeHead(200, "OK", {'Content-Type': 'text/html'});
      res.end(JSON.stringify(clapObj)); //sends back new tweet for display
    });
    client.sadd("tweets", clapObj.time);
  },

  readAll: function(res) {
    var responses = [];
    client.sort("tweets", function(err, data) {
      var tweetnumber = data.length;
      for (var i=(tweetnumber-1); i>=0; i--) {
        client.hgetall(data[i], function(err, obj) {
          responses.push(obj);
          if (responses.length === tweetnumber) {
            res.end(JSON.stringify(responses));
          }
        });
      }
    });
  },

  remove: function(time, res) {
    client.srem("tweets", -1, time);
    res.end();
  }

};

module.exports = redisCrd;

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
