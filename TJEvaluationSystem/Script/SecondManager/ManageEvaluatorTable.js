//
var standerLib = null;
var standerLibVeto = null;

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
var veto1 = false;
var veto2 = false;
var veto3 = false;
var veto4 = false;
var veto5 = false;

var manager = null;
var managerVeto = null;
var stdType = null;
var tableData = null;
var userData = null;
var Evaluated = null;
var UserID = null;

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

//显示被考评名单
function ShowUserList() {
    var users = document.getElementById("JsonData").value;
    if (users == null || users == "" ) {
        $.ligerDialog.warn('获取被考评人员数据失败!');
        return;
    }

    //显示被考评人
    userData = JSON2.parse(users);
    Evaluated = $("#UserListGrid").ligerGrid({
        columns: [
        { display: '用户名', name: 'UiID', width: 100, align: 'center', frozen: true },
        { display: '姓名', name: 'UiName', width: 100, align: 'center' },
        { display: '性别', name: 'UiSex', width: 80, align: 'center' },
        { display: '部门', name: 'UiDepartment', width: 150, align: 'center' },
        { display: '手机', name: 'UiMobPhone', width: 120, align: 'center' },
        { display: 'Email', name: 'UiEmail', width: 150, align: 'center' },
        { display: '操作', isSort: false, width: 200, render: function (rowdata, rowindex, value) {
            var h = "";
            h += "<a href='javascript:ShowUserInfo(" + rowindex + ")'>查看用户详细信息</a> ";
            h += "<a href='javascript:ViewEvaluateTable(" + rowindex + ")'>查看考核表</a> ";
            return h;
        }
        }],
        usePager: true, pageSize: 10,
        data: userData,
        width: '100%', height: '98%'
    });
    $("#pageloading").hide();
}

function ShowUserInfo(rowid) {
    var rowdata = Evaluated.getSelectedRow(rowid);    //取得数据  
    if (rowdata == null)
        return;
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
    $("#UserList").css("display", "none");
    $("#UserInfo").css("display", "block");
}

//查看考核表
function ViewEvaluateTable(rowid) {
    var rowdata = Evaluated.getSelectedRow(rowid);    //取得数据
    if (rowdata == null)
        return;
    //查找考核表
    UserID = rowdata.UiID;
    document.getElementById("JsonData").value = rowdata.UiID;
    document.getElementById("BGetEvaluateTable").click();
}

//显示考核表
function ShowTable() {
    var lib1 = document.getElementById("JsonData").value;
    var lib2 = document.getElementById("JsonData2").value;
    if (lib1 == null || lib1 == "" || lib2 == null || lib2 == "")
    {
        $.ligerDialog.warn('获取指标库数据失败!');
        return;
    }
    ShowStander();
    ShowVetoStander();
    standerLib = JSON2.parse(lib1);
    standerLibVeto = JSON2.parse(lib2);  

    var data=document.getElementById("JsonData3").value;
    if (data == null || data == "") {
        //创建考核表
        $('#TrNoTable').css("display", "block");
        $('#TrViewTable').css("display", "none");
        $.ligerDialog.warn('不存在考核表，请创建!');
    }
    else {
        //查看考核表
        $('#TrNoTable').css("display", "none");
        $('#TrViewTable').css("display", "block");
        tableData = JSON2.parse(data);
        ViewEvaluatorTable();
    }
    $("#ShowUserList").css("display", "none");
    $("#ShowEvaluateTable").css("display", "block");
    $(".ToolBar").css("display", "block");

}

function BackToUserList() {
    $("#ShowUserList").css("display", "block");
    $("#ShowEvaluateTable").css("display", "none");
    $("#UserList").css("display", "block");
    $("#UserInfo").css("display", "none");
}

//显示考核表
function ViewEvaluatorTable() {
    if (tableData == null)
        return;
    var passed = tableData.AtPass;
    if (passed == 0) {
        //未审核
        $('#LPassed').html("未审核!");
        $('#EditTableButton').css('display', 'block');
    }
    else if (passed == 1) {
        //未审核
        $('#LPassed').html("审核已通过!");
        $('#EditTableButton').css('display', 'none');
    }
    else {
        //审核未通过
        $('#LPassed').html("审核未通过!");
        $('#EditTableButton').css('display', 'block');
    }
    $('#EvaluatorTable').css('display', 'block');
    $('.EditTable').css('display', 'none');
    $('.ViewTable').css('display', 'none');
    $('.fun').css('display', 'none');
    $('.score').css('display', 'none');
    $('.EditTableWeight').css('display', 'none');
    $('.ViewTableWeight').css('display', 'block');
    InitEvaluatorTable();
    //显示岗位职责指标
    function ShowResponse(trID, nameID, contentID, str, showClass, editClass) {
        if (str != null&&str!="") {
            var strArr = new Array();
            strArr = str.split('&');
            $(nameID).html(strArr[0]);
            $(contentID).html(strArr[1]);
            $(trID).css("display", "block");
            $(showClass).css('display', 'block');
            $(editClass).css('display', 'none');
            return true;
        }
        return false;
    }
    function getStanderByID(id,lib)
    {
        if(id!=null&&lib!=null)
        {
            for(var row in lib)
            {
                if(lib[row].SlID==id)
                    return lib[row];
            }
        }
        return null;
    }
    //显示否决指标
    function ShowVeto(trID, stdID, contentID,numID) {
        var std = getStanderByID(stdID, standerLibVeto.Rows);
        if (std == null)
            return false ;
        $(contentID).html(std.SlContentA);
        $(numID).val(std.SlID);
        $(trID).css("display", "block");
        return true;
    }
    //显示其他指标
    function ShowOther(trID, stdID, nameID,
                        contentAID, contentBID, contentCID, contentDID, numID) {
        var std=getStanderByID(stdID,standerLib.Rows);
        if(std==null)
            return false;
        $(nameID).html(std.SlName);
        $(contentAID).html(std.SlContentA);
        $(contentBID).html(std.SlContentB);
        $(contentCID).html(std.SlContentC);
        $(contentDID).html(std.SlContentD);
        $(numID).val(std.SlID);
        $(trID).css("display", "block");
        return true;
    }
    if (ShowResponse('#KeyResponse1', '#LKeyResponse1Name', '#LKeyResponse1Content',
                tableData.AtKeyResponse1, '.ShowKeyResponse1', '.EditKeyResponse1'))
        keyResponse1 = true;
    if(ShowResponse('#KeyResponse2', '#LKeyResponse2Name', '#LKeyResponse2Content',
                tableData.AtKeyResponse2, '.ShowKeyResponse2', '.EditKeyResponse2'))
        keyResponse2 = true;
    if(ShowResponse('#KeyResponse3', '#LKeyResponse3Name', '#LKeyResponse3Content',
                tableData.AtKeyResponse3, '.ShowKeyResponse3', '.EditKeyResponse3'))
        keyResponse3 = true;
    if (ShowOther('#KeyAbility1', tableData.AtKeyAbility1, '#LKeyAbility1Name',
              '#LKeyAbility1ContentA', '#LKeyAbility1ContentB', '#LKeyAbility1ContentC', '#LKeyAbility1ContentD', '#KeyAbility1Num'))
        keyAbility1 = true;
    if(ShowOther('#KeyAbility2', tableData.AtKeyAbility2, '#LKeyAbility2Name',
              '#LKeyAbility2ContentA', '#LKeyAbility2ContentB', '#LKeyAbility2ContentC', '#LKeyAbility2ContentD', '#KeyAbility1Num'))
        keyAbility2 = true;
    if(ShowOther('#KeyAbility3', tableData.AtKeyAbility3, '#LKeyAbility3Name',
              '#LKeyAbility3ContentA', '#LKeyAbility3ContentB', '#LKeyAbility3ContentC', '#LKeyAbility3ContentD', '#KeyAbility1Num'))
        keyAbility3 = true;
    if(ShowOther('#KeyAttitude1', tableData.AtKeyAttitude1, '#LKeyAttitude1Name',
              '#LKeyAttitude1ContentA', '#LKeyAttitude1ContentB', '#LKeyAttitude1ContentC', '#LKeyAttitude1ContentD', '#KeyAttitude1Num'))
        keyAttitude1 = true;
    if(ShowOther('#KeyAttitude2', tableData.AtKeyAttitude2, '#LKeyAttitude2Name',
              '#LKeyAttitude2ContentA', '#LKeyAttitude2ContentB', '#LKeyAttitude2ContentC', '#LKeyAttitude2ContentD', '#KeyAttitude2Num'))
        keyAttitude2 = true;
    if(ShowOther('#KeyAttitude3', tableData.AtKeyAttitude3, '#LKeyAttitude3Name',
              '#LKeyAttitude3ContentA', '#LKeyAttitude3ContentB', '#LKeyAttitude3ContentC', '#LKeyAttitude3ContentD', '#KeyAttitude3Num'))
        keyAttitude3 = true;
    if (ShowResponse('#Response1', '#LResponse1Name', '#LResponse1Content',
                tableData.AtResponse1, '.ShowResponse1', '.EditResponse1'))
        response1 = true;
    if(ShowResponse('#Response2', '#LResponse2Name', '#LResponse2Content',
                tableData.AtResponse2, '.ShowResponse2', '.EditResponse2'))
        response2 = true;
    if(ShowResponse('#Response3', '#LResponse3Name', '#LResponse3Content',
                tableData.AtResponse3, '.ShowResponse3', '.EditResponse3'))
        response3 = true;
    if (ShowOther('#Ability1', tableData.AtAbility1, '#LAbility1Name',
              '#LAbility1ContentA', '#LAbility1ContentB', '#LAbility1ContentC', '#LAbility1ContentD', '#Ability1Num'))
        ability1 = true;
    if(ShowOther('#Ability2', tableData.AtAbility2, '#LAbility2Name',
              '#LAbility2ContentA', '#LAbility2ContentB', '#LAbility2ContentC', '#LAbility3ContentD', '#Ability2Num'))
        ability2 = true;
    if(ShowOther('#Ability3', tableData.AtAbility3, '#LAbility3Name',
              '#LAbility3ContentA', '#LAbility3ContentB', '#LAbility3ContentC', '#LAbility3ContentD', '#Ability3Num'))
        ability3 = true;
    if(ShowOther('#Ability4', tableData.AtAbility4, '#LAbility4Name',
              '#LAbility4ContentA', '#LAbility4ContentB', '#LAbility4ContentC', '#LAbility4ContentD', '#Ability4Num'))
        ability4 = true;
    if (ShowOther('#Attitude1', tableData.AtAttitude1, '#LAttitude1Name',
              '#LAttitude1ContentA', '#LAttitude1ContentB', '#LAttitude1ContentC', '#LAttitude1ContentD', '#Attitude1Num'))
        attitude1 = true;
    if(ShowOther('#Attitude2', tableData.AtAttitude2, '#LAttitude2Name',
              '#LAttitude2ContentA', '#LAttitude2ContentB', '#LAttitude2ContentC', '#LAttitude2ContentD', '#Attitude2Num'))
        attitude2 = true;
    if(ShowOther('#Attitude3', tableData.AtAttitude3, '#LAttitude3Name',
              '#LAttitude3ContentA', '#LAttitude3ContentB', '#LAttitude3ContentC', '#LAttitude3ContentD', '#Attitude3Num'))
        attitude3 = true;
    if(ShowOther('#Attitude4', tableData.AtAttitude4, '#LAttitude4Name',
              '#LAttitude4ContentA', '#LAttitude4ContentB', '#LAttitude4ContentC', '#LAttitude4ContentD', '#Attitude4Num'))
        attitude4 = true;
    if (ShowVeto('#Veto1', tableData.AtVeto1, '#LVeto1Content', '#Veto1Num'))
        veto1 = true;
    if (ShowVeto('#Veto2', tableData.AtVeto2, '#LVeto2Content', '#Veto2Num'))
        veto2 = true;
    if (ShowVeto('#Veto3', tableData.AtVeto3, '#LVeto3Content', '#Veto3Num'))
        veto3 = true;
    if (ShowVeto('#Veto4', tableData.AtVeto4, '#LVeto4Content', '#Veto4Num'))
        veto4 = true;
    if(ShowVeto('#Veto5', tableData.AtVeto5, '#LVeto5Content', '#Veto5Num'))
        veto5 = true;
    $('#KeyWeightView').html(tableData.AtKeyWeight);
    $('#ResponseWeightView').html(tableData.AtResponseWeight);
    $('#AbilityWeightView').html(tableData.AtAbilityWeight);
    $('#AttitudeWeightView').html(tableData.AtAttitudeWeight);
}
//开始编辑
function EditEvaluatorTable() {
    $('#ShowTableBar').css("display", "none");
    $('#EditTableBar').css('display', 'block');
    $('#TrMakeTable').css('display', 'none');
    $('#TrEditTable').css('display', 'block');
    $('.EditTable').css('display', 'block');
    $('.fun').css('display', 'block');
    $('.EditTableWeight').css('display', 'block');
    $('.ViewTableWeight').css('display', 'none');
    $('#KeyWeightEdit').val(tableData.AtKeyWeight);
    $('#ResponseWeightEdit').val(tableData.AtResponseWeight);
    $('#AbilityWeightEdit').val(tableData.AtAbilityWeight);
    $('#AttitudeWeightEdit').val(tableData.AtAttitudeWeight);
}

