$.tools.dateinput.localize("de", {
   months: 'Januar,Februar,März,April,Mai,Juni,Juli,August,September,Oktober,November,Dezember',
   shortMonths:  'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Okt,Nov,Dez',
   days:         'Sonntag,Montag,Dienstag,Mittwoch,Donnerstag,Freitag,Samstag',
   shortDays:    'Son,Mon,Die,Mit,Do,Fri,Sam'
});

$.tools.dateinput.conf.lang = 'de';

$(function() {
  $.each($('input.field-date'), function() {  
     $(this).dateinput({ format: 'dd.mm.yyyy', 'firstDay': 1 });
  })
});

