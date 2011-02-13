/*
 * open a dialog to let the user
 * edit the object and callback
 * when submitted
   
   $.edit({
       a: 'test1',
       b: 'test2',
       c: ['a', 'b', 'c', 'd']
   }, function(obj) {
       console.log(obj);
   });
  
 */

$.edit = (function($) {
    
    var $form = $('<form />'),
        $field = $('<div />').addClass('clearfix'),
        $input = $('<input />'),
        $submit = $('<input />').attr('type', 'submit'),
        $label = $('<label />');
        
    $.fn.serializeToObject = function() {
        var $cur_form = $(this),
            o = {},
            a = $cur_form.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var $baby_form = $('> div > form', $cur_form);
        if($baby_form.size()) {
            o[$baby_form.attr('name')] = $baby_form.serializeToObject();
        }
        return o;
    }
    
    function buildForm(obj, name) {
        
        var $cur_form = $form.clone(),
            $cur_input;
        
        for(var i in obj) {
            
            // create input for type
            switch(typeof obj[i]) {
                case 'object':
                    $cur_input = buildForm(obj[i], i);
                    break;
                case 'number':
                case 'string':
                    $cur_input = $input.clone()
                                 .attr('name', i)
                                 .attr('type', 'text')
                                 .val(obj[i]);
                    break;
            }
            
            // add new field
            $cur_form
                .append($field.clone()
                    .append($label.clone().text(i))
                    .append($cur_input));
                
        }
        
        if(name) {
            $cur_form.attr('name', name);
        }
            
        return $cur_form;
        
    }
    
    function createForm(obj, cb) {
        
        var $cur_form = buildForm(obj);
        
        $cur_form.submit(function(e) {
            $cur_form.dialog('close');
            cb($cur_form.serializeToObject());
            e.preventDefault();
        });
        
        $cur_form.append($submit.clone());
        
        return $cur_form;
        
    }
    
    return function(obj, cb) {
        createForm(obj, cb).dialog();
    }
    
})($);