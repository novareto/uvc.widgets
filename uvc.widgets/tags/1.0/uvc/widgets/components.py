# -*- coding: utf-8 -*-
# Copyright (c) 2007-2011 NovaReto GmbH
# cklinger@novareto.de 

import grok
import uvcsite


class AjaxPLZOrt(grok.JSON):
    grok.context(uvcsite.IUVCSite)
    grok.baseclass()

    def show_orte(self, plz=None):
        orte = []
        return {'orte': orte}
