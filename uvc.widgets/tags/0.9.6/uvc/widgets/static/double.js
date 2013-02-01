$(document).ready(function() {
    $.fn.extend({
  appendFieldTo: function(id) {
          input = $(this).find('input');
          label = $(this).find('label.control-label').html();
          description = $(this).find('p.help-block').html();
          error = $(this).find('div.error').html();
          $(id + ' input').css('margin-right', '1em');
          input.insertAfter(id + ' input');
          $(id + ' label.control-label').append(', ' + label);
          $(id + ' p.help-block').append(', ' + description);
          if ($(this).attr('class') == 'control-group error'){
             $(id).addClass('error');
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
});
