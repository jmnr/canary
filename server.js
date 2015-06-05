var http = require("http");
var handlers = require('./handlersRedis.js');
// var handlers = require('./handlers.js');
var serverHandler = require('./serverHandler.js');

http.createServer(serverHandler).listen(process.env.PORT ||8000);
