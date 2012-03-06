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
          input = $(this).find('input');
          label = $(this).find('label.control-label').html();
          description = $(this).find('p.help-block').html();
          error = $(this).find('div.error').html();
          console.log(id);
          input.insertAfter(id + ' input');
          $(id + ' label.control-label').append(', ' + label);
          $(id + ' p.help-block').append(', ' + description);
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
   $('#field-form-field-vorname').appendFieldTo('#field-form-field-name');


});
