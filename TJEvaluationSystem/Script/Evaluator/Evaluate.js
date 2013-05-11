var Manager = null;
var EvaluateData = null;
var standerLib = null;
var Evaluatetable = null;
var minNum = 1;
var keyResponseScoreArray = null;
var keyAbilityScoreArray = null;
var keyAttitudeScoreArray = null;
var responseScoreArray = null;
var AbilityScoreArray = null;
var AttitudeScoreArray = null;

var keyResponse1 = false;
var keyResponse2 = false;
var keyResponse3 = false;
var keyAbility1 = false;
var keyAbility2 = false;
var keyAbility3 = false;
var keyAttitude1 = false;
var keyAttitude2 = false;
var keyAttitude3 = false;
var response1 = false;
var response2 = false;
var response3 = false;
var ability1 = false;
var ability2 = false;
var ability3 = false;
var ability4 = false;
var attitude1 = false;
var attitude2 = false;
var attitude3 = false;
var attitude4 = false;

$(function () {
    $('#EvaluateToolBar').css('display', 'none');
    var scoreData = [
    { text: '0', id: '0' },{ text: '1', id: '1' },{ text: '2', id: '2' },
    { text: '3', id: '3' },{ text: '4', id: '4' },{ text: '5', id: '5' },
    { text: '6', id: '6' },{ text: '7', id: '7' },{ text: '8', id: '8' },
    { text: '9', id: '9' },{ text: '10', id: '10' }
    ];
    var scoreData2 = [
    { text: '0', id: '0' }, { text: '-1', id: '1' }
    ];
    $('.my_combobox').ligerComboBox({
        data: scoreData, valueFieldID: 'type_value', initText: '10', width: 50
    });
    $('#CBVetoScore').ligerComboBox({
        data: scoreData2, valueFieldID: 'type_value', initText: '0', width: 50
    });
    $('#pageloading').hide();
});

//考评尚未开始
function NoActiveEvaluation() {
    f_alert('warn', '考评尚未开始！');
}


function ShowAllEavluateUsers() {

    var data = document.getElementById("JsonData").value;
    if (data == null || data == "")
        return;
    $('#EvaluateToolBar').css('display', 'none');
    $('#ShowEvaluateUsers').css('display', 'block');
    $('#ShowEvaluateTable').css('display', 'none');
    var userData = JSON2.parse(data);
    if (userData.Total == 0) {
        $.ligerDialog.alert('不存在考评', '提示', 'none');
        $('#ShowEvaluateUsers').css('display', 'none');
        return;
    }
    Manager = $("#maingrid").ligerGrid({
        columns: [
    { display: '被考评人', name: 'EvaluatedID', width: 100, align: 'center'},
    { display: '关系', name: 'Relation', width: 100, align: 'center' },
    { display: '', isSort: false, width: 100, render: function (rowdata, rowindex, value) {
        var h = "";
        h += "<a href='javascript:Evaluate(" + rowindex + ")'>考评</a> ";
        return h;
    }
    }],
        usePager: true, pageSize: 10,
        data: userData,
        height: '100%',
        isScroll: false,
        onSelectRow: function (rowdata, rowindex) {
            $("#txtrowindex").val(rowindex);
        }
    });
    
}


