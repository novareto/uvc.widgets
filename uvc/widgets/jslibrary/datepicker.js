$(function() {
  $.each($('input.field-date'), function() {  
     $(this).datepicker({ dateFormat: 'dd.mm.yy' });
  })
});

