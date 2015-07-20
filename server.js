var routing = require('./router.js')({connection: require('redis')});

var http = require('http').createServer(routing.router);
var io = require('socket.io')(http);

http.listen(process.env.PORT);
console.log('Server running at port ' + process.env.PORT + '!');

io.on('connection', function(socket){
  socket.on('new clap', function (clapData) {   
    io.emit('new clap', clapData);
  });

  socket.on('delete clap', function (clapId) {
    io.emit('delete clap', clapId);
  });
});
