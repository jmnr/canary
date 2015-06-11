var serverHandler = require('./serverHandler.js');
var http = require("http").createServer(serverHandler);
var io = require('socket.io')(http);
                
http.listen(process.env.PORT || 8000); //on heroku server may not be 8k so use whatever it says

io.on('connection', function(socket){
  socket.on('new clap', function (clapData) {
    io.emit('new clap', clapData);
  });

  socket.on('delete clap', function (clapId) {
    io.emit('delete clap', clapId);
  });
});
