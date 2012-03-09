var Connect = require('connect'),
	server = Connect.createServer();

server.use(Connect.static(__dirname + '/webroot'));
server.listen(8000);