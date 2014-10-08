/**
 * Created by Administrator on 23.08.2014.
 */
var db = require('../db.js');
var whoisAvailable = require('whois-available');
var request = require('request');
var async = require('async');

exports.add = function(req, res){
    var s_email = req.session.email;
    if (s_email != '' && typeof s_email != 'undefined')
    {
        var domain = decodeURIComponent(req.params.domain).toLowerCase();
        if (domain.startsWith("www.")) { domain = domain.substr(4, domain.length - 4) }
        db.domainlist.count({email: s_email, domain: domain}, function(err, doc){
            if (doc == 0){
                whoisAvailable(domain, function(err, whoisResponse, isAvailable) {
                    if (err) {
                        res.end(JSON.stringify({status: "error", msg: "Please enter valid domain."}));
                    } else {
                        if (isAvailable == true){
                            res.end(JSON.stringify({status: "error", msg: "Domain name must be registered, try another domain."}));
                        } else {
                            //find ns records..
                            getFreeClouxerDNSID(domain, function(dnsid, dnsns1, dnsns2){
                                if (dnsid != null) {
                                    var d = new db.domainlist();
                                    d.email = s_email;
                                    d.domain = domain;
                                    d.dns = dnsid;
                                    d.reg_time = (new Date).getTime();
                                    d.verify = false;
                                    d.setup = 0;
                                    d.cache = 0;
                                    d.save(function(err){
                                        if (!err) {
                                            var dns1 = new db.record_ns();
                                            dns1.name = "@";
                                            dns1.value = dnsns1;
                                            dns1.ttl = 86400;
                                            dns1.email = s_email;
                                            dns1.domain = domain;
                                            dns1.verify = false;
                                            dns1.save(function(err) {});

                                            var dns2 = new db.record_ns();
                                            dns2.name = "@";
                                            dns2.value = dnsns2;
                                            dns2.ttl = 86400;
                                            dns2.email = s_email;
                                            dns2.domain = domain;
                                            dns2.verify = false;
                                            dns2.save(function(err) {});

                                            var soa = new db.record_soa();
                                            soa.name = "@";
                                            soa.ns = dnsns1;
                                            soa.mbox = "dns.clouxer.com";
                                            soa.serial = 2016090972;
                                            soa.refresh = 10000;
                                            soa.retry = 2400;
                                            soa.expire = 604800;
                                            soa.minttl = 3600;
                                            soa.ttl = 86400;
                                            soa.email = s_email;
                                            soa.domain = domain;
                                            soa.verify = false;
                                            soa.save(function(err) {});

                                            getARecords(domain, function(answer){
                                                var count = 0;
                                                async.whilst(
                                                    function () { return count < answer.length; },
                                                    function (callback) {
                                                        var rec = new db.record_a();
                                                        rec.name = "@";
                                                        rec.value = answer[count]['value'];
                                                        rec.ttl = answer[count]['ttl'];
                                                        rec.active = true;
                                                        rec.email = s_email;
                                                        rec.domain = domain;
                                                        rec.verify = false;
                                                        rec.save(function(err){ count++; callback(); });
                                                    }, function (err) {
                                                        res.end(JSON.stringify({status: "ok", domain: domain}));
                                                    }
                                                );
                                            });
                                        } else {
                                            res.end(JSON.stringify({status: "error", msg: "Database error, try again later."}));
                                        }
                                    })
                                } else {
                                    res.end(JSON.stringify({status: "error", msg: "Clouxer DNS Servers not active for new domains, try again later..."}));
                                }
                            });
                        }
                    }
                });
            } else {
                res.end(JSON.stringify({status: "error", msg: "You are already have this domain."}));
            }
        });
    }
    else {
        res.end(JSON.stringify({status: "error", msg: "Session not found."}));
    }
};

