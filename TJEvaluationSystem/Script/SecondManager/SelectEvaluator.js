function search() {
    document.getElementById("Submit").click();

}
var user = null;

function load_userinfo() {
    var s = document.getElementById("JsonData").value;
    var UsersData = JSON2.parse(s);

    user = $("#secondgrid").ligerGrid({
        columns: [
        { display: '用户名', name: 'EvID', width: 100, align: 'center', frozen: true },
        { display: '姓名', name: 'EvName', width: 80, align: 'center', frozen: true },
        { display: '性别', name: 'EvSex', width: 50, align: 'center', frozen: true },
        { display: '单位', name: 'EvUnit', width: 50, align: 'center', frozen: true },
        { display: '手机', name: 'EvMobPhone', width: 150, align: 'center' },
        { display: '电话', name: 'EvTelephone', width: 100, align: 'center', hide: 1 },
        { display: '电子邮件', name: 'EvEmail', width: 100, align: 'center' },
        { display: '地址', name: 'EvAddress', width: 150, align: 'center', hide: 1 },
        { display: '邮政编码', name: 'EvZipCode', width: 50, align: 'center', hide: 1 },
        { display: '', isSort: false, width: 200, render: function (rowdata, rowindex, value) {
            var h = "";
            h += "<a href='javascript:ShowDetail(" + rowindex + ")'>查看详细</a> ";
            h += "<a href='javascript:deleteRow(" + rowindex + ")'>删除</a> ";
            return h;
        }
        }],
        usePager: true, pageSize: 20,
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
    document.getElementById('LID').innerText = rowdata.EvID;
    document.getElementById('LName').innerText = rowdata.EvName;
    document.getElementById('LSex').innerText = rowdata.EvSex;
    document.getElementById('LUnit').innerText = rowdata.EvUnit;      
    document.getElementById('LMobPhone').innerText = rowdata.EvMobPhone;
    document.getElementById('LTelephone').innerText = rowdata.EvTelphone;
    document.getElementById('LEmail').innerText = rowdata.EvEmail;
    document.getElementById('LAddress').innerText = rowdata.EvAddress;
    document.getElementById('LZipCode').innerText = rowdata.EvZipCode;     
}


function deleteRow(rowid) {
    if (confirm('确定删除?')) {
        user.deleteRow(rowid);
        var User = user.getDeleted();
        var evaluatorinfo = JSON2.stringify(User);

        document.getElementById("UserID").value = evaluatorinfo;
        document.getElementById("Button2").click();
    }
}

function brower() {
    var s = document.getElementById("JsonData").value;
}

function dao() {
    document.getElementById("Button1").click();

}
