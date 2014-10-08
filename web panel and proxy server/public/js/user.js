/**
 * Created by Administrator on 23.08.2014.
 */
$("#alertbox").hide();
function addDomain(){
    if ($("#inp_add_domain").val() == "")
    {
        $("#inp_add_domain").focus();
        return;
    }
    else
    {
        $("#btn_add_domain").attr("class", "btn btn-success disabled");
        $("#btn_add_domain").html("Please wait..");
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/domain/" + encodeURIComponent($("#inp_add_domain").val()), true);
        xhr.onload = function () {
            if (this.status == 200) {
                var json = JSON.parse(xhr.responseText);

                if (json['status'] == "error") {
                    //$("#cxMessageBody").html(json['msg']);
                    //$("#btn_show_message").click();

                    $("#alertzone").append('<div class="alert alert-danger alert-dismissable alert-message">'+
                    '<button type="button" class="close" ' +
                    'data-dismiss="alert" aria-hidden="true">' +
                    '&times;' +
                    '</button>' +
                    json['msg'] +
                    '</div>');

                    window.setTimeout(function() { $(".alert-message").alert('close'); }, 10000);
                } else {
                    domcount++;

                    if (document.getElementById("nodomain")) {
                        document.getElementById("nodomain").remove();
                    }

                    $("#domain_list").append('<div id="domrow_'+json['domain']+'" class="row" style="height: 50px; margin: 10px; padding 10px; background-color:#FFF;">'+
                        '<div style="float: left; text-align: center; width: 250px; margin-top: 15px;">'+ json['domain'] +'</div>'+
                        '<div style="float: left; margin-top: 7px; width: 500px; text-align: center;">'+
                        '<button onClick="window.location = \'/dns/'+json['domain']+'\'" id="btn_install_'+json['domain']+'" type="button" class="btn btn-success">'+
                        '<span class="glyphicon glyphicon-chevron-right"></span> Continue installation'+
                        '</button>'+
                        '</div>'+
                        '<div class="btn-group" style="float:right; margin-top: 7px;">'+
                        '<button id="btn_dd_'+json['domain']+'" type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">'+
                        '<span data-bind="label">'+
                        '<span id="spn_dd_'+json['domain']+'" class="glyphicon glyphicon-wrench"></span>'+
                        '</span>&nbsp;&nbsp;<span class="caret"></span>'+
                        '</button>'+
                        '<ul class="dropdown-menu" role="menu">'+
                        '<li><a onClick="deleteDomain(\'' + json['domain'] + '\')" href="javascript:void(0)"><span class="glyphicon glyphicon-trash"></span> Delete domain</a></li>'+
                        '</ul>'+
                        '</div>'+
                        '</div>');
                }

                $("#btn_add_domain").attr("class", "btn btn-success");
                $("#btn_add_domain").html("<span class='glyphicon glyphicon-plus'></span> Add website");
                $("#inp_add_domain").val("");
                $("#nodomain").remove();
            }
        };
        xhr.send();
    }
}

function deleteDomain(domain) {
    document.getElementById("btn_dd_" + domain).className = "btn btn-default dropdown-toggle disabled";
    if (document.getElementById("btn_install_" + domain)) { document.getElementById("btn_install_" + domain).className = "btn btn-success disabled"; }
    if (document.getElementById("btn_check_" + domain)) { document.getElementById("btn_check_" + domain).className = "btn btn-info disabled"; }
    document.getElementById("spn_dd_" + domain).className = "glyphicon glyphicon-refresh";
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/domain/" + encodeURIComponent(domain), true);
    xhr.onload = function () {
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

                window.setTimeout(function() { $(".alert-message").alert('close'); }, 10000);

                document.getElementById("btn_dd_" + domain).className = "btn btn-default dropdown-toggle";
                document.getElementById("btn_install_" + domain).className = "btn btn-success";
                document.getElementById("spn_dd_" + domain).className = "glyphicon glyphicon-wrench";
            } else {
                document.getElementById("domrow_" + domain).remove();
                $("#domrow_" + domain).remove();
                domcount--;
                if (domcount == 0) {
                    $("#domain_list").append("<div id='nodomain'>Ops. You have no domain, add a domain for start use clouxer..</div>");
                }
            }
        }
    };
    xhr.send();
}

function checkNSDomain(domain) {
    document.getElementById("btn_check_" + domain).className = "btn btn-info disabled";
    document.getElementById("btn_check_" + domain).innerHTML = "<span class=\"glyphicon glyphicon-refresh\"></span>   Wait...";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/setup/checkns/" + encodeURIComponent(domain), true);
    xhr.onload = function () {
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

                window.setTimeout(function() { $(".alert-message").alert('close'); }, 5000);

            } else {
                window.location="/user";
            }

            document.getElementById("btn_check_" + domain).className = "btn btn-info";
            document.getElementById("btn_check_" + domain).innerHTML = "<span class=\"glyphicon glyphicon-refresh\"></span>   Check";
        }
    };
    xhr.send();
}

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
};
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = 0, len = this.length; i < len; i++) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
};