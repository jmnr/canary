var assert = require('assert'),
    database = require('../redisAdaptor.js');
var Model = database({ connection: require('fakeredis')});

console.log("#Test 1: check create method adds one key hash pair where the hash is one clap object");
var testObj = {name: "nikki", time: "1234"};
Model.create(testObj, function(obj){
  assert.deepEqual(obj, testObj);
  console.log("#test1 passed");
});

console.log("#Test 3: check delete method removes the specified tweet from the database");
var rem1 = {name: "nikki", time: "1234"};
Model.delete(rem1.time, function(reply){
  assert.equal(reply, 1);
  console.log("#test3 passed");
});


console.log("#Test 2: check read method retrieves entries from the db in the order in which they were written ");
var test1 = {name: "nikki", time: "1234"};
var test2 = {name: "michelle", time: "1235"};
Model.create(test1, function(){});
Model.create(test2, function(){});
Model.read(function(obj){
  // console.log("readALL", obj);
  assert.deepEqual([test1, test2], obj);
  console.log("#test2 passed");
});

// console.log("#Test 4: if a REDISCLOUD_URL is present, set the client to the redis cloud client");
