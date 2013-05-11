
var standerLib = null;
var AssessTables = null;
var Manager = null;
var minNum = 1;
//初始化
//$(function () {
//    $("#DepType").ligerComboBox({
//        data: DepartmentData, valueFieldID: 'type_value', initText: '所有部门', width: 70
//    });
//    $("#PassedType").ligerComboBox({
//        data: DepartmentData, valueFieldID: 'type_value', initText: '所有状态', width: 70
//    });
//});

//处理
function search() {
    document.getElementById("LoadButton").click();
}
//显示考核表信息
function ShowAllTables() {
    var data = document.getElementById("JsonData").value;
    var data2 = document.getElementById("JsonData2").value;
    if (data == null || data == ""||data2 == null || data2 == "")
        return;
    AssessTables = JSON2.parse(data);
    standerLib = JSON2.parse(data2);
    Manager = $("#maingrid").ligerGrid({
        columns: [
    { display: '编号', name: 'AtID', width: 50, align: 'center', frozen: true },
    { display: '制作人', name: 'AtUserID', width: 100, align: 'center' },
    { display: '部门', name: 'AtDep', width: 120, align: 'center' },
    { display: '提交时间', name: 'AtDate', width: 120, align: 'center' },
    { display: '审核状态', width: 100, align: 'center', render: function (rowdata, rowindex, value) {
        var h = "";
        if (rowdata.AtPass == 0) {
            h = "审核未通过";
        }
        else if (rowdata.AtPass == 1) {
            h = "审核已通过";
        }
        return h;
    }},
    { display: '', isSort: false, width: 100, render: function (rowdata, rowindex, value) {
        var h = "";
//        if (rowdata.AtPass == 0) {
//            h += "<a href='javascript:SetPassedTrue(" + rowindex + ")'>审核通过</a> ";
//        }
//        else if (rowdata.AtPass == 1) {
//            h += "<a href='javascript:SetPassedFalse(" + rowindex + ")'>审核未通过</a> ";
//        }
        h += "<a href='javascript:ShowDetail(" + rowindex + ", " + rowdata.AtPass + ")'>查看</a> ";
        return h;
    }
    }],
        usePager: true, pageSize: 10,
        data: AssessTables,
        height: '100%',
        isScroll: false,
        onSelectRow: function (rowdata, rowindex) {
            $("#txtrowindex").val(rowindex);
        }
    });
    $('#pageloading').hide();
    Manager.loadData(AssessTables);
}

//设置审核
function SetPassedTrue() {
    if (window.confirm("确认通过？")) {
        var rowindex = document.getElementById("RowIndex").value;
        var rowdata = Manager.getSelectedRow(rowindex);    //取得数据
        if (rowdata == null)
            return;
        document.getElementById("JsonData").value = rowdata.AtID;
        document.getElementById("JsonData2").value = "true";
        document.getElementById("JsonData3").value = rowindex;
        document.getElementById("BSetPassed").click();
        location = location;
    }
}

function SetPassedFalse() {
    if (window.confirm("确认退回？")) {
        var rowindex = document.getElementById("RowIndex").value;
        var rowdata = Manager.getSelectedRow(rowindex);    //取得数据
        if (rowdata == null)
            return;
        document.getElementById("JsonData").value = rowdata.AtID;
        document.getElementById("JsonData2").value = "false";
        document.getElementById("JsonData3").value = rowindex;
        document.getElementById("BSetPassed").click();
        location = location;
    }
}

//设置审核完成
function SetPassedDone() {
    alert('设置成功！');
    var rowindex = document.getElementById("JsonData3").value;
    var type = document.getElementById("JsonData2").value;
    if (rowindex == null || rowindex == "" || type == null || type == "")
        return;
    var rowdata = Manager.getSelectedRow(rowindex);    //取得数据
    if (rowdata == null)
        return;
    if (type == "true")
        rowdata.AtPass = 1;
    else if (type == "false")
        rowdata.AtPass = 0;
    else
        return;
    Manager.loadData(AssessTables);
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

function ShowDetail(rowindex, atPass) {
    if (atPass == 0) {
        document.getElementById("pass_button").style.display = "";
    }
    else {
        document.getElementById("sendback_button").style.display = "";
    }
    document.getElementById("dao_button").style.display = "";

    document.getElementById("RowIndex").value = rowindex;
    var assessTable = Manager.getSelectedRow(rowindex);    //取得数据
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

    //设置显示隐藏
    $('#ShowAllTables').css('display', 'none');
    $('#ShowTableInfo').css('display', 'block');
}

//返回
function back() {
    $('#TrShowAllTables').css('display', 'block');
    $('#TrShowTableInfo').css('display', 'none');
    $('#ShowAllTables').css('display', 'block');
    $('#ShowTableInfo').css('display', 'none');
}