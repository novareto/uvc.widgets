$(document).ready(function() {
    $.fn.extend({
  appendFieldTo: function(id) {
          input = $(this).find('input');
          label = $(this).find('label.control-label').html();
          description = $(this).find('p.help-block').html();
          error = $(this).find('span#error-message').html();
          $(id + ' input').css('margin-right', '1em');
          
          $(id + ' input').wrap(jQuery('<div class="form-inline"></div>'));
          input.insertAfter(id + ' input');
          
          $(id + ' label.control-label').append(', ' + label);
          $(id + ' p.help-block').append(', ' + description);
          if ($(this).hasClass('has-error')){
             if ($(id).hasClass('has-error')) {
               $(id + ' span#error-message').append(error);
             }
             else {
               $(id).addClass('form-group alert-danger has-error');
               $(id + ' :input:last').after('<p class="help-block"> ' + error + ' </span>')
             }
          }
          $(this).hide();
        }
     })
});

