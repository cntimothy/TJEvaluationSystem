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
     if (confirm('确认提交？')) {
         var str = "";
         var num = document.getElementById("WorkContentRequest").childNodes.length;
         var count = 1;
         for (; count < num; count++) {
             if (count != 1)
                 str += "&";
             var titleID = "Title" + count;
             var contentID = "Content" + count;
             var requestID = "Request" + count;
             var checkPointID = "CheckPoint" + count;
             str = str + count.toString() + ")" + "*" + trim(document.getElementById(titleID).value) + "$" +
                    "具体内容：" + "*" + trim(document.getElementById(contentID).value) + "$" +
                    "具体要求：" + "*" + trim(document.getElementById(requestID).value) + "$" +
                    "考核要点：" + "*" + trim(document.getElementById(checkPointID).value);
         }
         document.getElementById("prbWorkContentRequest").value = str;
         document.getElementById("SubmitPost").click();
    }

 }

 function savepost() {
     if (confirm('确认保存？')) {
         var str = "";
         var num = document.getElementById("WorkContentRequest").childNodes.length;
         var count = 1;
         for (; count < num; count++) {
             if (count != 1)
                 str += "&";
             var titleID = "Title" + count;
             var contentID = "Content" + count;
             var requestID = "Request" + count;
             var checkPointID = "CheckPoint" + count;
             str = str + count.toString() + ")" + "*" + trim(document.getElementById(titleID).value) + "$" +
                    "具体内容：" + "*" + trim(document.getElementById(contentID).value) + "$" +
                    "具体要求：" + "*" + trim(document.getElementById(requestID).value) + "$" +
                    "考核要点：" + "*" + trim(document.getElementById(checkPointID).value);
         }
         document.getElementById("prbWorkContentRequest").value = str;
         document.getElementById("SavePost").click();
     }

 }

 function trim(str) { //删除左右两端的空格
     return str.replace(/(^\s*)|(\s*$)/g, "");
 }

function addItem() {
    var parentDiv = document.getElementById("WorkContentRequest");
    var childDiv = document.createElement("div");
    var count = parentDiv.childNodes.length;
    childDiv.id = "WorkContentRequestChild" + count; 
    childDiv.innerHTML = "<span class=\"label1\">" + count + ")标题</span><br/>" +
                        "<input type=\"text\" id=\"Title" + count + "\" class=\"textbox3\"><br/>" +
                        "<span class=\"label1\">具体内容</span><br/>"+
                        "<textarea id=\"Content" + count + "\" class=\"textbox1\" ></textarea><br/>" +
                        "<span class=\"label1\">具体要求</span><br/>"+
                        "<textarea id=\"Request" + count + "\" class=\"textbox1\" ></textarea><br/>" +
                        "<span class=\"label1\">考核要点</span><br/>" +
                        "<textarea id=\"CheckPoint" + count + "\" class=\"textbox1\" ></textarea><br/>";
    parentDiv.appendChild(childDiv);
}

function delItem() {
    var parentDiv = document.getElementById("WorkContentRequest");
    if (window.confirm("确定删除？")) {
        var length = parentDiv.childNodes.length;
        parentDiv.removeChild(parentDiv.childNodes[length - 1]);
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
        { display: '审核状态', name: 'PrbPassed', width: 80, align: 'center' },
        { display: '', isSort: false, width: 180, render: function (rowdata, rowindex, value) {
            var h = "";
            h += "<a href='javascript:ShowDetail(" + rowindex + ")'>查看详细</a> ";
            h += "<a href='javascript:Make(" + rowindex + ")'>制作岗位责任书</a> ";
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
   
    $("#evaluatedgrid").css("display", "none");
    $("#ShowDetailUserInfo").css("display", "block");
    $(".DetailData").css("display", "block");
    //设置显示与隐藏
    $(".ShowData").css("display", "block");
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

function Make(rowid) 
{
    var rowdata = Evaluated.getSelectedRow(rowid);    //取得数据

    if (rowdata == null)
        return;
    document.getElementById("UserID").value = rowdata.UiID;
    document.getElementById("UserName").value = rowdata.UiName;
    document.getElementById("SearchPost").click();
}

function EditPost() {
    $("#evaluatedgrid").css("display", "none");
    $("#box").css("display", "block");
    document.getElementById("Title").style.display = "none"; //不显示“XX被考评人名单”
    var str = document.getElementById("prbWorkContentRequest").value;
    if (str != "") {
        var bigPoint = str.split("&");
        var count = 1;
        for (; count <= bigPoint.length; count++) {
            addItem();
            var titleID = "Title" + count;
            var contentID = "Content" + count;
            var requestID = "Request" + count;
            var checkPointID = "CheckPoint" + count;
            var smallPoint = bigPoint[count - 1].split("$");
            document.getElementById(titleID).value = smallPoint[0].split("*")[1];
            document.getElementById(contentID).value = smallPoint[1].split("*")[1];
            document.getElementById(requestID).value = smallPoint[2].split("*")[1];
            document.getElementById(checkPointID).value = smallPoint[3].split("*")[1];
        }
    }

//    document.getElementById("")

    var s = document.getElementById("Passed").value;
    if (s == "1") {
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
        document.all.save_button.disabled = true;
        document.getElementById("Add").disabled = true;

        var num = document.getElementById("WorkContentRequest").childNodes.length;
        for (var i = 1; i < num; i++) {
            var titleID = "Title" + i;
            var contentID = "Content" + i;
            var requestID = "Request" + i;
            var checkPointID = "CheckPoint" + i;
            document.getElementById(titleID).disabled = true;
            document.getElementById(contentID).disabled = true;
            document.getElementById(requestID).disabled = true;
            document.getElementById(checkPointID).disabled = true;
        }
    }
    else {
        document.getElementById("submit_button").style.display = ""; //让提交按钮可见
        document.getElementById("save_button").style.display = "";
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
        document.getElementById("prbPower").disabled = false;
        document.getElementById("prbResponse").disabled = false;
        document.getElementById("prbDirectLeader").disabled = false;
        document.getElementById("prbSubordinate").disabled = false;
        document.getElementById("prbColleague").disabled = false;
        document.getElementById("prbServices").disabled = false;
        document.getElementById("prbRelations").disabled = false;
        document.getElementById("prbWorkEnter").disabled = false;
        document.getElementById("prbPostAssess").disabled = true;
        document.getElementById("prbOthers").disabled = true;
        document.getElementById("submit_button").disabled = false;
        document.getElementById("save_button").disabled = false;
        document.getElementById("Add").disabled = false;

        var num = document.getElementById("WorkContentRequest").childNodes.length;
        for (var i = 1; i < num; i++) {
            var titleID = "Title" + i;
            var contentID = "Content" + i;
            var requestID = "Request" + i;
            var checkPointID = "CheckPoint" + i;
            document.getElementById(titleID).disabled = false;
            document.getElementById(contentID).disabled = false;
            document.getElementById(requestID).disabled = false;
            document.getElementById(checkPointID).disabled = false;
        }
    }

}