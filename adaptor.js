var MongoClient = require('mongodb').MongoClient,
   assert = require('assert');

var myAdapter = function (config) {

   // do all the connection, tables etc. here with the config object
   var db, collection;

   MongoClient.connect(config.connection, function(err, database) {
     db = database;
     collection = db.collection(config.table);
     collection.insertMany(config.data, function(err, result) {
       console.log(result); //what is this object??
     });
   });

   // return the methods of the function so that many adaptors can be created with different configs and the methods have access to the initialised
   // variables but the global namespace isn't polluted and multiple adaptors can be created and initialised differently
   //different to creating an object with methods
   return {
       create: function (query, callback) {

         collection.insertOne(query, callback); // this does not return callback invocation

       },
       read: function (query, callback) {

         collection.find(query).toArray(callback);

       }
   };
};

module.exports = myAdapter;
