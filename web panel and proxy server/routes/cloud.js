/**
 * Created by Administrator on 25.08.2014.
 */
var db = require('../db.js');
exports.change = function(req, res) {
    var s_email = req.session.email;
    if (s_email != '' && typeof s_email != 'undefined') {
        var type = req.params.type;
        if (type == "a"){
            var name = req.body.name;
            var value = req.body.value;
            var domain = req.body.domain;
            db.domainlist.count({email: s_email, domain: domain}, function(err, doc){
                if (!err) {
                    if (doc > 0) {
                        db.record_a.findOne({email: s_email, domain: domain, name: name, value: value}, function(err, doc) {
                            if (!err) {
                                if (doc != null) {
                                    if (doc['active'] == true) {
                                        db.record_a.update({email: s_email, domain: domain, name: name, value: value},{$set: { active:false }}, {}, function(err) {
                                            if (!err) {
                                                res.end(JSON.stringify({status: "ok", cloud: false}));
                                            } else {
                                                res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                                            }
                                        });
                                    } else {
                                        db.record_a.update({email: s_email, domain: domain, name: name, value: value},{$set: { active:true }}, {}, function(err) {
                                            if (!err) {
                                                res.end(JSON.stringify({status: "ok", cloud: true}));
                                            } else {
                                                res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                                            }
                                        });
                                    }
                                } else {
                                    res.end(JSON.stringify({status: "error", msg: "Unknown record"}));
                                }
                            } else {
                                res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                            }
                        });
                    } else {
                        res.end(JSON.stringify({status: "error", msg: "Unknown domain"}));
                    }
                } else {
                    res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                }
            });
        } else if (type == "aaaa") {
            var name = req.body.name;
            var value = req.body.value;
            var domain = req.body.domain;
            db.domainlist.count({email: s_email, domain: domain}, function(err, doc){
                if (!err) {
                    if (doc > 0) {
                        db.record_aaaa.findOne({email: s_email, domain: domain, name: name, value: value}, function(err, doc) {
                            if (!err) {
                                if (doc != null) {
                                    if (doc['active'] == true) {
                                        db.record_aaaa.update({email: s_email, domain: domain, name: name, value: value},{$set: { active:false }}, {}, function(err) {
                                            if (!err) {
                                                res.end(JSON.stringify({status: "ok", cloud: false}));
                                            } else {
                                                res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                                            }
                                        });
                                    } else {
                                        db.record_aaaa.update({email: s_email, domain: domain, name: name, value: value},{$set: { active:true }}, {}, function(err) {
                                            if (!err) {
                                                res.end(JSON.stringify({status: "ok", cloud: true}));
                                            } else {
                                                res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                                            }
                                        });
                                    }
                                } else {
                                    res.end(JSON.stringify({status: "error", msg: "Unknown record"}));
                                }
                            } else {
                                res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                            }
                        });
                    } else {
                        res.end(JSON.stringify({status: "error", msg: "Unknown domain"}));
                    }
                } else {
                    res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                }
            });
        } else {
            res.end(JSON.stringify({status: "error", msg: "Unknown record type"}));
        }
    } else {
        res.end(JSON.stringify({status: "error", msg: "Session not found."}));
    }
};