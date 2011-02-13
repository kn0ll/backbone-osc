$(function() {
    
    var $body = $('body');
    
    window.Unit = OscView.extend({
        
        initialize: function() {
            
            // initialize super (extended from component)
            OscView.prototype.initialize.call(this);
            
            var $self_el = this.$el;
            
            $self_el
            
                .attr('data-type', 'Unit')
            
                .droppable({
                    hoverClass: 'ui-state-active',
                    drop: function(e, ui) {
                        var $old_unit = ui.draggable.closest('[data-type="Unit"]');
                        if($old_unit.get(0) != $self_el.get(0)) {
                            $(this).append(ui.draggable);
                        }
                        e.stopPropagation();
                    }
                })

                .resizable()

                .appendTo($body);
            
        }
        
    });
  
})