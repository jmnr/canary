var redis = require("redis");

// //local
// var client = redis.createClient();
// //local

// //heroku
// var url = require('url');
// var redisURL = url.parse(process.env.REDISCLOUD_URL);
// var client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
// client.auth(redisURL.auth.split(":")[1]);
// //heroku

//fakeredis when testing redis
var client = require('fakeredis').createClient("test");

var redisCrd = {
  write: function(clap, callback) {
    client.hmset(clap.time, clap, function(err){
      callback(clap);
    });
    client.sadd("tweets", clap.time);
  },

  readAll: function(callback) {
    var responses = [];
    var tweetnumber;
    function cb (err, obj) {
      responses.push(obj);
      if (responses.length === tweetnumber) {
      callback(responses);
      }
    }

    client.sort("tweets", function(err, data) {
      tweetnumber = data.length;
      for (var i=(tweetnumber-1); i>=0; i--) {
        client.hgetall(data[i], cb);
      }
    });
  },

  remove: function(time, callback) {
    client.srem("tweets", -1, time);
    client.del(time, function(err, reply){
      callback(reply);
    });
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
