var Evaluated = null;
var data = null;
var DetailData = null;
function tanchuang() {

    var error = document.getElementById("Errors").value;
    alert(error);
    if (document.getElementById("Hidden1").value == "submit")
        load_userinfo();
}
function search() 
{
    document.getElementById("SearchEvaluated").click();
}
function submitpost()
 {
     if (confirm('确认提交？'))
     {
        document.getElementById("SubmitPost").click();
    }
   
}

function load_userinfo()
 {
    var s = document.getElementById("JsonData").value;
    var UsersData = JSON2.parse(s);
    data = UsersData;
    Evaluated = $("#evaluatedgrid").ligerGrid({
        columns: [
        { display: '用户名', name: 'UiID', width: 100, align: 'center', frozen: true },
        { display: '姓名', name: 'UiName', width: 100, align: 'center' },
        { display: '性别', name: 'UiSex', width: 80, align: 'center' },
        { display: '身份证号', name: 'UiIdentityNum', width: 100, align: 'center', hide: true },
        { display: '部门', name: 'UiDepartment', width: 150, align: 'center' },
        { display: '电话', name: 'UiTelephone', width: 70, align: 'center', hide: true },
        { display: '手机', name: 'UiMobPhone', width: 120, align: 'center' },
        { display: 'Email', name: 'UiEmail', width: 150, align: 'center' },
        { display: '地址', name: 'UiAddress', width: 120, align: 'center', hide: true },
        { display: '邮编', name: 'UiZipCode', width: 0, align: 'lecenterft', hide: true },
        { display: '', isSort: false, width: 200, render: function (rowdata, rowindex, value) {
            var h = "";
            h += "<a href='javascript:ShowDetail(" + rowindex + ")'>查看详细</a> ";
            h += "<a href='javascript:Make(" + rowindex + ")'>制作岗位责任书</a> ";
            return h;
        }
        }],
        usePager: true, pageSize: 10,
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
    document.getElementById("UserID").value = rowdata.UiID;
    document.getElementById("SearchPost").click();
}

function EditPost() {
    $("#evaluatedgrid").css("display", "none");
    $("#box").css("display", "block");
    var s = document.getElementById("Passed").value;
    if (s == "1") 
    {
        document.getElementById("prbEmployer").disabled = true;
        document.getElementById("prbLaborUnit").disabled = true;
        document.getElementById("prbLaborDep").disabled = true;
        document.getElementById("prbPostName").disabled = true;
        document.getElementById("prbPostType").disabled = true;
        document.getElementById("prbEduBg").disabled = true;
        document.getElementById("prbCertificate").disabled = true;
        document.getElementById("prbExperience").disabled = true;
        document.getElementById("prbSkill").disabled = true;
        document.getElementById("prbPersonality").disabled = true;
        document.getElementById("prbPhycond").disabled = true;
        document.getElementById("prbWorkOutline").disabled = true;
        document.getElementById("prbWorkContentRequest").disabled = true;
        document.getElementById("prbPower").disabled = true;
        document.getElementById("prbResponse").disabled = true;
        document.getElementById("prbDirectLeader").disabled = true;
        document.getElementById("prbSubordinate").disabled = true;
        document.getElementById("prbColleague").disabled = true;
        document.getElementById("prbServices").disabled = true;
        document.getElementById("prbRelations").disabled = true;
        document.getElementById("prbWorkEnter").disabled = true;
        document.getElementById("prbPostAssess").disabled = true;
        document.getElementById("prbOthers").disabled = true;
        document.all.submit_button.disabled = true;
    }
    else 
    {
        document.getElementById("prbEmployer").disabled = false;
        document.getElementById("prbLaborUnit").disabled = false;
        document.getElementById("prbLaborDep").disabled = false;
        document.getElementById("prbPostName").disabled = false;
        document.getElementById("prbPostType").disabled = false;
        document.getElementById("prbEduBg").disabled = false;
        document.getElementById("prbCertificate").disabled = false;
        document.getElementById("prbExperience").disabled = false;
        document.getElementById("prbSkill").disabled = false;
        document.getElementById("prbPersonality").disabled = false;
        document.getElementById("prbPhycond").disabled = false;
        document.getElementById("prbWorkOutline").disabled = false;
        document.getElementById("prbWorkContentRequest").disabled = false;
        document.getElementById("prbPower").disabled = false;
        document.getElementById("prbResponse").disabled = false;
        document.getElementById("prbDirectLeader").disabled = false;
        document.getElementById("prbSubordinate").disabled = false;
        document.getElementById("prbColleague").disabled = false;
        document.getElementById("prbServices").disabled = false;
        document.getElementById("prbRelations").disabled = false;
        document.getElementById("prbWorkEnter").disabled = false;
        document.getElementById("prbPostAssess").disabled = false;
        document.getElementById("prbOthers").disabled = false;
        document.getElementById("submit_button").disabled = false;
    }

}