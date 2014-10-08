var _ = require('underscore')._;

function parse(rawList) {
    var striped = sanitize(rawList);
    var parsed = {};

    _.forEach(striped, function(row) {
        levels = row.split('.').reverse();
        var root = parsed;
        _.forEach(levels, function(level) {
            if (!root[level]) {
                root[level] = {};
            }
            root = root[level];
        });
    });
    return parsed;
}

function sanitize(rawList) {
    var rows = rawList.split('\n');
    var noComments = _.reject(rows, isComment);
    var striped = _.map(noComments, strip);
    return striped;
}

function generateTree(parsedList) {
    if (parsedList['*']) {
        var exceptions = generateException(parsedList);
        return new WildcardPublicSuffixDomain(exceptions);
    } else {
        var subs = {};
        _.forEach(parsedList, function(value, key) {
            subs[key] = generateTree(value);
        });
        return new PublicSuffixDomain(subs);
    }
}

function generateException(wildcard) {
    var keys = _.map(wildcard, function(v,k) { return k; });
    var exceptionKeys = _.filter(keys, isException);
    var exceptionStrings = _.map(exceptionKeys, removeFirstChar);
    var exceptions = {};
    _.each(exceptionStrings, function(ex) {
        exceptions[ex] = new RegularDomain();
    });
    return exceptions;
}

function removeFirstChar(str) {
    return str.substr(1);
}

function isException(level) {
    return level[0] == '!';
}

function isComment(row) {
    return row.substr(0,2) == '//' || row[0] == ' ' || row.length == 0;
}

function strip(row) {
    var l = (row.indexOf(' ') >=0? row.indexOf(' ') : row.length);
    return row.substr(0, l);
}

function RegularDomain() {}
RegularDomain.prototype.isPublicSuffix = function() { return false; }
RegularDomain.prototype.get = function() { return new RegularDomain(); }

function PublicSuffixDomain(subPublics) { this.publics = subPublics || []; }
PublicSuffixDomain.prototype.isPublicSuffix = function() { return true; }
PublicSuffixDomain.prototype.get = function(sub) {
    return this.publics[sub] || new RegularDomain();
}

function WildcardPublicSuffixDomain(exceptions) {
    this.exceptions = exceptions || [];
}
WildcardPublicSuffixDomain.prototype = new PublicSuffixDomain();
WildcardPublicSuffixDomain.prototype.get = function(sub) {
    return this.exceptions[sub] || new PublicSuffixDomain();
}

function PublicSuffix(tree) {
    return {
        isPublicSuffix: function(domain) {
            var levels = domain.split('.');
            var currentLevel = tree;
            var result = true;
            while(result && levels.length != 0) {
                var level = levels.pop();
                currentLevel = currentLevel.get(level);
                result = currentLevel.isPublicSuffix();
            }
            return result;
        },
        getTopDomain: function(domain) {
            var levels = domain.split('.');
            var currentLevel = tree;
            var isPublicSuffix = true;
            var result = '';
            while(isPublicSuffix && levels.length != 0) {
                var level = levels.pop();
                currentLevel = currentLevel.get(level);
                isPublicSuffix = currentLevel.isPublicSuffix();
                result = level + (result? '.' + result : '' );
            }
            return result;
        },
        hasRealTopLevelDomain: function(domain) {
            var levels = domain.split('.');
            var tld = levels.pop();
            return tree.get(tld).isPublicSuffix();
        }
    }
}
function PublicSuffixFactory() {
    var fs = require('fs');
    var path = require('path');
    var relPath = '../etc/effective_tld_names.dat';
    var absPath = path.resolve(__dirname, relPath);
    var raw = fs.readFileSync(absPath, 'utf8');
    var parsed = parse(raw);
    var tree = generateTree(parsed);
    return PublicSuffix(tree);
}

exports.RegularDomain = RegularDomain;
exports.PublicSuffixDomain = PublicSuffixDomain;
exports.WildcardPublicSuffixDomain = WildcardPublicSuffixDomain;
exports.isComment = isComment;
exports.strip = strip;
exports.parse = parse;
exports.generateTree = generateTree;
exports.PublicSuffix = PublicSuffix;
exports.PublicSuffixFactory = PublicSuffixFactory;
