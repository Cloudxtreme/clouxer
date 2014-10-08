/**
 * Created by Administrator on 22.08.2014.
 */
var db = require('../db.js');
var crypto = require('crypto');

exports.index = function(req, res){
    var s_email = req.session.email;
    if (s_email != '' && typeof s_email != 'undefined')
    {
        res.redirect('/user');
    }
    else {
        res.render('register', { title: 'Clouxer - Register', error: false });
    }
};

exports.post = function(req, res){
    var s_email = req.session.email;
    if (s_email != '' && typeof s_email != 'undefined')
    {
        res.redirect('/user');
    }
    else {
        var username = req.body.username;
        var email1 = req.body.email1;
        var email2 = req.body.email2;
        var password1 = req.body.password1;
        var password2 = req.body.password2;
        var tos = req.body.tos;

        if (typeof username == 'undefined' || username == '' || typeof email1 == 'undefined' || email1 == '' || typeof email2 == 'undefined' || email2 == '' || typeof password1 == 'undefined' || password2 == '')
        {
            res.render('register', { title: 'Clouxer - Register', error: false, msg: "Fill all blanks" });
        }
        else
        {
            var mail_checker = new RegExp(/^[a-z]{1}[\d\w\.-]+@[\d\w-]{3,}\.[\w]{2,3}(\.\w{2})?$/);
            var name_checker = new RegExp(/^[a-z0-9_-]{6,15}$/);
            if (mail_checker.test(email1)) {
                if (email1 == email2) {
                    if (name_checker.test(username)) {
                        if (password1.length > 6) {
                            if (password1 == password2) {
                                if (tos == "on") {
                                    db.userlist.count({ $or: [{email: email1}, {username: username}] },function (err, doc) {
                                        if (!err) {
                                            if (doc > 0) {
                                                res.render('register', { title: 'Clouxer - Register', error: true, msg: "Email or username already registered" });
                                            } else {
                                                var user = new db.userlist();
                                                user.username = username;
                                                user.email = email1;
                                                user.password = crypto.createHash('md5').update(password1).digest("hex");
                                                user.reg_ip = req.connection.remoteAddress;
                                                user.reg_time = (new Date).getTime();
                                                user.last_ip =  req.connection.remoteAddress;
                                                user.last_time = (new Date).getTime();
                                                user.save(function (err) {
                                                    if (!err) {
                                                        req.session.email = email1;
                                                        req.session.username = username;
                                                        req.session.time =(new Date).getTime();
                                                        res.redirect('/user');
                                                    } else {
                                                        res.render('register', { title: 'Clouxer - Register', error: true, msg: "Database error !! Try again later.." });
                                                    }
                                                });
                                            }
                                        } else {
                                            res.render('register', { title: 'Clouxer - Register', error: true, msg: "Database error !! Try again later.." });
                                        }
                                    });
                                } else {
                                    res.render('register', { title: 'Clouxer - Register', error: true, msg: "You must accept tos" });
                                }
                            } else {
                                res.render('register', { title: 'Clouxer - Register', error: true, msg: "Password is not match" });
                            }
                        } else {
                            res.render('register', { title: 'Clouxer - Register', error: true, msg: "Password is too low" });
                        }
                    } else {
                        res.render('register', { title: 'Clouxer - Register', error: true, msg: "Username must be a-z0-9_-[6-15]" });
                    }
                } else {
                    res.render('register', { title: 'Clouxer - Register', error: true, msg: "Email not match" });
                }
            } else {
                res.render('register', { title: 'Clouxer - Register', error: true, msg: "Please enter valid email" });
            }
        }
    }
};

