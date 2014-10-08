publicsuffix written in nodejs
==============================

> A "public suffix" is one under which Internet users can directly register names.
> Some examples of public suffixes are .com, .co.uk and pvt.k12.wy.us. The Public
> Suffix List is a list of all known public suffixes.

from [publicsuffix.org](http://publicsuffix.org/)

This is an implementation of the public suffix list from mozilla to work with
lists of unfiltered domains.

Usage
=====

    var PublicSuffix = require('PublicSuffix');
    var publicSuffix = PublicSuffix.PublicSuffixFactory();

    var getTopLevelDomains = _.map(domains, publicSuffix.getTopDomain);
    var realDomains = _.filter(domains, publicSuffix.hasRealTopLevelDomain);

Implementation
==============

The implementation is creating a tree structure from the domain and has
unit tests.

Tests
=====

To run the tests just execute

    node tests/test-publicsuffix.js

No Unit testing framework is required.

Dependencies
============

- underscore