//保存考核表
function FinishEditTable() {
    var json = GetTableData();
    if (json == null||tableData==null)
        return;
    json[0].AtID = tableData.AtID;
    document.getElementById("JsonData").value = JSON.stringify(json);
    document.getElementById("BFinishEditTable").click();
}

//保存编辑成功
function SaveEditTableDone() {
    $('#ShowTableBar').css("display", "block");
    $('#EditTableBar').css('display', 'none');
    $('#TrNoTable').css("display", "none");
    $('#TrViewTable').css("display", "block");
    var data = document.getElementById("JsonData").value;
    tableData = JSON2.parse(data)[0];
    ViewEvaluatorTable();
}

//取消编辑
function CancelEdit() {
    $('#ShowTableBar').css("display", "block");
    $('#EditTableBar').css('display', 'none');
    ViewEvaluatorTable();
}

//重置考核表
function ResetTable() {
    InitEvaluatorTable();
    $('.EditTable').css('display', 'block');
    $('.ViewTable').css('display', 'none');
    $('#KeyWeightEdit').val("");
    $('#ResponseWeightEdit').val("");
    $('#AbilityWeightEdit').val("");
    $('#AttitudeWeightEdit').val("");
}


//制作考核表
function MakeEvaluatorTable() {
    if (standerLib == null || standerLibVeto==null) {
        document.getElementById('BGetStanderLib').click();
    }
    StartMakeEvaluatorTable();
}



//开始制作考核表
function StartMakeEvaluatorTable() {
    InitEvaluatorTable();
    $('#EvaluatorTable').css('display', 'block');
    $('#ShowTableBar').css('display', 'none');
    $('#EditTableBar').css('display', 'block');
    $('#TrMakeTable').css('display', 'block');
    $('#TrEditTable').css('display', 'none');
    $('.EditTable').css('display', 'block');
    $('.ViewTable').css('display', 'none');
}

