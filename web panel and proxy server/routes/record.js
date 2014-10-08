/**
 * Created by Administrator on 23.08.2014.
 */
var db = require('../db.js');
exports.add = function(req, res){
    var s_email = req.session.email;
    if (s_email != '' && typeof s_email != 'undefined')
    {
        var type = req.params.type;
        if (type == "a") {
            var name = req.body.name;
            var value = req.body.value;
            var ttl = req.body.ttl;
            var domain = req.body.domain;

            db.domainlist.findOne({email: s_email, domain: domain}, function (err, doc){
                if (!err) {
                    if (doc != null) {
                        //name @ veya a-z0-9 içerebilir
                        //value ip omalıdır.
                        var ip_checker = new RegExp(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/);
                        var name_checker = new RegExp(/^[a-z0-9-_]+$/);
                        if (name == "@" || name_checker.test(name)) {
                            if (ip_checker.test(value)){
                                db.record_a.count({email: s_email, name: name, value: value, domain:domain}, function(err, doc5) {
                                    if (!err) {
                                        if (doc5 > 0) {
                                            res.end(JSON.stringify({status: "error", msg: "You already have this name with this value."}));
                                        } else {
                                            var rec = new db.record_a();
                                            rec.name = name;
                                            rec.value = value;
                                            rec.ttl = getSecFromFormTTL(ttl);
                                            rec.active = true;
                                            rec.email = s_email;
                                            rec.domain = domain;
                                            rec.verify = doc['verify'];
                                            rec.save(function(err){
                                               if (!err) {
                                                   res.end(JSON.stringify({status: "ok", name: name, value: value, ttl: getSecFromFormTTL(ttl), domain: domain}));
                                               } else {
                                                   res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                                               }
                                            });
                                        }
                                    } else {
                                        res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                                    }
                                });
                            } else {
                                res.end(JSON.stringify({status: "error", msg: "Invalid Value"}));
                            }
                        } else {
                            res.end(JSON.stringify({status: "error", msg: "Invalid Name"}));
                        }
                    } else {
                        res.end(JSON.stringify({status: "error", msg: "You have not this domain."}));
                    }
                } else {
                    res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                }
            })
        } else if (type == "aaaa"){
            var name = req.body.name;
            var value = req.body.value;
            var ttl = req.body.ttl;
            var domain = req.body.domain;

            db.domainlist.findOne({email: s_email, domain: domain}, function (err, doc){
                if (!err) {
                    if (doc != null) {
                        //name @ veya a-z0-9 içerebilir
                        //value ip omalıdır.
                        var ipv6_checker = new RegExp(/^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/);
                        var name_checker = new RegExp(/^[a-z0-9-_]+$/);
                        if (name == "@" || name_checker.test(name)) {
                            if (ipv6_checker.test(value)){
                                db.record_a.count({email: s_email, name: name, value: value, domain:domain}, function(err, doc5) {
                                    if (!err) {
                                        if (doc5 > 0) {
                                            res.end(JSON.stringify({status: "error", msg: "You already have this name with this value."}));
                                        } else {
                                            var rec = new db.record_aaaa();
                                            rec.name = name;
                                            rec.value = value;
                                            rec.ttl = getSecFromFormTTL(ttl);
                                            rec.active = true;
                                            rec.email = s_email;
                                            rec.domain = domain;
                                            rec.verify = doc['verify'];
                                            rec.save(function(err){
                                                if (!err) {
                                                    res.end(JSON.stringify({status: "ok", name: name, value: value, ttl: getSecFromFormTTL(ttl), domain: domain}));
                                                } else {
                                                    res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                                                }
                                            });
                                        }
                                    } else {
                                        res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                                    }
                                });
                            } else {
                                res.end(JSON.stringify({status: "error", msg: "Invalid Value"}));
                            }
                        } else {
                            res.end(JSON.stringify({status: "error", msg: "Invalid Name"}));
                        }
                    } else {
                        res.end(JSON.stringify({status: "error", msg: "You have not this domain."}));
                    }
                } else {
                    res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                }
            })
        } else if (type == "cname") {
            var name = req.body.name;
            var value = req.body.value;
            var ttl = req.body.ttl;
            var domain = req.body.domain;

            db.domainlist.findOne({email: s_email, domain: domain}, function (err, doc){
                if (!err) {
                    if (doc != null) {
                        //name @ veya a-z0-9 içerebilir
                        //value ip omalıdır.
                        var value_checker = new RegExp(/^([a-z0-9-.]+)[a-z0-9-]+[.][a-z]+$/); //domain + subdomain
                        var name_checker = new RegExp(/^[a-z0-9-_]+$/);
                        if (name == "@" || name_checker.test(name)) {
                            if (value_checker.test(value)){
                                db.record_a.count({email: s_email, name: name, domain:domain}, function(err, doc5) {
                                    if (!err) {
                                        db.record_aaaa.count({email: s_email, name:name, domain:domain}, function (err, doc6){
                                            if (!err) {
                                                db.record_cname.count({email: s_email, name: name, value: value, domain:domain}, function(err, doc7){
                                                    if (doc5 > 0 || doc6 > 0 || doc7 > 0) {
                                                        res.end(JSON.stringify({status: "error", msg: "You cannot add a CNAME record when there is already an A, AAAA, or CNAME record with the same 'name' value"}));
                                                    } else {
                                                        var rec = new db.record_cname();
                                                        rec.name = name;
                                                        rec.value = value;
                                                        rec.ttl = getSecFromFormTTL(ttl);
                                                        rec.email = s_email;
                                                        rec.domain = domain;
                                                        rec.verify = doc['verify'];
                                                        rec.save(function(err){
                                                            if (!err) {
                                                                res.end(JSON.stringify({status: "ok", name: name, value: value, ttl: getSecFromFormTTL(ttl), domain: domain}));
                                                            } else {
                                                                res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                                                            }
                                                        });
                                                    }
                                                });
                                            } else {
                                                res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                                            }
                                        });
                                    } else {
                                        res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                                    }
                                });
                            } else {
                                res.end(JSON.stringify({status: "error", msg: "Invalid Value"}));
                            }
                        } else {
                            res.end(JSON.stringify({status: "error", msg: "Invalid Name"}));
                        }
                    } else {
                        res.end(JSON.stringify({status: "error", msg: "You have not this domain."}));
                    }
                } else {
                    res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                }
            })
        } else if (type == "mx") {
            var name = req.body.name;
            var value = req.body.value;
            var priority = req.body.priority;
            var ttl = req.body.ttl;
            var domain = req.body.domain;

            db.domainlist.findOne({email: s_email, domain: domain}, function (err, doc){
                if (!err) {
                    if (doc != null) {
                        //name @ veya a-z0-9 içerebilir
                        //value ip omalıdır.
                        var value_checker = new RegExp(/^([a-z0-9-.]+)[a-z0-9-]+[.][a-z]+$/); //domain + subdomain
                        var name_checker = new RegExp(/^[a-z0-9-_]+$/);
                        var priority_checker = new RegExp(/^[0-9]+$/);
                        if (name == "@" || name_checker.test(name)) {
                            if (value_checker.test(value)){
                                if (priority_checker.test(priority)) {
                                    db.record_mx.count({email: s_email, name: name, value: value, domain: domain}, function(err, doc5) {
                                        if (!err) {
                                            if (doc5 > 0) {
                                                res.end(JSON.stringify({status: "error", msg: "You already have this name with this value."}));
                                            } else {
                                                var rec = new db.record_mx();
                                                rec.name = name;
                                                rec.value = value;
                                                rec.ttl = getSecFromFormTTL(ttl);
                                                rec.priority = priority;
                                                rec.email = s_email;
                                                rec.domain = domain;
                                                rec.verify = doc['verify'];
                                                rec.save(function(err){
                                                    if (!err) {
                                                        res.end(JSON.stringify({status: "ok", name: name, value: value, priority: priority, ttl: getSecFromFormTTL(ttl), domain: domain}));
                                                    } else {
                                                        res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                                                    }
                                                });
                                            }
                                        } else {
                                            res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                                        }
                                    });
                                } else {
                                    res.end(JSON.stringify({status: "error", msg: "Invalid Priority"}));
                                }
                            } else {
                                res.end(JSON.stringify({status: "error", msg: "Invalid Value"}));
                            }
                        } else {
                            res.end(JSON.stringify({status: "error", msg: "Invalid Name"}));
                        }
                    } else {
                        res.end(JSON.stringify({status: "error", msg: "You have not this domain."}));
                    }
                } else {
                    res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                }
            })
        } else if (type == "ns") {

            var name = req.body.name;
            var value = req.body.value;
            var ttl = req.body.ttl;
            var domain = req.body.domain;

            db.domainlist.findOne({email: s_email, domain: domain}, function (err, doc){
                if (!err) {
                    if (doc != null) {
                        //name @ veya a-z0-9 içerebilir
                        //value ip omalıdır.
                        var value_checker =  new RegExp(/^([a-z0-9-.]+)[a-z0-9-]+[.][a-z]+$/);
                        var name_checker = new RegExp(/^[a-z0-9-_]+$/);
                        if (name == "@") {
                            res.end(JSON.stringify({status: "error", msg: "Root level host names are not allowed for NS records."}));
                        } else {
                            if (name_checker.test(name)) {
                                if (value_checker.test(value)) {
                                    db.record_ns.count({email: s_email, name: name, value: value, domain:domain}, function(err, doc5) {
                                        if (!err) {
                                            if (doc5 > 0) {
                                                res.end(JSON.stringify({status: "error", msg: "You already have this name with this value."}));
                                            } else {
                                                var rec = new db.record_ns();
                                                rec.name = name;
                                                rec.value = value;
                                                rec.ttl = getSecFromFormTTL(ttl);
                                                rec.email = s_email;
                                                rec.domain = domain;
                                                rec.verify = doc['verify'];
                                                rec.save(function(err){
                                                    if (!err) {
                                                        res.end(JSON.stringify({status: "ok", name: name, value: value, ttl: getSecFromFormTTL(ttl), domain: domain}));
                                                    } else {
                                                        res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                                                    }
                                                });
                                            }
                                        } else {
                                            res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                                        }
                                    });
                                } else {
                                    res.end(JSON.stringify({status: "error", msg: "Invalid Value"}));
                                }
                            } else {
                                res.end(JSON.stringify({status: "error", msg: "Invalid Name"}));
                            }
                        }

                    } else {
                        res.end(JSON.stringify({status: "error", msg: "You have not this domain."}));
                    }
                } else {
                    res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                }
            })

        } else if (type == "spf") {
            var name = req.body.name;
            var value = req.body.value;
            var ttl = req.body.ttl;
            var domain = req.body.domain;

            db.domainlist.findOne({email: s_email, domain: domain}, function (err, doc){
                if (!err) {
                    if (doc != null) {
                        //name @ veya a-z0-9 içerebilir
                        //value ip omalıdır.
                        var name_checker = new RegExp(/^[a-z0-9-_]+$/);
                        if (name == "@" || name_checker.test(name))
                        {
                            db.record_spf.count({email: s_email, name: name, value: value, domain:domain}, function(err, doc5) {
                                if (!err) {
                                    if (doc5 > 0) {
                                        res.end(JSON.stringify({status: "error", msg: "You already have this name with this value."}));
                                    } else {
                                        var rec = new db.record_spf();
                                        rec.name = name;
                                        rec.value = value;
                                        rec.ttl = getSecFromFormTTL(ttl);
                                        rec.email = s_email;
                                        rec.domain = domain;
                                        rec.verify = doc['verify'];
                                        rec.save(function(err){
                                            if (!err) {
                                                res.end(JSON.stringify({status: "ok", name: name, value: value, ttl: getSecFromFormTTL(ttl), domain: domain}));
                                            } else {
                                                res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                                            }
                                        });
                                    }
                                } else {
                                    res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                                }
                            });
                        } else {
                            res.end(JSON.stringify({status: "error", msg: "Invalid Name"}));
                        }
                    } else {
                        res.end(JSON.stringify({status: "error", msg: "You have not this domain."}));
                    }
                } else {
                    res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                }
            })
        } else if (type == "txt") {

            var name = req.body.name;
            var value = req.body.value;
            var ttl = req.body.ttl;
            var domain = req.body.domain;

            db.domainlist.findOne({email: s_email, domain: domain}, function (err, doc) {
                if (!err) {
                    if (doc != null) {
                        //name @ veya a-z0-9 içerebilir
                        //value ip omalıdır.
                        var name_checker = new RegExp(/^[a-z0-9-_]+$/);
                        if (name == "@") {
                            res.end(JSON.stringify({status: "error", msg: "Record content cannot be empty."}));
                        } else {
                            if (name_checker.test(name)) {
                                db.record_txt.count({email: s_email, name: name, value: value, domain: domain}, function (err, doc5) {
                                    if (!err) {
                                        if (doc5 > 0) {
                                            res.end(JSON.stringify({status: "error", msg: "You already have this name with this value."}));
                                        } else {
                                            var rec = new db.record_txt();
                                            rec.name = name;
                                            rec.value = value;
                                            rec.ttl = getSecFromFormTTL(ttl);
                                            rec.email = s_email;
                                            rec.domain = domain;
                                            rec.verify = doc['verify'];
                                            rec.save(function (err) {
                                                if (!err) {
                                                    res.end(JSON.stringify({status: "ok", name: name, value: value, ttl: getSecFromFormTTL(ttl), domain: domain}));
                                                } else {
                                                    res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                                                }
                                            });
                                        }
                                    } else {
                                        res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                                    }
                                });
                            } else {
                                res.end(JSON.stringify({status: "error", msg: "Invalid Name"}));
                            }
                        }
                    } else {
                        res.end(JSON.stringify({status: "error", msg: "You have not this domain."}));
                    }
                } else {
                    res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                }
            })
        } else if (type == "loc"){

            var name = req.body.name;
            var value = req.body.value;
            var ttl = req.body.ttl;
            var domain = req.body.domain;

            db.domainlist.findOne({email: s_email, domain: domain}, function (err, doc) {
                if (!err) {
                    if (doc != null) {
                        //name @ veya a-z0-9 içerebilir
                        //value ip omalıdır.
                        var name_checker = new RegExp(/^[a-z0-9-_]+$/);
                        if (name == "@" || name_checker.test(name)) {
                            db.record_loc.count({email: s_email, name: name, value: value, domain: domain}, function (err, doc5) {
                                if (!err) {
                                    if (doc5 > 0) {
                                        res.end(JSON.stringify({status: "error", msg: "You already have this name with this value."}));
                                    } else {
                                        var rec = new db.record_loc();
                                        rec.name = name;
                                        rec.value = value;
                                        rec.ttl = getSecFromFormTTL(ttl);
                                        rec.email = s_email;
                                        rec.domain = domain;
                                        rec.verify = doc['verify'];
                                        rec.save(function (err) {
                                            if (!err) {
                                                res.end(JSON.stringify({status: "ok", name: name, value: value, ttl: getSecFromFormTTL(ttl), domain: domain}));
                                            } else {
                                                res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                                            }
                                        });
                                    }
                                } else {
                                    res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                                }
                            });
                        } else {
                            res.end(JSON.stringify({status: "error", msg: "Invalid Name"}));
                        }
                    } else {
                        res.end(JSON.stringify({status: "error", msg: "You have not this domain."}));
                    }
                } else {
                    res.end(JSON.stringify({status: "error", msg: "Database error !! Try again later.."}));
                }
            })

        } else {
            res.end(JSON.stringify({status: "error", msg: "Unknown record type"}));
        }
    } else {
        res.end(JSON.stringify({status: "error", msg: "Session not found."}));
    }
};

