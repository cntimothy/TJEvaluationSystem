//
var assessTable = null;         //考核表
var standerLib = null;          //指标库
var responseStanderLib = null;  //岗位职责

var keyResponse1 = null; var keyResponse1Content = null;
var keyResponse2 = null; var keyResponse2Content = null;
var keyResponse3 = null; var keyResponse3Content = null;
var keyResponse4 = null; var keyResponse4Content = null;
var keyResponse5 = null; var keyResponse5Content = null;
var keyAbility1 = null;
var keyAbility2 = null;
var keyAbility3 = null;
var keyAbility4 = null;
var keyAbility5 = null;
var keyAttitude1 = null;
var keyAttitude2 = null;
var keyAttitude3 = null;
var keyAttitude4 = null;
var keyAttitude5 = null;
var response1 = null; var response1Content = null;
var response2 = null; var response2Content = null;
var response3 = null; var response3Content = null;
var response4 = null; var response4Content = null;
var response5 = null; var response5Content = null;
var ability1 = null;
var ability2 = null;
var ability3 = null;
var ability4 = null;
var ability5 = null;
var attitude1 = null;
var attitude2 = null;
var attitude3 = null;
var attitude4 = null;
var attitude5 = null;
var vetoOthers = null;

var managerStanderLib = null;
var managerResponse = null;
var stdType = null;         //指标标识，用于选择指标
var tableData = null;
var userData = null;
var Evaluated = null;
var minNum = 1;
var selectUser = null;  //选择的被考评人信息


//制作考核表
function MakeAssessTable() {

    standerLib = JSON2.parse(document.getElementById("JsonData").value);
    responseStanderLib = JSON2.parse(document.getElementById("JsonData2").value);
    if (standerLib == null || standerLib == "" || responseStanderLib == null || responseStanderLib == "") {
        $.ligerDialog.error('获取数据失败!');
        return;
    }
    ShowStander();
    ShowResponseStander();
    //重置考核表
    ResetAssessTable();

    //显示表头
    document.getElementById('LMEEvaluatdName').innerText = selectUser.UiName;
    document.getElementById('LMEJobName').innerText = selectUser.UiJob;
    document.getElementById('LMEDep').innerText = selectUser.UiDepartment;
    document.getElementById('LMEUnit').innerText = selectUser.UiCompany;
    document.getElementById('LMETime').innerText = selectUser.UiStartTime + " - " + selectUser.UiStopTime;

    //设置显示隐藏
    $("#ShowUserList").css("display", "none");
    $("#MakeEditAssessTable").css("display", "block");
    $("#ViewAssessTable").css("display", "none");
    $("#MakeTableBar").css("display", "block");
    $("#EditTableBar").css("display", "none");
}

//保存考核表
function FinishMakeTable() {
    var json = GetTableData();
    var id = selectUser.UiID;
    if (json == null || json == "" || id == null || id == "")
        return;
    document.getElementById("JsonData").value = JSON.stringify(json);
    document.getElementById("JsonData2").value = id;
    document.getElementById("BFinishMakeTable").click();
}

