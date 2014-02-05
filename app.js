var express = require('express');
var http = require('http');

var command = require('child_process').exec;

var app = express();
var server = http.createServer(app);
// var io = require('socket.io').listen(server);

app.get('/', function(req, res) {
	console.log("Index file");
	res.render('index.html');
});

// app.use(require('express-jquery')('/jquery.js'));
// app.use(express.static(__dirname + '/public'));

// io.sockets.on('connection', function(socket) {
// 	socket.on('ipquery', function(address) {

// 		var ping = command('ping -c 3 '+address, {timeout: 5000}, function(error, stdout, stderr) {
// 			socket.emit('ipresp', error, stdout, stderr);
// 		});
// 	});
// });

var port = Number(process.env.port || 6666);

server.listen(port, function() {
	console.log("Listening on " + port);
});