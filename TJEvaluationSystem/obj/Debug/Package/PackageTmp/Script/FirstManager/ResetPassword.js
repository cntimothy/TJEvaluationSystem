function search() {
    document.getElementById("Search").click();
}

function load_message() {
    var s = document.getElementById("JsonData").value;
    var MessagesData = JSON2.parse(s);
    data = MessagesData;
    messages = $("#Messagegrid").ligerGrid({
        columns: [
        { display: '用户名', name: 'MID', width: 100, align: 'center', frozen: true },
        { display: '部门', name: 'MDepartment', width: 100, align: 'center' },
        { display: '类型', name: 'MType', width: 100, align: 'center' },
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
    document.getElementById("MID").value = rowdata.MID;
    document.getElementById("MType").value = rowdata.MType;
    document.getElementById("MDepartment").value = rowdata.MDepartment;
    if (window.confirm("确定重置？")) {
        document.getElementById("Reset").click();
    }
}