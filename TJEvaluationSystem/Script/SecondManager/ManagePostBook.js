var Evaluated = null;
var UserID = null;

//初始化
$(function () {
    
});

//显示被考评名单
function ShowUserList() {
    var users = document.getElementById("JsonData").value;
    if (users == null || users == "") {
        $.ligerDialog.warn('获取被考评人员数据失败!');
        return;
    }

    //显示被考评人
    userData = JSON2.parse(users);
    Evaluated = $("#UserListGrid").ligerGrid({
        columns: [
        { display: '工号', name: 'UiID', width: 100, align: 'center', frozen: true },
        { display: '姓名', name: 'UiName', width: 100, align: 'center' },
        { display: '性别', name: 'UiSex', width: 80, align: 'center' },
        { display: '部门', name: 'UiDepartment', width: 150, align: 'center' },
        { display: '手机', name: 'UiMobPhone', width: 120, align: 'center' },
        { display: 'Email', name: 'UiEmail', width: 150, align: 'center' },
        { display: '操作', isSort: false, width: 200, render: function (rowdata, rowindex, value) {
            var h = "";
            h += "<a href='javascript:ShowUserInfo(" + rowindex + ")'>用户详细信息</a> ";
            h += "<a href='javascript:ViewPostBook(" + rowindex + ")'>岗位责任书</a> ";
            return h;
        }
        }],
        usePager: true, pageSize: 10,
        data: userData,
        width: '100%', height: '98%'
    });
    $("#pageloading").hide();
}

//查看用户详细信息
function ShowUserInfo(rowid) {
    var rowdata = Evaluated.getSelectedRow(rowid);    //取得数据  
    if (rowdata == null || rowdata=="")
        return;
    document.getElementById('LID').innerText = rowdata.UiID;
    document.getElementById('LName').innerText = rowdata.UiName;
    document.getElementById('LSex').innerText = rowdata.UiSex;
    document.getElementById('LIdentityNum').innerText = rowdata.UiIdentityNum;
    document.getElementById('LDepartment').innerText = rowdata.UiDepartment;
    document.getElementById('LTelphone').innerText = rowdata.UiTelephone;
    document.getElementById('LPhone').innerText = rowdata.UiMobPhone;
    document.getElementById('LEmail').innerText = rowdata.UiEmail;
    document.getElementById('LAddress').innerText = rowdata.UiAddress;
    document.getElementById('LZipcode').innerText = rowdata.UiZipCode;
    $("#UserList").css("display", "none");
    $("#UserInfo").css("display", "block");
}

//查看岗位责任书
function ViewPostBook(rowid) {
    var rowdata = Evaluated.getSelectedRow(rowid);    //取得数据
    if (rowdata == null)
        return;
    //查找考核表
    UserID = rowdata.UiID;
    document.getElementById("JsonData").value = rowdata.UiID;
    document.getElementById("BGetPostBook").click();
}

//制作岗位责任书
function StartMakePostBook() {
    //
    $("#ShowUserList").css("display", "none");
    $("#PostBook").css("display", "block");
    $("#ShowPostBookBar").css("display", "none");
    $("#EditPostBookBar").css("display", "none");
    $("#MakePostBookBar").css("display", "block");
    $.ligerDialog.warn('尚未制作岗位责任书，请制作！');
    $(".ShowBook").css("display", "none");
    $(".EditBook").css("display", "block");
}