var Evaluated = null;
var data = null;
var DetailData = null;
var Evaluator = null;
var List = null;
function tanchuang() 
{
    var error = document.getElementById("Errors").value;
    alert(error);
    if (document.getElementById("Chose").value == "submit") {
        load_userinfo();
    }
}

function search()
 {
    document.getElementById("SearchEvaluated").click();
}

function load_userinfo() 
{
    var s = document.getElementById("JsonData").value;
    var UsersData = JSON2.parse(s);
   
    Evaluated = $("#evaluatedgrid").ligerGrid({
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
            h += "<a href='javascript:Make(" + rowindex + ")'>制作名单</a> ";
            h += "<a href='javascript:Check(" + rowindex + ")'>查看名单</a> ";
            return h;
        }
        }],
        usePager: true, pageSize: 10,
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
    document.getElementById('LTelphone').innerText = rowdata.UiTelephone;
    document.getElementById('LPhone').innerText = rowdata.UiMobPhone;
    document.getElementById('LEmail').innerText = rowdata.UiEmail;
    document.getElementById('LAddress').innerText = rowdata.UiAddress;
    document.getElementById('LZipcode').innerText = rowdata.UiZipCode;
}

function Make(rowid) 
{
    var rowdata = Evaluated.getSelectedRow(rowid);    //取得数据

    if (rowdata == null)
        return;

    //document.getElementById("submit_button").disabled = false;
    document.getElementById("UserID").value = rowdata.UiID;
    document.getElementById("SearchUser").click();
}

function Check(rowid)
 {
    var rowdata = Evaluated.getSelectedRow(rowid);    //取得数据

    if (rowdata == null)
        return;
    document.getElementById("UserID").value = rowdata.UiID;
    document.getElementById("CheckUser").click();
}

function show_evaluator() 
{
    load_userinfo();
    var s2 = document.getElementById("JsonEvaluator").value;
    var UsersData2 = JSON2.parse(s2);

    Evaluator = $("#evaluator").ligerGrid({
        checkbox: true,
        columns: [
        { display: '工号', name: 'UiID', width: 100, align: 'center', frozen: true },
        { display: '姓名', name: 'UiName', width: 100, align: 'center' },
        { display: '性别', name: 'UiSex', width: 80, align: 'center' },
        { display: '身份证号', name: 'UiIdentityNum', width: 100, align: 'center', hide: true },
        { display: '部门', name: 'UiDepartment', width: 150, align: 'center', hide: true },
        { display: '电话', name: 'UiTelephone', width: 70, align: 'center', hide: true },
        { display: '手机', name: 'UiMobPhone', width: 120, align: 'center' },
        { display: 'Email', name: 'UiEmail', width: 150, align: 'center' },
        { display: '地址', name: 'UiAddress', width: 120, align: 'center', hide: true },
        { display: '邮编', name: 'UiZipCode', width: 100, align: 'center', hide: true }
        ],
        usePager: true, pageSize: 10,
        data: UsersData2,
        width: '96%'
    });
    $("#box").css("display", "block");

}

function submitList() {

    var checked = false;
    allEles = document.getElementsByName("Radio");
    for(var i=0;i<allEles.length;i++)
    {
        checked=checked||allEles[i].checked;
    }
    if(!checked)
    {
       alert("请选择考评人身份!");
       return;
    }
    var array = Evaluator.getSelecteds();
    if (array.length<1) 
    { 
         alert("请选择考评人"); 
         return;
    }
     // alert("提交成功");
    
    var selectData= JSON2.stringify(array);
    document.getElementById("JsonChose").value = selectData;
    document.getElementById("Button1").click();
}


function showList1() {
    load_userinfo();
    $("#box").css("display", "none");

    var s3= document.getElementById("JsonList").value;
    var UsersData3 = JSON2.parse(s3);
     List = $("#list").ligerGrid({
        columns: [
        { display: '被考评人', name: 'EvaluatedID', width: 100, align: 'center', frozen: true },
        { display: '考评人', name: 'UiID', width: 100, align: 'center' },
        { display: '身份', name: 'Relation', width: 80, align: 'center' }
        ],
        usePager: true, pageSize: 10,
        data: UsersData3,
        width: '96%'
    });
    $("#box2").css("display", "block");
}

function showList2() {
    load_userinfo();
    $("#box").css("display", "none");

    var s3 = document.getElementById("JsonList").value;
    var UsersData3 = JSON2.parse(s3);
    List = $("#list").ligerGrid({
        columns: [
        { display: '被考评人', name: 'EvaluatedID', width: 100, align: 'center', frozen: true },
        { display: '考评人', name: 'UiID', width: 100, align: 'center' },
        { display: '身份', name: 'Relation', width: 80, align: 'center' },
         { display: '撤销', isSort: false, width: 40, render: function (rowdata, rowindex, value) 
         {
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
}


function deleteRow(rowid) 
{
    if (confirm('确定删除?')) 
    {
        List.deleteRow(rowid);
        var User = List.getDeleted();
        var userinfo = JSON2.stringify(User);

        document.getElementById("ListDelete").value = userinfo;
        document.getElementById("Button2").click();
    }
}