exports.remove = function(req, res) {
    var s_email = req.session.email;
    if (s_email != '' && typeof s_email != 'undefined') {
        var type = req.params.type;
        if (type == "a") {
            var name = req.body.name;
            var value = req.body.value;
            var domain = req.body.domain;
            db.domainlist.count({email: s_email, domain: domain}, function(err, doc){
                if (!err) {
                    if (doc > 0) {
                        db.record_a.remove({email: s_email, domain: domain, name: name, value: value}, function(err){
                            if (!err) {
                                res.end(JSON.stringify({status: "ok"}));
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
        } else if(type == "aaaa") {
            var name = req.body.name;
            var value = req.body.value;
            var domain = req.body.domain;
            db.domainlist.count({email: s_email, domain: domain}, function(err, doc){
                if (!err) {
                    if (doc > 0) {
                        db.record_aaaa.remove({email: s_email, domain: domain, name: name, value: value}, function(err){
                            if (!err) {
                                res.end(JSON.stringify({status: "ok"}));
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
        } else if (type == "cname") {
            var name = req.body.name;
            var value = req.body.value;
            var domain = req.body.domain;
            db.domainlist.count({email: s_email, domain: domain}, function(err, doc){
                if (!err) {
                    if (doc > 0) {
                        db.record_cname.remove({email: s_email, domain: domain, name: name, value: value}, function(err){
                            if (!err) {
                                res.end(JSON.stringify({status: "ok"}));
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
        } else if (type == "mx") {

            var name = req.body.name;
            var value = req.body.value;
            var domain = req.body.domain;
            db.domainlist.count({email: s_email, domain: domain}, function(err, doc){
                if (!err) {
                    if (doc > 0) {
                        db.record_mx.remove({email: s_email, domain: domain, name: name, value: value}, function(err){
                            if (!err) {
                                res.end(JSON.stringify({status: "ok"}));
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

        } else if (type == "ns") {
            var name = req.body.name;
            var value = req.body.value;
            var domain = req.body.domain;
            db.domainlist.count({email: s_email, domain: domain}, function(err, doc){
                if (!err) {
                    if (doc > 0) {
                        db.record_ns.remove({email: s_email, domain: domain, name: name, value: value}, function(err){
                            if (!err) {
                                res.end(JSON.stringify({status: "ok"}));
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
        } else if (type == "spf") {

            var name = req.body.name;
            var value = req.body.value;
            var domain = req.body.domain;
            db.domainlist.count({email: s_email, domain: domain}, function(err, doc){
                if (!err) {
                    if (doc > 0) {
                        db.record_spf.remove({email: s_email, domain: domain, name: name, value: value}, function(err){
                            if (!err) {
                                res.end(JSON.stringify({status: "ok"}));
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

        } else if (type == "txt") {

            var name = req.body.name;
            var value = req.body.value;
            var domain = req.body.domain;
            db.domainlist.count({email: s_email, domain: domain}, function (err, doc) {
                if (!err) {
                    if (doc > 0) {
                        db.record_txt.remove({email: s_email, domain: domain, name: name, value: value}, function (err) {
                            if (!err) {
                                res.end(JSON.stringify({status: "ok"}));
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
        } else if (type == "loc") {

            var name = req.body.name;
            var value = req.body.value;
            var domain = req.body.domain;
            db.domainlist.count({email: s_email, domain: domain}, function(err, doc){
                if (!err) {
                    if (doc > 0) {
                        db.record_loc.remove({email: s_email, domain: domain, name: name, value: value}, function(err){
                            if (!err) {
                                res.end(JSON.stringify({status: "ok"}));
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

function getSecFromFormTTL(ttl) {
    if (ttl == "auto") {
        return 60;
    } else if (ttl == "5m") {
        return 5*60;
    } else if (ttl == "10m") {
        return 10*60;
    } else if (ttl == "15m") {
        return 15*60
    } else if (ttl == "30m") {
        return 30*60;
    } else if (ttl == "1h") {
        return 60*60
    } else if (ttl == "2h") {
        return 2*60*60;
    } else if (ttl == "12h") {
        return 12*60*60;
    } else if (ttl == "24h") {
        return 24*60*60;
    } else {
        return 60;
    }
}