//初始化考核表
function InitEvaluatorTable() {
    keyResponse1 = false;
    keyResponse2 = false;
    keyResponse3 = false;
    keyAbility1 = false;
    keyAbility2 = false;
    keyAbility3 = false;
    keyAttitude1 = false;
    keyAttitude2 = false;
    keyAttitude3 = false;
    response1 = false;
    response2 = false;
    response3 = false;
    ability1 = false;
    ability2 = false;
    ability3 = false;
    ability4 = false;
    attitude1 = false;
    attitude2 = false;
    attitude3 = false;
    attitude4 = false;
    veto1 = false;
    veto2 = false;
    veto3 = false;
    veto4 = false;
    veto5 = false;
    var keyWeight = false;
    var responseWeight = false;
    var abilityWeight = false;
    var attitudeWeight = false;
    stdType = null;

    $('.InputData').val("");
    $('.SelectNameData').html("请选择指标！");
    $('.SelectContentData').html("");
    
}
function GetTableData() {
    if (keyResponse1 == false && keyResponse2 == false && keyResponse3 == false) {
        $.ligerDialog.warn('请选择关键岗位职责指标!');
        return null;
    }
    if (keyAbility1 == false && keyAbility2 == false && keyAbility3 == false) {
        $.ligerDialog.warn('请选择关键岗位胜任能力指标!');
        return null;
    }
    if (keyAttitude1 == false && keyAttitude2 == false && keyAttitude3 == false) {
        $.ligerDialog.warn('请选择关键工作态度指标!');
        return null;
    }
    if (response1 == false && response2 == false && response3 == false) {
        $.ligerDialog.warn('请添加岗位职责指标!');
        return null;
    }
    if (ability1 == false && ability2 == false && ability3 == false && ability4 == false) {
        $.ligerDialog.warn('请选择岗位胜任能力指标!');
        return null;
    }
    if (attitude1 == false && attitude2 == false && attitude3 == false && attitude4 == false) {
        $.ligerDialog.warn('请选择工作态度指标!');
        return null;
    }
    if (veto1 == false && veto2 == false && veto3 == false && veto4 == false && veto5 == false) {
        $.ligerDialog.warn('请选择否决指标!');
        return null;
    }
    var keyStdWeight = parseInt($('#KeyWeightEdit').val());
    var responseStdWeight = parseInt($('#ResponseWeightEdit').val());
    var abilityStdWeight = parseInt($('#AbilityWeightEdit').val());
    var attitudeStdWeight = parseInt($('#AttitudeWeightEdit').val());
    if (keyStdWeight == null || responseStdWeight == null || abilityStdWeight == null || attitudeStdWeight == null) {
        $.ligerDialog.warn('请输入权值!');
        return null;
    }
    if (keyStdWeight + responseStdWeight + abilityStdWeight + attitudeStdWeight != 100) {
        $.ligerDialog.warn('权值和不等于100!');
        return null;
    }
    //    if (keyWeight == false && responseWeight == false && abilityWeight == false && attitudeWeight == false) {
    //        $.ligerDialog.warn('请输入权值!');
    //        return;
    //    }
    var keyResponse1Stander;
    if (keyResponse1 == true) {
        keyResponse1Stander = $('#LKeyResponse1Name').html() + '&' + $('#LKeyResponse1Content').html();
    }
    var keyResponse2Stander;
    if (keyResponse2 == true) {
        keyResponse2Stander = $('#LKeyResponse2Name').html() + '&' + $('#LKeyResponse2Content').html();
    }
    var keyResponse3Stander;
    if (keyResponse3 == true) {
        keyResponse3Stander = $('#LKeyResponse3Name').html() + '&' + $('#LKeyResponse3Content').html();
    }
    var keyAbility1Stander;
    if (keyAbility1 == true) {
        keyAbility1Stander = parseInt($('#KeyAbility1Num').val());
    }
    var keyAbility2Stander;
    if (keyAbility2 == true) {
        keyAbility2Stander = parseInt($('#KeyAbility2Num').val());
    }
    var keyAbility3Stander;
    if (keyAbility3 == true) {
        keyAbility3Stander = parseInt($('#KeyAbility3Num').val());
    }
    var keyAttitude1Stander;
    if (keyAttitude1 == true) {
        keyAttitude1Stander = parseInt($('#KeyAttitude1Num').val());
    }
    var keyAttitude2Stander;
    if (keyAttitude2 == true) {
        keyAttitude2Stander = parseInt($('#KeyAttitude2Num').val());
    }
    var keyAttitude3Stander;
    if (keyAttitude3 == true) {
        keyAttitude3Stander = parseInt($('#KeyAttitude3Num').val());
    }
    var response1Stander;
    if (response1 == true) {
        response1Stander = $('#LResponse1Name').html() + '&' + $('#LResponse1Content').html();
    }
    var response2Stander;
    if (response2 == true) {
        response2Stander = $('#LResponse2Name').html() + '&' + $('#LResponse2Content').html();
    }
    var response3Stander;
    if (response3 == true) {
        response3Stander = $('#LResponse3Name').html() + '&' + $('#LResponse3Content').html();
    }
    var ability1Stander;
    if (ability1 == true) {
        ability1Stander = parseInt($('#Ability1Num').val());
    }
    var ability2Stander;
    if (ability2 == true) {
        ability2Stander = parseInt($('#Ability2Num').val());
    }
    var ability3Stander;
    if (ability3 == true) {
        ability3Stander = parseInt($('#Ability3Num').val());
    }
    var ability4Stander;
    if (ability4 == true) {
        ability4Stander = parseInt($('#Ability4Num').val());
    }
    var attitude1Stander;
    if (attitude1 == true) {
        attitude1Stander = parseInt($('#Attitude1Num').val());
    }
    var attitude2Stander;
    if (attitude2 == true) {
        attitude2Stander = parseInt($('#Attitude2Num').val());
    }
    var attitude3Stander;
    if (attitude3 == true) {
        attitude3Stander = parseInt($('#Attitude3Num').val());
    }
    var attitude4Stander;
    if (attitude4 == true) {
        attitude4Stander = parseInt($('#Attitude4Num').val());
    }
    var veto1Stander;
    if (veto1 == true) {
        veto1Stander = parseInt($('#Veto1Num').val());
    }
    var veto2Stander;
    if (veto2 == true) {
        veto2Stander = parseInt($('#Veto2Num').val());
    }
    var veto3Stander;
    if (veto3 == true) {
        veto3Stander = parseInt($('#Veto3Num').val());
    }
    var veto4Stander;
    if (veto4 == true) {
        veto4Stander = parseInt($('#Veto4Num').val());
    }
    var veto5Stander;
    if (veto5 == true) {
        veto5Stander = parseInt($('#Veto5Num').val());
    }
    var json = [{ AtID: 0,
        AtKeyResponse1: keyResponse1Stander, AtKeyResponse2: keyResponse2Stander, AtKeyResponse3: keyResponse3Stander,
        AtKeyAbility1: keyAbility1Stander, AtKeyAbility2: keyAbility2Stander, AtKeyAbility3: keyAbility3Stander,
        AtKeyAttitude1: keyAttitude1Stander, AtKeyAttitude2: keyAttitude2Stander, AtKeyAttitude3: keyAttitude3Stander,
        AtResponse1: response1Stander, AtResponse2: response2Stander, AtResponse3: response3Stander,
        AtAbility1: ability1Stander, AtAbility2: ability2Stander, AtAbility3: ability3Stander, AtAbility4: ability4Stander,
        AtAttitude1: attitude1Stander, AtAbility2: attitude2Stander, AtAbility3: attitude3Stander, AtAbility4: attitude4Stander,
        AtVeto1: veto1Stander, AtVeto2: veto2Stander, AtVeto3: veto3Stander, AtVeto4: veto4Stander, AtVeto5: veto5Stander,
        AtKeyWeight: keyStdWeight, AtResponseWeight: responseStdWeight, AtAbilityWeight: abilityStdWeight, AtAttitudeWeight: attitudeStdWeight
    }];
    return json;
}

//保存考核表
function FinishMakeTable() {
    var json=GetTableData();
    var id=UserID;
    if(json==null||json==""||id==null||id=="")
        return;
    document.getElementById("JsonData").value = JSON.stringify(json);
    document.getElementById("JsonData2").value = id;
    document.getElementById("BFinishMakeTable").click();
}

//保存制作成功
function SaveMakeTableDone() {
    $('#ShowTableBar').css("display", "block");
    $('#EditTableBar').css('display', 'none');
    $('#TrNoTable').css("display", "none");
    $('#TrViewTable').css("display", "block");
    var data = document.getElementById("JsonData").value;
    tableData = JSON2.parse(data)[0];
    ViewEvaluatorTable();
}

//选择指标
function SelectStander(std) {
    if (std == null)
        return;
    stdType = std;
    $("#EvaluatorTable").css("display", "none");
    $("#SelectStander").css("display", "block");
    $('#EditTableBar').css('display', 'none');
    $('#StanderInfoBar').css('display', 'block');
    $('#VetoStanderInfoBar').css('display', 'none');
    $('#StanderInfo').css('display', 'block');
    $('#VetoStanderInfo').css('display', 'none');
    $('#DetailStanderInfo').css('display', 'none');
    manager.loadData(standerLib);
}

//选择否决指标
function SelectVetoStander(std) {
    if (std == null)
        return;
    stdType = std;
    $("#EvaluatorTable").css("display", "none");
    $("#SelectStander").css("display", "block");
    $('#EditTableBar').css('display', 'none');
    $('#VetoStanderInfoBar').css('display', 'block');
    $('#StanderInfoBar').css('display', 'none');
    $('#StanderInfo').css('display', 'none');
    $('#VetoStanderInfo').css('display', 'block');
    $('#DetailStanderInfo').css('display', 'none');
    managerVeto.loadData(standerLibVeto);
}

//返回考核表
function BackToTable() {
    $("#EvaluatorTable").css("display", "block");
    $("#SelectStander").css("display", "none");
    $('#EditTableBar').css('display', 'block');
    $('#StanderInfoBar').css('display', 'none');
    $('#VetoStanderInfoBar').css('display', 'none');
}

//显示指标
function ShowStander() {
    var s = document.getElementById("JsonData").value;
    if (s == null || s == "")
        return;
    standerLib = JSON2.parse(s);
    manager = $("#maingrid4").ligerGrid({
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
        h += "<a href='javascript:ShowDetail(" + rowindex + ")'>查看详细</a> ";
        h += "<a href='javascript:SelectRow(" + rowindex + ")'>选择</a> ";
        return h;
    }
    }],
        usePager: true, pageSize: 10,
        data: standerLib,
        height: '100%',
        isScroll: false,
        onSelectRow: function (rowdata, rowindex) {
            $("#txtrowindex").val(rowindex);
        }
    });
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

