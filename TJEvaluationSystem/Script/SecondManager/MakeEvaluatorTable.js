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
var stdType = null;

//初始化
$(function () {
    document.getElementById("KeyResponse1").style.display = "none";
    document.getElementById("KeyResponse2").style.display = "none";
    document.getElementById("KeyResponse3").style.display = "none";
    document.getElementById("KeyAbility1").style.display = "none";
    document.getElementById("KeyAbility2").style.display = "none";
    document.getElementById("KeyAbility3").style.display = "none";
    document.getElementById("KeyAttitude1").style.display = "none";
    document.getElementById("KeyAttitude2").style.display = "none";
    document.getElementById("KeyAttitude3").style.display = "none";
    document.getElementById("Response1").style.display = "none";
    document.getElementById("Response2").style.display = "none";
    document.getElementById("Response3").style.display = "none";
    document.getElementById("Ability1").style.display = "none";
    document.getElementById("Ability2").style.display = "none";
    document.getElementById("Ability3").style.display = "none";
    document.getElementById("Ability4").style.display = "none";
    document.getElementById("Attitude1").style.display = "none";
    document.getElementById("Attitude2").style.display = "none";
    document.getElementById("Attitude3").style.display = "none";
    document.getElementById("Attitude4").style.display = "none";
    document.getElementById("Veto1").style.display = "none";
    document.getElementById("Veto2").style.display = "none";
    document.getElementById("Veto3").style.display = "none";
    document.getElementById("Veto4").style.display = "none";
    document.getElementById("Veto5").style.display = "none";


    var type = [
        { text: '库类型', id: '1' },
        { text: '指标类型', id: '2' },
        { text: '指标', id: '3' }
    ];
    $("#search_type").ligerComboBox({
        data: type, valueFieldID: 'type_value', initText: '指标', width: 70
    });
    $("#search_content").ligerTextBox({ nullText: '请输入查询内容' });
});

//添加关键责任
function AddKeyResponse() {
    var name = document.getElementById("TBKeyResponseName").value;
    var content = document.getElementById("TBKeyResponseContent").value;

    if (name == "" || content == "") {
        $.ligerDialog.warn('请输入指标信息!');
        return;
    }

    if (keyResponse1 == false) {
        $(".ShowKeyResponse1").css("display", "block");
        $(".EditKeyResponse1").css("display", "none");
        document.getElementById("LKeyResponse1Name").innerText = name;
        document.getElementById("LKeyResponse1Content").innerText = content;
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
    if (keyResponse1==true&&keyResponse2==true&&keyResponse3==true)
        document.getElementById("KeyResponseEdit").style.display = "none";
    document.getElementById("TBKeyResponseName").value="";
    document.getElementById("TBKeyResponseContent").value="";
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

//选择指标
function SelectStander(std) {
    if (std == null)
        return;
    stdType = std;
    $("#MakeEvatluatorTable").css("display", "none");
    $("#SelectStander").css("display", "block");
}

//显示用户信息
function ShowStander() {
    var s = document.getElementById("JsonData").value;
    var StanderData = JSON2.parse(s);
    manager=$("#maingrid4").ligerGrid({
        columns: [
    { display: '编号', name: 'SlID', width: 50, align: 'center', frozen: true },
    { display: '库类型', name: 'SlLibType', width: 100, align: 'center' },
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
    data: StanderData,
    height: '100%',
    isScroll: false,
    onSelectRow: function (rowdata, rowindex) {
        $("#txtrowindex").val(rowindex);
    }});
    $("#pageloading").hide();
    $("#MakeEvatluatorTable").css("display", "block");
    $("#SelectStander").css("display", "none");
}

//返回考核表
function BackToTable() {
    $("#MakeEvatluatorTable").css("display", "block");
    $("#SelectStander").css("display", "none");
}

//选中指标返回
function SelectRow(rowid) {
    var rowdata = manager.getSelectedRow(rowid);    //取得数据
    if (rowdata == null)
        return;
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

//查看详细
function ShowDetail(rowid) {
    var rowdata = manager.getSelectedRow(rowid);    //取得数据
    if (rowdata == null)
        return;
    //
    $("#DetailStanderInfo").css("display", "block");
    $("#StanderInfo").css("display", "none");
    //设置显示值
    document.getElementById('LLibType').innerText = rowdata.SlLibType;
    document.getElementById('LStanderType').innerText = rowdata.SlType;
    document.getElementById('LName').innerText = rowdata.SlName;
    document.getElementById('LContentA').innerText = rowdata.SlContentA;
    document.getElementById('LContentB').innerText = rowdata.SlContentB;
    document.getElementById('LContentC').innerText = rowdata.SlContentC;
    document.getElementById('LContentD').innerText = rowdata.SlContentD;
}

//返回指标列表
function BackToStanderList() {
    $("#DetailStanderInfo").css("display", "none");
    $("#StanderInfo").css("display", "block");
}

//添加关键能力
function AddKeyAbility() {
    var id = document.getElementById('KeyAbilityNum').value;
    var name = document.getElementById('LKeyAbilityName').innerText;
    var contentA= document.getElementById('LKeyAbilityContentA').innerText;
    var contentB = document.getElementById('LKeyAbilityContentB').innerText;
    var contentC = document.getElementById('LKeyAbilityContentC').innerText;
    var contentD = document.getElementById('LKeyAbilityContentD').innerText;
    if (id == "" || name == "" || contentA == "" || contentB == "" || contentC == "" || contentD == "") {
        $.ligerDialog.warn('请选择指标!');
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
    if(ability1&&ability2&&ability3&&ability4)
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