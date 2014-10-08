var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    reg_ip: String,
    reg_time: String,
    last_ip: String,
    last_time: String
});

var DomainSchema = new Schema({
    email: String,
    domain: String,
    dns: String,
    reg_time: String,
    verify: Boolean,
    setup: Number,
    cache: Number
});

var NameServerSchema = new Schema({
    ns1: String,
    ns2: String,
    ip1: String,
    ip2: String,
    active: Boolean,
    domcount: Number,
    reqcount: Number
});

var RecordASchema = new Schema({
    name: String,
    value: String,
    ttl: Number,
    active: Boolean,
    email: String,
    domain: String,
    verify: Boolean
});

var RecordAAAASchema = new Schema({
    name: String,
    value: String,
    ttl: Number,
    active: Boolean,
    email: String,
    domain: String,
    verify: Boolean
});

var RecordCNAMESchema = new Schema({
    name: String,
    value: String,
    ttl: Number,
    email: String,
    domain: String,
    verify: Boolean
});

var RecordMXSchema = new Schema({
    name: String,
    value: String,
    priority: Number,
    ttl: Number,
    email: String,
    domain: String,
    verify: Boolean
});

var RecordNSSchema = new Schema({
    name: String,
    value: String,
    ttl: Number,
    email: String,
    domain: String,
    verify: Boolean
});

var RecordSOASchema = new Schema({
    name: String,
    ns: String,
    mbox: String,
    serial: Number,
    refresh: Number,
    retry: Number,
    expire: Number,
    minttl: Number,
    ttl: Number,
    email: String,
    domain: String,
    verify: Boolean
});

var RecordSPFSchema = new Schema({
    name: String,
    value: String,
    ttl: Number,
    email: String,
    domain: String,
    verify: Boolean
});

var RecordTXTSchema = new Schema({
    name: String,
    value: String,
    ttl: Number,
    email: String,
    domain: String,
    verify: Boolean
});

var RecordLOCSchema = new Schema({
    name: String,
    value: String,
    ttl: Number,
    email: String,
    domain: String,
    verify: Boolean
});


exports.userlist = mongoose.model('userlist', UserSchema);
exports.domainlist = mongoose.model('domainlist', DomainSchema);
exports.nameserverlist = mongoose.model('nameserverlist', NameServerSchema);
exports.record_a = mongoose.model('record_a', RecordASchema);
exports.record_aaaa = mongoose.model('record_aaaa', RecordAAAASchema);
exports.record_cname = mongoose.model('record_cname', RecordCNAMESchema);
exports.record_mx = mongoose.model('record_mx', RecordMXSchema);
exports.record_ns = mongoose.model('record_ns', RecordNSSchema);
exports.record_soa = mongoose.model('record_soa', RecordSOASchema);
exports.record_spf = mongoose.model('record_spf', RecordSPFSchema);
exports.record_txt = mongoose.model('record_txt', RecordTXTSchema);
exports.record_loc = mongoose.model('record_loc', RecordLOCSchema);

mongoose.connect('mongodb://127.0.0.1/clouxer');