//显示指标
function ShowVetoStander() {
    var s = document.getElementById("JsonData2").value;
    if (s == null || s == "")
        return;
    standerLibVeto = JSON2.parse(s);
    managerVeto = $("#maingrid5").ligerGrid({
        columns: [
    { display: '编号', name: 'SlID', width: 50, align: 'center', frozen: true },
    { display: '指标类型', name: 'SlType', width: 100, align: 'center' },
    { display: '指标内容', name: 'SlName', width: 120, align: 'center' },
    { display: '', name: 'SlContentA', width: 400, align: 'center'},
    { display: '', isSort: false, width: 50, render: function (rowdata, rowindex, value) {
        var h = "";
        h += "<a href='javascript:SelectVetoRow(" + rowindex + ")'>选择</a> ";
        return h;
    }
    }],
        usePager: true, pageSize: 10,
        data: standerLibVeto,
        height: '100%',
        isScroll: false,
        onSelectRow: function (rowdata, rowindex) {
            $("#txtrowindex").val(rowindex);
        }
    });
}

//查看详细
function ShowDetail(rowid) {
    var rowdata = manager.getSelectedRow(rowid);    //取得数据
    if (rowdata == null)
        return;
    //
    $("#DetailStanderInfo").css("display", "block");
    $("#StanderInfo").css("display", "none");
    $('#StanderInfoBar').css('display', 'none');
    $('#DetailStanderInfoBar').css('display', 'block');
    //设置显示值
    var type = rowdata.SlType;
    document.getElementById('LStanderType').innerText = rowdata.SlType;
    document.getElementById('LName').innerText = rowdata.SlName;
    if (type == "否决指标") {
        $(".VetoStander").css("display", "block");
        $(".NormalStander").css("display", "none");
        document.getElementById('LContent').innerText = rowdata.SlContentA;
    }
    else {
        $(".VetoStander").css("display", "none");
        $(".NormalStander").css("display", "block");
        document.getElementById('LContentA').innerText = rowdata.SlContentA;
        document.getElementById('LContentB').innerText = rowdata.SlContentB;
        document.getElementById('LContentC').innerText = rowdata.SlContentC;
        document.getElementById('LContentD').innerText = rowdata.SlContentD;
    }
}

//返回指标列表
function BackToStanderList() {
    $("#DetailStanderInfo").css("display", "none");
    $("#StanderInfo").css("display", "block");
    $('#StanderInfoBar').css('display', 'block');
    $('#DetailStanderInfoBar').css('display', 'none');
}

//添加关键责任
function AddKeyResponse() {
    //var name = document.getElementById("TBKeyResponseName").value;
    //var content = document.getElementById("TBKeyResponseContent").value;
    var name = $('#TBKeyResponseName').val();
    var content = $('#TBKeyResponseContent').val();

    if (name == "" || content == "") {
        $.ligerDialog.warn('请输入指标信息!');
        return;
    }

    if (keyResponse1 == false) {
        $(".ShowKeyResponse1").css("display", "block");
        $(".EditKeyResponse1").css("display", "none");
        $('#LKeyResponse1Name').html(name);
        $('#LKeyResponse1Content').html(content);
        //document.getElementById("LKeyResponse1Name").innerText = name;
        //document.getElementById("LKeyResponse1Content").innerText = content;
        document.getElementById("KeyResponse1").style.display = "block";
        keyResponse1 = true;
    }
    else if (keyResponse2 == false) {
        $(".ShowKeyResponse2").css("display", "block");
        $(".EditKeyResponse2").css("display", "none");
        document.getElementById("LKeyResponse2Name").innerText = name;
        document.getElementById("LKeyResponse2Content").innerText = content;
        document.getElementById("KeyResponse2").style.display = "block";
        keyResponse2 = true;
    }
    else if (keyResponse3 == false) {
        $(".ShowKeyResponse3").css("display", "block");
        $(".EditKeyResponse3").css("display", "none");
        document.getElementById("LKeyResponse3Name").innerText = name;
        document.getElementById("LKeyResponse3Content").innerText = content;
        document.getElementById("KeyResponse3").style.display = "block";
        keyResponse3 = true;
    }
    else {
        document.getElementById("KeyResponse").style.display = "none";
    }
    if (keyResponse1 == true && keyResponse2 == true && keyResponse3 == true)
        document.getElementById("KeyResponse").style.display = "none";
    document.getElementById("TBKeyResponseName").value = "";
    document.getElementById("TBKeyResponseContent").value = "";
}

//编辑关键责任1
function EditKeyResponse1() {
    $(".ShowKeyResponse1").css("display", "none");
    $(".EditKeyResponse1").css("display", "block");
    document.getElementById("TBKeyResponse1Name").value = document.getElementById("LKeyResponse1Name").innerText;
    document.getElementById("TBKeyResponse1Content").value = document.getElementById("LKeyResponse1Content").innerText;
}

//完成编辑关键责任1
function EndEditKeyResponse1() {
    var name = document.getElementById("TBKeyResponse1Name").value;
    var content = document.getElementById("TBKeyResponse1Content").value;

    if (name == "" || content == "") {
        $.ligerDialog.warn('请输入指标信息!');
        return;
    }
    $(".ShowKeyResponse1").css("display", "block");
    $(".EditKeyResponse1").css("display", "none");
    document.getElementById("LKeyResponse1Name").innerText = name;
    document.getElementById("LKeyResponse1Content").innerText = content;
}

//取消编辑关键责任1
function CancelEditKeyResponse1() {
    $(".ShowKeyResponse1").css("display", "block");
    $(".EditKeyResponse1").css("display", "none");
}

//删除关键责任1
function DeleteKeyResponse1() {
    document.getElementById("KeyResponse1").style.display = "none";
    keyResponse1 = false;
    document.getElementById("KeyResponse").style.display = "block";
}

function EditKeyResponse2() {
    $(".ShowKeyResponse2").css("display", "none");
    $(".EditKeyResponse2").css("display", "block");
    document.getElementById("TBKeyResponse2Name").value = document.getElementById("LKeyResponse2Name").innerText;
    document.getElementById("TBKeyResponse2Content").value = document.getElementById("LKeyResponse2Content").innerText;
}

function EndEditKeyResponse2() {
    var name = document.getElementById("TBKeyResponse2Name").value;
    var content = document.getElementById("TBKeyResponse2Content").value;

    if (name == "" || content == "") {
        $.ligerDialog.warn('请输入指标信息!');
        return;
    }
    $(".ShowKeyResponse2").css("display", "block");
    $(".EditKeyResponse2").css("display", "none");
    document.getElementById("LKeyResponse2Name").innerText = name;
    document.getElementById("LKeyResponse2Content").innerText = content;
}

function CancelEditKeyResponse2() {
    $(".ShowKeyResponse2").css("display", "block");
    $(".EditKeyResponse2").css("display", "none");
}

function DeleteKeyResponse2() {
    document.getElementById("KeyResponse2").style.display = "none";
    keyResponse2 = false;
    document.getElementById("KeyResponse").style.display = "block";
}

function EditKeyResponse3() {
    $(".ShowKeyResponse3").css("display", "none");
    $(".EditKeyResponse3").css("display", "block");
    document.getElementById("TBKeyResponse3Name").value = document.getElementById("LKeyResponse3Name").innerText;
    document.getElementById("TBKeyResponse3Content").value = document.getElementById("LKeyResponse3Content").innerText;
}

function EndEditKeyResponse3() {
    var name = document.getElementById("TBKeyResponse3Name").value;
    var content = document.getElementById("TBKeyResponse3Content").value;

    if (name == "" || content == "") {
        $.ligerDialog.warn('请输入指标信息!');
        return;
    }
    $(".ShowKeyResponse3").css("display", "block");
    $(".EditKeyResponse3").css("display", "none");
    document.getElementById("LKeyResponse3Name").innerText = name;
    document.getElementById("LKeyResponse3Content").innerText = content;
}

function CancelEditKeyResponse3() {
    $(".ShowKeyResponse3").css("display", "block");
    $(".EditKeyResponse3").css("display", "none");
}

function DeleteKeyResponse3() {
    document.getElementById("KeyResponse3").style.display = "none";
    keyResponse3 = false;
    document.getElementById("KeyResponse").style.display = "block";
}

//判断是否选择
function CheckSelected(id) {
    if (keyAbility1 == true && document.getElementById("KeyAbility1Num").value == id)
        return true;
    if (keyAbility2 == true && document.getElementById("KeyAbility2Num").value == id)
        return true;
    if (keyAbility3 == true && document.getElementById("KeyAbility3Num").value == id)
        return true;
    if (keyAttitude1 == true && document.getElementById("KeyAttitude1Num").value == id)
        return true;
    if (keyAttitude2 == true && document.getElementById("KeyAttitude2Num").value == id)
        return true;
    if (keyAttitude3 == true && document.getElementById("KeyAttitude3Num").value == id)
        return true;
    if (ability1 == true && document.getElementById("Ability1Num").value == id)
        return true;
    if (ability2 == true && document.getElementById("Ability2Num").value == id)
        return true;
    if (ability3 == true && document.getElementById("Ability3Num").value == id)
        return true;
    if (ability4 == true && document.getElementById("Ability4Num").value == id)
        return true;
    if (attitude1 == true && document.getElementById("Attitude1Num").value == id)
        return true;
    if (attitude2 == true && document.getElementById("Attitude2Num").value == id)
        return true;
    if (attitude3 == true && document.getElementById("Attitude3Num").value == id)
        return true;
    if (attitude4 == true && document.getElementById("Attitude4Num").value == id)
        return true;
    if (veto1 == true && document.getElementById("Veto1Num").value == id)
        return true;
    if (veto2 == true && document.getElementById("Veto2Num").value == id)
        return true;
    if (veto3 == true && document.getElementById("Veto3Num").value == id)
        return true;
    if (veto4 == true && document.getElementById("Veto4Num").value == id)
        return true;
    if (veto5 == true && document.getElementById("Veto5Num").value == id)
        return true;
    return false;
}

