var assert = require('assert');

var _ = require('underscore');

var ps = require('../lib/publicsuffix');
var RegularDomain = ps.RegularDomain;
var PublicSuffixDomain = ps.PublicSuffixDomain;
var WildcardPublicSuffixDomain = ps.WildcardPublicSuffixDomain;
var isComment = ps.isComment;
var strip = ps.strip;
var parse = ps.parse;
var generateTree = ps.generateTree;
var PublicSuffix = ps.PublicSuffix;
var PublicSuffixFactory = ps.PublicSuffixFactory;


var tests = {
    'RegularDomain': function() {
        var domain = new RegularDomain();
        assert.equal(domain.isPublicSuffix(), false);
        var sub = domain.get("foo");
        assert.ok(sub instanceof RegularDomain);
    },
    'PublicSuffixDomain': function() {
        var domain = new PublicSuffixDomain();
        assert.ok(domain.isPublicSuffix());
    },
    'PublicSuffix with no subdomains': function() {
        var domain = new PublicSuffixDomain();
        var sub = domain.get("foo");
        assert.ok(sub instanceof RegularDomain);
    },
    'PublicSuffix with PublicSuffix Subdomains': function() {
        var subDomain = new Object();
        var domain = new PublicSuffixDomain({sub: subDomain});
        var regular = domain.get("foo");
        assert.ok(regular instanceof RegularDomain);
        var sub = domain.get("sub");
        assert.equal(subDomain, sub);
    },
    'WildcardPublicSuffixDomain is PublicSuffixDomain': function() {
        var domain = new WildcardPublicSuffixDomain();
        assert.ok(domain instanceof PublicSuffixDomain);
    },
    'WildcardPublicSuffixDomain exception handling': function() {
        var exception = new Object();
        var domain = new PublicSuffixDomain({sub: exception});
        assert.equal(exception, domain.get("sub"));
    },
    'is comment': function() {
        assert.ok(isComment('// is a comment'));
        assert.ok(isComment('  empty'));
        assert.ok(!isComment('com'));
    },
    'strip comments from logic': function() {
        assert.equal(strip('foo.bar a'), 'foo.bar');
        assert.equal(strip('nothing'), 'nothing');
    },
    'parse simple': function() {
        var str = 'foo.bar.com';
        var expect = {com: {bar: {foo: {}}}};
        assert.deepEqual(expect, parse(str));
    },
    'generate simple tree': function() {
        var parsedList = parse('subsub.sub.com');
        var tree = generateTree(parsedList);
        var com = tree.get('com');
        assert.ok(com.isPublicSuffix());
        var sub = com.get('sub');
        assert.ok(sub.isPublicSuffix());
        var subsub= sub.get('subsub');
        assert.ok(subsub.isPublicSuffix());

        assert.equal(false, tree.get('notld').isPublicSuffix());
    },
    'wildcard tree': function() {
        var tree = generateTree(parse('*'));
        assert.ok(tree.get('foo').isPublicSuffix());
        assert.ok(tree.get('bar').isPublicSuffix());
        assert.equal(false, tree.get('foo').get('bar').isPublicSuffix());
    },
    'wildcard with exceptions': function() {
        var parsedList = parse('*\n!foo');
        var tree = generateTree(parsedList);
        assert.equal(false, tree.get('foo').isPublicSuffix());
    },
    'getTopDomain': function() {
        var tree = generateTree(parse('bar.com'));
        var publicsuffix = PublicSuffix(tree);
        var topDomain = 'foo.bar.com';
        var subDomain = 'sub.subsub.foo.bar.com';
        assert.equal(topDomain, publicsuffix.getTopDomain(topDomain));
        assert.equal(topDomain, publicsuffix.getTopDomain(subDomain));
    },
    'isPublicSuffix': function() {
        var tree = generateTree(parse('bar.com'));
        var publicsuffix = PublicSuffix(tree);
        var toplevelDomain = 'com';
        var publicDomain = 'bar.com';
        var topDomain = 'foo.bar.com';
        var subDomain = 'sub.subsub.foo.bar.com';
        assert.ok(publicsuffix.isPublicSuffix(toplevelDomain));
        assert.ok(publicsuffix.isPublicSuffix(publicDomain));
        assert.equal(false, publicsuffix.isPublicSuffix(topDomain));
        assert.equal(false, publicsuffix.isPublicSuffix(subDomain));
    },
    'test big file': function() {
        var publicsuffix = PublicSuffixFactory();
        assert.ok(publicsuffix.isPublicSuffix('com'));
        assert.ok(publicsuffix.isPublicSuffix('ws'));
        assert.ok(publicsuffix.isPublicSuffix('xxx'));
        assert.ok(publicsuffix.isPublicSuffix('zw'));
        assert.ok(publicsuffix.isPublicSuffix('中國'));
    },
    'test big file with garbage': function() {
        var publicsuffix = PublicSuffixFactory();
        assert.equal('text', publicsuffix.getTopDomain('text'));
        assert.ok(!publicsuffix.isPublicSuffix('text'));
    },
    'has domain real top level domain': function() {
        var tree = generateTree(parse('com'));
        var publicsuffix = PublicSuffix(tree);
        assert.ok(publicsuffix.hasRealTopLevelDomain('foo.com'));
        assert.ok(!publicsuffix.hasRealTopLevelDomain('bar.bar'));
    }
};

_.each(tests, function(test, name) {
    console.log('starting test', name);
    test({finish: function() {}});
});
