var Connect = require('connect'),
    Jade = require('jade'),
    Socket = require('socket.io-connect').socketIO,
    Fs = require('fs'),
    _ = require('./static/webroot/js/lib/underscore'),
    osc = require('./lib/node-osc/lib/osc')
    
    var Client = function (port, host) {
  this.port = port;
  this.host = host // || '127.0.0.1';
  this._sock = dgram.createSocket('udp4');
}
Client.prototype = {
  send: function (msg) {
    var binary = msg.toBinary();
    var b = new buffer.Buffer(binary, 'binary');
    console.log(msg);
    //console.log(b, 0, b.length, this.port, this.host);
    this._sock.send(b, 0, b.length, this.port, this.host);
  },
  sendSimple: function (address, data) {
    var msg = new Message(address);
    msg.append(data);
    this.send(msg);
  },
}
exports.Client = Client;

    
var server = Connect.createServer(
    
    Connect.staticProvider(__dirname + '/static'),
    
    Connect.router(function(app){
        
        app.get('/', function(req, res, next){
            res.writeHead(200, { 'Content-Type': 'text/html' })
            Fs.readFile('./views/index.html', 'utf8', function (err, html) {
                res.end(_.template(html, req.params))
            })
        })
        
    }),
    
    Socket(function() { return server }, function (client, req, res) {
        
        var osc_client = new osc.Client(8000, '127.0.0.1');
        
        client.on('message', function(data) {
            
            var args = data.split('/'),
                val = args.pop();
                 
            osc_client.sendSimple(args.join('/'), [val]);
           
        })
        
    })
    
).listen(8080)
