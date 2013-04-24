var Evaluated = null;
var data = null;
var DetailData = null;

function search()
 {
    document.getElementById("Search").click();
}

function sendback() {
    if (confirm('确认退回？')) {
        document.getElementById("SendBack").click();
    }
}

function tanchuang() 
{
    var error = document.getElementById("Errors").value;
    alert(error);
}

function pass() {
    if (confirm('确认通过？')) {
        document.getElementById("Pass").click();
    }
}

function dao() {
    if (confirm('确认导出？')) {
        document.getElementById("Dao").click();
    }
    
    
}

function load_userinfo() 
{
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
        { display: '审核意见', name: 'PrbComment', width: 200, align: 'left' },
        { display: '', isSort: false, width: 200, render: function (rowdata, rowindex, value) {
            var h = "";
            h += "<a href='javascript:ShowDetail(" + rowindex + ")'>查看详细</a> ";
            h += "<a href='javascript:Check(" + rowindex + ")'>审核岗位责任书</a> ";
            return h;
        }
        }],
        usePager: true, pageSize: 20,
        data: UsersData,
        width: '96%'
    });
}

function ShowDetail(rowid)
 {
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

    document.getElementById("Title").style.display = "none"; //不显示“XX被考评人名单”

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
    document.getElementById('LComment').innerText = rowdata.PrbComment;
}

function Check(rowid)
 {
     var rowdata = Evaluated.getSelectedRow(rowid);    //取得数据
     document.getElementById("UserName").value = rowdata.UiName;

    if (rowdata == null)
        return;
    document.getElementById("UserID").value = rowdata.UiID;
    document.getElementById("SearchPost").click();
}


function EditPost() 
{
    $("#box").css("display", "block");
    document.getElementById("Title").style.display = "none"; //不显示“XX被考评人名单”
    if (document.getElementById("Passed").value == 1) {
        document.getElementById("sendback_button").style.display = "";
    } else if (document.getElementById("Passed").value == 0) {
        document.getElementById("pass_button").style.display = "";
        document.getElementById("comment_button").style.display = ""; //显示审核意见按钮
    }
    document.getElementById("dao_button").style.display = "";
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
        document.getElementById("prbComment").value = comment.subString(0, 50);
        document.getElementById("WriteComment").click();
    }
}