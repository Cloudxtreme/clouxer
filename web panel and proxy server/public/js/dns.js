/**
 * Created by Administrator on 23.08.2014.
 */

$(function() {
    $('.dropdown-toggle').dropdown();
    $('#new_cname_record').hide();
    $('#new_mx_record').hide();
    $('#new_txt_record').hide();
    $('#new_spf_record').hide();
    $('#new_aaaa_record').hide();
    $('#new_ns_record').hide();
    $('#new_loc_record').hide();


    $("#new_a_type").on('focus', function () {

    }).change(function() {
        hideAllTabs();
        value = this.value;
        if (value == 'a') { hideAllTabs(); $('#new_a_record').show(); }
        if (value == 'cname') { hideAllTabs(); $('#new_cname_record').show(); }
        if (value == 'mx') { hideAllTabs(); $('#new_mx_record').show(); }
        if (value == 'txt') { hideAllTabs(); $('#new_txt_record').show(); }
        if (value == 'spf') { hideAllTabs(); $('#new_spf_record').show(); }
        if (value == 'aaaa') { hideAllTabs(); $('#new_aaaa_record').show(); }
        if (value == 'ns') { hideAllTabs(); $('#new_ns_record').show();}
        if (value == 'loc') { hideAllTabs(); $('#new_loc_record').show(); }
        $('#new_a_type').val('a');
    });

    $("#new_cname_type").on('focus', function () {

    }).change(function() {
        hideAllTabs();
        value = this.value;
        if (value == 'a') { hideAllTabs(); $('#new_a_record').show(); }
        if (value == 'cname') { hideAllTabs(); $('#new_cname_record').show(); }
        if (value == 'mx') { hideAllTabs(); $('#new_mx_record').show(); }
        if (value == 'txt') { hideAllTabs(); $('#new_txt_record').show(); }
        if (value == 'spf') { hideAllTabs(); $('#new_spf_record').show(); }
        if (value == 'aaaa') { hideAllTabs(); $('#new_aaaa_record').show(); }
        if (value == 'ns') { hideAllTabs(); $('#new_ns_record').show();}
        if (value == 'loc') { hideAllTabs(); $('#new_loc_record').show(); }
        $('#new_cname_type').val('cname');
    });

    $("#new_mx_type").on('focus', function () {

    }).change(function() {
        hideAllTabs();
        value = this.value;
        if (value == 'a') { hideAllTabs(); $('#new_a_record').show(); }
        if (value == 'cname') { hideAllTabs(); $('#new_cname_record').show(); }
        if (value == 'mx') { hideAllTabs(); $('#new_mx_record').show(); }
        if (value == 'txt') { hideAllTabs(); $('#new_txt_record').show(); }
        if (value == 'spf') { hideAllTabs(); $('#new_spf_record').show(); }
        if (value == 'aaaa') { hideAllTabs(); $('#new_aaaa_record').show(); }
        if (value == 'ns') { hideAllTabs(); $('#new_ns_record').show();}
        if (value == 'loc') { hideAllTabs(); $('#new_loc_record').show(); }
        $('#new_mx_type').val('mx');
    });

    $("#new_txt_type").on('focus', function () {

    }).change(function() {
        hideAllTabs();
        value = this.value;
        if (value == 'a') { hideAllTabs(); $('#new_a_record').show(); }
        if (value == 'cname') { hideAllTabs(); $('#new_cname_record').show(); }
        if (value == 'mx') { hideAllTabs(); $('#new_mx_record').show(); }
        if (value == 'txt') { hideAllTabs(); $('#new_txt_record').show(); }
        if (value == 'spf') { hideAllTabs(); $('#new_spf_record').show(); }
        if (value == 'aaaa') { hideAllTabs(); $('#new_aaaa_record').show(); }
        if (value == 'ns') { hideAllTabs(); $('#new_ns_record').show();}
        if (value == 'loc') { hideAllTabs(); $('#new_loc_record').show(); }
        $('#new_txt_type').val('txt');
    });

    $("#new_spf_type").on('focus', function () {

    }).change(function() {
        hideAllTabs();
        value = this.value;
        if (value == 'a') { hideAllTabs(); $('#new_a_record').show(); }
        if (value == 'cname') { hideAllTabs(); $('#new_cname_record').show(); }
        if (value == 'mx') { hideAllTabs(); $('#new_mx_record').show(); }
        if (value == 'txt') { hideAllTabs(); $('#new_txt_record').show(); }
        if (value == 'spf') { hideAllTabs(); $('#new_spf_record').show(); }
        if (value == 'aaaa') { hideAllTabs(); $('#new_aaaa_record').show(); }
        if (value == 'ns') { hideAllTabs(); $('#new_ns_record').show();}
        if (value == 'loc') { hideAllTabs(); $('#new_loc_record').show(); }
        $('#new_spf_type').val('spf');
    });

    $("#new_aaaa_type").on('focus', function () {

    }).change(function() {
        hideAllTabs();
        value = this.value;
        if (value == 'a') { hideAllTabs(); $('#new_a_record').show(); }
        if (value == 'cname') { hideAllTabs(); $('#new_cname_record').show(); }
        if (value == 'mx') { hideAllTabs(); $('#new_mx_record').show(); }
        if (value == 'txt') { hideAllTabs(); $('#new_txt_record').show(); }
        if (value == 'spf') { hideAllTabs(); $('#new_spf_record').show(); }
        if (value == 'aaaa') { hideAllTabs(); $('#new_aaaa_record').show(); }
        if (value == 'ns') { hideAllTabs(); $('#new_ns_record').show();}
        if (value == 'loc') { hideAllTabs(); $('#new_loc_record').show(); }
        $('#new_aaaa_type').val('aaaa');
    });

    $("#new_ns_type").on('focus', function () {

    }).change(function() {
        hideAllTabs();
        value = this.value;
        if (value == 'a') { hideAllTabs(); $('#new_a_record').show(); }
        if (value == 'cname') { hideAllTabs(); $('#new_cname_record').show(); }
        if (value == 'mx') { hideAllTabs(); $('#new_mx_record').show(); }
        if (value == 'txt') { hideAllTabs(); $('#new_txt_record').show(); }
        if (value == 'spf') { hideAllTabs(); $('#new_spf_record').show(); }
        if (value == 'aaaa') { hideAllTabs(); $('#new_aaaa_record').show(); }
        if (value == 'ns') { hideAllTabs(); $('#new_ns_record').show();}
        if (value == 'loc') { hideAllTabs(); $('#new_loc_record').show(); }
        $('#new_ns_type').val('ns');
    });

    $("#new_loc_type").on('focus', function () {

    }).change(function() {
        hideAllTabs();
        value = this.value;
        if (value == 'a') { hideAllTabs(); $('#new_a_record').show(); }
        if (value == 'cname') { hideAllTabs(); $('#new_cname_record').show(); }
        if (value == 'mx') { hideAllTabs(); $('#new_mx_record').show(); }
        if (value == 'txt') { hideAllTabs(); $('#new_txt_record').show(); }
        if (value == 'spf') { hideAllTabs(); $('#new_spf_record').show(); }
        if (value == 'aaaa') { hideAllTabs(); $('#new_aaaa_record').show(); }
        if (value == 'ns') { hideAllTabs(); $('#new_ns_record').show();}
        if (value == 'loc') { hideAllTabs(); $('#new_loc_record').show(); }
        $('#new_loc_type').val('loc');
    });


});

