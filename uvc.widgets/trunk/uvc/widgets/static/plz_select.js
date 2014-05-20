(function($){
    jQuery.fn.extend({
//
//  PLZ -> ORT
//
	plz_ort:function(params){
	    var conf = {};  // Default-Werte
	    jQuery.extend(conf, params);
	    
	    return this.each(function(){
		var params = conf;
		var this_id = '#' + this.id;
	
		if(params == undefined) {
		    params = '';
		}
		
		var arr = jQuery.data(document.body, this_id);
		if(arr == undefined) {
		    var element = new Array();
		    element['plz'] = this_id;
		    element['ort'] = params.ort_id;
		    element['ajax'] = params.ajax;
		    
		    jQuery.data(document.body, this_id, element);
		}		
		 
		if (params.ort_id != undefined) {
		    ort_id = '#' + params.ort_id.replace("#","");
		    menu_id = '#menu-' + params.ort_id.replace("#","");
		}
	
		if (params.ajax != undefined) {
		    app_url = params.ajax;
		}
		
		var menu = jQuery('<ul></ul>')
			    .addClass('dropdown-menu')
			    .attr('role', 'menu')
			    .attr('aria-labelledby', 'dLabel')
			    .attr('id',menu_id.replace("#",""));
			    
		menu.insertAfter(jQuery(ort_id).wrap(jQuery('<a></a>').attr('id','id-' + this.id) ) );
				
		jQuery(menu_id).on('click', function(event){
		    var event = event || window.event;
		    var target = event.target || event.srcElement;
		    var text = target.innerHTML; //event.target.text;
		    
		    jQuery(ort_id).val(text);
		});
		
		jQuery(this_id).keypress(function(event){
		    var key = 0;
		    var sel = window.getSelection ? window.getSelection() : document.selection;
		    
		    if(sel) {
			if (jQuery(this_id)[0].selectionStart != jQuery(this_id)[0].selectionEnd) {
			    if (sel.removeAllRanges) {
				sel.removeAllRanges();
			    } else if (sel.empty) {
				sel.empty();
			    }
			    
			    return;
			}
		    }
		    
		    if (event.charCode == undefined)
			key = event.keyCode;
		    else
			key = (event.charCode == 0 ? event.keyCode : event.charCode);
			
		    if(!(event.ctrlKey || event.altKey || key < 32))
			if(jQuery(this).val().length >= 5 || !/\d/.test(String.fromCharCode(key)))
			    event.preventDefault();
		});
		
		jQuery(this_id).keyup(function(event){
		    var value = jQuery(this_id).val();
		    ort_id = jQuery.data(document.body, this_id)['ort'];
		    
		    if (menu.children().length > 0)
			menu.empty();
			
		    if (value.length != 5){
			jQuery(ort_id).val('').removeAttr('data-toggle');
			jQuery('#id-' + this.id).removeClass('dropdown')
		    }
		    else {
			jQuery.getJSON(app_url, {plz:value}, function(data){
			    if (data.orte.length == 1) {
				jQuery(ort_id).val(data.orte[0]);
				}
			    else {
				jQuery('#id-' + this_id.replace('#','')).addClass('dropdown')
				jQuery(ort_id).attr('data-toggle','dropdown');
				
				jQuery.each(data.orte, function(index, val){
				    menu.append(jQuery('<li></li>').attr('role','presentation')
						.append(jQuery('<a></a>').attr('role','menuitem').text(val))
				    );
				});
				jQuery(ort_id).dropdown('toggle');
			    }
			});
		    }
		});
	    });
	}
    });
})(jQuery);

