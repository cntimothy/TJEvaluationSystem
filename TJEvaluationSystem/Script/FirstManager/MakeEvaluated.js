var user;
var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

function tanchuang() {
    var s = document.getElementById("Errors").value;
    alert(s);
    if (document.getElementById("Hidden1").value == "submit") {
        load_userinfo();
    }
}

function search() {
    document.getElementById("Search").click();

}
function load_userinfo() {
    var s = document.getElementById("JsonData").value;
    var userData = JSON2.parse(s);
    user = $("#secondgrid").ligerGrid(
    {
        checkbox: true,
        columns:
         [
            { display: '用户名', name: 'UiID', width: 50, align: 'left' },
            { display: '姓名', name: 'UiName', minWidth: 60, align: 'left' },
            { display: '性别', name: 'UiSex', width: 50, align: 'left' },
            { display: '身份证号', name: 'UiIdentityNum', width: 100, align: 'left' },
            { display: '部门', name: 'UiDepartment', width: 150, align: 'left' },
            { display: '电话', name: 'UiTelephone', width: 100, align: 'left' },
            { display: '手机', name: 'UiMobPhone', width: 110, align: 'left' },
            { display: 'Email', name: 'UiEmail', width: 130, align: 'left' },
            { display: '地址', name: 'UiAddress', width: 150, align: 'left' },
            { display: '邮编', name: 'UiZipCode', width: 50, align: 'left' }
        ],
        data: userData,
        width: '96%',
        usePager: true, pageSize: 10, enableSort: true, checked: true
    });
}

function getSelected() {
    var array = user.getSelecteds();
    if (array.length < 1) {
        alert("请选择被考评者");
        return;
    }
    var selectData = JSON2.stringify(array);
    document.getElementById("JsonChecked").value = selectData;
    document.getElementById("Button1").click();

}
