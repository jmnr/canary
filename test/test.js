var assert = require('assert');
var handle = require('../handlers.js');
var Shot = require('shot');
var Http = require('http');

// var EventEmitter = require('events').EventEmitter;

//create, read and delete operations
//test handlers

console.log("#handlers['POST /addClap'] takes a request with a clap message and returns the message in the response");
// var req = new EventEmitter(createReq("testmessage"));
// var res = new EventEmitter(createRes());
var server = Http.createServer(handle['POST /addClap']);
Shot.inject(handle['POST /addClap'], { method: 'post', url: '/', payload: 'testmessage' }, function (res) {
       console.log('#', res.payload);
      var testclap = JSON.parse(res.payload).message;
      console.log("testclap: ", testclap);
       assert.equal(testclap, "testmessage");
       console.log("testpassed");
   });


// function createReq(clap) {
//   return {
//     message : clap
//   };
// }
//
// function createRes() {
//   return {};
// }
