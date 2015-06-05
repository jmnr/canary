var http = require("http");
var handlers = require('./handlersRedis.js');
var serverHandler = require('./serverHandler.js');

http.createServer(serverHandler).listen(8000);
