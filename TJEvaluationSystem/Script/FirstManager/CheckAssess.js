
var StanderLib = null;
var AssessTables = null;
var Manager = null;
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
    StanderLib = JSON2.parse(data2);
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
        h += "<a href='javascript:ShowDetail(" + rowindex + ")'>查看</a> ";
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

//显示考核表
function ShowDetail(rowindex) {
    document.getElementById("RowIndex").value = rowindex;
    var tableData = Manager.getSelectedRow(rowindex);    //取得数据
    if (tableData == null)
        return;
    $('#TrShowAllTables').css('display', 'none');
    $('#TrShowTableInfo').css('display', 'block');
    $('#ShowAllTables').css('display', 'none');
    $('#ShowTableInfo').css('display', 'block');
    $('.ViewTable').css('display', 'none');
    $('.score').css('display', 'none');
    //显示岗位职责指标
    function ShowResponse(trID, nameID, contentID, str, showClass, editClass) {
        if (str != null && str != "") {
            var strArr = new Array();
            strArr = str.split('&');
            $(nameID).html(strArr[0]);
            $(contentID).html(strArr[1]);
            $(trID).css("display", "block");
            return true;
        }
        return false;
    }
    function getStanderByID(id, lib) {
        if (id != null && lib != null) {
            for (var row in lib) {
                if (lib[row].SlID == id)
                    return lib[row];
            }
        }
        return null;
    }
    //显示否决指标
    function ShowVeto(trID, stdID, contentID, numID) {
        var std = getStanderByID(stdID, StanderLib);
        if (std == null)
            return false;
        $(contentID).html(std.SlContentA);
        $(numID).val(std.SlID);
        $(trID).css("display", "block");
        return true;
    }
    //显示其他指标
    function ShowOther(trID, stdID, nameID,
                        contentAID, contentBID, contentCID, contentDID, numID) {
        var std = getStanderByID(stdID, StanderLib);
        if (std == null)
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
    if (ShowResponse('#KeyResponse2', '#LKeyResponse2Name', '#LKeyResponse2Content',
                tableData.AtKeyResponse2, '.ShowKeyResponse2', '.EditKeyResponse2'))
        keyResponse2 = true;
    if (ShowResponse('#KeyResponse3', '#LKeyResponse3Name', '#LKeyResponse3Content',
                tableData.AtKeyResponse3, '.ShowKeyResponse3', '.EditKeyResponse3'))
        keyResponse3 = true;
    if (ShowOther('#KeyAbility1', tableData.AtKeyAbility1, '#LKeyAbility1Name',
              '#LKeyAbility1ContentA', '#LKeyAbility1ContentB', '#LKeyAbility1ContentC', '#LKeyAbility1ContentD', '#KeyAbility1Num'))
        keyAbility1 = true;
    if (ShowOther('#KeyAbility2', tableData.AtKeyAbility2, '#LKeyAbility2Name',
              '#LKeyAbility2ContentA', '#LKeyAbility2ContentB', '#LKeyAbility2ContentC', '#LKeyAbility2ContentD', '#KeyAbility1Num'))
        keyAbility2 = true;
    if (ShowOther('#KeyAbility3', tableData.AtKeyAbility3, '#LKeyAbility3Name',
              '#LKeyAbility3ContentA', '#LKeyAbility3ContentB', '#LKeyAbility3ContentC', '#LKeyAbility3ContentD', '#KeyAbility1Num'))
        keyAbility3 = true;
    if (ShowOther('#KeyAttitude1', tableData.AtKeyAttitude1, '#LKeyAttitude1Name',
              '#LKeyAttitude1ContentA', '#LKeyAttitude1ContentB', '#LKeyAttitude1ContentC', '#LKeyAttitude1ContentD', '#KeyAttitude1Num'))
        keyAttitude1 = true;
    if (ShowOther('#KeyAttitude2', tableData.AtKeyAttitude2, '#LKeyAttitude2Name',
              '#LKeyAttitude2ContentA', '#LKeyAttitude2ContentB', '#LKeyAttitude2ContentC', '#LKeyAttitude2ContentD', '#KeyAttitude2Num'))
        keyAttitude2 = true;
    if (ShowOther('#KeyAttitude3', tableData.AtKeyAttitude3, '#LKeyAttitude3Name',
              '#LKeyAttitude3ContentA', '#LKeyAttitude3ContentB', '#LKeyAttitude3ContentC', '#LKeyAttitude3ContentD', '#KeyAttitude3Num'))
        keyAttitude3 = true;
    if (ShowResponse('#Response1', '#LResponse1Name', '#LResponse1Content',
                tableData.AtResponse1, '.ShowResponse1', '.EditResponse1'))
        response1 = true;
    if (ShowResponse('#Response2', '#LResponse2Name', '#LResponse2Content',
                tableData.AtResponse2, '.ShowResponse2', '.EditResponse2'))
        response2 = true;
    if (ShowResponse('#Response3', '#LResponse3Name', '#LResponse3Content',
                tableData.AtResponse3, '.ShowResponse3', '.EditResponse3'))
        response3 = true;
    if (ShowOther('#Ability1', tableData.AtAbility1, '#LAbility1Name',
              '#LAbility1ContentA', '#LAbility1ContentB', '#LAbility1ContentC', '#LAbility1ContentD', '#Ability1Num'))
        ability1 = true;
    if (ShowOther('#Ability2', tableData.AtAbility2, '#LAbility2Name',
              '#LAbility2ContentA', '#LAbility2ContentB', '#LAbility2ContentC', '#LAbility3ContentD', '#Ability2Num'))
        ability2 = true;
    if (ShowOther('#Ability3', tableData.AtAbility3, '#LAbility3Name',
              '#LAbility3ContentA', '#LAbility3ContentB', '#LAbility3ContentC', '#LAbility3ContentD', '#Ability3Num'))
        ability3 = true;
    if (ShowOther('#Ability4', tableData.AtAbility4, '#LAbility4Name',
              '#LAbility4ContentA', '#LAbility4ContentB', '#LAbility4ContentC', '#LAbility4ContentD', '#Ability4Num'))
        ability4 = true;
    if (ShowOther('#Attitude1', tableData.AtAttitude1, '#LAttitude1Name',
              '#LAttitude1ContentA', '#LAttitude1ContentB', '#LAttitude1ContentC', '#LAttitude1ContentD', '#Attitude1Num'))
        attitude1 = true;
    if (ShowOther('#Attitude2', tableData.AtAttitude2, '#LAttitude2Name',
              '#LAttitude2ContentA', '#LAttitude2ContentB', '#LAttitude2ContentC', '#LAttitude2ContentD', '#Attitude2Num'))
        attitude2 = true;
    if (ShowOther('#Attitude3', tableData.AtAttitude3, '#LAttitude3Name',
              '#LAttitude3ContentA', '#LAttitude3ContentB', '#LAttitude3ContentC', '#LAttitude3ContentD', '#Attitude3Num'))
        attitude3 = true;
    if (ShowOther('#Attitude4', tableData.AtAttitude4, '#LAttitude4Name',
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
    if (ShowVeto('#Veto5', tableData.AtVeto5, '#LVeto5Content', '#Veto5Num'))
        veto5 = true;
    $('#KeyWeightView').html(tableData.AtKeyWeight);
    $('#ResponseWeightView').html(tableData.AtResponseWeight);
    $('#AbilityWeightView').html(tableData.AtAbilityWeight);
    $('#AttitudeWeightView').html(tableData.AtAttitudeWeight);

}

//返回
function back() {
    $('#TrShowAllTables').css('display', 'block');
    $('#TrShowTableInfo').css('display', 'none');
    $('#ShowAllTables').css('display', 'block');
    $('#ShowTableInfo').css('display', 'none');
}