//选中指标返回
function SelectRow(rowid) {
    var rowdata = manager.getSelectedRow(rowid);    //取得数据
    if (rowdata == null)
        return;
    if (CheckSelected(rowdata.SlID)) {
        $.ligerDialog.warn('该指标已存在，请选择其它指标!');
        return;
    }
    switch (stdType) {
        case 'KeyAbility':
            document.getElementById('KeyAbilityNum').value = rowdata.SlID;
            document.getElementById('LKeyAbilityName').innerText = rowdata.SlName;
            document.getElementById('LKeyAbilityContentA').innerText = rowdata.SlContentA;
            document.getElementById('LKeyAbilityContentB').innerText = rowdata.SlContentB;
            document.getElementById('LKeyAbilityContentC').innerText = rowdata.SlContentC;
            document.getElementById('LKeyAbilityContentD').innerText = rowdata.SlContentD;
            break;
        case 'KeyAbility1':
            document.getElementById('KeyAbility1Num').value = rowdata.SlID;
            document.getElementById('LKeyAbility1Name').innerText = rowdata.SlName;
            document.getElementById('LKeyAbility1ContentA').innerText = rowdata.SlContentA;
            document.getElementById('LKeyAbility1ContentB').innerText = rowdata.SlContentB;
            document.getElementById('LKeyAbility1ContentC').innerText = rowdata.SlContentC;
            document.getElementById('LKeyAbility1ContentD').innerText = rowdata.SlContentD;
            break;
        case 'KeyAbility2':
            document.getElementById('KeyAbility2Num').value = rowdata.SlID;
            document.getElementById('LKeyAbility2Name').innerText = rowdata.SlName;
            document.getElementById('LKeyAbility2ContentA').innerText = rowdata.SlContentA;
            document.getElementById('LKeyAbility2ContentB').innerText = rowdata.SlContentB;
            document.getElementById('LKeyAbility2ContentC').innerText = rowdata.SlContentC;
            document.getElementById('LKeyAbility2ContentD').innerText = rowdata.SlContentD;
            break;
        case 'KeyAbility3':
            document.getElementById('KeyAbility3Num').value = rowdata.SlID;
            document.getElementById('LKeyAbility3Name').innerText = rowdata.SlName;
            document.getElementById('LKeyAbility3ContentA').innerText = rowdata.SlContentA;
            document.getElementById('LKeyAbility3ContentB').innerText = rowdata.SlContentB;
            document.getElementById('LKeyAbility3ContentC').innerText = rowdata.SlContentC;
            document.getElementById('LKeyAbility3ContentD').innerText = rowdata.SlContentD;
            break;
        case 'KeyAttitude':
            document.getElementById('KeyAttitudeNum').value = rowdata.SlID;
            document.getElementById('LKeyAttitudeName').innerText = rowdata.SlName;
            document.getElementById('LKeyAttitudeContentA').innerText = rowdata.SlContentA;
            document.getElementById('LKeyAttitudeContentB').innerText = rowdata.SlContentB;
            document.getElementById('LKeyAttitudeContentC').innerText = rowdata.SlContentC;
            document.getElementById('LKeyAttitudeContentD').innerText = rowdata.SlContentD;
            break;
        case 'KeyAttitude1':
            document.getElementById('KeyAttitude1Num').value = rowdata.SlID;
            document.getElementById('LKeyAttitude1Name').innerText = rowdata.SlName;
            document.getElementById('LKeyAttitude1ContentA').innerText = rowdata.SlContentA;
            document.getElementById('LKeyAttitude1ContentB').innerText = rowdata.SlContentB;
            document.getElementById('LKeyAttitude1ContentC').innerText = rowdata.SlContentC;
            document.getElementById('LKeyAttitude1ContentD').innerText = rowdata.SlContentD;
            break;
        case 'KeyAttitude2':
            document.getElementById('KeyAttitude2Num').value = rowdata.SlID;
            document.getElementById('LKeyAttitude2Name').innerText = rowdata.SlName;
            document.getElementById('LKeyAttitude2ContentA').innerText = rowdata.SlContentA;
            document.getElementById('LKeyAttitude2ContentB').innerText = rowdata.SlContentB;
            document.getElementById('LKeyAttitude2ContentC').innerText = rowdata.SlContentC;
            document.getElementById('LKeyAttitude2ContentD').innerText = rowdata.SlContentD;
            break;
        case 'KeyAttitude3':
            document.getElementById('KeyAttitude3Num').value = rowdata.SlID;
            document.getElementById('LKeyAttitude3Name').innerText = rowdata.SlName;
            document.getElementById('LKeyAttitude3ContentA').innerText = rowdata.SlContentA;
            document.getElementById('LKeyAttitude3ContentB').innerText = rowdata.SlContentB;
            document.getElementById('LKeyAttitude3ContentC').innerText = rowdata.SlContentC;
            document.getElementById('LKeyAttitude3ContentD').innerText = rowdata.SlContentD;
            break;
        case 'Ability':
            document.getElementById('AbilityNum').value = rowdata.SlID;
            document.getElementById('LAbilityName').innerText = rowdata.SlName;
            document.getElementById('LAbilityContentA').innerText = rowdata.SlContentA;
            document.getElementById('LAbilityContentB').innerText = rowdata.SlContentB;
            document.getElementById('LAbilityContentC').innerText = rowdata.SlContentC;
            document.getElementById('LAbilityContentD').innerText = rowdata.SlContentD;
            break;
        case 'Ability1':
            document.getElementById('Ability1Num').value = rowdata.SlID;
            document.getElementById('LAbility1Name').innerText = rowdata.SlName;
            document.getElementById('LAbility1ContentA').innerText = rowdata.SlContentA;
            document.getElementById('LAbility1ContentB').innerText = rowdata.SlContentB;
            document.getElementById('LAbility1ContentC').innerText = rowdata.SlContentC;
            document.getElementById('LAbility1ContentD').innerText = rowdata.SlContentD;
            break;
        case 'Ability2':
            document.getElementById('Ability2Num').value = rowdata.SlID;
            document.getElementById('LAbility2Name').innerText = rowdata.SlName;
            document.getElementById('LAbility2ContentA').innerText = rowdata.SlContentA;
            document.getElementById('LAbility2ContentB').innerText = rowdata.SlContentB;
            document.getElementById('LAbility2ContentC').innerText = rowdata.SlContentC;
            document.getElementById('LAbility2ContentD').innerText = rowdata.SlContentD;
            break;
        case 'Ability3':
            document.getElementById('Ability3Num').value = rowdata.SlID;
            document.getElementById('LAbility3Name').innerText = rowdata.SlName;
            document.getElementById('LAbility3ContentA').innerText = rowdata.SlContentA;
            document.getElementById('LAbility3ContentB').innerText = rowdata.SlContentB;
            document.getElementById('LAbility3ContentC').innerText = rowdata.SlContentC;
            document.getElementById('LAbility3ContentD').innerText = rowdata.SlContentD;
            break;
        case 'Ability34':
            document.getElementById('Ability4Num').value = rowdata.SlID;
            document.getElementById('LAbility4Name').innerText = rowdata.SlName;
            document.getElementById('LAbility4ContentA').innerText = rowdata.SlContentA;
            document.getElementById('LAbility4ContentB').innerText = rowdata.SlContentB;
            document.getElementById('LAbility4ContentC').innerText = rowdata.SlContentC;
            document.getElementById('LAbility4ContentD').innerText = rowdata.SlContentD;
            break;
        case 'Attitude':
            document.getElementById('AttitudeNum').value = rowdata.SlID;
            document.getElementById('LAttitudeName').innerText = rowdata.SlName;
            document.getElementById('LAttitudeContentA').innerText = rowdata.SlContentA;
            document.getElementById('LAttitudeContentB').innerText = rowdata.SlContentB;
            document.getElementById('LAttitudeContentC').innerText = rowdata.SlContentC;
            document.getElementById('LAttitudeContentD').innerText = rowdata.SlContentD;
            break;
        case 'Attitude1':
            document.getElementById('Attitude1Num').value = rowdata.SlID;
            document.getElementById('LAttitude1Name').innerText = rowdata.SlName;
            document.getElementById('LAttitude1ContentA').innerText = rowdata.SlContentA;
            document.getElementById('LAttitude1ContentB').innerText = rowdata.SlContentB;
            document.getElementById('LAttitude1ContentC').innerText = rowdata.SlContentC;
            document.getElementById('LAttitude1ContentD').innerText = rowdata.SlContentD;
            break;
        case 'Attitude2':
            document.getElementById('Attitude2Num').value = rowdata.SlID;
            document.getElementById('LAttitude2Name').innerText = rowdata.SlName;
            document.getElementById('LAttitude2ContentA').innerText = rowdata.SlContentA;
            document.getElementById('LAttitude2ContentB').innerText = rowdata.SlContentB;
            document.getElementById('LAttitude2ContentC').innerText = rowdata.SlContentC;
            document.getElementById('LAttitude2ContentD').innerText = rowdata.SlContentD;
            break;
        case 'Attitude3':
            document.getElementById('Attitude3Num').value = rowdata.SlID;
            document.getElementById('LAttitude3Name').innerText = rowdata.SlName;
            document.getElementById('LAttitude3ContentA').innerText = rowdata.SlContentA;
            document.getElementById('LAttitude3ContentB').innerText = rowdata.SlContentB;
            document.getElementById('LAttitude3ContentC').innerText = rowdata.SlContentC;
            document.getElementById('LAttitude3ContentD').innerText = rowdata.SlContentD;
            break;
        case 'Attitude4':
            document.getElementById('Attitude4Num').value = rowdata.SlID;
            document.getElementById('LAttitude4Name').innerText = rowdata.SlName;
            document.getElementById('LAttitude4ContentA').innerText = rowdata.SlContentA;
            document.getElementById('LAttitude4ContentB').innerText = rowdata.SlContentB;
            document.getElementById('LAttitude4ContentC').innerText = rowdata.SlContentC;
            document.getElementById('LAttitude4ContentD').innerText = rowdata.SlContentD;
            break;
        
        default:
            break;
    }
    stdType = null;
    BackToTable();
}

