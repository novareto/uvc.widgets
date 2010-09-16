$(function() {
  $.each($('input.field-date'), function() {  
     $(this).dateinput({ format: 'dd.mm.yyyy', 'firstDay': 1 });
  })
});

