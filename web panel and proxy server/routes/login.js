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
        res.render('login', { title: 'Clouxer - Login' , error: false});
    }
};

exports.post = function(req, res){
    var s_email = req.session.email;
    if (s_email != '' && typeof s_email != 'undefined')
    {
        res.redirect('/user');
    }
    else {
        var email = req.body.email;
        var password = req.body.password;
        if (typeof email == 'undefined' || email == '' || typeof password == 'undefined' || password == '') {
            res.render('login', { title: 'Clouxer - Login', error : true, msg: "Fill all blanks" });
        } else {
            db.userlist.findOne({ email: email, password: crypto.createHash('md5').update(password).digest("hex") },function (err, doc) {
                if (doc == null) {
                    res.render('login', { title: 'Clouxer - Login', error : true, msg: "Wrong email or password" });
                } else {
                    req.session.email = email;
                    req.session.username = doc['username'];
                    req.session.time =(new Date).getTime();
                    res.redirect('/user');
                }
            });
        }
    }
};