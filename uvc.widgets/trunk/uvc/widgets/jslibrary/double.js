$(document).ready(function() {
    $.fn.extend({
  appendField: function(id) {

      $(this).wrap('<table class="field-liner"><tr><td class="lined-field"></td></tr></table>');

      $(this).closest('.lined-field').after($(id));
      $(id).wrap('<td></d>');
      }
   });
   $('#form-widgets-name-row').appendField('#form-widgets-vorname-row');
});
