/**
 * Created by Administrator on 22.08.2014.
 */
var db = require('../db.js');

exports.index = function(req, res){
    var s_email = req.session.email;
    if (s_email != '' && typeof s_email != 'undefined')
    {
        res.redirect('/user');
    }
    else {
        res.render('index', { title: 'Clouxer - Home' });
    }
};

exports.test = function(req, res){
    console.log(req.headers);
};
