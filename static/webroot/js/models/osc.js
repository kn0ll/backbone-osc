$(function() {
    
    var socket = new io.Socket();
    socket.connect();
    
    window.Osc = Backbone.Model.extend({
        
        id: null,
        view: null,
        
        defaults: {
            path: '/undefined',
            value: 0
        },
        
        save: function() {
            socket.send(this.get('path') + '/' + this.get('value'));
        }
      
    })
   
})
