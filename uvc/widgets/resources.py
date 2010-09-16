from megrok.resource import ResourceInclusion, Library, path, name
from hurry.jquerytools import jquerytools
from hurry.tinymce import tinymce
from hurry.jquery import jquery

class WidgetsLibrary(Library):
    path('jslibrary')
    name('fancywidgets')



DatePickerCSS = ResourceInclusion(
    WidgetsLibrary, 'datepicker.css')

DatePicker = ResourceInclusion(
    WidgetsLibrary, 'datepicker.js', depends=[jquerytools])

TinyMCE = ResourceInclusion(
    WidgetsLibrary, 'tinymce.js', depends=[tinymce])

optchoice = ResourceInclusion(
    WidgetsLibrary, 'choice.js', depends=[jquery])

double = ResourceInclusion(
    WidgetsLibrary, 'double.js', depends=[jquery])

validation = ResourceInclusion(
    WidgetsLibrary, 'validation.js', depends=[jquery])
