var sexData = [{ Sex: 1, text: '男' }, { Sex: 2, text: '女'}];
var manager, g;
function f_initGrid() {
    document.all("ExcelDate").style.display = 'block';
    var s = document.getElementById("JsonData").value;
    var EmployeeData = JSON2.parse(s);
    g = manager = $("#maingrid").ligerGrid({
        columns: [
            { display: '用户名', name: 'UiID', width: 50, align: 'left', editor: { type: 'text'} },
            { display: '姓名', name: 'UiName', minWidth: 60, align: 'left', editor: { type: 'text'} },
            { display: '性别', name: 'UiSex', width: 50, align: 'left',
                editor: { type: 'select', data: sexData, valueColumnName: 'Sex' }

            },
            { display: '身份证号', name: 'UiIdentityNum', width: 100, align: 'left', editor: { type: 'text'} },
            { display: '部门', name: 'UiDepartment', width: 150, align: 'left', editor: { type: 'text'} },
            { display: '电话', name: 'UiTelephone', width: 80, align: 'left', editor: { type: 'text'} },
            { display: '手机', name: 'UiMobPhone', width: 80, align: 'left', editor: { type: 'text'} },
            { display: 'Email', name: 'UiEmail', width: 100, align: 'left', editor: { type: 'text'} },
            { display: '地址', name: 'UiAddress', width: 150, align: 'left', editor: { type: 'text'} },
            { display: '邮编', name: 'UiZipCode', width: 50, align: 'left', editor: { type: 'text'} },
            { display: '操作', isSort: false, width: 120, render: function (rowdata, rowindex, value) {
                var h = "";
                if (!rowdata._editing) {
                    h += "<a href='javascript:beginEdit(" + rowindex + ")'>修改</a> ";
                    h += "<a href='javascript:deleteRow(" + rowindex + ")'>删除</a> ";
                }
                else {
                    h += "<a href='javascript:endEdit(" + rowindex + ")'>提交</a> ";
                    h += "<a href='javascript:cancelEdit(" + rowindex + ")'>取消</a> ";
                }
                return h;
                }
            }],
        onSelectRow: function (rowdata, rowindex) {
            $("#txtrowindex").val(rowindex);
        },
        enabledEdit: true, clickToEdit: false, isScroll: false,
        data: EmployeeData,
        width: '100%',height: '100%'
    });
}
function beginEdit(rowid) {
    manager.beginEdit(rowid);
}
function cancelEdit(rowid) {
    manager.cancelEdit(rowid);
}
function endEdit(rowid) {
    manager.endEdit(rowid);
}
function deleteRow(rowid) {
    if (confirm('确定删除?')) {
        manager.deleteRow(rowid);
    }
}
function getSelected() {
    var row = manager.getSelectedRow();
    if (!row) { alert('请选择行'); return; }
    alert(JSON.stringify(row));
}
function saveToDB() {
    var data = manager.getData();
    document.getElementById("JsonData").value = JSON.stringify(data);
    document.getElementById("BSaveData").click();
}
function addNewRow() {
    var manager = $("#maingrid").ligerGetGridManager();
    manager.addEditRow();
} 

