var assert = require('assert');
// var redis = require('redis');
var redisCrd = require('../redisCrd');
// var client = require('fakeredis').createClient();

console.log("#Test 1: check write method adds one key hash pair where the hash is one clap object");
var testObj = {name: "nikki", time: "1234"};
redisCrd.write(testObj, function(obj){
  assert.deepEqual(obj, testObj);
  console.log("#test1 passed");
});

console.log("#Test 3: check remove method removes the specified tweet from the db");
var rem1 = {name: "nikki", time: "1234"};
redisCrd.remove(rem1.time, function(reply){
  assert.equal(reply, 1);
  console.log("#test3 passed");
});


console.log("#Test 2: check readAll method retrieves entries from the db with the latest entries first");
var test1 = {name: "nikki", time: "1234"};
var test2 = {name: "michelle", time: "1235"};
redisCrd.write(test1, function(){});
redisCrd.write(test2, function(){});
redisCrd.readAll(function(obj){
  console.log("readALL", obj);
  assert.deepEqual([test2, test1], obj);
  console.log("#test2 passed");
});

//other tests
////READ

///WRITE
//
