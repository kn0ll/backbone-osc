$(function() {
    
    var defaults = {
        max: 100,
        min: 0
    };

    var $body = $('body'),
        $slider_div = $('<div />').addClass('slider'),
        $input_field = $('<input />').attr('type', 'text').val(0);
    
    window.Slider = OscView.extend({
        
        $slider: null,
        $input: null,
        
        initialize: function() {
            
            // initialize super (extended from component)
            OscView.prototype.initialize.call(this);
            
            var model = this.model,
                $slider = this.$slider = $slider_div.clone(),
                $input = this.$input = $input_field.clone();
                
            model.bind('change:value', this.update);
            
            // init slider
            // change model property on slider change
            $slider.slider($.extend(defaults, {
                orientation: 'vertical',
                slide: function(e, ui) {
                    model.set({value: ui.value });
                }
            }));
            
            // proxy the setting input
            // to change slider & set model
            $input.bind('keypress', function(e) {
                if(e.which == 13) {
                    var val = $input.val();
                    // if it's too high, reset it to max
                    if(val > defaults.max) {
                       val = defaults.max;
                    // if it's too low, reset it to min
                    } else if (val < defaults.min) {
                        val = defaults.min;
                    }
                    model.set({value: val });
                }
            });
            
            // build
            this.$el
                .attr('data-type', 'Slider')
                .append($slider)
                .append($input)
                .appendTo($body);
            
        },
        
        update: function(model, val) {
            
            OscView.prototype.update.call(this, model, val);
            
            // change current view properties
            this.view.$input.val(val);
            this.view.$slider.slider('option', 'value', val);
            
        }
        
    });
  
})