function getTypeSelect(sel) {
    var value = sel.value;
    if (value == 'a') { hideAllTabs(); $('#new_a_record').show(); }
    if (value == 'cname') { hideAllTabs(); $('#new_cname_record').show(); }
    if (value == 'mx') { hideAllTabs(); $('#new_mx_record').show(); }
    if (value == 'txt') { hideAllTabs(); $('#new_txt_record').show(); }
    if (value == 'spf') { hideAllTabs(); $('#new_spf_record').show(); }
    if (value == 'aaaa') { hideAllTabs(); $('#new_aaaa_record').show(); }
    if (value == 'ns') { hideAllTabs(); $('#new_ns_record').show();}
    if (value == 'srv') { alert('not yet'); }
    if (value == 'loc') { hideAllTabs(); $('#new_loc_record').show(); }
}
function hideAllTabs()
{
    $('#new_a_record').hide();
    $('#new_cname_record').hide();
    $('#new_mx_record').hide();
    $('#new_txt_record').hide();
    $('#new_spf_record').hide();
    $('#new_aaaa_record').hide();
    $('#new_ns_record').hide();
    $('#new_loc_record').hide();
}
function addARecord(){
    $("#new_a_add").attr("class", "btn btn-sm btn-success disabled");
    $('#new_a_name').prop('disabled', 'disabled');
    $('#new_a_value').prop('disabled', 'disabled');
    $('#new_a_ttl').prop('disabled', 'disabled');
    $('#new_a_type').prop('disabled', 'disabled');
    var xhr = new XMLHttpRequest();
        xhr.open("POST", "/record/a", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onload = function(){
        if (this.status == 200) {
            var json = JSON.parse(xhr.responseText);
            if (json['status'] == "error") {
                $("#alertzone").append('<div class="alert alert-danger alert-dismissable alert-message">'+
                    '<button type="button" class="close" ' +
                    'data-dismiss="alert" aria-hidden="true">' +
                    '&times;' +
                    '</button>' +
                    json['msg'] +
                    '</div>');

                window.setTimeout(function() { $(".alert-message").alert('close'); }, 2000);

            } else {
                var random = Math.floor((Math.random() * 9999999) + 1);
                //ekleme yapıcaksın.
                var box = '<div id="record_row_' + random + '" style="margin-top: 10px;" class="row">' +
                    '<div style="float: left; width: 100px; margin-top: 7px;">A</div>';
                if (json['name'] == '@') {
                    box += '<div style="float: left; margin-top: 7px; width: 300px;">' + json['domain'] + '</div>';
                } else {
                    box += '<div style="float: left; margin-top: 7px; width: 300px;">' + json['name'] + '.' + json['domain'] + '</div>';
                }
                box += '<div style="float: left; width: 230px;">'+
                        '<div style="float: left; margin-top: 7px;">points to</div>' +
                        '<div style="float: left; margin-top: 7px; width: 140px; margin-left: 10px;">' +json['value']  + '</div>' +
                    '</div>' +
                    '<div style="float: left; width: 90px; margin-top: 7px;">' + getTextTTLFromSec(json['ttl']) + '</div>' +

                    '<button id="rec_a_cloud_' + random + '" type="button" onclick="cloudARecord(\'' + random + '\',\'' + json["name"] + '\',\''+ json["value"] + '\')" style="float: left; margin-top: 2px;" class="btn btn-sm btn-danger">' +
                    '<span class="glyphicon glyphicon-cloud"></span>' +
                    '</button>' +

                    '<button id="rec_a_remove_' + random + '" onclick="removeARecord(\'' + random + '\',\'' + json["name"] + '\',\''+ json["value"] + '\')" type="button" style="float: right; margin-top: 2px;" class="btn btn-sm btn-danger">' +
                        '<span class="glyphicon glyphicon-remove"></span> Remove' +
                    '</button>' +
                '</div>';
                $("#recordtable").append(box);
                $('#new_a_name').val("");
                $('#new_a_value').val("");
            }

            $("#new_a_add").attr("class", "btn btn-sm btn-success");
            $('#new_a_name').prop('disabled', false);
            $('#new_a_value').prop('disabled', false);
            $('#new_a_ttl').prop('disabled', false);
            $('#new_a_type').prop('disabled', false);
        }
    };
    xhr.send('name=' + $('#new_a_name').val() + '&value=' + $('#new_a_value').val() + '&ttl=' + $("#new_a_ttl").val() + "&domain=" + domain);
}

function addCNAMERecord(){
    $("#new_cname_add").attr("class", "btn btn-sm btn-success disabled");
    $('#new_cname_name').prop('disabled', 'disabled');
    $('#new_cname_value').prop('disabled', 'disabled');
    $('#new_cname_ttl').prop('disabled', 'disabled');
    $('#new_cname_type').prop('disabled', 'disabled');
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/record/cname", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function(){
        if (this.status == 200) {
            var json = JSON.parse(xhr.responseText);
            if (json['status'] == "error") {
                $("#alertzone").append('<div class="alert alert-danger alert-dismissable alert-message">'+
                    '<button type="button" class="close" ' +
                    'data-dismiss="alert" aria-hidden="true">' +
                    '&times;' +
                    '</button>' +
                    json['msg'] +
                    '</div>');

                window.setTimeout(function() { $(".alert-message").alert('close'); }, 2000);

            } else {
                var random = Math.floor((Math.random() * 9999999) + 1);
                //ekleme yapıcaksın.
                var box = '<div id="record_row_' + random + '" style="margin-top: 10px;" class="row">' +
                    '<div style="float: left; width: 100px; margin-top: 7px;">CNAME</div>';
                if (json['name'] == '@') {
                    box += '<div style="float: left; margin-top: 7px; width: 300px;">' + json['domain'] + '</div>';
                } else {
                    box += '<div style="float: left; margin-top: 7px; width: 300px;">' + json['name'] + '.' + json['domain'] + '</div>';
                }
                box += '<div style="float: left; width: 230px;">'+
                    '<div style="float: left; margin-top: 7px;">is an alias of</div>' +
                    '<div style="float: left; margin-top: 7px; width: 140px; margin-left: 10px;">' + json['value']  + '</div>' +
                    '</div>' +
                    '<div style="float: left; width: 100px; margin-top: 7px;">' + getTextTTLFromSec(json['ttl']) + '</div>' +
                    '<button id="rec_cname_remove_' + random + '" onclick="removeCNAMERecord(\'' + random + '\',\'' + json["name"] + '\',\''+ json["value"] + '\')" type="button" style="float: right; margin-top: 2px;" class="btn btn-sm btn-danger">' +
                    '<span class="glyphicon glyphicon-remove"></span> Remove' +
                    '</button>' +
                    '</div>';
                $("#recordtable").append(box);
                $('#new_cname_name').val("");
                $('#new_cname_value').val("");
            }

            $("#new_cname_add").attr("class", "btn btn-sm btn-success");
            $('#new_cname_name').prop('disabled', false);
            $('#new_cname_value').prop('disabled', false);
            $('#new_cname_ttl').prop('disabled', false);
            $('#new_cname_type').prop('disabled', false);
        }
    };
    xhr.send('name=' + $('#new_cname_name').val() + '&value=' + $('#new_cname_value').val() + '&ttl=' + $("#new_cname_ttl").val() + "&domain=" + domain);
}
function addMXRecord(){
    $("#new_mx_add").attr("class", "btn btn-sm btn-success disabled");
    $('#new_mx_name').prop('disabled', 'disabled');
    $('#new_mx_value').prop('disabled', 'disabled');
    $('#new_mx_priority').prop('disabled', 'disabled');
    $('#new_mx_ttl').prop('disabled', 'disabled');
    $('#new_mx_type').prop('disabled', 'disabled');
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/record/mx", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function(){
        if (this.status == 200) {
            var json = JSON.parse(xhr.responseText);
            if (json['status'] == "error") {
                $("#alertzone").append('<div class="alert alert-danger alert-dismissable alert-message">'+
                    '<button type="button" class="close" ' +
                    'data-dismiss="alert" aria-hidden="true">' +
                    '&times;' +
                    '</button>' +
                    json['msg'] +
                    '</div>');

                window.setTimeout(function() { $(".alert-message").alert('close'); }, 2000);

            } else {
                var random = Math.floor((Math.random() * 9999999) + 1);
                //ekleme yapıcaksın.
                var box = '<div id="record_row_' + random + '" style="margin-top: 10px;" class="row">' +
                    '<div style="float: left; width: 100px; margin-top: 7px;">MX</div>';
                if (json['name'] == '@') {
                    box += '<div style="float: left; margin-top: 7px; width: 190px;">' + json['domain'] + '</div>';
                } else {
                    box += '<div style="float: left; margin-top: 7px; width: 190px;">' + json['name'] + '.' + json['domain'] + '</div>';
                }
                box += '<div style="float: left; width: 340px;">'+
                    '<div>'+
                        '<div style="float: left; margin-top: 7px;">mail handled by</div>' +
                        '<div style="float: left; width: 200px; margin-top: 7px; margin-left: 10px;">' + json['value']  + '</div>' +
                    '</div>'+

                    '<div>'+
                        '<div style="float: left; margin-top: 22px;">with priority </div>' +
                        '<div style="float: left; width: 100px; margin-top: 22px; margin-left: 38px;">' + json['priority']  + '</div>' +
                    '</div>'+

                    '</div>' +
                    '<div style="float: left; width: 100px; margin-top: 7px;">' + getTextTTLFromSec(json['ttl']) + '</div>' +
                    '<button id="rec_mx_remove_' + random + '" onclick="removeMXRecord(\'' + random + '\',\'' + json["name"] + '\',\''+ json["value"] + '\')" type="button" style="float: right; margin-top: 2px;" class="btn btn-sm btn-danger">' +
                    '<span class="glyphicon glyphicon-remove"></span> Remove' +
                    '</button>' +
                    '</div>';
                $("#recordtable").append(box);
                $('#new_mx_name').val("");
                $('#new_mx_value').val("");
                $('#new_mx_priority').val("");
            }

            $("#new_mx_add").attr("class", "btn btn-sm btn-success");
            $('#new_mx_name').prop('disabled', false);
            $('#new_mx_value').prop('disabled', false);
            $('#new_mx_priority').prop('disabled', false);
            $('#new_mx_ttl').prop('disabled', false);
            $('#new_mx_type').prop('disabled', false);
        }
    };
    xhr.send('name=' + $('#new_mx_name').val() + '&value=' + $('#new_mx_value').val() +'&priority=' + $('#new_mx_priority').val() + '&ttl=' + $("#new_mx_ttl").val() + "&domain=" + domain);
}

