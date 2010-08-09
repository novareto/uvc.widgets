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

        import pdb; pdb.set_trace()  
        if not self.alternative:
            vocabulary = self.vocabulary
            if vocabulary is None:
                vr = getVocabularyRegistry()
                try:
                    vocabulary = vr.get(None, self.vocabularyName)
                except VocabularyRegistryError:
                    raise ValueError("Can't validate value without vocabulary")
                if value not in vocabulary:
                    raise ConstraintNotSatisfied(value)
