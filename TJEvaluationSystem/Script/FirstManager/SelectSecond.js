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
        { display: '用户名', name: 'MID', width: 150, align: 'center', frozen: true },
        { display: '部门', name: 'MDepartment', width: 250, align: 'center' },
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
    document.getElementById('MID').innerText = rowdata.MID;
    document.getElementById('MDepartment').innerText = rowdata.MDepartment;
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
