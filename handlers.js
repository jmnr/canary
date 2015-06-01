var handlers = {};
var fs = require('fs');

handlers['POST /addClap'] = function(req, res) {

  req.on('error', function(err) {
   console.log('problem with request: ' + err.message);
   });

   var body = '';

   req.on('data', function(chunk) {
      body += chunk;
   });

  req.on('end', function() {
    var entry = JSON.stringify({message: body}) + "\n";
    fs.appendFile('claps.json', entry, function (err) {
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });
     res.writeHead(200, "OK", {'Content-Type': 'text/html'});
     res.end(entry);
   });
 };

handlers['GET /allClaps'] = function(req, res) {
  var claps = fs.readFileSync(__dirname + '/claps.json');
  console.log(claps);
  res.end(claps);
}

handlers.generic = function(req, res) {
  fs.readFile(__dirname + req.url, function(err, data){
      if (err){
          res.end();
      } else {
          var ext = req.url.split('.')[1];
          res.writeHead(200, {'Content-Type' : 'text/' + ext});
          res.end(data);
      }
  });
};

module.exports = handlers;
