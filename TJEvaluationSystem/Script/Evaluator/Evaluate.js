var Manager = null;
var EvaluateData = null;
var StanderLib = null;
var Evaluatetable = null;

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

//开始考评
function StartEvaluate() {
    var jsonData = document.getElementById("JsonData").value;
    var jsonData2 = document.getElementById("JsonData2").value;
    if (jsonData == null || jsonData == "" || jsonData2 == null || jsonData2 == "")
        return;
    var tableData = JSON2.parse(jsonData)[0];
    Evaluatetable = tableData;
    StanderLib = JSON2.parse(jsonData2);
    if (tableData == null)
        return;
    $('#EvaluateToolBar').css('display', 'block');
    $('#ShowEvaluateUsers').css('display', 'none');
    $('#ShowEvaluateTable').css('display', 'block');
    $('.ViewTable').css('display', 'none');
    $('.score').css('display', 'block');
    $('.ShowScore').css('display', 'none');
    $('.EditScore').css('display', 'block');
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
        var weight = 0;
        if (EvaluateData.Relation == "领导")
            weight = 60;
        else if (EvaluateData.Relation == "同事")
            weight = 20;
        else
            weight = 20;
        var data = [{ EtEvaluatedID: EvaluateData.EvaluatedID,
            EtEvaluateID: EvaluateData.UiID,
            EtAssessTableID: Evaluatetable.AtID,
            EtWeight: weight,
            EtKey: keyScore,
            EtResponse: responseScore,
            EtAbility: abilityScore,
            EtAttitude: attitudeScore,
            EtVeto: vetoScore,
            EtSum: sum
        }];
        document.getElementById("JsonData").value = JSON.stringify(data);
        document.getElementById("BFinishEvaluate").click();
    });
}