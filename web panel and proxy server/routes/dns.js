/**
 * Created by Administrator on 23.08.2014.
 */
var db = require('../db.js');
exports.index = function(req, res){
    var s_email = req.session.email;
    if (s_email != '' && typeof s_email != 'undefined')
    {
        var domain = req.params.domain;
        db.domainlist.findOne({email: s_email, domain: domain}, function (err, doc) {
           if (!err) {
               if (doc != null) {
                   //current dns records will add..
                   //list of a records..
                   db.record_a.find({domain: domain, email: s_email}, function(err, adoc){
                        if (!err) {
                            db.record_cname.find({domain: domain, email: s_email}, function(err, cnamedoc){
                                if (!err) {
                                    db.record_mx.find({domain: domain, email: s_email}, function(err, mxdoc){
                                        if (!err) {
                                            db.record_txt.find({domain: domain, email: s_email}, function (err, txtdoc){
                                                if (!err) {
                                                    db.record_spf.find({domain: domain, email: s_email}, function (err, spfdoc){
                                                        if (!err) {
                                                            db.record_aaaa.find({domain: domain, email: s_email}, function(err, aaaadoc){
                                                                if (!err) {
                                                                    db.record_ns.find({domain: domain, email: s_email}, function(err, nsdoc){
                                                                        if (!err) {
                                                                            db.record_loc.find({domain: domain, email:s_email}, function(err, locdoc){
                                                                                if (!err) {
                                                                                    res.render('dns', { title: 'Clouxer - DNS', email: s_email, domain: domain, domaindata: doc, arecordlist: adoc, cnamerecordlist: cnamedoc, mxrecordlist: mxdoc, txtrecordlist: txtdoc, spfrecordlist: spfdoc, aaaarecordlist: aaaadoc, nsrecordlist: nsdoc, locrecordlist: locdoc });
                                                                                } else {
                                                                                    res.redirect('/');
                                                                                }
                                                                            });
                                                                        } else {
                                                                            res.redirect('/');
                                                                        }
                                                                    })
                                                                } else {
                                                                    res.redirect('/');
                                                                }
                                                            });
                                                        } else {
                                                            res.redirect('/');
                                                        }
                                                    });
                                                } else {
                                                    res.redirect('/');
                                                }
                                            });
                                        } else {
                                            res.redirect('/');
                                        }
                                    });
                                } else {
                                    res.redirect('/')
                                }
                            });
                        } else {
                            res.redirect('/');
                        }
                   });
               } else {
                   res.redirect('/');
               }
           } else {
               res.redirect('/');
           }
        });
    } else {
        res.redirect('/');
    }
};