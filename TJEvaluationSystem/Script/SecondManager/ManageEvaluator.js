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

function Make(rowid) 
{
    var rowdata = Evaluated.getSelectedRow(rowid);    //取得数据

    if (rowdata == null)
        return;

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
        { display: '用户名', name: 'UiID', width: 80, align: 'center', hide: true },
        { display: '姓名', name: 'UiName', width: 50, align: 'center' },
        { display: '性别', name: 'UiSex', width: 30, align: 'center' },
        { display: '身份证号', name: 'UiIdentityNum', width: 100, align: 'center', hide: true },
        { display: '部门', name: 'UiDepartment', width: 50, align: 'center' },
        { display: '岗位（职务）', name: 'UiJob', width: 150, align: 'center', hide: true },
        { display: '电话', name: 'UiTelephone', width: 70, align: 'center', hide: true },
        { display: 'Email', name: 'UiEmail', width: 150, align: 'center' },
        { display: '手机', name: 'UiMobPhone', width: 100, align: 'center' },
        { display: '地址', name: 'UiAddress', width: 120, align: 'center', hide: true },
        { display: '邮编', name: 'UiZipCode', width: 0, align: 'lecenterft', hide: true },
        { display: '经费来源', name: 'UiFund', width: 50, align: 'center', hide: true },
        { display: '派遣性质', name: 'UiCharacter', width: 50, align: 'center', hide: true },
        { display: '派遣公司', name: 'UiCompany', width: 50, align: 'center', hide: true },
        { display: '考评开始时间', name: 'UiStartTime', width: 80, align: 'center', hide: true },
        { display: '考评结束时间', name: 'UiStopTime', width: 80, align: 'center', hide: true },
        { display: '_关系', name: 'Relation', width: 80, align: 'center', hide: true },
        { display: '关系', isSort: false, width: 250, render: function (rowdata, rowindex, value) {
            var h = "";
            h += '领导';
            h += '<input type="radio" id="RadioButton1' + rowindex + '" name="' + rowindex + '" value="领导">';
            h += ' 同事';
            h += '<input type="radio" id="RadioButton2' + rowindex + '" name="' + rowindex + '" value="同事">';
            h += ' 下属';
            h += '<input type="radio" id="RadioButton3' + rowindex + '" name="' + rowindex + '" value="下属">';
            h += ' 客户';
            h += '<input type="radio" id="RadioButton4' + rowindex + '" name="' + rowindex + '" value="客户">';
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
}

function submitList() {

//    var checked = false;
//    allEles = document.getElementsByName("Radio");
//    for(var i=0;i<allEles.length;i++)
//    {
//        checked=checked||allEles[i].checked;
//    }
//    if(!checked)
//    {
//       alert("请选择考评人身份!");
//       return;
//    }
    var array = Evaluator.getSelecteds();
    if (array.length<1) 
    { 
         alert("请选择考评人"); 
         return;
    }

    for (var i = 0; i < array.length; i++) {
        delete array[i].UiName;
        delete array[i].UiSex;
        delete array[i].UiIdentityNum;
        delete array[i].UiDepartment;
        delete array[i].UiTelephone;
        delete array[i].UiEmail;
        delete array[i].UiMobPhone;
        delete array[i].UiAddress;
        delete array[i].UiZipCode;
        delete array[i].UiType;
        delete array[i].UiJob;
        delete array[i].UiFund;
        delete array[i].UiCharacter;
        delete array[i].UiCompany;
        delete array[i].UiStartTime;
        delete array[i].UiStopTime;   
    }

     for (var i = 0; i < array.length; i++) {
         var items = document.getElementsByName(i.toString());
         for (var j = 0; j < items.length; j++) {
             if (items[j].checked == true) {
                 array[i].Relation = items[j].value;
                 break;
             }
         }
     } 
    var selectData = JSON2.stringify(array);
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
    var manager = $("#list").ligerGetGridManager();
    manager.loadData();
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
    var manager = $("#list").ligerGetGridManager();
    manager.loadData();
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