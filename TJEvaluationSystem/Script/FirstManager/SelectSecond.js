function search() {
    var s = document.getElementById("department").value;
    document.getElementById("Depart").value = s;
    document.getElementById("submit").click();

}
var user=null;

function load_userinfo() {
    var s = document.getElementById("JsonData").value;
    var UsersData = JSON2.parse(s);

    user = $("#secondgrid").ligerGrid({
        columns: [
        { display: '工号', name: 'UiID', width: 100, align: 'center', frozen: true },
        { display: '姓名', name: 'UiName', width: 100, align: 'center' },
        { display: '性别', name: 'UiSex', width: 80, align: 'center' },
        { display: '身份证号', name: 'UiIdentityNum', width: 100, align: 'center', hide: true },
        { display: '部门', name: 'UiDepartment', width: 150, align: 'center' },
        { display: '电话', name: 'UiTelephone', width: 70, align: 'center', hide: true },
        { display: '手机', name: 'UiMobPhone', width: 120, align: 'center' },
        { display: 'Email', name: 'UiEmail', width: 150, align: 'center' },
        { display: '地址', name: 'UiAddress', width: 120, align: 'center', hide: true },
        { display: '邮编', name: 'UiZipCode', width: 100, align: 'center', hide: true },
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
}


function deleteRow(rowid) 
{
    if (confirm('确定删除?'))
     {
        user.deleteRow(rowid);
        var User = user.getDeleted();
        var userinfo=JSON2.stringify(User);
        
         document.getElementById("UserID").value = userinfo;
         document.getElementById("Button2").click();
      }
}

function brower() 
{
    var s = document.getElementById("JsonData").value;
}

function dao() 
{
    document.getElementById("Button1").click();
   
}
