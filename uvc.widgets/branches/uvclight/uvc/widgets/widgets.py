# -*- coding: utf-8 -*-
# Copyright (c) 2007-2010 NovaReto GmbH
# cklinger@novareto.de

import uvclight
import datetime

from dolmen.forms.base.markers import NO_VALUE
from dolmen.forms.base.widgets import WidgetExtractor
from dolmen.forms.ztk.fields import registerSchemaField
from dolmen.forms.ztk.widgets import choice
from dolmen.forms.ztk.widgets.bool import CheckBoxDisplayWidget
from dolmen.forms.ztk.widgets.choice import ChoiceFieldWidget
from dolmen.forms.ztk.widgets.date import DateFieldWidget
from dolmen.forms.ztk.widgets.textline import TextLineWidget
from uvc.widgets.fields import IOptionalChoice
from uvc.widgets.resources import optchoice, datepicker
from zope.interface import Interface

from zope.event import notify


class OptionalChoiceField(choice.ChoiceField):

    def validate(self, value, form):
        return None


class OptionalChoiceFieldWidget(choice.ChoiceFieldWidget):
    uvclight.adapts(OptionalChoiceField, Interface, Interface)

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
            self.choices().getTermByToken(value)
            return ''
        except:
            return value

    def valueToUnicode(self, value):
        try:
            term = self.choices().getTerm(value)
            return term.token
        except LookupError:
            return value


class OptionalChoiceDisplayWidget(OptionalChoiceFieldWidget):
    uvclight.name('display')


class OptionalChoiceWidgetExtractor(WidgetExtractor):
    uvclight.adapts(OptionalChoiceField, Interface, Interface)

    def extract(self):
        value, error = super(OptionalChoiceWidgetExtractor, self).extract()
        value, input = value
        if input:
            return (input, error)
        if value is not NO_VALUE:
            choices = self.component.getChoices(self.form)
            try:
                value = choices.getTermByToken(value).value
            except LookupError:
                return (None, u'Invalid value')
        return (value, error)


def OptionalChoiceSchemaFactory(schema):
    field = OptionalChoiceField(
        schema.title or None,
        identifier=schema.__name__,
        description=schema.description,
        required=schema.required,
        readonly=schema.readonly,
        source=schema.vocabulary,
        vocabularyName=schema.vocabularyName,
        interface=schema.interface,
        defaultValue=schema.default or NO_VALUE)
    return field


def register():
    registerSchemaField(OptionalChoiceSchemaFactory, IOptionalChoice)


class HiddenDisplayWidget(TextLineWidget):
    uvclight.name('hiddendisplay')


class ChoiceHiddenDisplayWidget(ChoiceFieldWidget):
    uvclight.name('hiddendisplay')

    def getTermValue(self, value):
        return self.form.getContentData().get(self.component.identifier)

    def valueToUnicode(self, value):
        term = self.lookupTerm(value)
        if term is not None:
            return term.title
        return u''


class BoolHiddenDisplayWidget(CheckBoxDisplayWidget):
    uvclight.name('hiddendisplay')

    def checkValue(self, value):
        print value
        if value in ('No', ):
            return False
        return True


class DPDateFieldWidget(DateFieldWidget):
    uvclight.name('dp-date')

    def update(self):
        self._htmlAttributes['data-date-format'] = "dd.mm.yyyy"
        self._htmlAttributes['data-date'] = datetime.datetime.now().strftime('%d.%m.%Y')
        super(DPDateFieldWidget, self).update()
        datepicker.need()
