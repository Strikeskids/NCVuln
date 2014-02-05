var express = require('express');
var logfmt = require('logfmt');
var http = require('http');
var engines = require('consolidate');

var command = require('child_process').exec;

var app = express();
var server = http.createServer(app);

var io = require('socket.io').listen(server);

app.engine('jade', engines.jade);
app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
	res.render('index.jade');
});

app.use(require('express-jquery')('/jquery.js'));
app.use(express.static(__dirname + '/public'));

io.sockets.on('connection', function(socket) {
	console.log('Socket connected')
	socket.on('ipquery', function(address) {
		console.log("Ping query", address);
		var e = '/sbin/ping -c1 -t2 '+address;
		console.log('Executing',e)
		var ping = command(e, {timeout: 5000, env: {'PATH':__dirname}}, function(error, stdout, stderr) {
			console.log("Ping finished",address,error,stdout,stderr);
			socket.emit('ipresp', error, stdout, stderr);
		});
	});
});

var port = Number(process.env.PORT || 6978);

server.listen(port, function() {
	console.log("Listening on " + port);
});