//选中否决指标返回
function SelectVetoRow(rowid) {
    var rowdata = managerVeto.getSelectedRow(rowid);    //取得数据
    if (rowdata == null)
        return;
    if (CheckSelected(rowdata.SlID)) {
        $.ligerDialog.warn('该指标已存在，请选择其它指标!');
        return;
    }
    switch (stdType) {
        case 'Veto':
            document.getElementById('VetoNum').value = rowdata.SlID;
            document.getElementById('LVetoContent').innerText = rowdata.SlContentA;
            break;
        case 'Veto1':
            document.getElementById('Veto1Num').value = rowdata.SlID;
            document.getElementById('LVeto1Content').innerText = rowdata.SlContentA;
            break;
        case 'Veto2':
            document.getElementById('Veto2Num').value = rowdata.SlID;
            document.getElementById('LVeto2Content').innerText = rowdata.SlContentA;
            break;
        case 'Veto3':
            document.getElementById('Veto3Num').value = rowdata.SlID;
            document.getElementById('LVeto3Content').innerText = rowdata.SlContentA;
        case 'Veto4':
            document.getElementById('Veto4Num').value = rowdata.SlID;
            document.getElementById('LVeto4Content').innerText = rowdata.SlContentA;
            break;
        case 'Veto5':
            document.getElementById('Veto5Num').value = rowdata.SlID;
            document.getElementById('LVeto5Content').innerText = rowdata.SlContentA;
            break;
        default:
            break;
    }
    stdType = null;
    BackToTable();
}

//添加关键能力
function AddKeyAbility() {
    var id = document.getElementById('KeyAbilityNum').value;
    var name = document.getElementById('LKeyAbilityName').innerText;
    var contentA = document.getElementById('LKeyAbilityContentA').innerText;
    var contentB = document.getElementById('LKeyAbilityContentB').innerText;
    var contentC = document.getElementById('LKeyAbilityContentC').innerText;
    var contentD = document.getElementById('LKeyAbilityContentD').innerText;
    if (id == "" || name == "" || contentA == "" || contentB == "" || contentC == "" || contentD == "") {
        $.ligerDialog.warn('请选择指标!');
        return;
    }
    if (CheckSelected(id)) {
        $.ligerDialog.warn('该指标已存在，请选择其它指标!');
        return;
    }

    if (keyAbility1 == false) {
        document.getElementById('KeyAbility1Num').value = id;
        document.getElementById('LKeyAbility1Name').innerText = name;
        document.getElementById('LKeyAbility1ContentA').innerText = contentA;
        document.getElementById('LKeyAbility1ContentB').innerText = contentB;
        document.getElementById('LKeyAbility1ContentC').innerText = contentC;
        document.getElementById('LKeyAbility1ContentD').innerText = contentD;
        document.getElementById("KeyAbility1").style.display = "block";
        keyAbility1 = true;
    }
    else if (keyAbility2 == false) {
        document.getElementById('KeyAbility2Num').value = id;
        document.getElementById('LKeyAbility2Name').innerText = name;
        document.getElementById('LKeyAbility2ContentA').innerText = contentA;
        document.getElementById('LKeyAbility2ContentB').innerText = contentB;
        document.getElementById('LKeyAbility2ContentC').innerText = contentC;
        document.getElementById('LKeyAbility2ContentD').innerText = contentD;
        document.getElementById("KeyAbility2").style.display = "block";
        keyAbility2 = true;
    }
    else if (keyAbility3 == false) {
        document.getElementById('KeyAbility3Num').value = id;
        document.getElementById('LKeyAbility3Name').innerText = name;
        document.getElementById('LKeyAbility3ContentA').innerText = contentA;
        document.getElementById('LKeyAbility3ContentB').innerText = contentB;
        document.getElementById('LKeyAbility3ContentC').innerText = contentC;
        document.getElementById('LKeyAbility3ContentD').innerText = contentD;
        document.getElementById("KeyAbility3").style.display = "block";
        keyAbility3 = true;
    }
    else {
        document.getElementById("KeyAbility").style.display = "none";
    }
    if (keyAbility1 && keyAbility2 && keyAbility3)
        document.getElementById("KeyAbility").style.display = "none";
    document.getElementById('KeyAbilityNum').value = "";
    document.getElementById('LKeyAbilityName').innerText = "请选择指标";
    document.getElementById('LKeyAbilityContentA').innerText = "";
    document.getElementById('LKeyAbilityContentB').innerText = "";
    document.getElementById('LKeyAbilityContentC').innerText = "";
    document.getElementById('LKeyAbilityContentD').innerText = "";
}

//删除关键能力1
function DeleteKeyAbility1() {
    document.getElementById("KeyAbility1").style.display = "none";
    keyAbility1 = false;
    document.getElementById("KeyAbility").style.display = "block";
}

//删除关键能力2
function DeleteKeyAbility2() {
    document.getElementById("KeyAbility2").style.display = "none";
    keyAbility2 = false;
    document.getElementById("KeyAbility").style.display = "block";
}

//删除关键能力3
function DeleteKeyAbility3() {
    document.getElementById("KeyAbility3").style.display = "none";
    keyAbility3 = false;
    document.getElementById("KeyAbility").style.display = "block";
}

//添加关键态度
function AddKeyAttitude() {
    var id = document.getElementById('KeyAttitudeNum').value;
    var name = document.getElementById('LKeyAttitudeName').innerText;
    var contentA = document.getElementById('LKeyAttitudeContentA').innerText;
    var contentB = document.getElementById('LKeyAttitudeContentB').innerText;
    var contentC = document.getElementById('LKeyAttitudeContentC').innerText;
    var contentD = document.getElementById('LKeyAttitudeContentD').innerText;
    if (id == "" || name == "" || contentA == "" || contentB == "" || contentC == "" || contentD == "") {
        $.ligerDialog.warn('请选择指标!');
        return;
    }
    if (CheckSelected(id)) {
        $.ligerDialog.warn('该指标已存在，请选择其它指标!');
        return;
    }
    if (keyAttitude1 == false) {
        document.getElementById('KeyAttitude1Num').value = id;
        document.getElementById('LKeyAttitude1Name').innerText = name;
        document.getElementById('LKeyAttitude1ContentA').innerText = contentA;
        document.getElementById('LKeyAttitude1ContentB').innerText = contentB;
        document.getElementById('LKeyAttitude1ContentC').innerText = contentC;
        document.getElementById('LKeyAttitude1ContentD').innerText = contentD;
        document.getElementById("KeyAttitude1").style.display = "block";
        keyAttitude1 = true;
    }
    else if (keyAttitude2 == false) {
        document.getElementById('KeyAttitude2Num').value = id;
        document.getElementById('LKeyAttitude2Name').innerText = name;
        document.getElementById('LKeyAttitude2ContentA').innerText = contentA;
        document.getElementById('LKeyAttitude2ContentB').innerText = contentB;
        document.getElementById('LKeyAttitude2ContentC').innerText = contentC;
        document.getElementById('LKeyAttitude2ContentD').innerText = contentD;
        document.getElementById("KeyAttitude2").style.display = "block";
        keyAttitude2 = true;
    }
    else if (keyAttitude3 == false) {
        document.getElementById('KeyAttitude3Num').value = id;
        document.getElementById('LKeyAttitude3Name').innerText = name;
        document.getElementById('LKeyAttitude3ContentA').innerText = contentA;
        document.getElementById('LKeyAttitude3ContentB').innerText = contentB;
        document.getElementById('LKeyAttitude3ContentC').innerText = contentC;
        document.getElementById('LKeyAttitude3ContentD').innerText = contentD;
        document.getElementById("KeyAttitude3").style.display = "block";
        keyAttitude3 = true;
    }
    else {
        document.getElementById("KeyAttitude").style.display = "none";
    }
    if (keyAttitude1 && keyAttitude2 && keyAttitude3)
        document.getElementById("KeyAttitude").style.display = "none";
    document.getElementById('KeyAttitudeNum').value = "";
    document.getElementById('LKeyAttitudeName').innerText = "请选择指标";
    document.getElementById('LKeyAttitudeContentA').innerText = "";
    document.getElementById('LKeyAttitudeContentB').innerText = "";
    document.getElementById('LKeyAttitudeContentC').innerText = "";
    document.getElementById('LKeyAttitudeContentD').innerText = "";
}

