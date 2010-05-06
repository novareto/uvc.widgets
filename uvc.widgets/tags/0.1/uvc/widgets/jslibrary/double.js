$(document).ready(function() {
/*
 $.fn.extend({
  appendField: function(id) {

      $(this).wrap('<table class="field-liner"><tr><td class="lined-field"></td></tr></table>');

      $(this).closest('.lined-field').after($(id));
      $(id).wrap('<td class="lined-field"></d>');
      }
   });
   $('#form-widgets-name-row').appendField('#form-widgets-vorname-row');
*/

    $.fn.extend({
  appendFieldTo: function(id) {
          input = $(this).find('div.widget input');
          label = $(this).find('label span.label').html();
          description = $(this).find('label span.small').html();
          error = $(this).find('div.error').html();
          input.appendTo(id + ' div.widget');
          $(id + ' label span.label').append(', ' + label);
          $(id + ' label span.small').append(', ' + description);
          if ($(this).attr('class') == 'row row_error'){
             $(id).addClass('row_error');
             if ($(id).is('.error')) {
               $(id + ' error').append(error);
             } 
             else {
               $(id).append('<div class="error"> ' + error + ' </div>')
             }
          }
          $(this).hide();
        }
     })
   $('#form-widgets-vorname-row').appendFieldTo('#form-widgets-name-row');


});
