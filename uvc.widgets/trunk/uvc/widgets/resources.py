# -*- coding: utf-8 -*-
# Copyright (c) 2007-2010 NovaReto GmbH
# cklinger@novareto.de 


from hurry.jquery import jquery
from hurry.jqueryform import jqueryform
from hurry.jquerytools import jquerytools
from megrok.resource import ResourceInclusion, Library, path, name

class WidgetsLibrary(Library):
    path('jslibrary')
    name('fancywidgets')



DatePickerCSS = ResourceInclusion(
    WidgetsLibrary, 'datepicker.css')

DatePicker = ResourceInclusion(
    WidgetsLibrary, 'datepicker.js', depends=[jquerytools])

optchoice = ResourceInclusion(
    WidgetsLibrary, 'choice.js', depends=[jquery])

double = ResourceInclusion(
    WidgetsLibrary, 'double.js', depends=[jquery])

validation = ResourceInclusion(
    WidgetsLibrary, 'validation.js', depends=[jquery])

jqt_helper = ResourceInclusion(
    WidgetsLibrary, 'jqt_helper.js', depends=[jquerytools, jqueryform])
