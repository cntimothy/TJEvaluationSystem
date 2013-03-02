function search() {
    document.getElementById("Search").click();
}

function load_message() {
    var s = document.getElementById("JsonData").value;
    var MessagesData = JSON2.parse(s);
    data = MessagesData;
    messages = $("#Messagegrid").ligerGrid({
        columns: [
        { display: '用户名', name: 'UiID', width: 100, align: 'center', frozen: true },
        { display: '姓名', name: 'UiName', width: 100, align: 'center', frozen: true },
        { display: '性别', name: 'UiSex', width: 80, align: 'center' },
        { display: '部门', name: 'UiDepartment', width: 100, align: 'center' },
        { display: '用户权限', name: 'UiType', width: 100, align: 'center' },
        { display: '', isSort: false, width: 300, render: function (rowdata, rowindex, value) {
            var h = "";
            h += "<a href='javascript:ResetPassword(" + rowindex + ")'>重置</a> ";
            return h;
        }
        }],
        usePager: true, pageSize: 10,
        data: MessagesData,
        width: '96%'
    });
}

function ResetPassword(rowid) {
    var rowdata = messages.getSelectedRow(rowid);    //取得数据  
    if (rowdata == null)
        return;
    DetailData = rowdata;
    document.getElementById("UID").value = rowdata.UiID;
    document.getElementById("UType").value = rowdata.UiType;
//    //
//    $("#Messagegrid").css("display", "none");
//    $("#ShowDetailMessage").css("display", "block");
//    $(".DetailMessage").css("display", "block");
//    //设置显示与隐藏
//    $(".DetailData").css("display", "block");
//    //设置显示值
//    document.getElementById('mSendTime').innerText = rowdata.MSendTime;
//    document.getElementById('mReceiveId').innerText = rowdata.MReceiveID;
//    document.getElementById('mTitle').innerText = rowdata.MTitle;
    //    document.getElementById('mMessage').innerText = rowdata.MMessage;
    if (window.confirm("确定重置？")) {
        document.getElementById("Reset").click();
    }
}