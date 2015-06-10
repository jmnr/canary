var redis = require("redis");
var geolocation = require("./geolocation.js");

// //local
var client = redis.createClient();
// //local

//heroku
// var url = require('url');
// var redisURL = url.parse(process.env.REDISCLOUD_URL);
// var client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
// client.auth(redisURL.auth.split(":")[1]);
//heroku

var redisCrd = {
  create: function(clap, res) {
    var clapObj = {
      userId: clap.cookie,
      message: clap.message,
      time: new Date().getTime(),
      lat: clap.lat,
      lon: clap.lon
    };
    client.hmset(clapObj.time, clapObj, function(err){
      res.writeHead(200, "OK", {'Content-Type': 'text/html'});
      res.end(JSON.stringify(clapObj)); //sends back new tweet for display
    });
  },

  read: function(res) {
    var clapsLoad = [];
    var len;

    var callback = function(err, data) {
      clapsLoad.push(data);
      if(clapsLoad.length === len) {
        res.end(JSON.stringify(clapsLoad));
      }
    };

    client.scan(0, function(err, data) {
      var claps = data[1];
      len = claps.length;
      for(var i = len - 1; i >= 0; i--) {
        client.hgetall(claps[i], callback);
      }
    });
  },

  delete: function(time, res) {
    client.del(time);
    res.end();
  }

};

module.exports = redisCrd;