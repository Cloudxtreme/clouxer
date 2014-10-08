/**
 * Created by Administrator on 26.08.2014.
 */
var db = require('../db.js');
var request = require('request');
var whois = require('node-whois');

exports.next = function(req, res){
    var s_email = req.session.email;
    if (s_email != '' && typeof s_email != 'undefined')
    {
        //get domain
        var domain = req.params.domain;
        db.domainlist.findOne({email: s_email, domain: domain}, function(err, doc){
            if (doc != null) {
                if (doc['setup'] == 0) {
                        db.record_a.count({domain: domain, email: s_email}, function(err, alen){
                            db.record_cname.count({domain: domain, email: s_email}, function(err, cnamelen){
                                if (alen != 0 || cnamelen != 0) {
                                    db.domainlist.update({email: s_email, domain: domain},{$set: { setup: 1 }}, {}, function(err) {
                                        res.redirect('/user');
                                    });
                                } else {
                                    res.redirect('/dns/' + domain);
                                }
                            });
                        });
                } else {
                    res.redirect('/user');
                }
            } else {
                res.redirect('/user');
            }
        });
    }
    else {
        res.redirect('/');
    }
};

exports.checkns = function(req, res){
    var s_email = req.session.email;
    if (s_email != '' && typeof s_email != 'undefined')
    {
        var domain = req.params.domain;
        db.domainlist.findOne({email: s_email, domain: domain}, function(err, doc){
            if (doc != null) {
                if (doc['verify'] == false) {
                    //dns clouxer dns
                    db.nameserverlist.findOne({_id : doc['dns']}, function(errr, dnsdoc){
                        whois.lookup(domain, function(err, data) {
                            var ns1_checker = new RegExp(dnsdoc['ns1'].toLowerCase());
                            var ns2_checker = new RegExp(dnsdoc['ns2'].toLowerCase());

                            if (ns1_checker.test(data.toLowerCase()) && ns2_checker.test(data.toLowerCase())){
                                db.domainlist.update({email: s_email, domain: domain},{$set: { verify: true }}, {}, function(err) {

                                    db.record_a.update({email: s_email, domain: domain}, {$set: { verify: true }}, {multi: true}, function(err){});
                                    db.record_aaaa.update({email: s_email, domain: domain}, {$set: { verify: true }}, {multi: true}, function(err){});
                                    db.record_cname.update({email: s_email, domain: domain}, {$set: { verify: true }}, {multi: true}, function(err){});
                                    db.record_mx.update({email: s_email, domain: domain}, {$set: { verify: true }}, {multi: true}, function(err){});
                                    db.record_ns.update({email: s_email, domain: domain}, {$set: { verify: true }}, {multi: true}, function(err){});
                                    db.record_soa.update({email: s_email, domain: domain}, {$set: { verify: true }}, {multi: true}, function(err){});
                                    db.record_spf.update({email: s_email, domain: domain}, {$set: { verify: true }}, {multi: true}, function(err){});
                                    db.record_txt.update({email: s_email, domain: domain}, {$set: { verify: true }}, {multi: true}, function(err){});
                                    db.record_loc.update({email: s_email, domain: domain}, {$set: { verify: true }}, {multi: true}, function(err){});

                                    db.nameserverlist.update({_id: doc['dns']}, {$inc: { domcount: 1 }}, {}, function(err) {
                                        res.end(JSON.stringify({status: "ok"}));
                                    });
                                });
                            } else {
                                res.end(JSON.stringify({status: "error", msg: "Are you sure change your name servers to Clouxer name servers ? This process may take some time, try again later... "}));
                            }
                        });
                    });
                } else {
                    res.end(JSON.stringify({status: "error", msg: "Domain already verify"}));
                }
            } else {
                res.end(JSON.stringify({status: "error", msg: "You have not this domain."}));
            }
        });
    }
    else {
        res.end(JSON.stringify({status: "error", msg: "Session not found."}));
    }
};