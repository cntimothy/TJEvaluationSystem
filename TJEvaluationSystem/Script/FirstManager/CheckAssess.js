
var standerLib = null;
var AssessTables = null;
var Manager = null;
var minNum = 2; //每一个指标最少项数
var EvaluatedUserInfo=null; //被考评人信息

function load_summary() {
    var s = document.getElementById("JsonSummary").value;
    var summary = JSON2.parse(s);
    data = summary;
    Evaluated = $("#summarygrid").ligerGrid({
        columns: [
        { display: '部门', name: 'SDepartment', width: 120, align: 'center' },
        { display: '未审核', name: 'SUnpass', width: 100, align: 'center' },
        { display: '未制作', name: 'SUnmake', width: 100, align: 'center' },
        { display: '已审核', name: 'SPass', width: 100, align: 'center' },
        { display: '总数', name: 'SSum', width: 100, align: 'center'}],
        usePager: true, pageSize: 20,
        data: summary,
        width: '96%'
    });
}

function search() {
    document.getElementById("Search").click();
}

function load_userinfo() {
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
        { display: '审核状态', name: 'Passed', width: 80, align: 'center' },
        { display: '审核意见', name: 'Comment', width: 200, align: 'left' },
        { display: '', isSort: false, width: 200, render: function (rowdata, rowindex, value) {
            var h = "";
            h += "<a href='javascript:ShowDetail1(" + rowindex + ")'>查看详细</a> ";
            h += "<a href='javascript:searchAssess(" + rowindex + ")'>审核考核表</a> ";
            return h;
        }
        }],
        usePager: true, pageSize: 20,
        data: UsersData,
        width: '96%'
    });
}

function ShowDetail1(rowid) {
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
}

function searchAssess(rowindex) {
    EvaluatedUserInfo = Evaluated.getSelectedRow(rowindex);
    if (EvaluatedUserInfo == null)
        return;
    var passed = Evaluated.getSelectedRow(rowindex).Passed;
    if (passed == "未制作") {
        alert("考评表未制作");
        return;
    }
    document.getElementById("UserID").value = Evaluated.getSelectedRow(rowindex).UiID;
    document.getElementById("Passed").value = Evaluated.getSelectedRow(rowindex).Passed;
    document.getElementById("SearchAssess").click();
}

//设置审核
function SetPassedTrue() {
    if (window.confirm("确认通过？")) {
        document.getElementById("BSetPassedTrue").click();
    }
}

function SetPassedFalse() {
    if (window.confirm("确认退回？")) {
        document.getElementById("BSetPassedFalse").click();
    }
}

//设置审核完成
function SetPassedDone() {
    alert('设置成功！');
    location = location;
}

function comment() {
    //    var oldComment = document.getElementById("Comment").innerHTML.split("：")[1];
    var oldComment = document.getElementById("Comment").innerHTML;
    if (oldComment != "") {
        oldComment = oldComment.split("：")[1];
    }
    if (oldComment) {
        var comment = prompt("请输入审核意见：（最多50字）", oldComment);
    }
    else {
        var comment = prompt("请输入审核意见：（最多50字）", "");
    }
    if (comment) {
        document.getElementById("EvaComment").value = comment.substring(0, 50);
        document.getElementById("WriteComment").click();
    }
}

function setCommentDone() {
    alert('审核意见设置成功！');
    location = location;
}

//通过指标id查找指标内容
function GetStanderByID(id, lib) {
    if (id != null && lib != null) {
        for (var row in lib) {
            if (lib[row].SlID == id)
                return lib[row];
        }
    }
    return null;
}

