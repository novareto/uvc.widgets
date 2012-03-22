// ZEAM JQuery Form Integration

$(document).ready(function() { 
    // bind 'myForm' and provide a simple callback function 
    var options = {
      success: handleSuccess,
      data: { ajax: 'true'},
    }
/*
   $('#form-popupform').live('submit', function() {
        // submit the form
        console.log('JJJJ');
        
        $(this).ajaxSubmit(options);
        // return false to prevent normal browser submit and page navigation
        return false;
     });

*/
  $('#form-popupform').ajaxForm(options);
});

function handleSuccess(responseText, statusText, xhr, $form)  { 
    console.log('responseText')
    $('div.input-form').replaceWith(responseText);
} 
