﻿function search() {
    document.getElementById("Submit").click();

}
var user = null;

function load_userinfo() {
    var s = document.getElementById("JsonData").value;
    var UsersData = JSON2.parse(s);

    user = $("#secondgrid").ligerGrid({
        columns: [
        { display: '用户名', name: 'UiID', width: 100, align: 'center', frozen: true },
        { display: '姓名', name: 'UiName', width: 80, align: 'center', frozen: true },
        { display: '性别', name: 'UiSex', width: 50, align: 'center', frozen: true },
        { display: '身份证号', name: 'UiIdentityNum', width: 150, align: 'center', frozen: true },
        { display: '部门', name: 'UiDepartment', width: 50, align: 'center', frozen: true },
        { display: '电话', name: 'UiTelephone', width: 100, align: 'center', frozen: true },
        { display: '电子邮件', name: 'UiEmail', width: 100, align: 'center', frozen: true },
        { display: '手机', name: 'UiMobPhone', width: 150, align: 'center', frozen: true },
        { display: '地址', name: 'UiAddress', width: 150, align: 'center', frozen: true },
        { display: '邮政编码', name: 'UiZipCode', width: 50, align: 'center', frozen: true },
        { display: '用户类型', name: 'UiType', width: 50, align: 'center', frozen: true },
        { display: '', isSort: false, width: 200, render: function (rowdata, rowindex, value) {
            var h = "";
            h += "<a href='javascript:ShowDetail(" + rowindex + ")'>查看详细</a> ";
            h += "<a href='javascript:deleteRow(" + rowindex + ")'>删除</a> ";
            return h;
        }
        }],
        usePager: true, pageSize: 10,
        data: UsersData,
        width: '96%'
    });
}

function ShowDetail(rowid) {
    var rowdata = user.getSelectedRow(rowid);    //取得数据  
    if (rowdata == null)
        return;
    DetailData = rowdata;
    //
    $("#secondgrid").css("display", "none");

    $("#ShowDetailUserInfo").css("display", "block");
    // $("#UserInfo").css("display", "none");
    $(".DetailData").css("display", "block");
    // $(".AddData").css("display", "none");
    //设置显示与隐藏
    $(".ShowData").css("display", "block");
    //$(".EditData").css("display", "none");
    //设置显示值
    document.getElementById('UiID').innerText = rowdata.UiID;
    document.getElementById('UiName').innerText = rowdata.UiName;
    document.getElementById('UiSex').innerText = rowdata.UiSex;
    document.getElementById('UiIdentityNum').innerText = rowdata.UiIdentityNum;
    document.getElementById('UiDepartment').innerText = rowdata.UiDepartment;
    document.getElementById('UiTelephone').innerText = rowdata.UiTelphone;
    document.getElementById('UiEmail').innerText = rowdata.UiEmail;
    document.getElementById('UiMobPhone').innerText = rowdata.UiMobPhone;
    document.getElementById('UiAddress').innerText = rowdata.UiAddress;
    document.getElementById('UiZipCode').innerText = rowdata.UiZipCode;
    document.getElementById('UiType').innerText = rowdata.UiType;
}


function deleteRow(rowid) {
    if (confirm('确定删除?')) {
        user.deleteRow(rowid);
        var User = user.getDeleted();
        var userinfo = JSON2.stringify(User);

        document.getElementById("UserID").value = userinfo;
        document.getElementById("Button2").click();
    }
}

function brower() {
    var s = document.getElementById("JsonData").value;
}

function dao() {
    document.getElementById("Button1").click();

}