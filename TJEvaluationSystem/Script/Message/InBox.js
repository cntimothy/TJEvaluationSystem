var messages = null;
var data = null;
var DetailData = null;
var List = null;
function tanchuang() {
    var error = document.getElementById("Errors").value;
    alert(error);
    if (document.getElementById("Chose").value == "submit") {
        load_userinfo();
    }
}

function searchUnRead() {
    document.getElementById("SearchUnRead").click();
}

function searchAll() {
    document.getElementById("SearchAll").click();
}

function load_message() {
    var s = document.getElementById("JsonData").value;
    var MessagesData = JSON2.parse(s);
    data = MessagesData;
    messages = $("#Messagegrid").ligerGrid({
        columns: [
        { display: 'ID', name: 'MID', width: 100, align: 'center', frozen: true },
        { display: '发送时间', name: 'MSendTime', width: 150, align: 'center', frozen: true },
        { display: '发信人', name: 'MSenderID', width: 150, align: 'center' },
        { display: '标题', name: 'MTitle', width: 300, align: 'center' },
        { display: '', isSort: false, width: 300, render: function (rowdata, rowindex, value) {
            var h = "";
            h += "<a href='javascript:ShowDetail(" + rowindex + ")'>查看详细</a> ";
            return h;
        }
        }],
        usePager: true, pageSize: 10,
        data: MessagesData,
        width: '96%'
    });
}

function ShowDetail(rowid) {
    var rowdata = messages.getSelectedRow(rowid);    //取得数据  
    if (rowdata == null)
        return;
    DetailData = rowdata;
    //
    $("#Messagegrid").css("display", "none");
    $("#ShowDetailMessage").css("display", "block");
    $(".DetailMessage").css("display", "block");
    //设置显示与隐藏
    $(".DetailData").css("display", "block");
    //设置显示值
    document.getElementById('mSendTime').innerText = rowdata.MSendTime;
    document.getElementById('mSenderId').innerText = rowdata.MSenderID;
    document.getElementById('mTitle').innerText = rowdata.MTitle;
    document.getElementById('mMessage').innerText = rowdata.MMessage;
    document.getElementById('ReadMsgId').value = rowdata.MID;;
}