//删除关键态度1
function DeleteKeyAttitude1() {
    document.getElementById("KeyAttitude1").style.display = "none";
    keyAttitude1 = false;
    document.getElementById("KeyAttitude").style.display = "block";
}

//删除关键态度2
function DeleteKeyAttitude2() {
    document.getElementById("KeyAttitude2").style.display = "none";
    keyAttitude2 = false;
    document.getElementById("KeyAttitude").style.display = "block";
}

//删除关键态度3
function DeleteKeyAttitude3() {
    document.getElementById("KeyAttitude3").style.display = "none";
    keyAttitude3 = false;
    document.getElementById("KeyAttitude").style.display = "block";
}

//添加责任
function AddResponse() {
    var name = document.getElementById("TBResponseName").value;
    var content = document.getElementById("TBResponseContent").value;

    if (name == "" || content == "") {
        $.ligerDialog.warn('请输入指标信息!');
        return;
    }

    if (response1 == false) {
        $(".ShowResponse1").css("display", "block");
        $(".EditResponse1").css("display", "none");
        document.getElementById("LResponse1Name").innerText = name;
        document.getElementById("LResponse1Content").innerText = content;
        document.getElementById("Response1").style.display = "block";
        response1 = true;
    }
    else if (response2 == false) {
        $(".ShowResponse2").css("display", "block");
        $(".EditResponse2").css("display", "none");
        document.getElementById("LResponse2Name").innerText = name;
        document.getElementById("LResponse2Content").innerText = content;
        document.getElementById("Response2").style.display = "block";
        response2 = true;
    }
    else if (response3 == false) {
        $(".ShowResponse3").css("display", "block");
        $(".EditResponse3").css("display", "none");
        document.getElementById("LResponse3Name").innerText = name;
        document.getElementById("LResponse3Content").innerText = content;
        document.getElementById("Response3").style.display = "block";
        response3 = true;
    }
    else {
        document.getElementById("Response").style.display = "none";
    }
    if (response1 && response2 && response3)
        document.getElementById("Response").style.display = "none";
    document.getElementById("TBResponseName").value = "";
    document.getElementById("TBResponseContent").value = "";
}

//编辑责任1
function EditResponse1() {
    $(".ShowResponse1").css("display", "none");
    $(".EditResponse1").css("display", "block");
    document.getElementById("TBResponse1Name").value = document.getElementById("LResponse1Name").innerText;
    document.getElementById("TBResponse1Content").value = document.getElementById("LResponse1Content").innerText;
}

//完成编辑责任1
function EndEditResponse1() {
    var name = document.getElementById("TBResponse1Name").value;
    var content = document.getElementById("TBResponse1Content").value;

    if (name == "" || content == "") {
        $.ligerDialog.warn('请输入指标信息!');
        return;
    }
    $(".ShowResponse1").css("display", "block");
    $(".EditResponse1").css("display", "none");
    document.getElementById("LResponse1Name").innerText = name;
    document.getElementById("LResponse1Content").innerText = content;
}

//取消编辑责任1
function CancelEditResponse1() {
    $(".ShowResponse1").css("display", "block");
    $(".EditResponse1").css("display", "none");
}

//删除责任1
function DeleteResponse1() {
    document.getElementById("Response1").style.display = "none";
    response1 = false;
    document.getElementById("Response").style.display = "block";
}

//编辑责任2
function EditResponse2() {
    $(".ShowResponse2").css("display", "none");
    $(".EditResponse2").css("display", "block");
    document.getElementById("TBResponse2Name").value = document.getElementById("LResponse2Name").innerText;
    document.getElementById("TBResponse2Content").value = document.getElementById("LResponse2Content").innerText;
}

//完成编辑责任2
function EndEditResponse2() {
    var name = document.getElementById("TBResponse2Name").value;
    var content = document.getElementById("TBResponse2Content").value;

    if (name == "" || content == "") {
        $.ligerDialog.warn('请输入指标信息!');
        return;
    }
    $(".ShowResponse2").css("display", "block");
    $(".EditResponse2").css("display", "none");
    document.getElementById("LResponse2Name").innerText = name;
    document.getElementById("LResponse2Content").innerText = content;
}

//取消编辑责任2
function CancelEditResponse2() {
    $(".ShowResponse2").css("display", "block");
    $(".EditResponse2").css("display", "none");
}

//删除责任2
function DeleteResponse2() {
    document.getElementById("Response2").style.display = "none";
    response2 = false;
    document.getElementById("Response").style.display = "block";
}

//编辑责任3
function EditResponse3() {
    $(".ShowResponse3").css("display", "none");
    $(".EditResponse3").css("display", "block");
    document.getElementById("TBResponse3Name").value = document.getElementById("LResponse3Name").innerText;
    document.getElementById("TBResponse3Content").value = document.getElementById("LResponse3Content").innerText;
}

//完成编辑责任3
function EndEditResponse3() {
    var name = document.getElementById("TBResponse3Name").value;
    var content = document.getElementById("TBResponse3Content").value;

    if (name == "" || content == "") {
        $.ligerDialog.warn('请输入指标信息!');
        return;
    }
    $(".ShowResponse3").css("display", "block");
    $(".EditResponse3").css("display", "none");
    document.getElementById("LResponse3Name").innerText = name;
    document.getElementById("LResponse3Content").innerText = content;
}

//取消编辑责任3
function CancelEditResponse3() {
    $(".ShowResponse3").css("display", "block");
    $(".EditResponse3").css("display", "none");
}

//删除责任3
function DeleteResponse3() {
    document.getElementById("Response3").style.display = "none";
    response3 = false;
    document.getElementById("Response").style.display = "block";
}

//添加能力
function AddAbility() {
    var id = document.getElementById('AbilityNum').value;
    var name = document.getElementById('LAbilityName').innerText;
    var contentA = document.getElementById('LAbilityContentA').innerText;
    var contentB = document.getElementById('LAbilityContentB').innerText;
    var contentC = document.getElementById('LAbilityContentC').innerText;
    var contentD = document.getElementById('LAbilityContentD').innerText;
    if (id == "" || name == "" || contentA == "" || contentB == "" || contentC == "" || contentD == "") {
        $.ligerDialog.warn('请选择指标!');
        return;
    }
    if (CheckSelected(id)) {
        $.ligerDialog.warn('该指标已存在，请选择其它指标!');
        return;
    }
    if (ability1 == false) {
        document.getElementById('Ability1Num').value = id;
        document.getElementById('LAbility1Name').innerText = name;
        document.getElementById('LAbility1ContentA').innerText = contentA;
        document.getElementById('LAbility1ContentB').innerText = contentB;
        document.getElementById('LAbility1ContentC').innerText = contentC;
        document.getElementById('LAbility1ContentD').innerText = contentD;
        document.getElementById("Ability1").style.display = "block";
        ability1 = true;
    }
    else if (ability2 == false) {
        document.getElementById('Ability2Num').value = id;
        document.getElementById('LAbility2Name').innerText = name;
        document.getElementById('LAbility2ContentA').innerText = contentA;
        document.getElementById('LAbility2ContentB').innerText = contentB;
        document.getElementById('LAbility2ContentC').innerText = contentC;
        document.getElementById('LAbility2ContentD').innerText = contentD;
        document.getElementById("Ability2").style.display = "block";
        ability2 = true;
    }
    else if (ability3 == false) {
        document.getElementById('Ability3Num').value = id;
        document.getElementById('LAbility3Name').innerText = name;
        document.getElementById('LAbility3ContentA').innerText = contentA;
        document.getElementById('LAbility3ContentB').innerText = contentB;
        document.getElementById('LAbility3ContentC').innerText = contentC;
        document.getElementById('LAbility3ContentD').innerText = contentD;
        document.getElementById("Ability3").style.display = "block";
        ability3 = true;
    }
    else if (ability4 == false) {
        document.getElementById('Ability4Num').value = id;
        document.getElementById('LAbility4Name').innerText = name;
        document.getElementById('LAbility4ContentA').innerText = contentA;
        document.getElementById('LAbility4ContentB').innerText = contentB;
        document.getElementById('LAbility4ContentC').innerText = contentC;
        document.getElementById('LAbility4ContentD').innerText = contentD;
        document.getElementById("Ability4").style.display = "block";
        ability4 = true;
    }
    else {
        document.getElementById("Ability").style.display = "none";
    }
    if (ability1 && ability2 && ability3 && ability4)
        document.getElementById("Ability").style.display = "none";
    document.getElementById('AbilityNum').value = "";
    document.getElementById('LAbilityName').innerText = "请选择指标";
    document.getElementById('LAbilityContentA').innerText = "";
    document.getElementById('LAbilityContentB').innerText = "";
    document.getElementById('LAbilityContentC').innerText = "";
    document.getElementById('LAbilityContentD').innerText = "";
}