function addTXTRecord (){
    $("#new_txt_add").attr("class", "btn btn-sm btn-success disabled");
    $('#new_txt_name').prop('disabled', 'disabled');
    $('#new_txt_value').prop('disabled', 'disabled');
    $('#new_txt_ttl').prop('disabled', 'disabled');
    $('#new_txt_type').prop('disabled', 'disabled');
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/record/txt", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function(){
        if (this.status == 200) {
            var json = JSON.parse(xhr.responseText);
            if (json['status'] == "error") {
                $("#alertzone").append('<div class="alert alert-danger alert-dismissable alert-message">'+
                    '<button type="button" class="close" ' +
                    'data-dismiss="alert" aria-hidden="true">' +
                    '&times;' +
                    '</button>' +
                    json['msg'] +
                    '</div>');

                window.setTimeout(function() { $(".alert-message").alert('close'); }, 2000);

            } else {
                var random = Math.floor((Math.random() * 9999999) + 1);
                //ekleme yapıcaksın.
                var box = '<div id="record_row_' + random + '" style="margin-top: 10px;" class="row">' +
                    '<div style="float: left; width: 100px; margin-top: 7px;">TXT</div>';
                if (json['name'] == '@') {
                    box += '<div style="float: left; margin-top: 7px; width: 300px;">' + json['domain'] + '</div>';
                } else {
                    box += '<div style="float: left; margin-top: 7px; width: 300px;">' + json['name'] + '.' + json['domain'] + '</div>';
                }
                box += '<div style="float: left; width: 230px;">'+
                    '<div style="float: left; margin-top: 7px; width: 140px;">' +json['value']  + '</div>' +
                    '</div>' +
                    '<div style="float: left; width: 100px; margin-top: 7px;">' + getTextTTLFromSec(json['ttl']) + '</div>' +
                    '<button id="rec_txt_remove_' + random + '" onclick="removeTXTRecord(\'' + random + '\',\'' + json["name"] + '\',\''+ json["value"] + '\')" type="button" style="float: right; margin-top: 2px;" class="btn btn-sm btn-danger">' +
                    '<span class="glyphicon glyphicon-remove"></span> Remove' +
                    '</button>' +
                    '</div>';
                $("#recordtable").append(box);
                $('#new_txt_name').val("");
                $('#new_txt_value').val("");
            }

            $("#new_txt_add").attr("class", "btn btn-sm btn-success");
            $('#new_txt_name').prop('disabled', false);
            $('#new_txt_value').prop('disabled', false);
            $('#new_txt_ttl').prop('disabled', false);
            $('#new_txt_type').prop('disabled', false);
        }
    };
    xhr.send('name=' + $('#new_txt_name').val() + '&value=' + $('#new_txt_value').val() + '&ttl=' + $("#new_txt_ttl").val() + "&domain=" + domain);
}

