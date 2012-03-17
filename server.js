var Connect = require('connect'),
	server = Connect.createServer(),
	io = require('socket.io').listen(server),
	osc = require('socket.osc');

server.use(Connect.static(__dirname + '/webroot'));
server.listen(8080);

osc.listen(io, {
	inbound_port: 8000,
	outbound_port: 9000,
	outbound_host: '192.168.10.10'
});