//删除能力1
function DeleteAbility1() {
    document.getElementById("Ability1").style.display = "none";
    ability1 = false;
    document.getElementById("Ability").style.display = "block";
}

//删除能力2
function DeleteAbility2() {
    document.getElementById("Ability2").style.display = "none";
    ability2 = false;
    document.getElementById("Ability").style.display = "block";
}

//删除能力3
function DeleteAbility3() {
    document.getElementById("Ability3").style.display = "none";
    ability3 = false;
    document.getElementById("Ability").style.display = "block";
}

//删除能力4
function DeleteAbility4() {
    document.getElementById("Ability4").style.display = "none";
    ability4 = false;
    document.getElementById("Ability").style.display = "block";
}

//添加态度
function AddAttitude() {
    var id = document.getElementById('AttitudeNum').value;
    var name = document.getElementById('LAttitudeName').innerText;
    var contentA = document.getElementById('LAttitudeContentA').innerText;
    var contentB = document.getElementById('LAttitudeContentB').innerText;
    var contentC = document.getElementById('LAttitudeContentC').innerText;
    var contentD = document.getElementById('LAttitudeContentD').innerText;
    if (id == "" || name == "" || contentA == "" || contentB == "" || contentC == "" || contentD == "") {
        $.ligerDialog.warn('请选择指标!');
        return;
    }
    if (CheckSelected(id)) {
        $.ligerDialog.warn('该指标已存在，请选择其它指标!');
        return;
    }
    if (attitude1 == false) {
        document.getElementById('Attitude1Num').value = id;
        document.getElementById('LAttitude1Name').innerText = name;
        document.getElementById('LAttitude1ContentA').innerText = contentA;
        document.getElementById('LAttitude1ContentB').innerText = contentB;
        document.getElementById('LAttitude1ContentC').innerText = contentC;
        document.getElementById('LAttitude1ContentD').innerText = contentD;
        document.getElementById("Attitude1").style.display = "block";
        attitude1 = true;
    }
    else if (attitude2 == false) {
        document.getElementById('Attitude2Num').value = id;
        document.getElementById('LAttitude2Name').innerText = name;
        document.getElementById('LAttitude2ContentA').innerText = contentA;
        document.getElementById('LAttitude2ContentB').innerText = contentB;
        document.getElementById('LAttitude2ContentC').innerText = contentC;
        document.getElementById('LAttitude2ContentD').innerText = contentD;
        document.getElementById("Attitude2").style.display = "block";
        attitude2 = true;
    }
    else if (attitude3 == false) {
        document.getElementById('Attitude3Num').value = id;
        document.getElementById('LAttitude3Name').innerText = name;
        document.getElementById('LAttitude3ContentA').innerText = contentA;
        document.getElementById('LAttitude3ContentB').innerText = contentB;
        document.getElementById('LAttitude3ContentC').innerText = contentC;
        document.getElementById('LAttitude3ContentD').innerText = contentD;
        document.getElementById("Attitude3").style.display = "block";
        attitude3 = true;
    }
    else if (attitude4 == false) {
        document.getElementById('Attitude4Num').value = id;
        document.getElementById('LAttitude4Name').innerText = name;
        document.getElementById('LAttitude4ContentA').innerText = contentA;
        document.getElementById('LAttitude4ContentB').innerText = contentB;
        document.getElementById('LAttitude4ContentC').innerText = contentC;
        document.getElementById('LAttitude4ContentD').innerText = contentD;
        document.getElementById("Attitude4").style.display = "block";
        attitude4 = true;
    }
    else {
        document.getElementById("Ability").style.display = "none";
    }
    if (attitude1 && attitude2 && attitude3 && attitude4)
        document.getElementById("Attitude").style.display = "none";
    document.getElementById('AttitudeNum').value = "";
    document.getElementById('LAttitudeName').innerText = "请选择指标";
    document.getElementById('LAttitudeContentA').innerText = "";
    document.getElementById('LAttitudeContentB').innerText = "";
    document.getElementById('LAttitudeContentC').innerText = "";
    document.getElementById('LAttitudeContentD').innerText = "";
}

//删除能力1
function DeleteAttitude1() {
    document.getElementById("Attitude1").style.display = "none";
    attitude1 = false;
    document.getElementById("Attitude").style.display = "block";
}

//删除能力2
function DeleteAttitude2() {
    document.getElementById("Attitude2").style.display = "none";
    attitude2 = false;
    document.getElementById("Attitude").style.display = "block";
}

//删除能力3
function DeleteAttitude3() {
    document.getElementById("Attitude3").style.display = "none";
    attitude3 = false;
    document.getElementById("Attitude").style.display = "block";
}

//删除能力4
function DeleteAttitude3() {
    document.getElementById("Attitude3").style.display = "none";
    attitude3 = false;
    document.getElementById("Attitude").style.display = "block";
}

//添加否决指标
function AddVeto() {
    var id = document.getElementById('VetoNum').value;
    var content = document.getElementById('LVetoContent').innerText;
    if (id == "" || content == "") {
        $.ligerDialog.warn('请选择指标!');
        return;
    }
    if (CheckSelected(id)) {
        $.ligerDialog.warn('该指标已存在，请选择其它指标!');
        return;
    }
    if (veto1 == false) {
        document.getElementById('Veto1Num').value = id;
        document.getElementById('LVeto1Content').innerText = content;
        document.getElementById("Veto1").style.display = "block";
        veto1 = true;
    }
    else if (veto2 == false) {
        document.getElementById('Veto2Num').value = id;
        document.getElementById('LVeto2Content').innerText = content;
        document.getElementById("Veto2").style.display = "block";
        veto2 = true;
    }
    else if (veto3 == false) {
        document.getElementById('Veto3Num').value = id;
        document.getElementById('LVeto3Content').innerText = content;
        document.getElementById("Veto3").style.display = "block";
        veto3 = true;
    }
    else if (veto4 == false) {
        document.getElementById('Veto4Num').value = id;
        document.getElementById('LVeto4Content').innerText = content;
        document.getElementById("Veto4").style.display = "block";
        veto4 = true;
    }
    else if (veto5 == false) {
        document.getElementById('Veto5Num').value = id;
        document.getElementById('LVeto5Content').innerText = content;
        document.getElementById("Veto5").style.display = "block";
        veto5 = true;
    }
    else {
        document.getElementById("Veto").style.display = "none";
    }
    if (veto1 && veto2 && veto3 && veto4 && veto5)
        document.getElementById("Veto").style.display = "none";
    document.getElementById('VetoNum').value = "";
    document.getElementById('LVetoContent').innerText = "请选择指标";
}

//删除否决1
function DeleteVeto1() {
    document.getElementById("Veto1").style.display = "none";
    veto1 = false;
    document.getElementById("Veto").style.display = "block";
}

//删除否决2
function DeleteVeto2() {
    document.getElementById("Veto2").style.display = "none";
    veto2 = false;
    document.getElementById("Veto").style.display = "block";
}

//删除否决3
function DeleteVeto3() {
    document.getElementById("Veto3").style.display = "none";
    veto3 = false;
    document.getElementById("Veto").style.display = "block";
}

//删除否决4
function DeleteVeto4() {
    document.getElementById("Veto4").style.display = "none";
    veto4 = false;
    document.getElementById("Veto").style.display = "block";
}

//删除否决5
function DeleteVeto5() {
    document.getElementById("Veto5").style.display = "none";
    veto5 = false;
    document.getElementById("Veto").style.display = "block";
}