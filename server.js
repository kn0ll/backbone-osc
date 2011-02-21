var Connect = require('connect'),
    Jade = require('jade'),
    Socket = require('socket.io-connect').socketIO,
    Fs = require('fs'),
    _ = require('./static/webroot/js/lib/underscore'),
    osc = require('./lib/node-osc/lib/osc'),
    jspack = require('./lib/node-osc/lib/node-jspack/jspack').jspack;
    
    
var server = Connect.createServer(
    
    Socket(function() { return server }, function (client, req, res) {
        
        var osc_send = new osc.Client(8000, '127.0.0.1');
        
        // listen from client on port 8000
        // to create osc signal
        client.on('message', function(data) {
            
            var args = data.split('/'),
                val = args.pop();
            osc_send.sendSimple(args.join('/'), [parseFloat(val)]);
           
        });
        
    }),
    
    Connect.staticProvider(__dirname + '/static'),
    
    Connect.router(function(app){
        
        app.get('/', function(req, res, next){
            res.writeHead(200, { 'Content-Type': 'text/html' })
            Fs.readFile('./views/index.html', 'utf8', function (err, html) {
                res.end(_.template(html, req.params))
            })
        })
        
    })
    
).listen(8080)