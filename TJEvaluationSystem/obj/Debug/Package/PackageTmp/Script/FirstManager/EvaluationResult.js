
var user = null;

var detailResult = null;

function GetEvaluatedList() {
    document.getElementById("BGetEvaluatedList").click();

}

//导入被考评人信息
function load_userinfo() {
    var s = document.getElementById("JsonData").value;
    var UsersData = JSON2.parse(s);

    user = $("#secondgrid").ligerGrid({
        columns: [
        { display: '用户名', name: 'UiID', width: 100, align: 'center', frozen: true },
        { display: '姓名', name: 'UiName', width: 80, align: 'center', frozen: true },
        { display: '部门', name: 'UiDepartment', width: 50, align: 'center', frozen: true },
        { display: '操作', isSort: false, width: 250, render: function (rowdata, rowindex, value) {
            var h = "";
            h += "<a href='javascript:ShowDetailInfo(" + rowindex + ")'>被考评人详细信息</a> ";
            h += "<a href='javascript:GetDetailResult(" + rowindex + ")'>详细考评结果</a> ";
            h += "<a href='javascript:GetResult(" + rowindex + ")'>综合考评结果</a> ";
            return h;
        }
        }],
        usePager: true, pageSize: 10,
        data: UsersData,
        width: '96%'
    });
}

//显示被考评人详细信息
function ShowDetailInfo(rowid) {
    var rowdata = user.getSelectedRow(rowid);    //取得数据  
    if (rowdata == null)
        return;
    DetailData = rowdata;
    //
    $("#secondgrid").css("display", "none");
    $("#ShowDetailUserInfo").css("display", "block");
    $("#GetEvaluatedList").css("display", "none");
    $("#BackToShowList").css("display", "block");
    //设置显示值
    document.getElementById('LID').innerText = rowdata.UiID;
    document.getElementById('LName').innerText = rowdata.UiName;
    document.getElementById('LSex').innerText = rowdata.UiSex;
    document.getElementById('LIdentityNum').innerText = rowdata.UiIdentityNum;
    document.getElementById('LDepartment').innerText = rowdata.UiDepartment;
    document.getElementById('LTelephone').innerText = rowdata.UiTelphone;
    document.getElementById('LEmail').innerText = rowdata.UiEmail;
    document.getElementById('LPhone').innerText = rowdata.UiMobPhone;
    document.getElementById('LAddress').innerText = rowdata.UiAddress;
    document.getElementById('LZipcode').innerText = rowdata.UiZipCode;
}

function BackToShowList()
{
    $("#secondgrid").css("display", "block");
    $("#ShowDetailUserInfo").css("display", "none");
    $("#GetEvaluatedList").css("display", "block");
    $("#BackToShowList").css("display", "none");
}

//获取详细考评结果
function GetDetailResult(rowid) {
    var rowdata = user.getSelectedRow(rowid);    //取得数据  
    if (rowdata == null)
        return;
    document.getElementById('JsonData').value = rowdata.UiID;
    document.getElementById("BGetDetailResult").click();
}

//获取综合考评结果
function GetResult(rowid) {
    var rowdata = user.getSelectedRow(rowid);    //取得数据  
    if (rowdata == null)
        return;
    document.getElementById('JsonData').value = rowdata.UiID;
    document.getElementById("BGetResult").click();
}

//显示详细考评结果
function ShowDetailResult()
{
    var s = document.getElementById("JsonData").value;
    var reslutData = JSON2.parse(s);

    $("#EvaluatedInfo").css("display", "none");
    $("#DetailResult").css("display", "block");

    detailResult = $("#detailResultGrid").ligerGrid({
        columns: [
        { display: '考评人ID', name: 'UiID', width: 100, align: 'center', frozen: true },
        { display: '考评人姓名', name: 'UiName', width: 80, align: 'center', frozen: true },
        { display: '考评人部门', name: 'UiDepartment', width: 80, align: 'center', frozen: true },
        { display: '与被考评人关系', name: 'EtRelation', width: 100, align: 'center', frozen: true },
        { display: '关键绩效指标', name: 'EtKey', width: 80, align: 'center', frozen: true },
        { display: '岗位职责指标', name: 'EtResponse', width: 80, align: 'center', frozen: true },
        { display: '岗位胜任能力指标', name: 'EtAbility', width: 100, align: 'center', frozen: true },
        { display: '工作态度指标', name: 'EtAttitude', width: 80, align: 'center', frozen: true },
        { display: '否决指标', name: 'EtVeto', width: 80, align: 'center', frozen: true },
        { display: '总分', name: 'EtSum', width: 50, align: 'center', frozen: true },
        { display: '操作', isSort: false, width: 100, render: function (rowdata, rowindex, value) {
            var h = "";
            h += "<a href='javascript:ShowEvaluatorInfo(" + rowindex + ")'>考评人详细信息</a> ";
            return h;
        }
        }],
        usePager: true, pageSize: 10,
        data: reslutData,
        width: '96%'
    });
}

//返回被考评人列表
function BackToEvaluatedList() {
    $("#EvaluatedInfo").css("display", "block");
    $("#DetailResult").css("display", "none");
    $("#Result").css("display", "none");
}

//显示考评人详细信息
function ShowEvaluatorInfo(rowid) {
    var rowdata = detailResult.getSelectedRow(rowid);    //取得数据  
    if (rowdata == null)
        return;

    $("#detailResultGrid").css("display", "none");
    $("#EvaluatorInfo").css("display", "block");
    $("#BackToEvaluatedList").css("display", "none");
    $("#BackToDetailResult").css("display", "block");
    //设置显示值
    document.getElementById('LEID').innerText = rowdata.UiID;
    document.getElementById('LEName').innerText = rowdata.UiName;
    document.getElementById('LESex').innerText = rowdata.UiSex;
    document.getElementById('LEIdentityNum').innerText = rowdata.UiIdentityNum;
    document.getElementById('LEDepartment').innerText = rowdata.UiDepartment;
    document.getElementById('LETelephone').innerText = rowdata.UiTelphone;
    document.getElementById('LEEmail').innerText = rowdata.UiEmail;
    document.getElementById('LEPhone').innerText = rowdata.UiMobPhone;
    document.getElementById('LEAddress').innerText = rowdata.UiAddress;
    document.getElementById('LEZipcode').innerText = rowdata.UiZipCode;
}


function BackToDetailResult() {
    $("#detailResultGrid").css("display", "block");
    $("#EvaluatorInfo").css("display", "none");
    $("#BackToEvaluatedList").css("display", "block");
    $("#BackToDetailResult").css("display", "none");
}