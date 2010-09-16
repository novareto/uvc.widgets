# -*- coding: utf-8 -*-
# Copyright (c) 2007-2010 NovaReto GmbH
# cklinger@novareto.de 

import grok
import uvcsite
import simplejson

from zeam.form import base
from zope.i18n import translate
from zope.interface import interface
from zope.security.proxy import removeSecurityProxy
from zeam.form.base.widgets import getWidgetExtractor



class JSONValidatorForm(grok.JSON):
    grok.name('json_validator')
    grok.context(interface.Interface)
    grok.view(base.Form)

    def __translate(self, message):
        context = removeSecurityProxy(self.context)
        return translate(
             message, target_language=context.i18nLanguage, context=self.request)

    def json_validator(self, name, value):
        self.request.form[name] = unicode(value)
        info = {'success': True}
        context = removeSecurityProxy(self.context)
        for field in context.fields:
            extractor = getWidgetExtractor(field, context, self.request)
            if extractor is not None:
                if extractor.identifier == name:
                    value, error = extractor.extract()
                    if error is None:
                        error = field.validate(value, context)
                    if error is not None:
                        info['success'] = False
                        info['error'] = self.__translate(error)
                    break
        return info


    def json_save(self, data):
        import pdb; pdb.set_trace() 
