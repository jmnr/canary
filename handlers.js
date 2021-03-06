var fs = require('fs');
var database = require('./redisAdaptor.js');

function handlers(config) {

  var Model = database({
    connection: config.connection
  });

  return {
    'POST /addClap': function(req, res) {
      var newClap;

      req.on('data', function(chunk) {
        newClap = chunk + ''; //turns clap input box buffer into text
        if(newClap.indexOf("<") > -1 || newClap.indexOf(">") > -1) {
          newClap = newClap.replace(/</g, "&lt").replace(/>/g, "&gt");
        }
      });

      req.on('end', function() {
        newClap = JSON.parse(newClap);
        newClap.time = new Date().getTime();
        Model.create(newClap, function(clap) {
          res.writeHead(200, "OK", {'Content-Type': 'text/html'});
          res.end(JSON.stringify(clap)); //sends back new tweet for display
        });
      });
    },

    'GET /allClaps': function(req, res) {
      Model.read(function(data){
        res.end(JSON.stringify(data));
      });
    },

    'POST /delete': function(req, res) {
      var clapId;
      req.on('data', function(chunk) {
        clapId = chunk + ''; //turns clap input box buffer into text
      });
      req.on('end', function() {
        Model.delete(clapId, function(reply){
          res.end(reply.toString());
        });
      });
    },

    generic: function(req, res) {
      fs.readFile(__dirname + req.url, function(err, data){
        if (err){
          res.end();
        }
        else {
          var ext = req.url.split('.')[1];
          res.writeHead(200, {'Content-Type' : 'text/' + ext});
          res.end(data);
        }
      });
    }
  };
}

module.exports = handlers;