//考评
function Evaluate(rowindex) {
    var rowdata = Manager.getSelectedRow(rowindex);    //取得数据
    if (rowdata == null)
        return;
    EvaluateData = rowdata;
    document.getElementById("JsonData").value = rowdata.EvaluatedID;
    document.getElementById("JsonData2").value = rowdata.UiID;
    document.getElementById("BGetEvaluateData").click();
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

//开始考评
function StartEvaluate() {
    var jsonData = document.getElementById("JsonData").value;
    var jsonData2 = document.getElementById("JsonData2").value;
    if (jsonData == null || jsonData == "" || jsonData2 == null || jsonData2 == "")
        return;
    var assessTable = JSON2.parse(jsonData)[0];
    Evaluatetable = assessTable;
    standerLib = JSON2.parse(jsonData2);
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

    var keyResponseScoreArray = new Array();
    var keyAbilityScoreArray = new Array();
    var keyAttitudeScoreArray = new Array();
    var responseScoreArray = new Array();
    var abilityScoreArray = new Array();
    var attitudeScoreArray = new Array();
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
    td.setAttribute("width", 30);
    td.appendChild(document.createTextNode("关键绩效指标"));
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.className = 'td_title';
    dom.setAttr(td, 'rowspan', keyResponseArray.length * 2);
    td.setAttribute("width", 30);
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
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.className = 'td_score';
    td.appendChild(input);
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

    $('#EvaluateToolBar').css('display', 'block');
    $('#ShowEvaluateUsers').css('display', 'none');
    $('#ShowEvaluateTable').css('display', 'block');
   
}

//提交考评
function FinishEvaluate() {
    $.ligerDialog.confirm('确认提交考评？', function (yes) {
        if (EvaluateData == null || Evaluatetable == null)
            return;
        var key = 0;
        var keyScore = 0;
        if (keyResponse1 == true) {
            key++;
            keyScore += parseInt($('#CBKeyResponse1Score').val());
        }
        if (keyResponse2 == true) {
            key++;
            keyScore += parseInt($('#CBKeyResponse2Score').val());
        }
        if (keyResponse3 == true) {
            key++;
            keyScore += parseInt($('#CBKeyResponse3Score').val());
        }
        if (keyAbility1 == true) {
            key++;
            keyScore += parseInt($('#CBKeyAbility1Score').val());
        }
        if (keyAbility2 == true) {
            key++;
            keyScore += parseInt($('#CBKeyAbility2Score').val());
        }
        if (keyAbility3 == true) {
            key++;
            keyScore += parseInt($('#CBKeyAbility3Score').val());
        }
        if (keyAttitude1 == true) {
            key++;
            keyScore += parseInt($('#CBKeyAttitude1Score').val());
        }
        if (keyAttitude2 == true) {
            key++;
            keyScore += parseInt($('#CBKeyAttitude2Score').val());
        }
        if (keyAttitude3 == true) {
            key++;
            keyScore += parseInt($('#CBKeyAttitude3Score').val());
        }
        keyScore = keyScore / key;

        var response = 0;
        var responseScore = 0;
        if (response1 == true) {
            response++;
            responseScore += parseInt($('#CBResponse1Score').val());
        }
        if (response2 == true) {
            response++;
            responseScore += parseInt($('#CBResponse2Score').val());
        }
        if (response3 == true) {
            response++;
            responseScore += parseInt($('#CBResponse3Score').val());
        }
        responseScore = responseScore / response;

        var ability = 0;
        var abilityScore = 0;
        if (ability1 == true) {
            ability++;
            abilityScore += parseInt($('#CBAbility1Score').val());
        }
        if (ability2 == true) {
            ability++;
            abilityScore += parseInt($('#CBAbility2Score').val());
        }
        if (ability3 == true) {
            ability++;
            abilityScore += parseInt($('#CBAbility3Score').val());
        }
        abilityScore = abilityScore / ability;

        var attitude = 0;
        var attitudeScore = 0;
        if (attitude1 == true) {
            attitude++;
            attitudeScore += parseInt($('#CBAttitude1Score').val());
        }
        if (attitude2 == true) {
            attitude++;
            attitudeScore += parseInt($('#CBAttitude2Score').val());
        }
        if (attitude3 == true) {
            attitude++;
            attitudeScore += parseInt($('#CBAttitude3Score').val());
        }
        attitudeScore = attitudeScore / attitude;

        var vetoScore = parseInt($('#CBVetoScore').val());

        var keyWeight = Evaluatetable.AtKeyWeight;
        var responseWeight = Evaluatetable.AtResponseWeight;
        var abilityWeight = Evaluatetable.AtAbilityWeight;
        var attitudeWeight = Evaluatetable.AtAttitudeWeight;
        var sum = keyScore * keyWeight + responseScore * responseWeight + abilityScore * abilityWeight + attitudeScore * attitudeWeight;
        var sum = sum / 100;
        if (vetoScore == -1)
            sum = 0;
        //Create json object.
        var data = [{ EtEvaluatedID: EvaluateData.EvaluatedID,
            EtEvaluateID: EvaluateData.UiID,
            EtAssessTableID: Evaluatetable.AtID,
            EtRelation: EvaluateData.Relation,
            EtEvaluationID:0,
//            EtKey: keyScore,
//            EtResponse: responseScore,
//            EtAbility: abilityScore,
//            EtAttitude: attitudeScore,
//            EtVeto: vetoScore,
//            EtSum: sum
                EtKey: 9.9,
            EtResponse: 9.9,
            EtAbility: 9.9,
            EtAttitude: 9.9,
            EtVeto: 9.9,
            EtSum: 9.9
        }];
        document.getElementById("JsonData").value = JSON.stringify(data);
        document.getElementById("BFinishEvaluate").click();
    });
}