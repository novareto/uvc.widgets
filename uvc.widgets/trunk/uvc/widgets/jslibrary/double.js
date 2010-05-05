$(document).ready(function() {
    $.fn.extend({
  appendFieldTo: function(id) {  
          input = $(this).find('div.widget input');
          label = $(this).find('label span.label');
          description = $(this).find('label span.small');
          error = $(this).find('div.error div');
          console.log(description);
          console.log($(id + ' label'));
          input.appendTo(id + ' div.widget');
          label.appendTo(id + ' label span.label');
          description.appendTo(id + 'label span');
          /* error.append(id + ' div.error div'); */
        }
     })


   $('#form-widgets-vorname-row').appendFieldTo('#form-widgets-name-row');

});

