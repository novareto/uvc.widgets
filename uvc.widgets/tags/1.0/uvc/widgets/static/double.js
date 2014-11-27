$(document).ready(function() {
    $.fn.extend({
  appendFieldTo: function(id) {
          input = $(this).find('input');
          label = $(this).find('label.control-label').html();
          description = $(this).find('p.help-block').html();
          error = $(this).find('span.help-inline').html();
          $(id + ' input').css('margin-right', '1em');
          
          $(id + ' input').wrap(jQuery('<div class="form-inline"></div>'));
          input.insertAfter(id + ' input');
          
          $(id + ' label.control-label').append(', ' + label);
          $(id + ' p.help-block').append(', ' + description);
          if ($(this).attr('class') == 'control-group error'){
             if ($(id).is('.error')) {
               $(id + ' span.help-inline').append(error);
             }
             else {
               $(id).addClass('error');
               $(id + ' :input:last').after('<span class="help-inline"> ' + error + ' </span>')
             }
          }
          $(this).hide();
        }
     })
});

