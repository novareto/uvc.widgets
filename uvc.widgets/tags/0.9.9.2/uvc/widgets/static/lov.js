(function($){
    jQuery.fn.extend({
//
// LOV Dialog
//
	lov_dialog:function(params){
	    var conf = {};  // Default-Werte
	    jQuery.extend(conf, params);
	    
	    return this.each(function(){
		var params = conf;
		/* */
		var dlg_button = jQuery('<button></button>').attr('type','button').attr('data-toggle','modal').addClass('btn').text('...');
		var dlg_div = jQuery('<div></div>').attr('id','lov_dialog').attr('class','modal hide fade')
				.append(jQuery('<div></div>').attr('id','header').attr('class','modal-header')
					.append(jQuery('<button></button>').attr('type','button').attr('class','close').attr('data-dismiss','modal').attr('aria-hidden','true').text('x'))
					.append(jQuery('<h3></h3>').attr('id','header_text').text('...'))
				)
				.append(jQuery('<div></div>').attr('id','body').attr('class','modal-body')
					.append(jQuery('<p></p>').attr('id','body_Text'))
					.append(jQuery('<p></p>').append(jQuery('<input></input>').attr('id','search').attr('type','text').attr('placeholder','Eingabe').attr('style','width: 50em')))
					.append(jQuery('<p></p>').append(jQuery('<select></select>').attr('id','result').attr('name','list').attr('size','10').attr('style','width: 50em')))
				)
				.append(jQuery('<div></div>').attr('id','footer').attr('class','modal-footer')
					.append(jQuery('<button></button>').attr('id','ok').attr('type','button').attr('class','btn').text('OK'))
					.append(jQuery('<button></button>').attr('type','button').attr('class','btn').attr('data-dismiss','modal').attr('aria-hidden','true').text('Abbrechen'))
				);
				
		function ajax_Helper(input, selection_dlg, app_url, LOV_Count){
		    var length = jQuery(input).val().length;
		    selection_dlg.find('select#result').empty();
		    jQuery.ajaxSetup({cache: false});
		    
		    if (length >= LOV_Count)
		    {
			var input = jQuery(input).val();
			
			jQuery.getJSON(app_url, {such:input}, function(data){
			    selection_dlg.find('select#result').removeAttr('size');
			    jQuery.each(data.daten, function(index, val){
				selection_dlg.find('select#result').append(jQuery('<option></option>').text(val[1]).attr('value',val[0]));
			    });
			    selection_dlg.find('select#result').attr('size','10');
			});
		    }
		}

		function leave_Dialog(selection_dlg, field_id, type){
		    if (type == undefined)
			type = 'select';
			
		    attr = jQuery(selection_dlg).find('select option:selected').attr('value');
		    
		    if (attr != undefined){
			if (type == 'select')
			    jQuery(field_id).find('option[value="' + attr + '"]').attr('selected',true);
			if (type == 'input')
			    jQuery(field_id).val(attr);
		    }
		    
		    jQuery(selection_dlg).modal('hide');
		    jQuery(selection_dlg).find('input#search').val('');
		    jQuery(selection_dlg).find('select#result').empty();
		}
		
		// ------------------------------------------------------------------------------------------------------------------
		var id_tmp = 'id_id';
		var lov_count = 2;
		var this_id = this.id;
		var dlg_tmp = dlg_div.clone();
		var button_tmp = dlg_button.clone();
		var next = false;
	
		if(params == undefined) {
		    params = '';
		}
	
		if (params.dlg_id != undefined) {
		    dlg_tmp.attr('id', params.dlg_id);
		    dlg_button.attr('href','#' + params.dlg_id);
		    id_tmp = 'id_' + params.dlg_id;
		}
	
		if (params.body_text != undefined) {
		    dlg_tmp.find('#body_Text').text(params.body_text);
		}
	
		if (params.header_text != undefined) {
		    dlg_tmp.find('#header_text').text(params.header_text);
		}
	
		if (params.append != undefined) {
		    tmp = params.append.clone();
		    dlg_tmp.find('input').after(tmp);
		}
	
		if (params.count != undefined && params.ajax != undefined) {
		    dlg_tmp.find('input').keyup(function(event){
			ajax_Helper(this, dlg_tmp, params.ajax, params.count);
		    });
		}
	
		if (params.next != undefined) {
		    next = params.next;
		}
		
		dlg_tmp.find('#ok').click(function(event){
		    leave_Dialog(dlg_tmp, '#' + this_id);
		});
		
		dlg_tmp.find('#result').dblclick(function(event){
		    leave_Dialog(dlg_tmp, '#' + this_id);
		});
		
		jQuery('body').append(dlg_tmp);

		this_tmp = jQuery(this);
		
		if(next)
		    this_tmp = this_tmp.next().attr('id',id_tmp);
		
		dlg_button.insertAfter(this_tmp.wrap(jQuery('<div></div>').addClass('input-append')));
		dlg_button.click(function(event){ leave_Dialog(dlg_tmp, '#' + this_id); });
		jQuery(jQuery(this)).insertBefore(jQuery('#' + id_tmp));    
	    });
	}
    });
})(jQuery);

