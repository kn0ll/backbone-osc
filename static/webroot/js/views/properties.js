$(function() {
    
    var Properties_Panel = Backbone.View.extend({
        
        el: $('#properties'),
        $path_input: $('input[name="path"]', this.el),
        
        events: {
            'submit': 'save'
        },
        
        initialize: function() {
        },
        
        load: function(osc) {
            
            // turn off current active
            if(this.model){
                this.model.view.toggleHighlight();
            }
            
            // set current active
            this.model = osc;
            this.model.view.toggleHighlight();
            
            // show model properties in form
            this.$path_input.val(this.model.get('path'));
            
            // change tab
            Toolbar.$el.tabs('select', 'properties');
            
        },
        
        // change values on models
        // from the property form
        save: function() {
            this.model.set({ path: this.$path_input.val() })
            return false
        }
        
    });
    
    window.Properties = new Properties_Panel();
  
})