
var redis = require("redis"),
    client = redis.createClient();

    var clapObj = {
            "cookie": "chocolate chips",
             "message": "hello",
              "time": new Date().getTime()
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


    client.get("tweetcount", function(err, reply) {
      var tweetnumber = reply;
      console.log("tweetnumber: ", tweetnumber);
      for(var i= tweetnumber; i>tweetnumber-10; i--) {
        client.hgetall(i.toString(), function(err, obj) {
          console.log("tweetobj", obj);
        })
      }
    })