//保存制作成功
function SaveMakeTableDone() {
    $.ligerDialog.success('保存成功!');
    document.getElementById("BRefresh").click();
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

//编辑考核表
function EditAssessTable() {
    //重置考核表
    ResetAssessTable();
    standerLib = JSON2.parse(document.getElementById("JsonData").value);
    responseStanderLib = JSON2.parse(document.getElementById("JsonData2").value);
    assessTable = JSON2.parse(document.getElementById("JsonData3").value);
    if (standerLib == null || standerLib == "" || responseStanderLib == null || responseStanderLib == "" || assessTable == null || assessTable == "") {
        $.ligerDialog.error('获取数据失败!');
        return;
    }
    ShowStander();
    ShowResponseStander();

    //显示考核表内容
    //显示岗位职责指标
    function ShowResponse(nameID, contentID, str) {
        if (str != null && str != "") {
            var strArr = new Array();
            strArr = str.split('&');
            $(nameID).html(strArr[0]);
            $(contentID).html(strArr[1]);
            return strArr;
        }
        return null;
    }
    //显示其他指标
    function ShowSelectStander(stdID, nameID, contentAID, contentBID, contentCID, contentDID) {
        var std = GetStanderByID(stdID, standerLib.Rows);
        if (std == null)
            return null;
        $(nameID).html(std.SlName);
        $(contentAID).html(std.SlContentA);
        $(contentBID).html(std.SlContentB);
        $(contentCID).html(std.SlContentC);
        $(contentDID).html(std.SlContentD);
        stander = stdID;
        return stdID;
    }
    var arrayTemp = ShowResponse('#LKeyResponse1Name', '#LKeyResponse1Content', assessTable.AtKeyResponse1);
    if (arrayTemp != null) {
        keyResponse1 = arrayTemp[0];
        keyResponse1Content = arrayTemp[1];
    }
    var arrayTemp = ShowResponse('#LKeyResponse2Name', '#LKeyResponse2Content', assessTable.AtKeyResponse2);
    if (arrayTemp != null) {
        keyResponse2 = arrayTemp[0];
        keyResponse2Content = arrayTemp[1];
    }
    var arrayTemp = ShowResponse('#LKeyResponse3Name', '#LKeyResponse3Content', assessTable.AtKeyResponse3);
    if (arrayTemp != null) {
        keyResponse3 = arrayTemp[0];
        keyResponse3Content = arrayTemp[1];
    }
    var arrayTemp = ShowResponse('#LKeyResponse4Name', '#LKeyResponse4Content', assessTable.AtKeyResponse4);
    if (arrayTemp != null) {
        keyResponse4 = arrayTemp[0];
        keyResponse4Content = arrayTemp[1];
    }
    var arrayTemp = ShowResponse('#LKeyResponse5Name', '#LKeyResponse5Content', assessTable.AtKeyResponse4);
    if (arrayTemp != null) {
        keyResponse5 = arrayTemp[0];
        keyResponse5Content = arrayTemp[1];
    }
    keyAbility1 = ShowSelectStander(assessTable.AtKeyAbility1, '#LKeyAbility1Name', '#LKeyAbility1ContentA', '#LKeyAbility1ContentB', '#LKeyAbility1ContentC', '#LKeyAbility1ContentD');
    keyAbility2 = ShowSelectStander(assessTable.AtKeyAbility2, '#LKeyAbility2Name', '#LKeyAbility2ContentA', '#LKeyAbility2ContentB', '#LKeyAbility2ContentC', '#LKeyAbility2ContentD');
    keyAbility3 = ShowSelectStander(assessTable.AtKeyAbility3, '#LKeyAbility3Name', '#LKeyAbility3ContentA', '#LKeyAbility3ContentB', '#LKeyAbility3ContentC', '#LKeyAbility3ContentD');
    keyAbility4 = ShowSelectStander(assessTable.AtKeyAbility4, '#LKeyAbility4Name', '#LKeyAbility4ContentA', '#LKeyAbility4ContentB', '#LKeyAbility4ContentC', '#LKeyAbility4ContentD');
    keyAbility5 = ShowSelectStander(assessTable.AtKeyAbility5, '#LKeyAbility5Name', '#LKeyAbility5ContentA', '#LKeyAbility5ContentB', '#LKeyAbility5ContentC', '#LKeyAbility5ContentD');
    keyAttitude1 = ShowSelectStander(assessTable.AtKeyAttitude1, '#LKeyAttitude1Name', '#LKeyAttitude1ContentA', '#LKeyAttitude1ContentB', '#LKeyAttitude1ContentC', '#LKeyAttitude1ContentD');
    keyAttitude2 = ShowSelectStander(assessTable.AtKeyAttitude2, '#LKeyAttitude2Name', '#LKeyAttitude2ContentA', '#LKeyAttitude2ContentB', '#LKeyAttitude2ContentC', '#LKeyAttitude2ContentD');
    keyAttitude3 = ShowSelectStander(assessTable.AtKeyAttitude3, '#LKeyAttitude3Name', '#LKeyAttitude3ContentA', '#LKeyAttitude3ContentB', '#LKeyAttitude3ContentC', '#LKeyAttitude3ContentD');
    keyAttitude4 = ShowSelectStander(assessTable.AtKeyAttitude4, '#LKeyAttitude4Name', '#LKeyAttitude4ContentA', '#LKeyAttitude4ContentB', '#LKeyAttitude4ContentC', '#LKeyAttitude4ContentD');
    keyAttitude5 = ShowSelectStander(assessTable.AtKeyAttitude5, '#LKeyAttitude5Name', '#LKeyAttitude5ContentA', '#LKeyAttitude5ContentB', '#LKeyAttitude5ContentC', '#LKeyAttitude5ContentD');
    var arrayTemp = ShowResponse('#LResponse1Name', '#LResponse1Content', assessTable.AtResponse1);
    if (arrayTemp != null) {
        response1 = arrayTemp[0];
        response1Content = arrayTemp[1];
    }
    var arrayTemp = ShowResponse('#LResponse2Name', '#LResponse2Content', assessTable.AtResponse2);
    if (arrayTemp != null) {
        response2 = arrayTemp[0];
        response2Content = arrayTemp[1];
    }
    var arrayTemp = ShowResponse('#LResponse3Name', '#LResponse3Content', assessTable.AtResponse3);
    if (arrayTemp != null) {
        response3 = arrayTemp[0];
        response3Content = arrayTemp[1];
    }
    var arrayTemp = ShowResponse('#LResponse4Name', '#LResponse4Content', assessTable.AtResponse4);
    if (arrayTemp != null) {
        response4 = arrayTemp[0];
        response4Content = arrayTemp[1];
    }
    var arrayTemp = ShowResponse('#LResponse5Name', '#LResponse5Content', assessTable.AtResponse5);
    if (arrayTemp != null) {
        response5 = arrayTemp[0];
        response5Content = arrayTemp[1];
    }
    ability1 = ShowSelectStander(assessTable.AtAbility1, '#LAbility1Name', '#LAility1ContentA', '#LAbility1ContentB', '#LAbility1ContentC', '#LAbility1ContentD');
    ability2 = ShowSelectStander(assessTable.AtAbility2, '#LAbility2Name', '#LAbility2ContentA', '#LAbility2ContentB', '#LAbility2ContentC', '#LAbility2ContentD');
    ability3 = ShowSelectStander(assessTable.AtAbility3, '#LAbility3Name', '#LAbility3ContentA', '#LAbility3ContentB', '#LAbility3ContentC', '#LAbility3ContentD');
    ability4 = ShowSelectStander(assessTable.AtAbility4, '#LAbility4Name', '#LAbility4ContentA', '#LAbility4ContentB', '#LAbility4ContentC', '#LAbility4ContentD');
    ability5 = ShowSelectStander(assessTable.AtAbility5, '#LAbility5Name', '#LAbility5ContentA', '#LAbility5ContentB', '#LAbility5ContentC', '#LAbility5ContentD');
    attitude1 = ShowSelectStander(assessTable.AtAttitude1, '#LAttitude1Name', '#LAttitude1ContentA', '#LAttitude1ContentB', '#LAttitude1ContentC', '#LAttitude1ContentD');
    attitude2 = ShowSelectStander(assessTable.AtAttitude2, '#LAttitude2Name', '#LAttitude2ContentA', '#LAttitude2ContentB', '#LAttitude2ContentC', '#LAttitude2ContentD');
    attitude3 = ShowSelectStander(assessTable.AtAttitude3, '#LAttitude3Name', '#LAttitude3ContentA', '#LAttitude3ContentB', '#LAttitude3ContentC', '#LAttitude3ContentD');
    attitude4 = ShowSelectStander(assessTable.AtAttitude4, '#LAttitude4Name', '#LAttitude4ContentA', '#LAttitude4ContentB', '#LAttitude4ContentC', '#LAttitude4ContentD');
    attitude5 = ShowSelectStander(assessTable.AtAttitude5, '#LAttitude5Name', '#LAttitude5ContentA', '#LAttitude5ContentB', '#LAttitude5ContentC', '#LAttitude5ContentD');
    $('#TVetoOthers').html(assessTable.AtVetoOthers);

    //设置显示隐藏
    $("#ShowUserList").css("display", "none");
    $("#MakeEditAssessTable").css("display", "block");
    $("#ViewAssessTable").css("display", "none");
    $("#MakeTableBar").css("display", "none");
    $("#EditTableBar").css("display", "block");
}

//保存考核表
function FinishEditTable() {
    var json = GetTableData();
    var id = selectUser.UiID;
    if (json == null || json == "" || id == null || id == "")
        return;
    document.getElementById("JsonData").value = JSON.stringify(json);
    document.getElementById("JsonData2").value = id;
    document.getElementById("BFinishEditTable").click();
}

//保存制作成功
function SaveEditTableDone() {
    $.ligerDialog.success('保存成功!');
    document.getElementById("BRefresh").click();
}

function ViewAssessTable() {
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
    //重置考核表
    ResetAssessTable();
    standerLib = JSON2.parse(document.getElementById("JsonData").value);
    assessTable = JSON2.parse(document.getElementById("JsonData3").value);
    if (standerLib == null || standerLib == "" || assessTable == null || assessTable == "") {
        $.ligerDialog.error('获取数据失败!');
        return;
    }

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

    var standerTemp = GetStanderByID(keyAbilityArray[0], standerLib.Rows);
    if (standerTemp == null) {
        $.ligerDialog.error('获取数据失败!');
        return;
    }

    var td = document.createElement("TD");
    dom.setAttr(td, 'rowspan',2);
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
        var standerTemp = GetStanderByID(keyAbilityArray[i], standerLib.Rows);
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

    var standerTemp = GetStanderByID(keyAttitudeArray[0], standerLib.Rows);
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
        var standerTemp = GetStanderByID(keyAttitudeArray[i], standerLib.Rows);
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

    var standerTemp = GetStanderByID(abilityArray[0], standerLib.Rows);
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
        var standerTemp = GetStanderByID(abilityArray[i], standerLib.Rows);
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

    var standerTemp = GetStanderByID(attitudeArray[0], standerLib.Rows);
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
        var standerTemp = GetStanderByID(attitudeArray[i], standerLib.Rows);
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
    var div = document.getElementById("ShowAssessTable");
    while (div.hasChildNodes()) //当div下还存在子节点时 循环继续
    {
        div.removeChild(div.firstChild);
    }
    div.appendChild(table);

    //设置显示隐藏
    $("#ShowUserList").css("display", "none");
    $("#MakeEditAssessTable").css("display", "none");
    $("#ViewAssessTable").css("display", "block");
}

//获取数据
function GetTableData() {
    var keyResponse = new Array();
    if (keyResponse1 != null)
        keyResponse.push(keyResponse1 + '&' + keyResponse1Content);
    if (keyResponse2 != null)
        keyResponse.push(keyResponse2 + '&' + keyResponse2Content);
    if (keyResponse3 != null)
        keyResponse.push(keyResponse3 + '&' + keyResponse3Content);
    if (keyResponse4 != null)
        keyResponse.push(keyResponse4 + '&' + keyResponse4Content);
    if (keyResponse5 != null)
        keyResponse.push(keyResponse5 + '&' + keyResponse5Content);
    if (keyResponse.length < minNum) {
        $.ligerDialog.warn('至少选择2项关键岗位职责指标!');
        return null;
    }
    for (var i = keyResponse.length; i < 5; i++) {
        var temp;
        keyResponse.push(temp);
    }
    var keyAbility = new Array();
    if (keyAbility1 != null)
        keyAbility.push(keyAbility1);
    if (keyAbility2 != null)
        keyAbility.push(keyAbility2);
    if (keyAbility3 != null)
        keyAbility.push(keyAbility3);
    if (keyAbility4 != null)
        keyAbility.push(keyAbility4);
    if (keyAbility5 != null)
        keyAbility.push(keyAbility5);
    if (keyAbility.length < minNum) {
        $.ligerDialog.warn('至少选择2项关键岗位胜任能力指标!');
        return null;
    }
    for (var i = keyAbility.length; i < 5; i++) {
        var temp;
        keyAbility.push(temp);
    }
    var keyAttitude = new Array();
    if (keyAttitude1 != null)
        keyAttitude.push(keyAttitude1);
    if (keyAttitude2 != null)
        keyAttitude.push(keyAttitude2);
    if (keyAttitude3 != null)
        keyAttitude.push(keyAttitude3);
    if (keyAttitude4 != null)
        keyAttitude.push(keyAttitude4);
    if (keyAttitude5 != null)
        keyAttitude.push(keyAttitude5);
    if (keyAttitude.length < minNum) {
        $.ligerDialog.warn('至少选择2项关键工作态度指标!');
        return null;
    }
    for (var i = keyAttitude.length; i < 5; i++) {
        var temp;
        keyAttitude.push(temp);
    }
    var response = new Array();
    if (response1 != null)
        response.push(response1 + '&' + response1Content);
    if (response2 != null)
        response.push(response2 + '&' + response2Content);
    if (response3 != null)
        response.push(response3 + '&' + response3Content);
    if (response4 != null)
        response.push(response4 + '&' + response4Content);
    if (response5 != null)
        response.push(response5 + '&' + response5Content);
    if (response.length < minNum) {
        $.ligerDialog.warn('至少选择2项岗位职责指标!');
        return null;
    }
    for (var i = response.length; i < 5; i++) {
        var temp;
        response.push(temp);
    }
    var ability = new Array();
    if (ability1 != null)
        ability.push(ability1);
    if (ability2 != null)
        ability.push(ability2);
    if (ability3 != null)
        ability.push(ability3);
    if (ability4 != null)
        ability.push(ability4);
    if (ability5 != null)
        ability.push(ability5);
    if (ability.length < minNum) {
        $.ligerDialog.warn('至少选择2项岗位胜任能力指标!');
        return null;
    }
    for (var i = ability.length; i < 5; i++) {
        var temp;
        ability.push(temp);
    }
    var attitude = new Array();
    if (attitude1 != null)
        attitude.push(attitude1);
    if (attitude2 != null)
        attitude.push(attitude2);
    if (attitude3 != null)
        attitude.push(attitude3);
    if (attitude4 != null)
        attitude.push(attitude4);
    if (attitude5 != null)
        attitude.push(attitude5);
    if (attitude.length < minNum) {
        $.ligerDialog.warn('至少选择2项工作态度指标!');
        return null;
    }
    for (var i = attitude.length; i < 5; i++) {
        var temp;
        attitude.push(temp);
    }
    var vetoOthers = document.getElementById('TVetoOthers').innerText;
    var json = [{ AtID: 0,
        AtKeyResponse1: keyResponse[0], AtKeyResponse2: keyResponse[1], AtKeyResponse3: keyResponse[2], AtKeyResponse4: keyResponse[3], AtKeyResponse5: keyResponse[4],
        AtKeyAbility1: keyAbility[0], AtKeyAbility2: keyAbility[1], AtKeyAbility3: keyAbility[2], AtKeyAbility4: keyAbility[3], AtKeyAbility5: keyAbility[4],
        AtKeyAttitude1: keyAttitude[0], AtKeyAttitude2: keyAttitude[1], AtKeyAttitude3: keyAttitude[2], AtKeyAttitude4: keyAttitude[3], AtKeyAttitude5: keyAttitude[4],
        AtResponse1: response[0], AtResponse2: response[1], AtResponse3: response[2], AtResponse4: response[3], AtResponse5: response[4],
        AtAbility1: ability[0], AtAbility2: ability[1], AtAbility3: ability[2], AtAbility4: ability[3], AtAbility5: ability[4],
        AtAttitude1: attitude[0], AtAttitude2: attitude[1], AtAttitude3: attitude[2], AtAttitude4: attitude[3], AtAttitude5: attitude[4],
        AtVetoOthers: vetoOthers
    }];
    return json;
}

//重置考核表
function ResetAssessTable() {
    assessTable = null;         //考核表设空
    //考核表内部对象设为null;
    keyResponse1 = null; keyResponse1Content = null;
    keyResponse2 = null; keyResponse2Content = null;
    keyResponse3 = null; keyResponse3Content = null;
    keyResponse4 = null; keyResponse4Content = null;
    keyResponse5 = null; keyResponse5Content = null;
    keyAbility1 = null;
    keyAbility2 = null;
    keyAbility3 = null;
    keyAbility4 = null;
    keyAbility5 = null;
    keyAttitude1 = null;
    keyAttitude2 = null;
    keyAttitude3 = null;
    keyAttitude4 = null;
    keyAttitude5 = null;
    response1 = null; response1Content = null;
    response2 = null; response2Content = null;
    response3 = null; response3Content = null;
    response4 = null; response4Content = null;
    response5 = null; response5Content = null;
    ability1 = null;
    ability2 = null;
    ability3 = null;
    ability4 = null;
    ability5 = null;
    attitude1 = null;
    attitude2 = null;
    attitude3 = null;
    attitude4 = null;
    attitude5 = null;
    vetoOthers = null;

    stdType = null;
}

//返回到用户列表
function BackToUserList() {
    $("#ShowUserList").css("display", "block");
    $("#MakeEditAssessTable").css("display", "none");
    $("#ViewAssessTable").css("display", "none");
    $("#UserList").css("display", "block");
    $("#UserInfo").css("display", "none");
}

//选择岗位责任指标
function SelectResponseStander(std) {
    if (std == null)
        return;
    stdType = std;
    $("#MakeEditAssessTable").css("display", "none");
    $("#ResponseLib").css("display", "block");
    managerResponse.loadData(responseStanderLib);
}

//返回考核表
function BackToAssessTable() {
    $("#MakeEditAssessTable").css("display", "block");
    $("#ResponseLib").css("display", "none");
    $("#StanderLib").css("display", "none");
}

//显示岗位职责指标
function ShowResponseStander() {
    managerResponse = $("#GResponseLib").ligerGrid({
        columns: [
    { display: '标题', name: 'Title', width: 150, align: 'center' },
    { display: '具体内容', name: 'Content', width: 220, align: 'center' },
    { display: '具体要求', name: 'Request', width: 220, align: 'center' },
    { display: '考核要点', name: 'Point', width: 220, align: 'center' },
    { display: '', isSort: false, width: 50, render: function (rowdata, rowindex, value) {
        var h = "";
        h += "<a href='javascript:SelectResponseRow(" + rowindex + ")'>选择</a> ";
        return h;
    }
    }],
        usePager: true, pageSize: 10,
        data: responseStanderLib,
        width: '100%', height: '100%'
    });
}

//选中岗位责任返回
function SelectResponseRow(rowid) {
    var rowdata = managerResponse.getSelectedRow(rowid);    //取得数据
    if (rowdata == null)
        return;
    if (CheckResponseSelected(rowdata.Title)) {
        $.ligerDialog.warn('该指标已选择，请选择其它指标!');
        return;
    }
    var name = 'L' + stdType.toString() + 'Name';
    var content = 'L' + stdType.toString() + 'Content';
    document.getElementById(name).innerText = rowdata.Title;
    document.getElementById(content).innerText = rowdata.Request;

    switch (stdType) {
        case 'KeyResponse1':
            keyResponse1 = rowdata.Title; keyResponse1Content = rowdata.Request;
            break;
        case 'KeyResponse2':
            keyResponse2 = rowdata.Title; keyResponse2Content = rowdata.Request;
            break;
        case 'KeyResponse3':
            keyResponse3 = rowdata.Title; keyResponse3Content = rowdata.Request;
            break;
        case 'KeyResponse4':
            keyResponse4 = rowdata.Title; keyResponse4Content = rowdata.Request;
            break;
        case 'KeyResponse5':
            keyResponse5 = rowdata.Title; keyResponse5Content = rowdata.Request;
            break;
        case 'Response1':
            response1 = rowdata.Title; response1Content = rowdata.Request;
            break;
        case 'Response2':
            response2 = rowdata.Title; response2Content = rowdata.Request;
            break;
        case 'Response3':
            response3 = rowdata.Title; response3Content = rowdata.Request;
            break;
        case 'Response4':
            response4 = rowdata.Title; response4Content = rowdata.Request;
            break;
        case 'Response5':
            response5 = rowdata.Title; response5Content = rowdata.Request;
            break;
    }

    stdType = null;
    BackToAssessTable();
}

//判断责任指标是否已经选择
function CheckResponseSelected(name) {
    if (keyResponse1 != null && name == keyResponse1.toString())
        return true;
    if (keyResponse2 != null && name == keyResponse2.toString())
        return true;
    if (keyResponse3 != null && name == keyResponse3.toString())
        return true;
    if (keyResponse4 != null && name == keyResponse4.toString())
        return true;
    if (keyResponse5 != null && name == keyResponse5.toString())
        return true;
    if (response1 != null && name == response1.toString())
        return true;
    if (response2 != null && name == response2.toString())
        return true;
    if (response3 != null && name == response3.toString())
        return true;
    if (response4 != null && name == response4.toString())
        return true;
    if (response5 != null && name == response5.toString())
        return true;
    return false;
}

//显示指标
function ShowStander() {
    managerStanderLib = $("#GStanderLib").ligerGrid({
        columns: [
    { display: '编号', name: 'SlID', width: 50, align: 'center', frozen: true },
    { display: '指标类型', name: 'SlType', width: 100, align: 'center' },
    { display: '指标内容', name: 'SlName', width: 120, align: 'center' },
    { display: '', name: 'SlContentA', width: 120, align: 'center', hide: true },
    { display: '', name: 'SlContentB', width: 120, align: 'center', hide: true },
    { display: '', name: 'SlContentC', width: 120, align: 'center', hide: true },
    { display: '', name: 'SlContentD', width: 120, align: 'center', hide: true },
    { display: '', isSort: false, width: 100, render: function (rowdata, rowindex, value) {
        var h = "";
        h += "<a href='javascript:ShowDetailStander(" + rowindex + ")'>查看详细</a> ";
        h += "<a href='javascript:SelectStanderRow(" + rowindex + ")'>选择</a> ";
        return h;
    }
    }],
        usePager: true, pageSize: 10,
        data: standerLib,
        width: '100%', height: '90%'
    });
}

function ShowDetailStander(rowid) {
    var rowdata = managerStanderLib.getSelectedRow(rowid);    //取得数据
    if (rowdata == null)
        return;
    $('#StanderLib').css("display", "none");
    $('#DetailStanderInfo').css("display", "block");
    document.getElementById('LStanderType').innerText = rowdata.SlType;
    document.getElementById('LName').innerText = rowdata.SlName;
    document.getElementById('LContentA').innerText = rowdata.SlContentA;
    document.getElementById('LContentB').innerText = rowdata.SlContentB;
    document.getElementById('LContentC').innerText = rowdata.SlContentC;
    document.getElementById('LContentD').innerText = rowdata.SlContentD;
}

//返回指标列表
function BackToStanderList() {
    $('#StanderLib').css("display", "block");
    $('#DetailStanderInfo').css("display", "none");
}

//查询
function Search() {
    manager.options.data = $.extend(true, {}, standerLib);
    var key = $("#search_content").val();
    if (key == "请输入查询内容")
        manager.loadData(standerLib);
    else
        manager.loadData(GetWhere(key));
}

//查询方法
function GetWhere(key) {
    if (!manager) return null;
    var clause = function (rowdata, rowindex) {
        var type = $("#search_type").val();
        switch (type) {
            case '指标类型':
                return rowdata.SlType.indexOf(key) > -1;
                break;
            case '指标':
                return rowdata.SlName.indexOf(key) > -1;
                break;
            default:
                return rowdata.SlName.indexOf(key) > -1;
                break;
        }
    };
    return clause;
}

//选择指标
function SelectStander(std) {
    if (std == null)
        return;
    stdType = std;
    $("#MakeEditAssessTable").css("display", "none");
    $("#StanderLib").css("display", "block");
    managerStanderLib.loadData(standerLib);
}

//选中指标返回
function SelectStanderRow(rowid) {
    var rowdata = managerStanderLib.getSelectedRow(rowid);    //取得数据
    if (rowdata == null)
        return;
    if (CheckStanderSelected(rowdata.SlID)) {
        $.ligerDialog.warn('该指标已存在，请选择其它指标!');
        return;
    }
    var name = 'L' + stdType.toString() + 'Name';
    var contentA = 'L' + stdType.toString() + 'ContentA';
    var contentB = 'L' + stdType.toString() + 'ContentB';
    var contentC = 'L' + stdType.toString() + 'ContentC';
    var contentD = 'L' + stdType.toString() + 'ContentD';
    document.getElementById(name).innerText = rowdata.SlName;
    document.getElementById(contentA).innerText = rowdata.SlContentA;
    document.getElementById(contentB).innerText = rowdata.SlContentB;
    document.getElementById(contentC).innerText = rowdata.SlContentC;
    document.getElementById(contentD).innerText = rowdata.SlContentD;
    switch (stdType) {
        case 'KeyAbility1':
            keyAbility1 = rowdata.SlID;
            break;
        case 'KeyAbility2':
            keyAbility2 = rowdata.SlID;
            break;
        case 'KeyAbility3':
            keyAbility3 = rowdata.SlID;
            break;
        case 'KeyAbility4':
            keyAbility4 = rowdata.SlID;
            break;
        case 'KeyAbility5':
            keyAbility5 = rowdata.SlID;
            break;
        case 'KeyAttitude1':
            keyAttitude1 = rowdata.SlID;
            break;
        case 'KeyAttitude2':
            keyAttitude2 = rowdata.SlID;
            break;
        case 'KeyAttitude3':
            keyAttitude3 = rowdata.SlID;
            break;
        case 'KeyAttitude4':
            keyAttitude4 = rowdata.SlID;
            break;
        case 'KeyAttitude4':
            keyAttitude5 = rowdata.SlID;
            break;
        case 'Ability1':
            ability1 = rowdata.SlID;
            break;
        case 'Ability2':
            ability2 = rowdata.SlID;
            break;
        case 'Ability3':
            ability3 = rowdata.SlID;
            break;
        case 'Ability4':
            ability4 = rowdata.SlID;
            break;
        case 'Ability5':
            ability5 = rowdata.SlID;
            break;
        case 'Attitude1':
            attitude1 = rowdata.SlID;
            break;
        case 'Attitude2':
            attitude2 = rowdata.SlID;
            break;
        case 'Attitude3':
            attitude3 = rowdata.SlID;
            break;
        case 'Attitude4':
            attitude4 = rowdata.SlID;
            break;
        case 'Attitude5':
            attitude5 = rowdata.SlID;
            break;
        default:
            break;
    }
    stdType = null;
    BackToAssessTable();
}

//判断是否选择
function CheckStanderSelected(id) {
    if (keyAbility1 != null && keyAbility1 == id)
        return true;
    if (keyAbility2 != null && keyAbility2 == id)
        return true;
    if (keyAbility3 != null && keyAbility3 == id)
        return true;
    if (keyAbility4 != null && keyAbility4 == id)
        return true;
    if (keyAbility5 != null && keyAbility5 == id)
        return true;
    if (keyAttitude1 != null && keyAttitude1 == id)
        return true;
    if (keyAttitude2 != null && keyAttitude2 == id)
        return true;
    if (keyAttitude3 != null && keyAttitude3 == id)
        return true;
    if (keyAttitude4 != null && keyAttitude4 == id)
        return true;
    if (keyAttitude5 != null && keyAttitude5 == id)
        return true;
    if (ability1 != null && ability1 == id)
        return true;
    if (ability2 != null && ability2 == id)
        return true;
    if (ability3 != null && ability3 == id)
        return true;
    if (ability4 != null && ability4 == id)
        return true;
    if (ability5 != null && ability5 == id)
        return true;
    if (attitude1 != null && attitude1 == id)
        return true;
    if (attitude2 != null && attitude2 == id)
        return true;
    if (attitude3 != null && attitude3 == id)
        return true;
    if (attitude4 != null && attitude4 == id)
        return true;
    if (attitude5 != null && attitude5 == id)
        return true;
    return false;
}

//删除指标
function DeleteStander(std) {
    if (std == null)
        return;
    switch (std) {
        case 'KeyResponse1':
            keyResponse1 = null; keyResponse1Content = null;
            document.getElementById('LKeyResponse1Name').innerText = "";
            document.getElementById('LKeyResponse1Content').innerText = " ";
            break;
        case 'KeyResponse2':
            keyResponse2 = null; keyResponse2Content = null;
            document.getElementById('LKeyResponse2Name').innerText = "";
            document.getElementById('LKeyResponse2Content').innerText = " ";
            break;
        case 'KeyResponse3':
            keyResponse3 = null; keyResponse3Content = null;
            document.getElementById('LKeyResponse3Name').innerText = "";
            document.getElementById('LKeyResponse3Content').innerText = " ";
            break;
        case 'KeyResponse4':
            keyResponse4 = null; keyResponse4Content = null;
            document.getElementById('LKeyResponse4Name').innerText = "";
            document.getElementById('LKeyResponse4Content').innerText = " ";
            break;
        case 'KeyResponse5':
            keyResponse5 = null; keyResponse5Content = null;
            document.getElementById('LKeyResponse5Name').innerText = "";
            document.getElementById('LKeyResponse5Content').innerText = " ";
            break;
        case 'KeyAbility1':
            keyAbility1 = null; keyAbility1Content = null;
            document.getElementById('LKeyAbility1Name').innerText = "";
            document.getElementById('LKeyAbility1ContentA').innerText = " ";
            document.getElementById('LKeyAbility1ContentB').innerText = "";
            document.getElementById('LKeyAbility1ContentC').innerText = "";
            document.getElementById('LKeyAbility1ContentD').innerText = "";
            break;
        case 'KeyAbility2':
            keyAbility2 = null; keyAbility2Content = null;
            document.getElementById('LKeyAbility2Name').innerText = "";
            document.getElementById('LKeyAbility2ContentA').innerText = " ";
            document.getElementById('LKeyAbility2ContentB').innerText = "";
            document.getElementById('LKeyAbility2ContentC').innerText = "";
            document.getElementById('LKeyAbility2ContentD').innerText = "";
            break;
        case 'KeyAbility3':
            keyAbility3 = null; keyAbility3Content = null;
            document.getElementById('LKeyAbility3Name').innerText = "";
            document.getElementById('LKeyAbility3ContentA').innerText = " ";
            document.getElementById('LKeyAbility3ContentB').innerText = "";
            document.getElementById('LKeyAbility3ContentC').innerText = "";
            document.getElementById('LKeyAbility3ContentD').innerText = "";
            break;
        case 'KeyAbility4':
            keyAbility4 = null; keyAbility4Content = null;
            document.getElementById('LKeyAbility4Name').innerText = "";
            document.getElementById('LKeyAbility4ContentA').innerText = " ";
            document.getElementById('LKeyAbility4ContentB').innerText = "";
            document.getElementById('LKeyAbility4ContentC').innerText = "";
            document.getElementById('LKeyAbility4ContentD').innerText = "";
            break;
        case 'KeyAbility5':
            keyAbility5 = null; keyAbility5Content = null;
            document.getElementById('LKeyAbility5Name').innerText = "";
            document.getElementById('LKeyAbility5ContentA').innerText = " ";
            document.getElementById('LKeyAbility5ContentB').innerText = "";
            document.getElementById('LKeyAbility5ContentC').innerText = "";
            document.getElementById('LKeyAbility5ContentD').innerText = "";
            break;
        case 'KeyAttitude1':
            keyAttitude1 = null; keyAttitude1Content = null;
            document.getElementById('LKeyAttitude1Name').innerText = "";
            document.getElementById('LKeyAttitude1ContentA').innerText = " ";
            document.getElementById('LKeyAttitude1ContentB').innerText = "";
            document.getElementById('LKeyAttitude1ContentC').innerText = "";
            document.getElementById('LKeyAttitude1ContentD').innerText = "";
            break;
        case 'KeyAttitude2':
            keyAttitude2 = null; keyAttitude2Content = null;
            document.getElementById('LKeyAttitude2Name').innerText = "";
            document.getElementById('LKeyAttitude2ContentA').innerText = " ";
            document.getElementById('LKeyAttitude2ContentB').innerText = "";
            document.getElementById('LKeyAttitude2ContentC').innerText = "";
            document.getElementById('LKeyAttitude2ContentD').innerText = "";
            break;
        case 'KeyAttitude3':
            keyAttitude3 = null; keyAttitude3Content = null;
            document.getElementById('LKeyAttitude3Name').innerText = "";
            document.getElementById('LKeyAttitude3ContentA').innerText = " ";
            document.getElementById('LKeyAttitude3ContentB').innerText = "";
            document.getElementById('LKeyAttitude3ContentC').innerText = "";
            document.getElementById('LKeyAttitude3ContentD').innerText = "";
            break;
        case 'KeyAttitude4':
            keyAttitude4 = null; keyAttitude4Content = null;
            document.getElementById('LKeyAttitude4Name').innerText = "";
            document.getElementById('LKeyAttitude4ContentA').innerText = " ";
            document.getElementById('LKeyAttitude4ContentB').innerText = "";
            document.getElementById('LKeyAttitude4ContentC').innerText = "";
            document.getElementById('LKeyAttitude4ContentD').innerText = "";
            break;
        case 'KeyAttitude5':
            keyAttitude5 = null; keyAttitude5Content = null;
            document.getElementById('LKeyAttitude5Name').innerText = "";
            document.getElementById('LKeyAttitude5ContentA').innerText = " ";
            document.getElementById('LKeyAttitude5ContentB').innerText = "";
            document.getElementById('LKeyAttitude5ContentC').innerText = "";
            document.getElementById('LKeyAttitude5ContentD').innerText = "";
            break;
        case 'Response1':
            response1 = null; response1Content = null;
            document.getElementById('LResponse1Name').innerText = "";
            document.getElementById('LResponse1Content').innerText = " ";
            break;
        case 'Response2':
            response2 = null; response2Content = null;
            document.getElementById('LResponse2Name').innerText = "";
            document.getElementById('LResponse2Content').innerText = " ";
            break;
        case 'Response3':
            response3 = null; response3Content = null;
            document.getElementById('LResponse3Name').innerText = "";
            document.getElementById('LResponse3Content').innerText = " ";
            break;
        case 'Response4':
            response4 = null; response4Content = null;
            document.getElementById('LResponse4Name').innerText = "";
            document.getElementById('LResponse4Content').innerText = " ";
            break;
        case 'Response5':
            response5 = null; response5Content = null;
            document.getElementById('LResponse5Name').innerText = "";
            document.getElementById('LResponse5Content').innerText = " ";
            break;
        case 'Ability1':
            ability1 = null; ability1Content = null;
            document.getElementById('LAbility1Name').innerText = "";
            document.getElementById('LAbility1ContentA').innerText = " ";
            document.getElementById('LAbility1ContentB').innerText = "";
            document.getElementById('LAbility1ContentC').innerText = "";
            document.getElementById('LAbility1ContentD').innerText = "";
            break;
        case 'Ability2':
            ability2 = null; ability2Content = null;
            document.getElementById('LAbility2Name').innerText = "";
            document.getElementById('LAbility2ContentA').innerText = " ";
            document.getElementById('LAbility2ContentB').innerText = "";
            document.getElementById('LAbility2ContentC').innerText = "";
            document.getElementById('LAbility2ContentD').innerText = "";
            break;
        case 'Ability3':
            ability3 = null; ability3Content = null;
            document.getElementById('LAbility3Name').innerText = "";
            document.getElementById('LAbility3ContentA').innerText = " ";
            document.getElementById('LAbility3ContentB').innerText = "";
            document.getElementById('LAbility3ContentC').innerText = "";
            document.getElementById('LAbility3ContentD').innerText = "";
            break;
        case 'Ability4':
            ability4 = null; ability4Content = null;
            document.getElementById('LAbility4Name').innerText = "";
            document.getElementById('LAbility4ContentA').innerText = " ";
            document.getElementById('LAbility4ContentB').innerText = "";
            document.getElementById('LAbility4ContentC').innerText = "";
            document.getElementById('LAbility4ContentD').innerText = "";
            break;
        case 'Ability5':
            ability5 = null; ability5Content = null;
            document.getElementById('LAbility5Name').innerText = "";
            document.getElementById('LAbility5ContentA').innerText = " ";
            document.getElementById('LAbility5ContentB').innerText = "";
            document.getElementById('LAbility5ContentC').innerText = "";
            document.getElementById('LAbility5ContentD').innerText = "";
            break;
        case 'Attitude1':
            attitude1 = null; attitude1Content = null;
            document.getElementById('LAttitude1Name').innerText = "";
            document.getElementById('LAttitude1ContentA').innerText = " ";
            document.getElementById('LAttitude1ContentB').innerText = "";
            document.getElementById('LAttitude1ContentC').innerText = "";
            document.getElementById('LAttitude1ContentD').innerText = "";
            break;
        case 'Attitude2':
            attitude2 = null; attitude2Content = null;
            document.getElementById('LAttitude2Name').innerText = "";
            document.getElementById('LAttitude2ContentA').innerText = " ";
            document.getElementById('LAttitude2ContentB').innerText = "";
            document.getElementById('LAttitude2ContentC').innerText = "";
            document.getElementById('LAttitude2ContentD').innerText = "";
            break;
        case 'Attitude3':
            attitude3 = null; attitude3Content = null;
            document.getElementById('LAttitude3Name').innerText = "";
            document.getElementById('LAttitude3ContentA').innerText = " ";
            document.getElementById('LAttitude3ContentB').innerText = "";
            document.getElementById('LAttitude3ContentC').innerText = "";
            document.getElementById('LAttitude3ContentD').innerText = "";
            break;
        case 'Attitude4':
            attitude4 = null; attitude4Content = null;
            document.getElementById('LAttitude4Name').innerText = "";
            document.getElementById('LAttitude4ContentA').innerText = " ";
            document.getElementById('LAttitude4ContentB').innerText = "";
            document.getElementById('LAttitude4ContentC').innerText = "";
            document.getElementById('LAttitude4ContentD').innerText = "";
            break;
        case 'Attitude5':
            attitude5 = null; attitude5Content = null;
            document.getElementById('LAttitude5Name').innerText = "";
            document.getElementById('LAttitude5ContentA').innerText = " ";
            document.getElementById('LAttitude5ContentB').innerText = "";
            document.getElementById('LAttitude5ContentC').innerText = "";
            document.getElementById('LAttitude5ContentD').innerText = "";
            break;
    }
}

//初始化
$(function () {
    var type = [
        { text: '指标类型', id: '2' },
        { text: '指标', id: '3' }
    ];
    $("#search_type").ligerComboBox({
        data: type, valueFieldID: 'type_value', initText: '指标', width: 70
    });
    $("#search_content").ligerTextBox({ nullText: '请输入查询内容' });
    $("#search_content").ligerTextBox({ nullText: '请输入查询内容' });
});

function search() {
    document.getElementById("SearchEvaluated").click();
}

//显示被考评名单
function ShowUserList() {
    var users = document.getElementById("JsonData").value;
    if (users == null || users == "") {
        $.ligerDialog.warn('获取被考评人员数据失败!');
        return;
    }

    //显示被考评人
    userData = JSON2.parse(users);
    Evaluated = $("#UserListGrid").ligerGrid({
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
        { display: '操作', isSort: false, width: 200, render: function (rowdata, rowindex, value) {
            var h = "";
            if (rowdata == null)
                return;

            h += "<a href='javascript:ShowUserInfo(" + rowindex + ")'>查看用户详细信息</a> ";
            h += "<a href='javascript:ViewEvaluateTable(" + rowindex + ")'>查看考核表</a> ";
            return h;
        }
        }],
        usePager: true, pageSize: 20,
        data: userData,
        width: '96%',
        height: '98%'
    });
    $("#pageloading").hide();
}

//查看用户详细信息
function ShowUserInfo(rowid) {
    var rowdata = Evaluated.getSelectedRow(rowid);    //取得数据  
    if (rowdata == null)
        return;
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
    $("#UserList").css("display", "none");
    $("#UserInfo").css("display", "block");
}

//查看考核表
function ViewEvaluateTable(rowid) {
    var rowdata = Evaluated.getSelectedRow(rowid);    //取得数据
    if (rowdata == null)
        return;
    //查找考核表
    selectUser = rowdata;
    document.getElementById("JsonData").value = rowdata.UiID;
    document.getElementById("BGetEvaluateTable").click();
}
