var assert = require('assert');
var handle = require('../handlers.js');
var Shot = require('shot');
var Http = require('http');
var fs = require('fs');
var router = require('../router.js');
var redisCrd = require("../redisCrd");
var path = require('path'),
    __parentDir = path.dirname(module.parent);
var index = fs.readFileSync(__parentDir + '/index.html');

var server = Http.createServer(router);

console.log("#test 1: handlers['POST /addClap'] takes a request with a clap message and returns the message in the response");
var testObj = {message:"testmessage",lat: 1234567, lon: 7654321};
Shot.inject(handle['POST /addClap'], { headers: {cookie: '12345=12345' }, method: 'POST', url: '/addClap', payload: JSON.stringify(testObj) }, function (res) {
      var testclap = JSON.parse(res.payload);
      assert.deepEqual(testclap.message, testObj.message);
      assert.deepEqual(testclap.lat, testObj.lat);
      assert.deepEqual(testclap.lon, testObj.lon);
      console.log("test 1 passed");
});

var testObj3 = {message:"<script>Hello</script>",lat: 1234567, lon: 7654321, time: 98989898, userId: 7878787};

console.log("#test 9 test for guarding against script injections in the POST endpoint");
Shot.inject(handle['POST /addClap'], { headers: {cookie: '12345=12345' }, method: 'POST', url: '/addClap', payload: JSON.stringify(testObj3) }, function (res) {
      var response = JSON.parse(res.payload);
      assert.equal(response.message, '&ltscript&gtHello</script>');
      console.log("test 9 passed");
});

var testObj2 = {message:"testmessage",lat: 1234567, lon: 7654321, time: 98989898, userId: 7878787};

console.log("#test 2: handlers['GET /allClaps'] retrieves all the messages from the stored file ");
redisCrd.create(testObj2, function(clap){
  Shot.inject(handle['GET /allClaps'], {method: 'GET', url: '/allClaps'}, function (res) {
        var allclaps = JSON.parse(res.payload);
        assert.equal(allclaps[0].message, clap.message);
        console.log("test 2 passed");
  });
});

console.log("#test 3: handlers.generic serves up the filename corresponding to the req.url");
Shot.inject(handle.generic, { method: 'GET', url: '/main.css'}, function (res) {
      assert.equal(res.payload.substring(0,8), "/*test*/");
      console.log("test 3 passed");

});

console.log("#test 4: if there is an error in handlers generic, the error handler gets called and returns 0");
Shot.inject(handle.generic, { method: 'GET', url: '/'}, function (res) {
      assert.equal(res.payload, 0);
      console.log("test 4 passed");

});

console.log("#test 5: test handlers['POST /delete'] deletes a tweet when given the correct time stamp");
redisCrd.create(testObj2, function(){});
Shot.inject(handle['POST /delete'], { method: 'POST', url: '/delete', payload: "98989898"}, function (res) {
      assert.equal(res.payload, "1");
      console.log("test 5 passed");
});

console.log("#test 6 if no url then router serves the index.html page");
Shot.inject(router, { method: '', url: '/'}, function (res) {
      assert.equal(res.payload, index.toString());
      console.log("test 6 passed");
});

console.log("#test 7 router routes file loading to the generic handler ");
Shot.inject(router, { method: 'GET', url: '/main.css'}, function (res) {
      assert.equal(res.payload.substring(0,8), "/*test*/");
      console.log("test 7 passed");
});

console.log("#test 8 router routes to route given");
Shot.inject(router, {method: 'GET', url: '/allClaps'}, function (res) {
      assert.equal(res.payload, '[null]');
      console.log("test 7 passed");
});
