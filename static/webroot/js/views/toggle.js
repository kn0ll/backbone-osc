$(function() {
    
    var toggle_ids = 0,
        $body = $('body'),
        $ref_input = $('<input />').attr('type', 'checkbox'),
        $ref_label = $('<label />').text('Toggle');
    
    window.Toggle = OscView.extend({
        
        $el: null,
        $input: null,
        $label: null,
        
        initialize: function($context) {
            
            // initialize super (extended from component)
            OscView.prototype.initialize.call(this);
            
            var model = this.model,
                id = 'toggle_' + toggle_ids++,
                $input = this.$input = $ref_input.clone(),
                $label = this.$label = $ref_label.clone();
                
            model.bind('change:value', this.update);
            
            $input.click(function() {
                var $box = $(this);
                model.set({ value: $box.is(':checked') })
            })
            
            // unique id/for attributes
            $input.attr('id', id);
            $label.attr('for', id);
            
            // construct
            this.$el
                .attr('data-type', 'Toggle')
                .append($input)
                .append($label)
                .appendTo($body);
            
            // turn this input into a button
            $input.button();
            
        }
        
    });
  
})