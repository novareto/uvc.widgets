# -*- coding: utf-8 -*-
# Copyright (c) 2007-2010 NovaReto GmbH
# cklinger@novareto.de 

import grok

from zope.interface import Interface
from zeam.form.ztk.widgets import choice 
from uvc.widgets.fields import IOptionalChoice
from uvc.widgets.resources import optchoice
from zeam.form.ztk.fields import registerSchemaField
from zope.schema.vocabulary import SimpleTerm
import zope.schema.interfaces as schema_interfaces
from zeam.form.base.markers import NO_VALUE
from zeam.form.base.widgets import WidgetExtractor


def register():
    registerSchemaField(OptionalChoiceSchemaField, IOptionalChoice)


class OptionalChoiceSchemaField(choice.ChoiceSchemaField):

    def getChoices(self, context):
        source = self.source
        if (schema_interfaces.IContextSourceBinder.providedBy(source) or
            schema_interfaces.IVocabularyFactory.providedBy(source)):
            source = source(context)
        assert schema_interfaces.IVocabularyTokenized.providedBy(source)
        return source


class OptionalChoiceFieldWidget(choice.ChoiceFieldWidget):
    grok.adapts(OptionalChoiceSchemaField, Interface, Interface)

    def update(self):
        super(OptionalChoiceFieldWidget, self).update()
        optchoice.need()

    @property
    def selectValue(self):
        value = self.inputValue()
        if isinstance(value, list):
            return value[0]
        return value

    @property
    def textValue(self):
        value = self.inputValue()
        if isinstance(value, list):
            value = value[1]
        try:
            term = self.choices().getTerm(value)
            return '' 
        except:
            return value

    def valueToUnicode(self, value):
        try:
            term = self.choices().getTerm(value)
            return term.token
        except LookupError:
            return value


class OptionalChoiceWidgetExtractor(WidgetExtractor):
    grok.adapts(OptionalChoiceSchemaField, Interface, Interface)

    def extract(self):
        value, error = super(OptionalChoiceWidgetExtractor, self).extract()
        value, input = value
        if input:
            return (input, error)
        if value is not NO_VALUE:
            choices = self.component.getChoices(self.form.context)
            try:
                value = choices.getTermByToken(value).value
            except LookupError:
                return (None, u'Invalid value')
        return (value, error)


from zeam.form.ztk.widgets.textline import TextLineWidget
from zeam.form.ztk.widgets.choice import ChoiceFieldWidget

class HiddenDisplayWidget(TextLineWidget):
    grok.name('hiddendisplay')


class ChoiceHiddenDisplayWidget(ChoiceFieldWidget):
    grok.name('hiddendisplay')

    def getTermValue(self, value):
        return getattr(self.form.context, self.component._field.getName())

    def valueToUnicode(self, value):
        term = self.lookupTerm(value)
        if term is not None:
            return term.title
        return u''
