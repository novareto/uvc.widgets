# -*- coding: utf-8 -*-

from zope.schema import Choice
from zope.interface import Interface, implements 


class IOptionalChoice(Interface):
    pass


class OptionalChoice(Choice):
    """A choice field with the option to add an alternative value
    """
    implements(IOptionalChoice)

    def __init__(self, values=None, vocabulary=None,
                 source=None, **kw):
        Choice.__init__(self, values, vocabulary, source, **kw)

    def _validate(self, value):
        if self._init_field:
            return
        return