function addSPFRecord(){
    $("#new_spf_add").attr("class", "btn btn-sm btn-success disabled");
    $('#new_spf_name').prop('disabled', 'disabled');
    $('#new_spf_value').prop('disabled', 'disabled');
    $('#new_spf_ttl').prop('disabled', 'disabled');
    $('#new_spf_type').prop('disabled', 'disabled');
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/record/spf", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function(){
        if (this.status == 200) {
            var json = JSON.parse(xhr.responseText);
            if (json['status'] == "error") {
                $("#alertzone").append('<div class="alert alert-danger alert-dismissable alert-message">'+
                    '<button type="button" class="close" ' +
                    'data-dismiss="alert" aria-hidden="true">' +
                    '&times;' +
                    '</button>' +
                    json['msg'] +
                    '</div>');

                window.setTimeout(function() { $(".alert-message").alert('close'); }, 2000);

            } else {
                var random = Math.floor((Math.random() * 9999999) + 1);
                //ekleme yapıcaksın.
                var box = '<div id="record_row_' + random + '" style="margin-top: 10px;" class="row">' +
                    '<div style="float: left; width: 100px; margin-top: 7px;">SPF</div>';
                if (json['name'] == '@') {
                    box += '<div style="float: left; margin-top: 7px; width: 300px;">' + json['domain'] + '</div>';
                } else {
                    box += '<div style="float: left; margin-top: 7px; width: 300px;">' + json['name'] + '.' + json['domain'] + '</div>';
                }
                box += '<div style="float: left; width: 230px;">'+
                    '<div style="float: left; margin-top: 7px; width: 140px;">' +json['value']  + '</div>' +
                    '</div>' +
                    '<div style="float: left; width: 100px; margin-top: 7px;">' + getTextTTLFromSec(json['ttl']) + '</div>' +
                    '<button id="rec_spf_remove_' + random + '" onclick="removeSPFRecord(\'' + random + '\',\'' + json["name"] + '\',\''+ json["value"] + '\')" type="button" style="float: right; margin-top: 2px;" class="btn btn-sm btn-danger">' +
                    '<span class="glyphicon glyphicon-remove"></span> Remove' +
                    '</button>' +
                    '</div>';
                $("#recordtable").append(box);
                $('#new_spf_name').val("");
                $('#new_spf_value').val("");
            }

            $("#new_spf_add").attr("class", "btn btn-sm btn-success");
            $('#new_spf_name').prop('disabled', false);
            $('#new_spf_value').prop('disabled', false);
            $('#new_spf_ttl').prop('disabled', false);
            $('#new_spf_type').prop('disabled', false);
        }
    };
    xhr.send('name=' + $('#new_spf_name').val() + '&value=' + $('#new_spf_value').val() + '&ttl=' + $("#new_spf_ttl").val() + "&domain=" + domain);

}

