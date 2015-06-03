var assert = require('assert');
var handle = require('../handlers.js');
var Shot = require('shot');
var Http = require('http');
var fs = require('fs');
var serverHandler = require('../serverHandler.js');

var server = Http.createServer(serverHandler);

console.log("#test 1 & 2: handlers['POST /addClap'] takes a request with a clap message and returns the message in the response");

Shot.inject(handle['POST /addClap'], { method: 'POST', url: '/addClap', payload: 'testmessage' }, function (res) {
      var testclap = JSON.parse(res.payload).message;
      assert.equal(testclap, "testmessage");
      console.log("test 1 passed");
      var clapData = require('../claps.json');
      assert.equal(clapData[clapData.length -1].message, "testmessage");
      console.log("test 2 passed");
});

// console.log("#test 5: ensure error executes in ['POST /addClap'] ");
// var server = Http.createServer(handle['POST /addClap']);
// Shot.inject(handle['POST /addClap'], {url: " "}, function (res) {
//       console.log(res);
//       assert.equal(res.payload)
// //       console.log("test 5 passed");
// });

console.log("#test 3: handlers['GET /allClaps'] retrieves all the messages from the stored file ");
Shot.inject(handle['GET /allClaps'], { method: 'GET', url: '/allClaps'}, function (res) {
      var allclaps = JSON.parse(res.payload);
      assert.equal(allclaps[0].message, "ok");
      console.log("test 3 passed");
});

console.log("#test 4: handlers.generic serves up the filename corresponding to the req.url");
Shot.inject(handle.generic, { method: 'GET', url: '/main.css'}, function (res) {
      assert.equal(res.payload.substring(0,7), "#header");
      console.log("test 4 passed");

});
