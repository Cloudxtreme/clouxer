/**
 * Created by Administrator on 04.09.2014.
 */
var http = require('http');
var net = require('net');
var fs = require('fs');
var stream = require('stream');
var db = require('./db.js');
var cluster = require('cluster');
var PublicSuffix = require('public-suffix');
var publicSuffix = PublicSuffix.PublicSuffixFactory();
var jade = require('jade');
var dns4 = require('dns');
var async = require('async');
var Throttle = require('throttle');
var crypto = require('crypto');
var geoip = require('geoip-lite');

//external cacher for dns records database responses
var mem = require('memcached');
var memcached = new mem('127.0.0.1:11211');

function main(){

    if (cluster.isMaster){
        var cpuCount = require('os').cpus().length;
        for (var i = 0; i < cpuCount; i += 1) {
            cluster.fork();
        }
        cluster.on('exit', function(worker, code, signal) {
            cluster.fork();
        });
    } else {
        //proxy server
        dns4.lookup(require('os').hostname(), function (err, add, fam) {
            clouxerProxyID = add;
            var proxyport = 80;
            var server = http.createServer(httpUserRequest).listen(proxyport);
            console.log('CLOUXER Proxy Server Listening :' + proxyport );
        });
    }
}

function httpUserRequest(userReq, userRes) {
    var httpVersion = userReq['httpVersion'];
    var host = userReq.headers['host'];
    if (host.endsWith('/')) { host = host.substr(0, host.length - 1); }
    if (host.startsWith("www.")) { host = host.substr(4, host.length - 4) }
    if (host.startsWith("http://")) { host = host.substr(7, host.length - 7) }
    var domain = publicSuffix.getTopDomain(host);
    var name = '@';
    if (domain != host) { name = host.split('.' + domain)[0]; }
    var path = getUrlPath(userReq.url);

    console.log("> "  + host + path + " IP: " + userReq.connection.remoteAddress);

    var ip_checker = new RegExp(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/);
    if (ip_checker.test(host)){
        userRes.writeHead(500, {'server': 'clouxer', 'Content-Type': 'text/html; charset=UTF-8'});
        jade.renderFile('proxy_views/error799.jade', { title: 'Error 799', host: host, userIP: userReq.connection.remoteAddress}, function(err, html) {
            userRes.end(html);
        });
    } else {
        getDomainData(domain, function(dom){
            if (dom == null) {
                userRes.writeHead(500, {'server': 'clouxer', 'Content-Type': 'text/html; charset=UTF-8'});
                jade.renderFile('proxy_views/727.jade', { title: 'Error 727', host: host, userIP: userReq.connection.remoteAddress}, function(err, html) {
                    userRes.end(html);
                });
            } else {
                if (dom['verify'] == true && dom['setup'] == 1) {
                    getARecord(name, domain, function(a){
                        if (a == null) {
                            getCNAMERecord(name, domain, function(cname){
                                if (cname == null) {
                                    userRes.writeHead(500, {'server': 'clouxer', 'Content-Type': 'text/html; charset=UTF-8'});
                                    jade.renderFile('proxy_views/728.jade', { title: 'Error 728', host: host, userIP: userReq.connection.remoteAddress}, function(err, html) {
                                        userRes.end(html);
                                    });
                                } else {
                                    if (domain == publicSuffix.getTopDomain(cname['value'])){
                                        userRes.writeHead(302, { 'Location': 'http://' + cname['value'] });
                                        userRes.end();
                                    } else {
                                        dns4.resolve4(cname['value'], function (err, addresses) {
                                            if (err) {
                                                userRes.writeHead(500, {'server': 'clouxer', 'Content-Type': 'text/html; charset=UTF-8'});
                                                jade.renderFile('proxy_views/729.jade', { title: 'Error 729', host: host, userIP: userReq.connection.remoteAddress}, function(err, html) {
                                                    userRes.end(html);
                                                });
                                            } else {
                                                if (dom['cache'] != 0 && checkStaticFileNameForCache(path) == true) {
                                                    //cacheden oku gönder..
                                                } else {
                                                    var rand = Math.floor((Math.random() * addresses.length));
                                                    cname['value-ip'] = addresses[rand];
                                                    startClouxer(userReq, userRes, host, path, domain, name, cname, dom);
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        } else {
                            var rand = Math.floor((Math.random() * a.length));
                            startClouxer(userReq, userRes, host, path, domain, name, a[rand], dom);
                        }
                    });
                } else {
                    userRes.writeHead(500, {'server': 'clouxer', 'Content-Type': 'text/html; charset=UTF-8'});
                    jade.renderFile('proxy_views/729.jade', { title: 'Error 729', host: host, userIP: userReq.connection.remoteAddress}, function(err, html) {
                        userRes.end(html);
                    });
                }
            }
        });
    }
}

function startClouxer(userReq, userRes, host, path, domain, name, rec, dom) {
    var cookieList = parseCookies(userReq);
    var cook = null;
    console.log(cookieList);

    if (typeof cookieList['_cxid'] != 'undefined' && cookieList['_cxid'] != null && cookieList['_cxid'] != '') {
        console.log('_cxid bulundu. Bişey yapmana gerek yok.');
        //base64 çöz, aes^3 çöz, çıkan veriye bak. bize ait mi ona bak, cookie deki ip adresi ile gönderenin ip adresi ilişkilimi onu çöz
        //console.log("cookie hazırlanıyor..");
        //cook = encrypt("CLOUXER-" + userReq.connection.remoteAddress + "-" + domain + "-" + (new Date).getTime() + "-no-" + 'xxyxyyyxx'.replace(/[xy]/g, function(c) { var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16); }) );
    } else {
        console.log('_cxid bulunamadı.');
        //not now.
    }

    startServe(userReq, userRes, host, path, domain, name, rec, dom, false, false, cook);
}

function startServe(userReq, userRes, host, path, domain, name, rec, dom, save, cached, cookie) {
    if (cached == true) {

    } else {
        var file = null;
        var randomFileName = null;
        var geo = geoip.lookup(userReq.connection.remoteAddress);
        var userIP = userReq.connection.remoteAddress;

        userReq.headers["cx-connecting-ip"] = userIP;
        userReq.headers["cx-connecting-country"] = geo['country'];
        userReq.headers["cx-connecting-region"] = geo['region'];
        userReq.headers["cx-connecting-city"] = geo['city'];

        var options = {
            'host': host,
            'port': 80,
            'hostname': rec['value-ip'] ? rec['value-ip'] : rec['value'],
            'method': userReq.method,
            'path': path,
            'agent': userReq.agent,
            'auth': userReq.auth,
            'headers': userReq.headers
        };

        var proxyReq = http.request(options);

        proxyReq.setTimeout(3000, function(){
            proxyReq.end();
            userRes.writeHead(500, {'server': 'clouxer', 'Content-Type': 'text/html; charset=UTF-8'});
            jade.renderFile('proxy_views/error721.jade', { title: 'Error 721', host: host, userIP: userIP }, function(err, html) {
                userRes.end(html);
            });
        });

        proxyReq.addListener('response', function (proxyRes) {
            delete proxyRes.headers["server"];
            delete proxyRes.headers["x-powered-by"];
            delete proxyRes.headers["x-powered-by-plesk"];
            proxyRes.headers["server"] = "clouxer";

            if (cookie != null) {
                if (typeof proxyRes.headers['set-cookie'] != "undefined") {

                } else {
                    proxyRes.headers["set-cookie"] = "_cxid=" + cookie;
                }
            }

            proxyRes.addListener('data', function(chunk) {
                userRes.write(chunk);
            });
            proxyRes.addListener('end', function() {
                userRes.end();
                if (file != null) {
                    memcached.set(clouxerProxyID + '-cache-file-' + host + path, { file: randomFileName, type: proxyRes.headers['content-type'] }, dom['cache'], function (err) { });
                    cacheMemoryForStaticFiles[host + path] = { timeout: dom['cache'], file: randomFileName, type: proxyRes.headers['content-type'] }
                }
            });
            proxyRes.addListener('error', function(err) {
                userRes.end();
            });

            if (proxyRes.statusCode == 404) {
                proxyReq.end();
                userRes.writeHead(404, {'server': 'clouxer', 'Content-Type': 'text/html; charset=UTF-8'});
                jade.renderFile('proxy_views/error404.jade', { title: 'Error 404', host: host, userIP: userIP }, function(err, html) {
                    userRes.end(html);
                });
            } else if (proxyRes.statusCode == 500) {
                proxyReq.end();
                userRes.writeHead(404, {'server': 'clouxer', 'Content-Type': 'text/html; charset=UTF-8'});
                jade.renderFile('proxy_views/error500.jade', { title: 'Error 500', host: host, userIP: userIP }, function(err, html) {
                    userRes.end(html);
                });
            } else if (proxyRes.statusCode == 503) {
                proxyReq.end();
                userRes.writeHead(404, {'server': 'clouxer', 'Content-Type': 'text/html; charset=UTF-8'});
                jade.renderFile('proxy_views/error503.jade', { title: 'Error 503', host: host, userIP: userIP }, function(err, html) {
                    userRes.end(html);
                });
            } else {
                userRes.writeHead(parseInt(proxyRes.statusCode), proxyRes.headers);

                if (save == true && userRes.statusCode != 304) {
                    randomFileName = 'xxxyxxyx-yxyxyxxx-yxyxyxxx-yyyxyxxx'.replace(/[xy]/g, function(c) { var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16); });
                    file = fs.createWriteStream('proxy_cache/' + randomFileName);
                    proxyRes.pipe(file);
                }
            }
        });

        proxyReq.addListener('error', function(err) {
            proxyReq.end();
            userRes.end();
        });

        userReq.addListener('data', function(chunk) {
            proxyReq.write(chunk);
        });

        userReq.addListener('end', function() {
            proxyReq.end();
        });

        userReq.addListener('error', function() {
            proxyReq.end();
            userRes.end();
        });
    }
}

main();

var getDomainData = function(domain, callback){
    memcached.get('domain-' + domain, function (err, data) {
        if (typeof data == 'undefined' || data == null) {
            db.domainlist.findOne({domain: domain}, function(err, dom){
                if (dom == null) {
                    memcached.set('domain-' + domain, '0', 60, function (err) { });
                    callback(null);
                } else {
                    memcached.set('domain-' + domain, dom, 60, function (err) { });
                    callback(dom);
                }
            });
        } else {
            if (data == '0') {
                callback(null);
            } else {
                callback(data);
            }
        }
    });
};

var getARecord = function(name, domain, callback){
    memcached.get('record-a-' + name + '.' + domain, function(err, data){
        if (typeof data == 'undefined' || data == null) {
            db.record_a.find({domain: domain, name: name, verify: true}, function(err, a){
                if (a.length == 0) {
                    memcached.set('record-a-' + name + '.' + domain, '0', 60, function (err) { });
                    callback(null);
                } else {
                    memcached.set('record-a-' + name + '.' + domain, a, 60, function (err) { });
                    callback(a);
                }
            });
        } else {
            if (data == '0') {
                callback(null);
            } else {
                callback(data);
            }
        }
    });
};

var getCNAMERecord = function(name, domain, callback){
    memcached.get('record-cname-' + name + '.' + domain, function(err, data){
        if (typeof data == 'undefined' || data == null) {
            db.record_cname.findOne({domain: domain, name: name, verify: true}, function(err, cname){
                if (cname == null) {
                    memcached.set('record-cname-' + name + '.' + domain, '0', 60, function (err) { });
                    callback(null);
                } else {
                    memcached.set('record-cname-' + name + '.' + domain, cname, 60, function (err) { });
                    callback(cname);
                }
            });
        } else {
            if (data == '0') {
                callback(null);
            } else {
                callback(data);
            }
        }
    });
};

String.prototype.startsWith = function(str) {return (this.match("^"+str)==str)};

String.prototype.trim = function(){return (this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, ""))};

String.prototype.endsWith = function(str) {return (this.match(str+"$")==str)};

function getUrlPath(url){
    result = /^[a-zA-Z]+:\/\/[^\/]+(\/.*)?$/.exec( url );
    if ( result ) {
        if ( result[1].length > 0 ) {
            url = result[1];
        } else {
            url = "/";
        }
    }
    return url;
}

function checkStaticFileNameForCache(path){
    var filename = path.split('/')[path.split('/').length - 1];
    if (filename.endsWith('.css') || filename.endsWith('.js') || filename.endsWith('.jpg') || filename.endsWith('.jpeg') || filename.endsWith('.gif') || filename.endsWith('.ico') || filename.endsWith('.png') || filename.endsWith('.bmp') || filename.endsWith('.swf') || filename.endsWith('.woff') || filename.endsWith('.ttf'))
    {
        return filename;
    } else {
        return false;
    }
}

function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = unescape(parts.join('='));
    });

    return list;
}

function encrypt(text){
    var cipher = crypto.createCipher('aes-256-cbc','d6F3Efeq');
    var crypted = cipher.update(text,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text){
    var decipher = crypto.createDecipher('aes-256-cbc','d6F3Efeq');
    var dec = decipher.update(text,'hex','utf8');
    dec += decipher.final('utf8');
    return dec;
}