function addAAAARecord(){
    $("#new_aa_add").attr("class", "btn btn-sm btn-success disabled");
    $('#new_aaaa_name').prop('disabled', 'disabled');
    $('#new_aaaa_value').prop('disabled', 'disabled');
    $('#new_aaaa_ttl').prop('disabled', 'disabled');
    $('#new_aaaa_type').prop('disabled', 'disabled');
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/record/aaaa", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function(){
        if (this.status == 200) {
            var json = JSON.parse(xhr.responseText);
            if (json['status'] == "error") {
                $("#alertzone").append('<div class="alert alert-danger alert-dismissable alert-message">'+
                    '<button type="button" class="close" ' +
                    'data-dismiss="alert" aria-hidden="true">' +
                    '&times;' +
                    '</button>' +
                    json['msg'] +
                    '</div>');

                window.setTimeout(function() { $(".alert-message").alert('close'); }, 2000);

            } else {
                var random = Math.floor((Math.random() * 9999999) + 1);
                //ekleme yapıcaksın.
                var box = '<div id="record_row_' + random + '" style="margin-top: 10px;" class="row">' +
                    '<div style="float: left; width: 100px; margin-top: 7px;">AAAA</div>';
                if (json['name'] == '@') {
                    box += '<div style="float: left; margin-top: 7px; width: 300px;">' + json['domain'] + '</div>';
                } else {
                    box += '<div style="float: left; margin-top: 7px; width: 300px;">' + json['name'] + '.' + json['domain'] + '</div>';
                }
                box += '<div style="float: left; width: 230px;">'+
                    '<div style="float: left; margin-top: 7px;">points to</div>' +
                    '<div style="float: left; margin-top: 7px; width: 140px; margin-left: 10px;">' +json['value']  + '</div>' +
                    '</div>' +
                    '<div style="float: left; width: 90px; margin-top: 7px;">' + getTextTTLFromSec(json['ttl']) + '</div>' +


                    '<button id="rec_aaaa_cloud_' + random + '" type="button" onclick="cloudAAAARecord(\'' + random + '\',\'' + json["name"] + '\',\''+ json["value"] + '\')" style="float: left; margin-top: 2px;" class="btn btn-sm btn-danger">' +
                    '<span class="glyphicon glyphicon-cloud"></span>' +
                    '</button>' +

                    '<button id="rec_aaaa_remove_' + random + '" onclick="removeAAAARecord(\'' + random + '\',\'' + json["name"] + '\',\''+ json["value"] + '\')" type="button" style="float: right; margin-top: 2px;" class="btn btn-sm btn-danger">' +
                    '<span class="glyphicon glyphicon-remove"></span> Remove' +
                    '</button>' +
                    '</div>';
                $("#recordtable").append(box);
                $('#new_aaaa_name').val("");
                $('#new_aaaa_value').val("");
            }

            $("#new_aaaa_add").attr("class", "btn btn-sm btn-success");
            $('#new_aaaa_name').prop('disabled', false);
            $('#new_aaaa_value').prop('disabled', false);
            $('#new_aaaa_ttl').prop('disabled', false);
            $('#new_aaaa_type').prop('disabled', false);
        }
    };
    xhr.send('name=' + $('#new_aaaa_name').val() + '&value=' + $('#new_aaaa_value').val() + '&ttl=' + $("#new_aaaa_ttl").val() + "&domain=" + domain);
}

