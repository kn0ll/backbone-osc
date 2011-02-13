$(function() {
    
    window.OscView = Backbone.View.extend({
        
        $el: null,
        model: null,
        
        initialize: function() {
            
            var model = new Osc();
            this.model = model;
            this.model.view = this;
            
            this.$el = $('<div />').addClass('component');
            
            this.$el.draggable({
                containment: 'parent'
            });
            
            this.$el.dblclick(function() {
                Properties.load(model);
            });
            
        },
        
        toggleHighlight: function() {
            this.$el.toggleClass('ui-state-active');
        },
        
        update: function(model, value) {
            model.save();
        }
        
    });
  
})