function ShowDetail(rowindex) {
    //设置通过和退回按钮的显示
    var atPass = document.getElementById("Passed").value;
    if (atPass == "未审核") {
        document.getElementById("pass_button").style.display = "";
    }
    else {
        document.getElementById("sendback_button").style.display = "";
    }

    document.getElementById("dao_button").style.display = "";
    document.getElementById("comment_button").style.display = "";


    //获取指标库
    var data2 = document.getElementById("JsonData2").value;
    standerLib = JSON2.parse(data2)
    var assessTables = JSON2.parse(document.getElementById("JsonData").value);
    var assessTable = assessTables.Rows[0];
    if (assessTable == null)
        return;

    //解决ie6,7中setAttribute兼容性
    dom = (function () {
        var fixAttr = {
            tabindex: 'tabIndex',
            readonly: 'readOnly',
            'for': 'htmlFor',
            'class': 'className',
            maxlength: 'maxLength',
            cellspacing: 'cellSpacing',
            cellpadding: 'cellPadding',
            rowspan: 'rowSpan',
            colspan: 'colSpan',
            usemap: 'useMap',
            frameborder: 'frameBorder',
            contenteditable: 'contentEditable'
        },
        div = document.createElement('div');
        div.setAttribute('class', 't');
        var supportSetAttr = div.className === 't';
        return {
            setAttr: function (el, name, val) {
                el.setAttribute(supportSetAttr ? name : (fixAttr[name] || name), val);
            },
            getAttr: function (el, name) {
                return el.getAttribute(supportSetAttr ? name : (fixAttr[name] || name));
            }
        }
    })();

    //数据转换到数组中

    var keyResponseArray = new Array();
    if (assessTable.AtKeyResponse1 != null)
        keyResponseArray.push(assessTable.AtKeyResponse1);
    if (assessTable.AtKeyResponse2 != null)
        keyResponseArray.push(assessTable.AtKeyResponse2);
    if (assessTable.AtKeyResponse3 != null)
        keyResponseArray.push(assessTable.AtKeyResponse3);
    if (assessTable.AtKeyResponse4 != null)
        keyResponseArray.push(assessTable.AtKeyResponse4);
    if (assessTable.AtKeyResponse5 != null)
        keyResponseArray.push(assessTable.AtKeyResponse5);
    if (keyResponseArray.length < minNum) {
        $.ligerDialog.warn('获取数据失败!');
        return;
    }

    var keyAbilityArray = new Array();
    if (assessTable.AtKeyAbility1 > 0)
        keyAbilityArray.push(assessTable.AtKeyAbility1);
    if (assessTable.AtKeyAbility2 > 0)
        keyAbilityArray.push(assessTable.AtKeyAbility2);
    if (assessTable.AtKeyAbility3 > 0)
        keyAbilityArray.push(assessTable.AtKeyAbility3);
    if (assessTable.AtKeyAbility4 > 0)
        keyAbilityArray.push(assessTable.AtKeyAbility4);
    if (assessTable.AtKeyAbility5 > 0)
        keyAbilityArray.push(assessTable.AtKeyAbility5);
    if (keyAbilityArray.length < minNum) {
        $.ligerDialog.warn('获取数据失败!');
        return;
    }

    var keyAttitudeArray = new Array();
    if (assessTable.AtKeyAttitude1 > 0)
        keyAttitudeArray.push(assessTable.AtKeyAttitude1);
    if (assessTable.AtKeyAttitude2 > 0)
        keyAttitudeArray.push(assessTable.AtKeyAttitude2);
    if (assessTable.AtKeyAttitude3 > 0)
        keyAttitudeArray.push(assessTable.AtKeyAttitude3);
    if (assessTable.AtKeyAttitude4 > 0)
        keyAttitudeArray.push(assessTable.AtKeyAttitude4);
    if (assessTable.AtKeyAttitude5 > 0)
        keyAttitudeArray.push(assessTable.AtKeyAttitude5);
    if (keyAttitudeArray.length < minNum) {
        $.ligerDialog.warn('获取数据失败!');
        return;
    }

    var responseArray = new Array();
    if (assessTable.AtResponse1 != null)
        responseArray.push(assessTable.AtResponse1);
    if (assessTable.AtResponse2 != null)
        responseArray.push(assessTable.AtResponse2);
    if (assessTable.AtResponse3 != null)
        responseArray.push(assessTable.AtResponse3);
    if (assessTable.AtResponse4 != null)
        responseArray.push(assessTable.AtResponse4);
    if (assessTable.AtResponse5 != null)
        responseArray.push(assessTable.AtResponse5);
    if (responseArray.length < minNum) {
        $.ligerDialog.warn('获取数据失败!');
        return;
    }

    var abilityArray = new Array();
    if (assessTable.AtAbility1 > 0)
        abilityArray.push(assessTable.AtAbility1);
    if (assessTable.AtAbility2 > 0)
        abilityArray.push(assessTable.AtAbility2);
    if (assessTable.AtAbility3 > 0)
        abilityArray.push(assessTable.AtAbility3);
    if (assessTable.AtAbility4 > 0)
        abilityArray.push(assessTable.AtAbility4);
    if (assessTable.AtAbility5 > 0)
        abilityArray.push(assessTable.AtAbility5);
    if (abilityArray.length < minNum) {
        $.ligerDialog.warn('获取数据失败!');
        return;
    }

    var attitudeArray = new Array();
    if (assessTable.AtAttitude1 > 0)
        attitudeArray.push(assessTable.AtAttitude1);
    if (assessTable.AtAttitude2 > 0)
        attitudeArray.push(assessTable.AtAttitude2);
    if (assessTable.AtAttitude3 > 0)
        attitudeArray.push(assessTable.AtAttitude3);
    if (assessTable.AtAttitude4 > 0)
        attitudeArray.push(assessTable.AtAttitude4);
    if (assessTable.AtAttitude5 > 0)
        attitudeArray.push(assessTable.AtAttitude5);
    if (attitudeArray.length < minNum) {
        $.ligerDialog.warn('获取数据失败!');
        return;
    }

    var keyStanderNum = keyResponseArray.length + keyAbilityArray.length + keyAttitudeArray.length;
    var responseStanderNum = responseArray.length;
    var abilityStanderNum = abilityArray.length;
    var attitudeStanderNum = attitudeArray.length;

    //生成考核表
    var table = document.createElement("table"); //创建table 
    table.className = 'my_table';
    var tbody = document.createElement("TBODY");

    //列标题
    var tr = document.createElement("TR");

    var td = document.createElement("TD");
    td.className = 'td_title';
    dom.setAttr(td, 'colspan', 4);
    var text = document.createTextNode("指标体系");
    td.appendChild(text);
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_title';
    dom.setAttr(td, 'colspan', 4);
    var text = document.createTextNode("指标描述及分值");
    td.appendChild(text);
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_title';
    td.setAttribute("width", 60)
    var text = document.createTextNode("得分");
    td.appendChild(text);
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_title';
    td.setAttribute("width", 50)
    var text = document.createTextNode("权重");
    td.appendChild(text);
    tr.appendChild(td);
    tbody.appendChild(tr);

    //关键岗位职责指标第一行
    var tr = document.createElement("TR");

    var td = document.createElement("TD");
    td.className = 'td_title';
    dom.setAttr(td, 'rowspan', keyStanderNum * 2);
    td.setAttribute("width", 20)
    td.appendChild(document.createTextNode("一"));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_title';
    dom.setAttr(td, 'rowspan', keyStanderNum * 2);
    td.setAttribute("width", 30)
    td.appendChild(document.createTextNode("关键绩效指标"));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_title';
    dom.setAttr(td, 'rowspan', keyResponseArray.length * 2);
    td.setAttribute("width", 30)
    td.appendChild(document.createTextNode("关键岗位职责指标"));
    tr.appendChild(td);

    var tempArray = new Array();
    tempArray = keyResponseArray[0].split('&');

    var td = document.createElement("TD");
    dom.setAttr(td, 'rowspan', 2);
    td.setAttribute("width", 120);
    td.appendChild(document.createTextNode(tempArray[0]));
    tr.appendChild(td);

    var td = document.createElement("TD");
    dom.setAttr(td, 'colspan', 4);
    td.appendChild(document.createTextNode(tempArray[1]));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_fun';
    dom.setAttr(td, 'rowspan', 2);
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_weight';
    dom.setAttr(td, 'rowspan', keyStanderNum * 2);
    td.appendChild(document.createTextNode("50%"));
    tr.appendChild(td);

    tbody.appendChild(tr);

    var tr = document.createElement("TR");

    var td = document.createElement("TD");
    td.className = 'td_score_type';
    td.appendChild(document.createTextNode("优（90~100）"));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_score_type';
    td.appendChild(document.createTextNode("良（70~80）"));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_score_type';
    td.appendChild(document.createTextNode("中（40~60）"));
    tr.appendChild(td);
    var td = document.createElement("TD");
    td.className = 'td_score_type';
    td.appendChild(document.createTextNode("差（0~30）"));
    tr.appendChild(td);

    tbody.appendChild(tr);

    //关键岗位职责指标其他行
    for (var i = 1; i < keyResponseArray.length; i++) {
        var tempArray = new Array();
        tempArray = keyResponseArray[i].split('&');

        var tr = document.createElement("TR");

        var td = document.createElement("TD");
        dom.setAttr(td, 'rowspan', 2);
        td.setAttribute("width", 120);
        td.appendChild(document.createTextNode(tempArray[0]));
        tr.appendChild(td);

        var td = document.createElement("TD");
        dom.setAttr(td, 'colspan', 4);
        td.appendChild(document.createTextNode(tempArray[1]));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.className = 'td_fun';
        dom.setAttr(td, 'rowspan', 2);
        tr.appendChild(td);

        tbody.appendChild(tr);

        var tr = document.createElement("TR");

        var td = document.createElement("TD");
        td.className = 'td_score_type';
        td.appendChild(document.createTextNode("优（90~100）"));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.className = 'td_score_type';
        td.appendChild(document.createTextNode("良（70~80）"));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.className = 'td_score_type';
        td.appendChild(document.createTextNode("中（40~60）"));
        tr.appendChild(td);
        var td = document.createElement("TD");
        td.className = 'td_score_type';
        td.appendChild(document.createTextNode("差（0~30）"));
        tr.appendChild(td);

        tbody.appendChild(tr);
    }

    //关键岗位胜任能力指标第一行
    var tr = document.createElement("TR");

    var td = document.createElement("TD");
    td.className = 'td_title';
    dom.setAttr(td, 'rowspan', keyAbilityArray.length * 2);
    td.setAttribute("width", 30)
    td.appendChild(document.createTextNode("关键岗位胜任能力指标"));
    tr.appendChild(td);

    var standerTemp = GetStanderByID(keyAbilityArray[0], standerLib);
    if (standerTemp == null) {
        $.ligerDialog.error('获取数据失败!');
        return;
    }

    var td = document.createElement("TD");
    dom.setAttr(td, 'rowspan', 2);
    td.setAttribute("width", 120);
    td.appendChild(document.createTextNode(standerTemp.SlName));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.appendChild(document.createTextNode(standerTemp.SlContentA));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.appendChild(document.createTextNode(standerTemp.SlContentB));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.appendChild(document.createTextNode(standerTemp.SlContentC));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.appendChild(document.createTextNode(standerTemp.SlContentD));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_fun';
    dom.setAttr(td, 'rowspan', 2);
    tr.appendChild(td);

    tbody.appendChild(tr);

    var tr = document.createElement("TR");

    var td = document.createElement("TD");
    td.className = 'td_score_type';
    td.appendChild(document.createTextNode("优（90~100）"));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_score_type';
    td.appendChild(document.createTextNode("良（70~80）"));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_score_type';
    td.appendChild(document.createTextNode("中（40~60）"));
    tr.appendChild(td);
    var td = document.createElement("TD");
    td.className = 'td_score_type';
    td.appendChild(document.createTextNode("差（0~30）"));
    tr.appendChild(td);

    tbody.appendChild(tr);

    //关键岗位胜任能力指标其他行
    for (var i = 1; i < keyAbilityArray.length; i++) {
        var standerTemp = GetStanderByID(keyAbilityArray[i], standerLib);
        if (standerTemp == null) {
            $.ligerDialog.error('获取数据失败!');
            return;
        }

        var tr = document.createElement("TR");

        var td = document.createElement("TD");
        dom.setAttr(td, 'rowspan', 2);
        td.setAttribute("width", 120);
        td.appendChild(document.createTextNode(standerTemp.SlName));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.appendChild(document.createTextNode(standerTemp.SlContentA));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.appendChild(document.createTextNode(standerTemp.SlContentB));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.appendChild(document.createTextNode(standerTemp.SlContentC));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.appendChild(document.createTextNode(standerTemp.SlContentD));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.className = 'td_fun';
        dom.setAttr(td, 'rowspan', 2);
        tr.appendChild(td);

        tbody.appendChild(tr);

        var tr = document.createElement("TR");

        var td = document.createElement("TD");
        td.className = 'td_score_type';
        td.appendChild(document.createTextNode("优（90~100）"));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.className = 'td_score_type';
        td.appendChild(document.createTextNode("良（70~80）"));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.className = 'td_score_type';
        td.appendChild(document.createTextNode("中（40~60）"));
        tr.appendChild(td);
        var td = document.createElement("TD");
        td.className = 'td_score_type';
        td.appendChild(document.createTextNode("差（0~30）"));
        tr.appendChild(td);

        tbody.appendChild(tr);
    }

    //关键工作态度指标第一行
    var tr = document.createElement("TR");

    var td = document.createElement("TD");
    td.className = 'td_title';
    dom.setAttr(td, 'rowspan', keyAttitudeArray.length * 2);
    td.setAttribute("width", 30)
    td.appendChild(document.createTextNode("关键工作态度指标"));
    tr.appendChild(td);

    var standerTemp = GetStanderByID(keyAttitudeArray[0], standerLib);
    if (standerTemp == null) {
        $.ligerDialog.error('获取数据失败!');
        return;
    }

    var td = document.createElement("TD");
    dom.setAttr(td, 'rowspan', 2);
    td.setAttribute("width", 120);
    td.appendChild(document.createTextNode(standerTemp.SlName));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.appendChild(document.createTextNode(standerTemp.SlContentA));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.appendChild(document.createTextNode(standerTemp.SlContentB));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.appendChild(document.createTextNode(standerTemp.SlContentC));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.appendChild(document.createTextNode(standerTemp.SlContentD));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_fun';
    dom.setAttr(td, 'rowspan', 2);
    tr.appendChild(td);

    tbody.appendChild(tr);

    var tr = document.createElement("TR");

    var td = document.createElement("TD");
    td.className = 'td_score_type';
    td.appendChild(document.createTextNode("优（90~100）"));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_score_type';
    td.appendChild(document.createTextNode("良（70~80）"));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_score_type';
    td.appendChild(document.createTextNode("中（40~60）"));
    tr.appendChild(td);
    var td = document.createElement("TD");
    td.className = 'td_score_type';
    td.appendChild(document.createTextNode("差（0~30）"));
    tr.appendChild(td);

    tbody.appendChild(tr);

    //关键工作态度指标其他行
    for (var i = 1; i < keyAttitudeArray.length; i++) {
        var standerTemp = GetStanderByID(keyAttitudeArray[i], standerLib);
        if (standerTemp == null) {
            $.ligerDialog.error('获取数据失败!');
            return;
        }

        var tr = document.createElement("TR");

        var td = document.createElement("TD");
        dom.setAttr(td, 'rowspan', 2);
        td.setAttribute("width", 120);
        td.appendChild(document.createTextNode(standerTemp.SlName));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.appendChild(document.createTextNode(standerTemp.SlContentA));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.appendChild(document.createTextNode(standerTemp.SlContentB));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.appendChild(document.createTextNode(standerTemp.SlContentC));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.appendChild(document.createTextNode(standerTemp.SlContentD));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.className = 'td_fun';
        dom.setAttr(td, 'rowspan', 2);
        tr.appendChild(td);

        tbody.appendChild(tr);

        var tr = document.createElement("TR");

        var td = document.createElement("TD");
        td.className = 'td_score_type';
        td.appendChild(document.createTextNode("优（90~100）"));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.className = 'td_score_type';
        td.appendChild(document.createTextNode("良（70~80）"));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.className = 'td_score_type';
        td.appendChild(document.createTextNode("中（40~60）"));
        tr.appendChild(td);
        var td = document.createElement("TD");
        td.className = 'td_score_type';
        td.appendChild(document.createTextNode("差（0~30）"));
        tr.appendChild(td);

        tbody.appendChild(tr);
    }

    //岗位职责指标第一行
    var tr = document.createElement("TR");

    var td = document.createElement("TD");
    td.className = 'td_title';
    dom.setAttr(td, 'rowspan', responseStanderNum * 2);
    td.setAttribute("width", 20)
    td.appendChild(document.createTextNode("二"));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_title';
    dom.setAttr(td, 'rowspan', responseStanderNum * 2);
    td.setAttribute("width", 30)
    td.appendChild(document.createTextNode("岗位职责指标"));
    tr.appendChild(td);

    var tempArray = new Array();
    tempArray = responseArray[0].split('&');

    var td = document.createElement("TD");
    dom.setAttr(td, 'rowspan', 2);
    dom.setAttr(td, 'colspan', 2);
    td.appendChild(document.createTextNode(tempArray[0]));
    tr.appendChild(td);

    var td = document.createElement("TD");
    dom.setAttr(td, 'colspan', 4);
    td.appendChild(document.createTextNode(tempArray[1]));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_fun';
    dom.setAttr(td, 'rowspan', 2);
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_weight';
    dom.setAttr(td, 'rowspan', responseStanderNum * 2);
    td.appendChild(document.createTextNode("20%"));
    tr.appendChild(td);

    tbody.appendChild(tr);

    var tr = document.createElement("TR");

    var td = document.createElement("TD");
    td.className = 'td_score_type';
    td.appendChild(document.createTextNode("优（90~100）"));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_score_type';
    td.appendChild(document.createTextNode("良（70~80）"));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_score_type';
    td.appendChild(document.createTextNode("中（40~60）"));
    tr.appendChild(td);
    var td = document.createElement("TD");
    td.className = 'td_score_type';
    td.appendChild(document.createTextNode("差（0~30）"));
    tr.appendChild(td);

    tbody.appendChild(tr);

    //岗位职责指标其他行
    for (var i = 1; i < responseArray.length; i++) {
        var tempArray = new Array();
        tempArray = responseArray[i].split('&');

        var tr = document.createElement("TR");

        var td = document.createElement("TD");
        dom.setAttr(td, 'rowspan', 2);
        dom.setAttr(td, 'colspan', 2);
        td.appendChild(document.createTextNode(tempArray[0]));
        tr.appendChild(td);

        var td = document.createElement("TD");
        dom.setAttr(td, 'colspan', 4);
        td.appendChild(document.createTextNode(tempArray[1]));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.className = 'td_fun';
        dom.setAttr(td, 'rowspan', 2);
        tr.appendChild(td);

        tbody.appendChild(tr);

        var tr = document.createElement("TR");

        var td = document.createElement("TD");
        td.className = 'td_score_type';
        td.appendChild(document.createTextNode("优（90~100）"));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.className = 'td_score_type';
        td.appendChild(document.createTextNode("良（70~80）"));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.className = 'td_score_type';
        td.appendChild(document.createTextNode("中（40~60）"));
        tr.appendChild(td);
        var td = document.createElement("TD");
        td.className = 'td_score_type';
        td.appendChild(document.createTextNode("差（0~30）"));
        tr.appendChild(td);

        tbody.appendChild(tr);
    }

    //岗位胜任能力指标第一行
    var tr = document.createElement("TR");

    var td = document.createElement("TD");
    td.className = 'td_title';
    dom.setAttr(td, 'rowspan', abilityStanderNum * 2);
    td.setAttribute("width", 20)
    td.appendChild(document.createTextNode("三"));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_title';
    dom.setAttr(td, 'rowspan', abilityStanderNum * 2);
    td.setAttribute("width", 30)
    td.appendChild(document.createTextNode("岗位胜任能力指标"));
    tr.appendChild(td);

    var standerTemp = GetStanderByID(abilityArray[0], standerLib);
    if (standerTemp == null) {
        $.ligerDialog.error('获取数据失败!');
        return;
    }

    var td = document.createElement("TD");
    dom.setAttr(td, 'rowspan', 2);
    dom.setAttr(td, 'colspan', 2);
    td.appendChild(document.createTextNode(standerTemp.SlName));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.appendChild(document.createTextNode(standerTemp.SlContentA));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.appendChild(document.createTextNode(standerTemp.SlContentB));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.appendChild(document.createTextNode(standerTemp.SlContentC));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.appendChild(document.createTextNode(standerTemp.SlContentD));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_fun';
    dom.setAttr(td, 'rowspan', 2);
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_weight';
    dom.setAttr(td, 'rowspan', abilityStanderNum * 2);
    td.appendChild(document.createTextNode("15%"));
    tr.appendChild(td);

    tbody.appendChild(tr);

    var tr = document.createElement("TR");

    var td = document.createElement("TD");
    td.className = 'td_score_type';
    td.appendChild(document.createTextNode("优（90~100）"));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_score_type';
    td.appendChild(document.createTextNode("良（70~80）"));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_score_type';
    td.appendChild(document.createTextNode("中（40~60）"));
    tr.appendChild(td);
    var td = document.createElement("TD");
    td.className = 'td_score_type';
    td.appendChild(document.createTextNode("差（0~30）"));
    tr.appendChild(td);

    tbody.appendChild(tr);

    //岗位胜任能力指标其他行
    for (var i = 1; i < abilityArray.length; i++) {
        var standerTemp = GetStanderByID(abilityArray[i], standerLib);
        if (standerTemp == null) {
            $.ligerDialog.error('获取数据失败!');
            return;
        }

        var tr = document.createElement("TR");

        var td = document.createElement("TD");
        dom.setAttr(td, 'rowspan', 2);
        dom.setAttr(td, 'colspan', 2);
        td.appendChild(document.createTextNode(standerTemp.SlName));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.appendChild(document.createTextNode(standerTemp.SlContentA));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.appendChild(document.createTextNode(standerTemp.SlContentB));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.appendChild(document.createTextNode(standerTemp.SlContentC));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.appendChild(document.createTextNode(standerTemp.SlContentD));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.className = 'td_fun';
        dom.setAttr(td, 'rowspan', 2);
        tr.appendChild(td);

        tbody.appendChild(tr);

        var tr = document.createElement("TR");

        var td = document.createElement("TD");
        td.className = 'td_score_type';
        td.appendChild(document.createTextNode("优（90~100）"));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.className = 'td_score_type';
        td.appendChild(document.createTextNode("良（70~80）"));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.className = 'td_score_type';
        td.appendChild(document.createTextNode("中（40~60）"));
        tr.appendChild(td);
        var td = document.createElement("TD");
        td.className = 'td_score_type';
        td.appendChild(document.createTextNode("差（0~30）"));
        tr.appendChild(td);

        tbody.appendChild(tr);
    }

    //工作态度指标第一行
    var tr = document.createElement("TR");

    var td = document.createElement("TD");
    td.className = 'td_title';
    dom.setAttr(td, 'rowspan', attitudeStanderNum * 2);
    td.setAttribute("width", 20)
    td.appendChild(document.createTextNode("四"));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_title';
    dom.setAttr(td, 'rowspan', attitudeStanderNum * 2);
    td.setAttribute("width", 30)
    td.appendChild(document.createTextNode("工作态度指标"));
    tr.appendChild(td);

    var standerTemp = GetStanderByID(attitudeArray[0], standerLib);
    if (standerTemp == null) {
        $.ligerDialog.error('获取数据失败!');
        return;
    }

    var td = document.createElement("TD");
    dom.setAttr(td, 'rowspan', 2);
    dom.setAttr(td, 'colspan', 2);
    td.appendChild(document.createTextNode(standerTemp.SlName));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.appendChild(document.createTextNode(standerTemp.SlContentA));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.appendChild(document.createTextNode(standerTemp.SlContentB));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.appendChild(document.createTextNode(standerTemp.SlContentC));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.appendChild(document.createTextNode(standerTemp.SlContentD));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_fun';
    dom.setAttr(td, 'rowspan', 2);
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_weight';
    dom.setAttr(td, 'rowspan', attitudeStanderNum * 2);
    td.appendChild(document.createTextNode("15%"));
    tr.appendChild(td);

    tbody.appendChild(tr);

    var tr = document.createElement("TR");

    var td = document.createElement("TD");
    td.className = 'td_score_type';
    td.appendChild(document.createTextNode("优（90~100）"));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_score_type';
    td.appendChild(document.createTextNode("良（70~80）"));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_score_type';
    td.appendChild(document.createTextNode("中（40~60）"));
    tr.appendChild(td);
    var td = document.createElement("TD");
    td.className = 'td_score_type';
    td.appendChild(document.createTextNode("差（0~30）"));
    tr.appendChild(td);

    tbody.appendChild(tr);

    //工作态度指标其他行
    for (var i = 1; i < attitudeArray.length; i++) {
        var standerTemp = GetStanderByID(attitudeArray[i], standerLib);
        if (standerTemp == null) {
            $.ligerDialog.error('获取数据失败!');
            return;
        }

        var tr = document.createElement("TR");

        var td = document.createElement("TD");
        dom.setAttr(td, 'rowspan', 2);
        dom.setAttr(td, 'colspan', 2);
        td.appendChild(document.createTextNode(standerTemp.SlName));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.appendChild(document.createTextNode(standerTemp.SlContentA));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.appendChild(document.createTextNode(standerTemp.SlContentB));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.appendChild(document.createTextNode(standerTemp.SlContentC));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.appendChild(document.createTextNode(standerTemp.SlContentD));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.className = 'td_fun';
        dom.setAttr(td, 'rowspan', 2);
        tr.appendChild(td);

        tbody.appendChild(tr);

        var tr = document.createElement("TR");

        var td = document.createElement("TD");
        td.className = 'td_score_type';
        td.appendChild(document.createTextNode("优（90~100）"));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.className = 'td_score_type';
        td.appendChild(document.createTextNode("良（70~80）"));
        tr.appendChild(td);

        var td = document.createElement("TD");
        td.className = 'td_score_type';
        td.appendChild(document.createTextNode("中（40~60）"));
        tr.appendChild(td);
        var td = document.createElement("TD");
        td.className = 'td_score_type';
        td.appendChild(document.createTextNode("差（0~30）"));
        tr.appendChild(td);

        tbody.appendChild(tr);
    }

    //否决指标
    var tr = document.createElement("TR");

    var td = document.createElement("TD");
    td.className = 'td_title';
    dom.setAttr(td, 'rowspan', 6);
    td.setAttribute("width", 20)
    td.appendChild(document.createTextNode("五"));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_title';
    dom.setAttr(td, 'rowspan', 6);
    td.setAttribute("width", 30)
    td.appendChild(document.createTextNode("否决指标"));
    tr.appendChild(td);

    var td = document.createElement("TD");
    dom.setAttr(td, 'rowspan', 5);
    dom.setAttr(td, 'colspan', 2);
    td.appendChild(document.createTextNode("严重违反规章制度"));
    tr.appendChild(td);

    var td = document.createElement("TD");
    dom.setAttr(td, 'colspan', 3);
    td.setAttribute("width", 360);
    td.appendChild(document.createTextNode("累计旷工3天以上的"));
    tr.appendChild(td);

    var td = document.createElement("TD");
    dom.setAttr(td, 'rowspan', 5);
    td.className = 'td_score_type';
    td.appendChild(document.createTextNode("-100或0"));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_fun';
    dom.setAttr(td, 'rowspan', 6);
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_weight';
    dom.setAttr(td, 'rowspan', 6);
    td.appendChild(document.createTextNode("100%"));
    tr.appendChild(td);

    tbody.appendChild(tr);

    var tr = document.createElement("TR");
    var td = document.createElement("TD");
    dom.setAttr(td, 'colspan', 3);
    td.setAttribute("width", 360);
    td.appendChild(document.createTextNode("严重失职，营私舞弊，给本单位造成3000元以上经济损失或者其它严重后果的<"));
    tr.appendChild(td);
    tbody.appendChild(tr);

    var tr = document.createElement("TR");
    var td = document.createElement("TD");
    dom.setAttr(td, 'colspan', 3);
    td.setAttribute("width", 360);
    td.appendChild(document.createTextNode("同时与其他用人单位建立劳动关系，对完成本单位工作任务造成严重影响，或者经本单位提出，拒不改正的"));
    tr.appendChild(td);
    tbody.appendChild(tr);

    var tr = document.createElement("TR");
    var td = document.createElement("TD");
    dom.setAttr(td, 'colspan', 3);
    td.setAttribute("width", 360);
    td.appendChild(document.createTextNode("违背职业道德，行贿、受贿价值超过3000元以上的"));
    tr.appendChild(td);
    tbody.appendChild(tr);

    var tr = document.createElement("TR");
    var td = document.createElement("TD");
    dom.setAttr(td, 'colspan', 3);
    td.setAttribute("width", 360);
    td.appendChild(document.createTextNode("被依法追究刑事责任的"));
    tr.appendChild(td);
    tbody.appendChild(tr);

    var tr = document.createElement("TR");

    var td = document.createElement("TD");
    dom.setAttr(td, 'colspan', 2);
    td.setAttribute("width", 120);
    td.appendChild(document.createTextNode("其它"));
    tr.appendChild(td);

    var td = document.createElement("TD");
    dom.setAttr(td, 'colspan', 4);
    td.setAttribute("width", 480);
    td.appendChild(document.createTextNode(assessTable.AtVetoOthers));
    tr.appendChild(td);

    tbody.appendChild(tr);

    table.appendChild(tbody);
    var div = document.getElementById("AssessTable");
    while (div.hasChildNodes()) //当div下还存在子节点时 循环继续
    {
        div.removeChild(div.firstChild);
    }
    div.appendChild(table);

//    //    显示表头
//    document.getElementById('LEEvaluatdName').innerText = EvaluatedUserInfo.UiName;
//    document.getElementById('LEJobName').innerText = EvaluatedUserInfo.UiJob;
//    document.getElementById('LEDep').innerText = EvaluatedUserInfo.UiDepartment;
//    document.getElementById('LEUnit').innerText = EvaluatedUserInfo.UiCompany;
//    document.getElementById('LEStartEndTime').innerText = EvaluatedUserInfo.UiStartTime + " - " + EvaluatedUserInfo.UiStopTime;

    //设置显示隐藏
    $('#ShowAllTables').css('display', 'none');
    $('#ShowTableInfo').css('display', 'block');
    $("#box").css("display", "block");
    $("#Title").css("display", "none");
}

//返回
function back() {
    $('#TrShowAllTables').css('display', 'block');
    $('#TrShowTableInfo').css('display', 'none');
    $('#ShowAllTables').css('display', 'block');
    $('#ShowTableInfo').css('display', 'none');
}