function addNSRecord(){
    $("#new_ns_add").attr("class", "btn btn-sm btn-success disabled");
    $('#new_ns_name').prop('disabled', 'disabled');
    $('#new_ns_value').prop('disabled', 'disabled');
    $('#new_ns_ttl').prop('disabled', 'disabled');
    $('#new_ns_type').prop('disabled', 'disabled');
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/record/ns", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function(){
        if (this.status == 200) {
            var json = JSON.parse(xhr.responseText);
            if (json['status'] == "error") {
                $("#alertzone").append('<div class="alert alert-danger alert-dismissable alert-message">'+
                    '<button type="button" class="close" ' +
                    'data-dismiss="alert" aria-hidden="true">' +
                    '&times;' +
                    '</button>' +
                    json['msg'] +
                    '</div>');

                window.setTimeout(function() { $(".alert-message").alert('close'); }, 2000);

            } else {
                var random = Math.floor((Math.random() * 9999999) + 1);
                //ekleme yapıcaksın.
                var box = '<div id="record_row_' + random + '" style="margin-top: 10px;" class="row">' +
                    '<div style="float: left; width: 100px; margin-top: 7px;">NS</div>';
                if (json['name'] == '@') {
                    box += '<div style="float: left; margin-top: 7px; width: 300px;">' + json['domain'] + '</div>';
                } else {
                    box += '<div style="float: left; margin-top: 7px; width: 300px;">' + json['name'] + '.' + json['domain'] + '</div>';
                }
                box += '<div style="float: left; width: 230px;">'+
                    '<div style="float: left; margin-top: 7px;">managed by</div>' +
                    '<div style="float: left; margin-top: 7px; width: 130px; margin-left: 10px;">' +json['value']  + '</div>' +
                    '</div>' +
                    '<div style="float: left; width: 100px; margin-top: 7px;">' + getTextTTLFromSec(json['ttl']) + '</div>' +
                    '<button id="rec_ns_remove_' + random + '" onclick="removeNSRecord(\'' + random + '\',\'' + json["name"] + '\',\''+ json["value"] + '\')" type="button" style="float: right; margin-top: 2px;" class="btn btn-sm btn-danger">' +
                    '<span class="glyphicon glyphicon-remove"></span> Remove' +
                    '</button>' +
                    '</div>';
                $("#recordtable").append(box);
                $('#new_ns_name').val("");
                $('#new_ns_value').val("");
            }

            $("#new_ns_add").attr("class", "btn btn-sm btn-success");
            $('#new_ns_name').prop('disabled', false);
            $('#new_ns_value').prop('disabled', false);
            $('#new_ns_ttl').prop('disabled', false);
            $('#new_ns_type').prop('disabled', false);
        }
    };
    xhr.send('name=' + $('#new_ns_name').val() + '&value=' + $('#new_ns_value').val() + '&ttl=' + $("#new_ns_ttl").val() + "&domain=" + domain);
}

function addLOCRecord (){
    $("#new_loc_add").attr("class", "btn btn-sm btn-success disabled");
    $('#new_loc_name').prop('disabled', 'disabled');
    $('#new_loc_value').prop('disabled', 'disabled');
    $('#new_loc_ttl').prop('disabled', 'disabled');
    $('#new_loc_type').prop('disabled', 'disabled');
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/record/loc", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function(){
        if (this.status == 200) {
            var json = JSON.parse(xhr.responseText);
            if (json['status'] == "error") {
                $("#alertzone").append('<div class="alert alert-danger alert-dismissable alert-message">'+
                    '<button type="button" class="close" ' +
                    'data-dismiss="alert" aria-hidden="true">' +
                    '&times;' +
                    '</button>' +
                    json['msg'] +
                    '</div>');

                window.setTimeout(function() { $(".alert-message").alert('close'); }, 2000);

            } else {
                var random = Math.floor((Math.random() * 9999999) + 1);
                //ekleme yapıcaksın.
                var box = '<div id="record_row_' + random + '" style="margin-top: 10px;" class="row">' +
                    '<div style="float: left; width: 100px; margin-top: 7px;">LOC</div>';
                if (json['name'] == '@') {
                    box += '<div style="float: left; margin-top: 7px; width: 300px;">' + json['domain'] + '</div>';
                } else {
                    box += '<div style="float: left; margin-top: 7px; width: 300px;">' + json['name'] + '.' + json['domain'] + '</div>';
                }
                box += '<div style="float: left; width: 230px;">'+
                    '<div style="float: left; margin-top: 7px; width: 140px;">' +json['value']  + '</div>' +
                    '</div>' +
                    '<div style="float: left; width: 100px; margin-top: 7px;">' + getTextTTLFromSec(json['ttl']) + '</div>' +
                    '<button id="rec_txt_remove_' + random + '" onclick="removeLOCRecord(\'' + random + '\',\'' + json["name"] + '\',\''+ json["value"] + '\')" type="button" style="float: right; margin-top: 2px;" class="btn btn-sm btn-danger">' +
                    '<span class="glyphicon glyphicon-remove"></span> Remove' +
                    '</button>' +
                    '</div>';
                $("#recordtable").append(box);
                $('#new_loc_name').val("");
                $('#new_loc_value').val("");
            }

            $("#new_loc_add").attr("class", "btn btn-sm btn-success");
            $('#new_loc_name').prop('disabled', false);
            $('#new_loc_value').prop('disabled', false);
            $('#new_loc_ttl').prop('disabled', false);
            $('#new_loc_type').prop('disabled', false);
        }
    };
    xhr.send('name=' + $('#new_loc_name').val() + '&value=' + $('#new_loc_value').val() + '&ttl=' + $("#new_loc_ttl").val() + "&domain=" + domain);
}

