/**
 * Created by Administrator on 23.08.2014.
 */
var db = require('../db.js');
var async = require('async');
exports.index = function(req, res){
    var s_email = req.session.email;
    if (s_email != '' && typeof s_email != 'undefined')
    {
        //find domains and domain's states
        db.domainlist.find({email: s_email}, function(err, doc){
            var count = 0;
            var nslist = [];
            async.whilst(
                function () { return count < doc.length; },
                function (callback) {
                    db.nameserverlist.findOne({_id: doc[count]['dns']}, function(err, nsdoc){
                        nslist.push({ns1: nsdoc['ns1'], ns2: nsdoc['ns2']});
                        count++;
                        callback();
                    });
                },
                function (err) {
                    res.render('user', { title: 'Clouxer - User', email: s_email, domainlist: doc, nslist: nslist });
                }
            );
        });
    }
    else {
        res.redirect('/');
    }
};


exports.settings = function(req, res){
    var s_email = req.session.email;
    if (s_email != '' && typeof s_email != 'undefined')
    {
        res.render('settings', { title: 'Clouxer - Settings', email: s_email });
    }
    else {
        res.redirect('/');
    }
};