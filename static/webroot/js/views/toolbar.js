$(function() {
    
    var ToolbarView = Backbone.View.extend({
        
        $el: $('#toolbar'),
        
        initialize: function() {
            
            this.$el.tabs();
         
            $('button', this.$el)
                .button()
                .click(function() {
                    new window[$(this).text()]();
                });
         
        }
        
    });
    
    window.Toolbar = new ToolbarView();
  
})