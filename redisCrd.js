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
  create: function(clap, callback) {
    client.hmset(clap.time, clap, function(err){
      callback(clap);
    });
  },

  read: function(callback) {
    var clapsLoad = [];
    var len;

    var cb = function(err, data) {
      clapsLoad.push(data);
      if(clapsLoad.length === len) {
        callback(clapsLoad);
      }
    };

    client.scan(0, function(err, data) {
      var claps = data[1];
      console.log("all data", claps);
      len = claps.length;
      for(var i = 0; i < len; i++) {
        client.hgetall(claps[i], cb);
      }
    });
  },

  delete: function(time, callback) {
    client.del(time, function(err, reply) {
      callback(reply);
    });

  }

};

module.exports = redisCrd;
