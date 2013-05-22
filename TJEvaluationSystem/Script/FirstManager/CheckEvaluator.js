var Evaluated = null;
var data = null;
var DetailData = null;
var List = null;
function tanchuang() {
    var error = document.getElementById("Errors").value;
    alert(error);
    if (document.getElementById("Chose").value == "submit") {
        load_userinfo();
    }
}

function sendback() {
    if (window.confirm("确认退回？")) {
        document.getElementById("SendBack").click();
    }
    location = location;
}

function search() {
    document.getElementById("Search").click();
}

function load_summary() {
    var s = document.getElementById("JsonSummary").value;
    var summary = JSON2.parse(s);
    data = summary;
    Evaluated = $("#summarygrid").ligerGrid({
        columns: [
        { display: '部门', name: 'SDepartment', width: 120, align: 'center' },
        { display: '未审核', name: 'SUnpass', width: 100, align: 'center' },
        { display: '未制作', name: 'SUnmake', width: 100, align: 'center' },
        { display: '已审核', name: 'SPass', width: 100, align: 'center' },
        { display: '总数', name: 'SSum', width: 100, align: 'center'}],
        usePager: true, pageSize: 20,
        data: summary,
        width: '96%'
    });
}

function load_userinfo() {
    var s = document.getElementById("JsonData").value;
    var UsersData = JSON2.parse(s);
    data = UsersData;
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
        { display: '审核状态', name: 'Passed', width: 80, align: 'center' },
        { display: '审核意见', name: 'Comment', width: 200, align: 'left' },
        { display: '', isSort: false, width: 200, render: function (rowdata, rowindex, value) {
            var h = "";
            h += "<a href='javascript:ShowDetail(" + rowindex + ")'>查看详细</a> ";
            h += "<a href='javascript:Check(" + rowindex + ")'>审核考评人名单</a> ";
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

function Check(rowid) {
    var rowdata = Evaluated.getSelectedRow(rowid);    //取得数据
    if (rowdata.Passed == "未制作") {
        alert("考评人名单未制作！");
        return;
    }
    if (rowdata == null)
        return;
    document.getElementById("UserID").value = rowdata.UiID;
    document.getElementById("EvaComment").value = rowdata.Comment;
    document.getElementById("CheckUser").click();
    window.scroll(0, 500); //下滚
}

function showList1() {
    load_userinfo();

    var s3 = document.getElementById("JsonList").value;
    var UsersData3 = JSON2.parse(s3);
    List = $("#list").ligerGrid({
        checkbox: true,
        columns: [
        { display: '被考评人ID', name: 'EvaluatedID', width: 150, align: 'center', hide: true },
        { display: '考评人ID', name: 'UiID', width: 150, align: 'center', hide: true },
        { display: '被考评人姓名', name: 'EvaluatedName', width: 150, align: 'center', frozen: true },
        { display: '考评人姓名', name: 'EvaluatorName', width: 150, align: 'center' },
        { display: '考评人部门', name: 'EvaluatorUnit', width: 100, align: 'center' },
        { display: '身份', name: 'Relation', width: 80, align: 'center' },
        { display: '通过状态', name: 'Pass', width: 80, align: 'center', hide: true }
        ],
        usePager: true, pageSize: 10,
        data: UsersData3,
        width: '96%',
        selectRowButtonOnly: true,
        isChecked: f_isChecked
    });

    function f_isChecked(rowdata) {
        if (rowdata.Pass == 1)
            return true;
        return false;
    }

    $("#box2").css("display", "block");
    document.getElementById("pass_button").style.display = "";//显示提交按钮
    if (document.getElementById("pass").innerHTML == "未审核") {
        document.getElementById("comment_button").style.display = ""; //显示审核意见按钮
    }
    $("#list").ligerGetGridManager().loadData();
    window.scroll(0, 500);
}

function pass() {
    if (confirm('确认通过？')) {
        var array = List.getSelecteds();

        for (var index in array) {
            delete array[index].EvaluatedID;
            delete array[index].EvaluatedName;
            delete array[index].EvaluatorName;
            delete array[index].EvaluatorUnit;
            delete array[index].Relation;
        }

        var selectData = JSON2.stringify(array);
        document.getElementById("JsonChose").value = selectData;
        document.getElementById("PassList").click();
    }
}

function dao() {
    document.getElementById("Dao").click();
}

function comment() {
    var oldComment = document.getElementById("Comment").innerHTML.split("：")[1];
    if (oldComment) {
        var comment = prompt("请输入审核意见：（最多50字）", oldComment);
    }
    else {
        var comment = prompt("请输入审核意见：（最多50字）", "");
    }
    if (comment) {
        document.getElementById("EvaComment").value = comment.substring(0, 50);
        document.getElementById("WriteComment").click();
    }
}

function doneCommit() {
    alert("提交成功！");
    document.getElementById("search_button").click();
}