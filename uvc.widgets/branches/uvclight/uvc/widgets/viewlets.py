# -*- coding: utf-8 -*-
# Copyright (c) 2007-2011 NovaReto GmbH
# cklinger@novareto.de 

import uvclight
import uvcsite
import uvc.layout
from zope.interface import Interface


class Base_URL(uvclight.Viewlet):
    uvclight.context(Interface)
    uvclight.viewletmanager(uvc.layout.interfaces.IHeaders)

    def render(self):
        return "<script> var base_url = '%s'; </script>" % self.view.application_url()