exports.delete = function(req, res) {
    var s_email = req.session.email;
    if (s_email != '' && typeof s_email != 'undefined')
    {
        var domain = decodeURIComponent(req.params.domain).toLowerCase();
        if (domain.startsWith("www.")) { domain = domain.substr(4, domain.length - 4) }
        db.domainlist.findOne({email: s_email, domain: domain}, function(err, doc){
            if (doc != null){
                if (doc['verify'] == true) {
                    db.nameserverlist.update({_id: doc['dns']}, {$inc: { domcount: -1 }}, {}, function(err) { });
                }
                db.domainlist.remove({email: s_email, domain:domain},function (err) {
                    if (!err) {
                        db.record_a.remove({email: s_email, domain:domain}, function (err) {
                            db.record_aaaa.remove({email: s_email, domain:domain}, function (err) {
                                db.record_cname.remove({email: s_email, domain:domain}, function (err) {
                                    db.record_mx.remove({email: s_email, domain:domain}, function (err) {
                                        db.record_ns.remove({email: s_email, domain:domain}, function (err) {
                                            db.record_soa.remove({email: s_email, domain:domain}, function (err) {
                                                db.record_spf.remove({email: s_email, domain:domain}, function (err) {
                                                    db.record_txt.remove({email: s_email, domain:domain}, function (err) {
                                                        db.record_loc.remove({email: s_email, domain:domain}, function (err) {
                                                            res.end(JSON.stringify({status: "ok", domain: domain}));
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    } else {
                        res.end(JSON.stringify({status: "error", msg: "Database error!! try again later."}));
                    }
                });
            } else {
                res.end(JSON.stringify({status: "error", msg: "You havent this domain."}));
            }
        });
    }
    else {
        res.end(JSON.stringify({status: "error", msg: "Session not found."}));
    }
};


var getARecords = function(domain, callback){
    request('http://www.dns-lg.com/nl01/' + domain + '/a', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);
            if (!json['code'] && json['answer'] != null) {
                var list = [];
                for (var i = 0; i<json['answer'].length; i++) {
                    var name = json['answer'][i]['name'].substr(0, json['answer'][i]['name'].length - 1); // remove last dot.
                    var value = json['answer'][i]['rdata'];
                    var ttl =  60;
                    var arec = { name: name, value: value, ttl: ttl };
                    list.push(arec);
                }
                callback(list);
            } else {
                callback([]);
            }
        } else {
            callback([]);
        }
    })
};

var getFreeClouxerDNSID = function(domain, callback) {
    db.domainlist.find({domain: domain}, function(err, doc){

        if (doc.length == 0) {
            db.nameserverlist.findOne({active: true})
                .sort('-reqcount')
                .exec(function(err, doc) {
                    if (err || doc == null ) {
                        callback(null, null, null)
                    } else {
                        callback(doc['_id'], doc['ns1'], doc['ns2']);
                    }
                });

        } else {
            var j = {};
            for (var i = 0;i< doc.length;i++) {
                j['$ne'] = doc[i]['dns'];
            }
            db.nameserverlist.findOne({'_id': j}, function(err, docx){
                if (docx == null) {
                    callback(null, null, null);
                } else {
                    callback(docx['_id'], docx['ns1'], docx['ns2']);
                }
            })
        }

    });
};

var getAAAARecords = function(domain, callback){
    request('http://www.dns-lg.com/nl01/' + domain + '/aaaa', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);
            if (!json['code']) {
                var list = [];
                for (var i = 0; i<json['answer'].length; i++) {
                    var name = json['answer'][i]['name'].substr(0, json['answer'][i]['name'].length - 1); // remove last dot.
                    var value = json['answer'][i]['rdata'];
                    var ttl =  60;
                    var arec = { name: name, value: value, ttl: ttl };
                    list.push(arec);
                }
                callback(list);
            } else {
                callback([]);
            }
        } else {
            callback([]);
        }
    })
};

var getNSRecords = function(domain, callback){
    request('http://www.dns-lg.com/nl01/' + domain + '/ns', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);
            if (!json['code']) {
                var list = [];
                for (var i = 0; i<json['answer'].length; i++) {
                    var name = json['answer'][i]['name'].substr(0, json['answer'][i]['name'].length - 1); // remove last dot.
                    var value = json['answer'][i]['rdata'].substr(0, json['answer'][i]['rdata'].length - 1); // remove last dot.
                    var ttl =  60;
                    var arec = { name: name, value: value, ttl: ttl };
                    list.push(arec);
                }
                callback(list);
            } else {
                callback([]);
            }
        } else {
            callback([]);
        }
    })
};

String.prototype.startsWith = function(str) {return (this.match("^"+str)==str)};

String.prototype.trim = function(){return (this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, ""))};

String.prototype.endsWith = function(str) {return (this.match(str+"$")==str)};