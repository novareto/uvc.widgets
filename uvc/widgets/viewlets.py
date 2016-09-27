# -*- coding: utf-8 -*-
# Copyright (c) 2007-2011 NovaReto GmbH
# cklinger@novareto.de

import grok
from uvc.layout.interfaces import IHeaders
from zope.interface import Interface


class Base_URL(grok.Viewlet):
    grok.context(Interface)
    grok.viewletmanager(IHeaders)

    def render(self):
        return "<script> var base_url = '%s'; </script>" % self.view.application_url()
