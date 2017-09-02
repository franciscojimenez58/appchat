var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var puerto_1 = 6677;

app.use(express.static('client'));
 

var messages = [{
	id: 1,
	text: 'Bienvenido al chat privado de Socket.io y Node Js de Jorge Jimenez...',
	nickname: 'Bot - JorgeJimenez.pe'
}];

io.on('connection', function(socket) {	
	console.log("El nodo con IP: " + socket.handshake.address + " se ha conectado...");
	socket.emit('messages', messages);
	socket.on('add-message', function(data){
		messages.push(data);
		io.sockets.emit('messages', messages);
	});
});

server.listen(6677, function(){
	console.log('Servidor está funcionando en http://localhost:6677');
});
