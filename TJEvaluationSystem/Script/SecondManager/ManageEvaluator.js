var Evaluated = null;
var data = null;
var DetailData = null;
var Evaluator = null;
var List = null;
function tanchuang() {
    var error = document.getElementById("Errors").value;
    alert(error);
    if (document.getElementById("Chose").value == "submit") {
        load_userinfo();
    }
}

function search() {
    document.getElementById("SearchEvaluated").click();
}

function load_userinfo() {
    var s = document.getElementById("JsonData").value;
    var UsersData = JSON2.parse(s);

    Evaluated = $("#evaluatedgrid").ligerGrid({
        columns: [
        { display: '用户名', name: 'UiID', width: 80, align: 'center' },
        { display: '姓名', name: 'UiName', width: 50, align: 'center' },
        { display: '性别', name: 'UiSex', width: 30, align: 'center' },
        { display: '身份证号', name: 'UiIdentityNum', width: 100, align: 'center', hide: true },
        { display: '部门', name: 'UiDepartment', width: 50, align: 'center' },
        { display: '岗位（职务）', name: 'UiJob', width: 150, align: 'center', hide: true },
        { display: '电话', name: 'UiTelephone', width: 70, align: 'center', hide: true },
        { display: 'Email', name: 'UiEmail', width: 150, align: 'center', hide: true },
        { display: '手机', name: 'UiMobPhone', width: 100, align: 'center' },
        { display: '地址', name: 'UiAddress', width: 120, align: 'center', hide: true },
        { display: '邮编', name: 'UiZipCode', width: 0, align: 'lecenterft', hide: true },
        { display: '经费来源', name: 'UiFund', width: 50, align: 'center', hide: true },
        { display: '派遣性质', name: 'UiCharacter', width: 50, align: 'center' },
        { display: '派遣公司', name: 'UiCompany', width: 50, align: 'center' },
        { display: '考评开始时间', name: 'UiStartTime', width: 80, align: 'center' },
        { display: '考评结束时间', name: 'UiStopTime', width: 80, align: 'center' },
        { display: '审核意见', name: 'Comment', width: 200, align: 'left' },
        { display: '审核状态', name: 'Passed', width: 80, align: 'center' },
        { display: '', isSort: false, width: 200, render: function (rowdata, rowindex, value) {
            var h = "";
            h += "<a href='javascript:ShowDetail(" + rowindex + ")'>查看详细</a> ";
            h += "<a href='javascript:Make(" + rowindex + ")'>制作名单</a> ";
            h += "<a href='javascript:Check(" + rowindex + ")'>查看名单</a> ";
            return h;
        }
        }],
        usePager: true, pageSize: 20,
        data: UsersData,
        width: '96%'
    });




}

function ShowDetail(rowid) {
    var rowdata = Evaluated.getSelectedRow(rowid);    //取得数据  
    if (rowdata == null)
        return;
    DetailData = rowdata;
    //
    $("#evaluatedgrid").css("display", "none");

    $("#ShowDetailUserInfo").css("display", "block");
    // $("#UserInfo").css("display", "none");
    $(".DetailData").css("display", "block");
    // $(".AddData").css("display", "none");
    //设置显示与隐藏
    $(".ShowData").css("display", "block");
    //$(".EditData").css("display", "none");
    //设置显示值
    document.getElementById('LID').innerText = rowdata.UiID;
    document.getElementById('LName').innerText = rowdata.UiName;
    document.getElementById('LSex').innerText = rowdata.UiSex;
    document.getElementById('LIdentityNum').innerText = rowdata.UiIdentityNum;
    document.getElementById('LDepartment').innerText = rowdata.UiDepartment;
    document.getElementById('LJob').innerText = rowdata.UiJob;
    document.getElementById('LTelephone').innerText = rowdata.UiTelephone;
    document.getElementById('LEmail').innerText = rowdata.UiEmail;
    document.getElementById('LMobPhone').innerText = rowdata.UiMobPhone;
    document.getElementById('LAddress').innerText = rowdata.UiAddress;
    document.getElementById('LZipCode').innerText = rowdata.UiZipCode;
    document.getElementById('LFund').innerText = rowdata.UiFund;
    document.getElementById('LCharacter').innerText = rowdata.UiCharacter;
    document.getElementById('LCompany').innerText = rowdata.UiCompany;
    document.getElementById('LStartTime').innerText = rowdata.UiStartTime;
    document.getElementById('LStopTime').innerText = rowdata.UiStopTime;
}

function Make(rowid) {
    var rowdata = Evaluated.getSelectedRow(rowid);    //取得数据

    if (rowdata == null)
        return;

    document.getElementById("UserID").value = rowdata.UiID;
    document.getElementById("UserName").value = rowdata.UiName;

    document.getElementById("SearchUser").click();
}

