var manager = null;
//保存到数据库

//显示用户信息
function showUserData(data) {
    if (manager != null) {
        $.ligerDialog.confirm("数据未保存到数据库，确认重新导入数据？", function (no) {
            return;
        });
    }
    var s = data;
    var EmployeeData = JSON2.parse(s);
    document.all("ExcelDate").style.display = 'block';
    manager = $("#maingrid").ligerGrid({
        columns: [
            { display: '用户名', name: 'UiID', width: 100, align: 'center', editor: { type: 'text'} },
            { display: '姓名', name: 'UiName', width: 60, align: 'center', editor: { type: 'text'} },
            { display: '性别', name: 'UiSex', width: 50, align: 'center',
                editor: { type: 'select', data: SexData, valueColumnName: 'Sex' }
            },
            { display: '身份证号', name: 'UiIdentityNum', width: 100, align: 'center', editor: { type: 'text'} },
            { display: '部门', name: 'UiDepartment', width: 120, align: 'center', editor: { type: 'text'} },
            { display: '岗位（职务）', name: 'UiJob', width: 100, align: 'center', editor: { type: 'text'} },
            { display: '电话', name: 'UiTelephone', width: 70, align: 'center', editor: { type: 'text'} },
            { display: '手机', name: 'UiMobPhone', width: 90, align: 'center', editor: { type: 'text'} },
            { display: 'Email', name: 'UiEmail', width: 100, align: 'center', editor: { type: 'text'} },
            { display: '地址', name: 'UiAddress', width: 120, align: 'center', editor: { type: 'text'} },
            { display: '邮编', name: 'UiZipCode', width: 50, align: 'center', editor: { type: 'text'} },
            { display: '经费来源', name: 'UiFund', width: 50, align: 'center', editor: { type: 'text'} },
            { display: '派遣性质', name: 'UiCharacter', width: 50, align: 'center', editor: { type: 'text'} },
            { display: '派遣公司', name: 'UiCompany', width: 50, align: 'center', editor: { type: 'text'} },
            { display: '用户类型', name: 'UiType', width: 50, align: 'center', editor: { type: 'text' }, hide: 1 },
            { display: '考评开始时间', name: 'UiStartTime', width: 80, align: 'center', editor: { type: 'text'} },
            { display: '考评结束时间', name: 'UiStopTime', width: 80, align: 'center', editor: { type: 'text'} },
            { display: '', isSort: false, width: 70, render: function (rowdata, rowindex, value) {
                var h = "";
                if (!rowdata._editing) {
//                    h += "<a href='javascript:beginEdit(" + rowindex + ")'>修改</a> ";
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
        enabledEdit: true, clickToEdit: true, isScroll: false,
        data: EmployeeData,
        width: '100%', usePager: false
    });
}

//开始编辑
function beginEdit(rowid) {
    manager.beginEdit(rowid);
}

//取消编辑
function cancelEdit(rowid) {
    manager.cancelEdit(rowid);
}

//结束编辑
function endEdit(rowid) {
    manager.endEdit(rowid);
}

//删除行
function deleteRow(rowid) {
    $.ligerDialog.confirm("确认删除？", function (yes) {
        manager.deleteRow(rowid);
    });
}


//保存到数据库
function save() {
    $.ligerDialog.confirm("确认保存到数据库？", function (yes) {
          var data = manager.getData();
          document.getElementById("JsonData").value = JSON.stringify(data);
        document.getElementById("BSaveData").click();
    });
}

//保存成功
function SaveSuccess() {
    $.ligerDialog.success('保存数据成功');
    document.all("ExcelDate").style.display = 'none';
    manager = null;
    document.getElementById("JsonData").value = "";
}

//保存失败
function SaveFaild() {
    $.ligerDialog.error('保存数据失败，请重试！');
}
