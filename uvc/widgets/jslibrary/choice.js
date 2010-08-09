  $(document).ready(function() {
    input_value = $('input.alternative-input').val();
    if (input_value == '') 
      {
        $('input.alternative-input').hide();
        $('select.alternative-choice').append(
            '<option class="alt-opt" id="alternative-choice-opt" value=""> Sonstiges </option>')
      }
    else
      {
        $('input.alternative-input').show();
        $('select.alternative-choice').append(
            '<option class="alt-opt" id="alternative-choice-opt" selected="selected" value=""> Sonstiges </option>')
      }

    $('select.alternative-choice').change(function(e) {
	if ($(this).find("option:selected").attr('class') == 'alt-opt') {
	    $('input.alternative-input').show('slow');
	}
	else {
            $('input.alternative-input').val('')
	    $('input.alternative-input').hide();
	}
    });

  });
