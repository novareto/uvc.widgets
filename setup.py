from setuptools import setup, find_packages
import os

version = '1.1.8.dev0'

setup(name='uvc.widgets',
      version=version,
      description="A collection of widgets for formlib / z3cformm based on jquery",
      long_description=open("README.txt").read(),
      # Get more strings from http://pypi.python.org/pypi?%3Aaction=list_classifiers
      classifiers=[
        "Programming Language :: Python",
        ],
      keywords='',
      author='Christian Klinger',
      author_email='cklinger@novareto.de',
      url='http://svn.plone.org/svn/collective/',
      license='GPL',
      packages=find_packages(exclude=['ez_setup']),
      namespace_packages=['uvc'],
      include_package_data=True,
      zip_safe=False,
      install_requires=[
          'setuptools',
          'js.jquery',
          'js.jquery_maskmoney',
          # -*- Extra requirements: -*-
      ],
      entry_points={
      'zeam.form.components': ['optionalchoice = uvc.widgets.widgets:register'],
      'fanstatic.libraries': ['uvcwidgets = uvc.widgets.resources:widget_library']}
      )
