var http = require("http");
var handlers = require('./handlers.js');
var fs = require('fs');
var index = fs.readFileSync(__dirname + '/index.html');
var serverHandler = require('./serverHandler.js');

http.createServer(serverHandler).listen(8000);