function removeARecord(randomid, name, value) {
    $("#rec_a_remove_" + randomid).attr("class", "btn btn-sm btn-danger disabled");
    $("#rec_a_cloud_" + randomid).attr("class", "btn btn-sm btn-danger disabled");

    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/record/a", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function(){
        if (this.status == 200) {
            var json = JSON.parse(xhr.responseText);
            if (json["status"] == "error") {
                $("#alertzone").append('<div class="alert alert-danger alert-dismissable alert-message">'+
                    '<button type="button" class="close" ' +
                    'data-dismiss="alert" aria-hidden="true">' +
                    '&times;' +
                    '</button>' +
                    json['msg'] +
                    '</div>');

                window.setTimeout(function() { $(".alert-message").alert('close'); }, 2000);

                $("#rec_a_remove_" + randomid).attr("class", "btn btn-sm btn-danger");
                $("#rec_a_cloud_" + randomid).attr("class", "btn btn-sm btn-danger");
            } else {
                $("#record_row_" + randomid).remove();
            }
        }
    };
    xhr.send('name=' + name + "&value=" + value + "&domain=" + domain);
}

function removeCNAMERecord(randomid, name, value) {
    $("#rec_cname_remove_" + randomid).attr("class", "btn btn-sm btn-danger disabled");
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/record/cname", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function(){
        if (this.status == 200) {
            var json = JSON.parse(xhr.responseText);
            if (json["status"] == "error") {
                $("#alertzone").append('<div class="alert alert-danger alert-dismissable alert-message">'+
                    '<button type="button" class="close" ' +
                    'data-dismiss="alert" aria-hidden="true">' +
                    '&times;' +
                    '</button>' +
                    json['msg'] +
                    '</div>');

                window.setTimeout(function() { $(".alert-message").alert('close'); }, 2000);

                $("#rec_cname_remove_" + randomid).attr("class", "btn btn-sm btn-danger");
            } else {
                $("#record_row_" + randomid).remove();
            }
        }
    };
    xhr.send('name=' + name + "&value=" + value + "&domain=" + domain);
}

function removeMXRecord(randomid, name, value) {
    $("#rec_mx_remove_" + randomid).attr("class", "btn btn-sm btn-danger disabled");
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/record/mx", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function(){
        if (this.status == 200) {
            var json = JSON.parse(xhr.responseText);
            if (json["status"] == "error") {
                $("#alertzone").append('<div class="alert alert-danger alert-dismissable alert-message">'+
                    '<button type="button" class="close" ' +
                    'data-dismiss="alert" aria-hidden="true">' +
                    '&times;' +
                    '</button>' +
                    json['msg'] +
                    '</div>');

                window.setTimeout(function() { $(".alert-message").alert('close'); }, 2000);
                $("#rec_mx_remove_" + randomid).attr("class", "btn btn-sm btn-danger");
            } else {
                $("#record_row_" + randomid).remove();
            }
        }
    };
    xhr.send('name=' + name + "&value=" + value + "&domain=" + domain);
}

function removeTXTRecord(randomid, name, value) {
    $("#rec_txt_remove_" + randomid).attr("class", "btn btn-sm btn-danger disabled");
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/record/txt", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function(){
        if (this.status == 200) {
            var json = JSON.parse(xhr.responseText);
            if (json["status"] == "error") {
                $("#alertzone").append('<div class="alert alert-danger alert-dismissable alert-message">'+
                    '<button type="button" class="close" ' +
                    'data-dismiss="alert" aria-hidden="true">' +
                    '&times;' +
                    '</button>' +
                    json['msg'] +
                    '</div>');

                window.setTimeout(function() { $(".alert-message").alert('close'); }, 2000);
                $("#rec_txt_remove_" + randomid).attr("class", "btn btn-sm btn-danger");
            } else {
                $("#record_row_" + randomid).remove();
            }
        }
    };
    xhr.send('name=' + name + "&value=" + value + "&domain=" + domain);
}

function removeSPFRecord(randomid, name, value) {
    $("#rec_spf_remove_" + randomid).attr("class", "btn btn-sm btn-danger disabled");
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/record/spf", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function(){
        if (this.status == 200) {
            var json = JSON.parse(xhr.responseText);
            if (json["status"] == "error") {
                $("#alertzone").append('<div class="alert alert-danger alert-dismissable alert-message">'+
                    '<button type="button" class="close" ' +
                    'data-dismiss="alert" aria-hidden="true">' +
                    '&times;' +
                    '</button>' +
                    json['msg'] +
                    '</div>');

                window.setTimeout(function() { $(".alert-message").alert('close'); }, 2000);
                $("#rec_spf_remove_" + randomid).attr("class", "btn btn-sm btn-danger");
            } else {
                $("#record_row_" + randomid).remove();
            }
        }
    };
    xhr.send('name=' + name + "&value=" + value + "&domain=" + domain);
}

function removeAAAARecord(randomid, name, value) {
    $("#rec_aaaa_remove_" + randomid).attr("class", "btn btn-sm btn-danger disabled");
    $("#rec_aaaa_cloud_" + randomid).attr("class", "btn btn-sm btn-danger disabled");
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/record/aaaa", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function(){
        if (this.status == 200) {
            var json = JSON.parse(xhr.responseText);
            if (json["status"] == "error") {
                $("#alertzone").append('<div class="alert alert-danger alert-dismissable alert-message">'+
                    '<button type="button" class="close" ' +
                    'data-dismiss="alert" aria-hidden="true">' +
                    '&times;' +
                    '</button>' +
                    json['msg'] +
                    '</div>');

                window.setTimeout(function() { $(".alert-message").alert('close'); }, 2000);
                $("#rec_aaaa_remove_" + randomid).attr("class", "btn btn-sm btn-danger");
                $("#rec_aaaa_cloud_" + randomid).attr("class", "btn btn-sm btn-danger");
            } else {
                $("#record_row_" + randomid).remove();
            }
        }
    };
    xhr.send('name=' + name + "&value=" + value + "&domain=" + domain);
}

