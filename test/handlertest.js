var assert = require('assert'),
    handle = require('../handlers.js')({connection: require('fakeredis')}),
    Shot = require('shot'),
    Http = require('http'),
    fs = require('fs'),
    routing = require('../router.js')({connection: require('fakeredis')}),
    Model = require('../redisAdaptor.js')({connection: require('fakeredis')}),
    path = require('path'),
    __parentDir = path.dirname(module.parent),
    index = fs.readFileSync(__parentDir + '/index.html'),
    server = Http.createServer(routing.router);

var testObj = {message:"testmessage",lat: 1234567, lon: 7654321};
var testObj3 = {message:"<script>Hello</script>",lat: 1234567, lon: 7654321, time: 98989898, userId: 7878787};
var testObj2 = {message:"testmessage",lat: 1234567, lon: 7654321, time: 98989898, userId: 7878787};
var testObj4 = {message:"testmessage",lat: 1234567, lon: 7654321, time: 99999999, userId: 7878787};

console.log("#test 1: handlers['POST /addClap'] takes a request with a clap message and returns the message in the response");
Shot.inject(handle['POST /addClap'], { headers: {cookie: '12345=12345' }, method: 'POST', url: '/addClap', payload: JSON.stringify(testObj) }, function (res) {
      var testclap = JSON.parse(res.payload);
      assert.deepEqual(testclap.message, testObj.message);
      assert.deepEqual(testclap.lat, testObj.lat);
      assert.deepEqual(testclap.lon, testObj.lon);
      console.log("test 1 passed");
});

console.log("#test 9 test for guarding against script injections in the POST endpoint");
Shot.inject(handle['POST /addClap'], { headers: {cookie: '12345=12345' }, method: 'POST', url: '/addClap', payload: JSON.stringify(testObj3) }, function (res) {
      var response = JSON.parse(res.payload);
      assert.equal(response.message, '&ltscript&gtHello&lt/script&gt');
      console.log("test 9 passed");
});


console.log("#test 2: handlers['GET /allClaps'] retrieves all the messages from the stored file ");
Model.create(testObj2, function(clap){
  Shot.inject(handle['GET /allClaps'], {method: 'GET', url: '/allClaps'}, function (res) {
        var allclaps = JSON.parse(res.payload);
        // console.log("data retrieved", allclaps);
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
Model.create(testObj4, function(){
    Shot.inject(handle['POST /delete'], { method: 'POST', url: '/delete', payload: '99999999'}, function (res) {
      // console.log(res);
      assert.equal(res.payload, 0);
      console.log("test 5 passed");
    });
});


console.log("#test 6 if no url then router serves the index.html page");
Shot.inject(routing.router, { method: '', url: '/'}, function (res) {
      assert.equal(res.payload, index.toString());
      console.log("test 6 passed");
});

console.log("#test 7 router routes file loading to the generic handler ");
Shot.inject(routing.router, { method: 'GET', url: '/main.css'}, function (res) {
      assert.equal(res.payload.substring(0,8), "/*test*/");
      console.log("test 7 passed");
});

console.log("#test 8 router routes to route given");
Shot.inject(routing.router, {method: 'GET', url: '/allClaps'}, function (res) {
      assert.equal(res.payload, '[{"lat":"1234567","lon":"7654321","message":"testmessage","time":"98989898","userId":"7878787"},null]');
      console.log("test 7 passed");
});
