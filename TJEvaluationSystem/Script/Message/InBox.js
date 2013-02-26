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

function search() {
    var s = document.getElementById("department").value;
    document.getElementById("Depart").value = s;
    document.getElementById("Search").click();
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

function Check(rowid) {
    var rowdata = Evaluated.getSelectedRow(rowid);    //取得数据

    if (rowdata == null)
        return;

    //    $("#dao_button").css("display", "block");
    document.getElementById("UserID").value = rowdata.UiID;
    document.getElementById("CheckUser").click();
}

function showList1() {
    load_userinfo();

    var s3 = document.getElementById("JsonList").value;
    var UsersData3 = JSON2.parse(s3);
    List = $("#list").ligerGrid({
        columns: [
        { display: '被考评人', name: 'EvaluatedID1', width: 100, align: 'center', frozen: true },
        { display: '考评人', name: 'UiID', width: 100, align: 'center' },
        { display: '身份', name: 'Relation', width: 80, align: 'center' }
        ],
        usePager: true, pageSize: 10,
        data: UsersData3,
        width: '96%'
    });
    $("#box2").css("display", "block");
}

function pass() {
    if (confirm('确认通过？')) {
        document.getElementById("PassList").click();
    }
}

function dao() {
    document.getElementById("Dao").click();

}