function Check(rowid) {
    var rowdata = Evaluated.getSelectedRow(rowid);    //取得数据

    if (rowdata == null)
        return;
    document.getElementById("UserID").value = rowdata.UiID;
    document.getElementById("CheckUser").click();
}

function show_evaluator() {
    load_userinfo();
    var s2 = document.getElementById("JsonEvaluator").value;
    var UsersData2 = JSON2.parse(s2);

    Evaluator = $("#evaluator").ligerGrid({
        checkbox: true,
        columns: [
        { display: '用户名', name: 'EvID', width: 100, align: 'center', hide: true },
        { display: '姓名', name: 'EvName', width: 80, align: 'center' },
        { display: '性别', name: 'EvSex', width: 50, align: 'center' },
        { display: '单位', name: 'EvUnit', width: 50, align: 'center' },
        { display: '手机', name: 'EvMobPhone', width: 150, align: 'center', hide: true },
        { display: '电话', name: 'EvTelephone', width: 100, align: 'center', hide: true },
        { display: '电子邮件', name: 'EvEmail', width: 100, align: 'center', hide: true },
        { display: '地址', name: 'EvAddress', width: 150, align: 'center', hide: true },
        { display: '邮政编码', name: 'EvZipCode', width: 50, align: 'center', hide: true },
        { display: '_关系', name: 'Relation', width: 80, align: 'center', hide: true },
        { display: '关系', isSort: false, width: 250, render: function (rowdata, rowindex, value) {
            var h = "";
            h += '领导';
            h += '<input type="radio" id="RadioButton1' + rowindex + '" name="' + rowindex + '" value="领导">';
            h += ' 同事';
            h += '<input type="radio" id="RadioButton2' + rowindex + '" name="' + rowindex + '" value="同事">';
            h += ' 下属';
            h += '<input type="radio" id="RadioButton3' + rowindex + '" name="' + rowindex + '" value="下属">';
            h += ' 服务对象';
            h += '<input type="radio" id="RadioButton4' + rowindex + '" name="' + rowindex + '" value="服务对象">';
            return h;
        }
        }
        ],
        data: UsersData2,
        width: '96%'
    });
    $("#box").css("display", "block");
    document.getElementById("submit_button").style.display = "";
    var manager = $("#evaluator").ligerGetGridManager();
    manager.loadData();
    document.getElementById("LUserName").style.display = "";  //显示被考评人姓名
    window.scroll(0, 500);
}

function submitList() {
    var array = Evaluator.getSelecteds();
    if (array.length < 1) {
        alert("请选择考评人");
        return;
    }

    //删除无用数据
    for (var i = 0; i < array.length; i++) {
        delete array[i].EvName;
        delete array[i].EvSex;
        delete array[i].EvDepartment;
        delete array[i].EvTelephone;
        delete array[i].EvEmail;
        delete array[i].EvMobPhone;
        delete array[i].EvAddress;
        delete array[i].EvZipCode;
    }

    for (var i = 0; i < array.length; i++) {
        var buttons = document.getElementsByName(array[i].__index);
        for (var j = 0; j < buttons.length; j++) {
            if (buttons[j].checked == true) {
                array[i].Relation = buttons[j].value;
                break;
            }
            if (j == buttons.length) {
                alert("请确认所有考评人都选择了身份！");
                break;
            }
        }
    }
    var selectData = JSON2.stringify(array);
    document.getElementById("JsonChose").value = selectData;
    document.getElementById("Button1").click();
}


function showList() {
    load_userinfo();
    $("#box").css("display", "none");

    var s3 = document.getElementById("JsonList").value;
    var UsersData3 = JSON2.parse(s3);
    List = $("#list").ligerGrid({
        columns: [
        { display: '被考评人姓名', name: 'EvaluatedName', width: 150, align: 'center', frozen: true },
        { display: '考评人姓名', name: 'EvaluatorName', width: 150, align: 'center' },
        { display: '考评人部门', name: 'EvaluatorUnit', width: 100, align: 'center' },
        { display: '身份', name: 'Relation', width: 80, align: 'center' },
         { display: '撤销', isSort: false, width: 40, render: function (rowdata, rowindex, value) {
             var h = "";
             h += "<a href='javascript:deleteRow(" + rowindex + ")'>删除</a> ";
             return h;
         }
         }
        ],
        usePager: true, pageSize: 10,
        data: UsersData3,
        width: '96%'
    });

    $("#box2").css("display", "block");
    var manager = $("#list").ligerGetGridManager();
    manager.loadData();
    window.scroll(0, 500);
}


function deleteRow(rowid) {
    if (confirm('确定删除?')) {
        List.deleteRow(rowid);
        var User = List.getDeleted();
        var userinfo = JSON2.stringify(User);

        document.getElementById("ListDelete").value = userinfo;
        document.getElementById("Button2").click();
    }
}