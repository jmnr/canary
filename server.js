var http = require("http");
var handlers = require('./handlersRedis.js');
// var handlers = require('./handlers.js');
var serverHandler = require('./serverHandler.js');

http.createServer(serverHandler).listen(8000);
