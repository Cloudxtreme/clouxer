/**
 * Created by Administrator on 21.08.2014.
 */
var db = require('./db.js');
var express = require('express');
var connect = require('connect');

var http = require('http');
var path = require('path');
var app = express();
var cookie = require('cookie');
//var db = require('./db.js');
var Buffer = require('buffer').Buffer;
var stream = require('stream');

//app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(connect.favicon());
app.use(connect.logger('dev'));
app.use(connect.json());
app.use(connect.urlencoded());
app.use(connect.cookieParser());

var cookieParser = connect.cookieParser('dfljth8345345sfdg');
var sessionStore = new connect.middleware.session.MemoryStore();

app.use(connect.session({secret: 'dfljth8345345sfdg' ,store: sessionStore, cookie:{maxAge:10*60*60*60}}));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(connect.errorHandler());
}

var index = require('./routes/index');
var register = require('./routes/register');
var login = require('./routes/login');
var user = require('./routes/user');
var logout = require('./routes/logout');
var domain = require('./routes/domain');
var dns = require('./routes/dns');
var record = require('./routes/record');
var cloud = require('./routes/cloud');
var setup = require('./routes/setup');

//index
app.get('/', index.index);

//register
app.get('/register', register.index);
app.post('/register', register.post);

//login
app.get('/login', login.index);
app.post('/login', login.post);

//logout
app.get('/logout', logout.index);

//user
app.get('/user', user.index);

app.get('/test', index.test);

//user settings
app.get('/settings', user.settings);

//domain api
app.post('/domain/:domain', domain.add); //add domain
app.delete('/domain/:domain', domain.delete); //delete domain

//dns page
app.get('/dns/:domain', dns.index);

//next step for settings
app.get('/setup/next/:domain', setup.next);
app.get('/setup/checkns/:domain', setup.checkns);

//record api
app.post('/record/:type', record.add);
app.delete('/record/:type', record.remove);
app.post('/cloud/:type', cloud.change);

app.listen(8080);
console.log('Web Server Runing..');

//add dns server for testings..
var ns = new db.nameserverlist();
ns.ns1 = "simon.clouxer.com";
ns.ns2 = "tesla.clouxer.com";
ns.ip1 = "";
ns.ip2 = "";
ns.active = false;
ns.domcount = 0;
ns.reqcount = 0;
//ns.save(function(err){});