function removeNSRecord(randomid, name, value) {
    $("#rec_ns_remove_" + randomid).attr("class", "btn btn-sm btn-danger disabled");
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/record/ns", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function(){
        if (this.status == 200) {
            var json = JSON.parse(xhr.responseText);
            if (json["status"] == "error") {
                $("#alertzone").append('<div class="alert alert-danger alert-dismissable alert-message">'+
                    '<button type="button" class="close" ' +
                    'data-dismiss="alert" aria-hidden="true">' +
                    '&times;' +
                    '</button>' +
                    json['msg'] +
                    '</div>');

                window.setTimeout(function() { $(".alert-message").alert('close'); }, 2000);
                $("#rec_ns_remove_" + randomid).attr("class", "btn btn-sm btn-danger");

            } else {
                $("#record_row_" + randomid).remove();
            }
        }
    };
    xhr.send('name=' + name + "&value=" + value + "&domain=" + domain);
}

function removeLOCRecord(randomid, name, value) {
    $("#rec_loc_remove_" + randomid).attr("class", "btn btn-sm btn-danger disabled");
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/record/loc", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function(){
        if (this.status == 200) {
            var json = JSON.parse(xhr.responseText);
            if (json["status"] == "error") {
                $("#alertzone").append('<div class="alert alert-danger alert-dismissable alert-message">'+
                    '<button type="button" class="close" ' +
                    'data-dismiss="alert" aria-hidden="true">' +
                    '&times;' +
                    '</button>' +
                    json['msg'] +
                    '</div>');

                window.setTimeout(function() { $(".alert-message").alert('close'); }, 2000);
                $("#rec_loc_remove_" + randomid).attr("class", "btn btn-sm btn-danger");

            } else {
                $("#record_row_" + randomid).remove();
            }
        }
    };
    xhr.send('name=' + name + "&value=" + value + "&domain=" + domain);
}

function cloudARecord(randomid, name, value) {
    $("#rec_a_remove_" + randomid).attr("class", "btn btn-sm btn-danger disabled");
    $("#rec_a_cloud_" + randomid).attr("class", "btn btn-sm btn-danger disabled");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/cloud/a", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function(){
        if (this.status == 200) {
            var json = JSON.parse(xhr.responseText);
            if (json["status"] == "error") {
                $("#alertzone").append('<div class="alert alert-danger alert-dismissable alert-message">'+
                    '<button type="button" class="close" ' +
                    'data-dismiss="alert" aria-hidden="true">' +
                    '&times;' +
                    '</button>' +
                    json['msg'] +
                    '</div>');

                window.setTimeout(function() { $(".alert-message").alert('close'); }, 2000);
            } else {
                //
                if (json['cloud'] == true) {
                    $("#rec_a_cloud_" + randomid).html('<span class="glyphicon glyphicon-cloud"></span>');
                } else {
                    $("#rec_a_cloud_" + randomid).html('<span class="glyphicon glyphicon-cloud-download"></span>');
                }
            }
            $("#rec_a_remove_" + randomid).attr("class", "btn btn-sm btn-danger");
            $("#rec_a_cloud_" + randomid).attr("class", "btn btn-sm btn-danger");
        }
    };
    xhr.send('name=' + name + "&value=" + value + "&domain=" + domain);
}

function cloudAAAARecord(randomid, name, value) {
    $("#rec_aaaa_remove_" + randomid).attr("class", "btn btn-sm btn-danger disabled");
    $("#rec_aaaa_cloud_" + randomid).attr("class", "btn btn-sm btn-danger disabled");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/cloud/aaaa", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function(){
        if (this.status == 200) {
            var json = JSON.parse(xhr.responseText);
            if (json["status"] == "error") {
                $("#alertzone").append('<div class="alert alert-danger alert-dismissable alert-message">'+
                    '<button type="button" class="close" ' +
                    'data-dismiss="alert" aria-hidden="true">' +
                    '&times;' +
                    '</button>' +
                    json['msg'] +
                    '</div>');

                window.setTimeout(function() { $(".alert-message").alert('close'); }, 2000);

            } else {
                //
                if (json['cloud'] == true) {
                    $("#rec_aaaa_cloud_" + randomid).html('<span class="glyphicon glyphicon-cloud"></span>');
                } else {
                    $("#rec_aaaa_cloud_" + randomid).html('<span class="glyphicon glyphicon-cloud-download"></span>');
                }
            }
            $("#rec_aaaa_remove_" + randomid).attr("class", "btn btn-sm btn-danger");
            $("#rec_aaaa_cloud_" + randomid).attr("class", "btn btn-sm btn-danger");
        }
    };
    xhr.send('name=' + name + "&value=" + value + "&domain=" + domain);
}

function getTextTTLFromSec(ttl) {
    ttl = parseInt(ttl);
    if (ttl == 60) {
        return "Automatic";
    } else if (ttl == 5*60) {
        return "5 mins";
    } else if (ttl == 10*60) {
        return "10 mins";
    } else if (ttl == 15*60) {
        return "15 mins";
    } else if (ttl == 30*60) {
        return "30 mins";
    } else if (ttl == 60*60) {
        return "1 hour";
    } else if (ttl == 2*60*60) {
        return "2 hours";
    } else if (ttl == 12*60*60) {
        return "12 hours";
    } else if (24*60*60) {
        return "1 day";
    } else {
        return "Automatic";
    }
}
