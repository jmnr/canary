var serverHandler = require('./serverHandler.js');
var http = require("http").createServer(serverHandler);
var io = require('socket.io')(http);

http.listen(process.env.PORT ||8000);

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log(msg);
    io.emit('chat message', msg);
  });
});
