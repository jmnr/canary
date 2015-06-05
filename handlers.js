var handlers = {};
var fs = require('fs');

handlers['POST /addClap'] = function(req, res) {
  // req.on('error', function(err) {
  //   console.log('problem with request: ' + err.message);
  //   res.end("error");
  // });
  var cookie = req.headers.cookie.split('=')[1];
  var newClap;
  var claps = require(__dirname + '/claps.json'); //loads the array with all tweets

  req.on('data', function(chunk) {
    newClap = chunk + ''; //turns clap input box buffer into text
  });

  req.on('end', function() {
    if(newClap.indexOf("<script>") > -1 || newClap.indexOf("</script>") > -1) {
      res.end("malicious"); // prevents script injection
      return;
    }
    var entry = {
      message: newClap,
      time: new Date().getTime(),
      userId: cookie
    };
    claps.push(entry); //adds new clap to claps array\
    fs.writeFile('claps.json', JSON.stringify(claps), function (err) { //rewrites the file with new tweet
      // if (err) throw err;
    });
    res.writeHead(200, "OK", {'Content-Type': 'text/html'});
    res.end(JSON.stringify(entry)); //sends back new tweet for display
  });

};

handlers['GET /allClaps'] = function(req, res) {
  var clapsLoad = require(__dirname + '/claps.json');
  res.end(JSON.stringify(clapsLoad));
};

handlers['GET /cookie'] = function(req, res) {
  var cookie = req.headers.cookie.split('=')[1];
  if(cookie === undefined) {cookie = false;}
  res.end(cookie);
};

handlers.generic = function(req, res) {
  fs.readFile(__dirname + req.url, function(err, data){
    // if (err){
    //   res.end();
    // }
    // else {
      var ext = req.url.split('.')[1];
      res.writeHead(200, {'Content-Type' : 'text/' + ext});
      res.end(data);
    // }
  });
};

module.exports = handlers;
