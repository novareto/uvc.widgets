# -*- coding: utf-8 -*-
# Copyright (c) 2007-2011 NovaReto GmbH
# cklinger@novareto.de

import grok
from zope.interface import Interface


class AjaxPLZOrt(grok.JSON):
    grok.context(Interface)
    grok.baseclass()

    def show_orte(self, plz=None):
        orte = []
        return {'orte': orte}
