var Connect = require('connect'),
    Jade = require('jade'),
    Socket = require('socket.io-connect').socketIO,
    Fs = require('fs'),
    _ = require('./static/webroot/js/lib/underscore'),
    osc = require('./lib/node-osc/lib/osc')
    
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
           
            console.log(args.join('/') + '/' + val);      
            osc_client.sendSimple(args.join('/'), [val]);
           
        })
        
    })
    
).listen(8080)
