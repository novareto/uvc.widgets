# -*- coding: utf-8 -*-
# Copyright (c) 2007-2010 NovaReto GmbH
# cklinger@novareto.de


from js.jquery import jquery
from fanstatic import Resource, Library, Group


widget_library = Library('uvc.widgets', 'static')


dpcss = Resource(widget_library, 'bootstrap-datepicker.standalone.min.css')
dpdecss = Resource(widget_library, 'bootstrap-datepicker.de.min.js')
dpjs = Resource(widget_library, 'bootstrap-datepicker.min.js')

bootstrapdatepicker = Group((dpcss, dpdecss, dpjs))


optchoice = Resource(widget_library, 'choice.js', depends=[jquery])
double = Resource(widget_library, 'double.js', depends=[jquery])
masked_input = Resource(widget_library, 'jquery.maskedinput.js', depends=[jquery])  # Achtung JQuery 1.9
#masked_input = Resource(widget_library, 'jquery.maskedinput-1.3.js', depends=[jquery])
datepicker = Resource(widget_library, 'bsdp.js', depends=[bootstrapdatepicker])
plz_select = Resource(widget_library, 'plz_select.js', depends=[jquery])
lov = Resource(widget_library, 'lov.js', depends=[jquery])
limit_js = Resource(widget_library, 'limit.js', depends=[jquery])
