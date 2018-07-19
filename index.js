var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var userNum = 0;


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


http.listen(port, function(){
  console.log('listening on *:' + port);
});


io.on('connection', function(socket){
  console.log('a user connected');
  userNum++;
  socket.broadcast.emit('new user', userNum);
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
    socket.broadcast.emit('user left', userNum);
    userNum--;
  });
});
