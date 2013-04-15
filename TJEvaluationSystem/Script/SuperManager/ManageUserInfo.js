var manager = null;
var data = null;
var DetailData = null;
var changed = false;

//初始化查询类型
$(function Init() {
    var searchType = [{ text: '用户名', id: '1' },
                      { text: '姓名', id: '2' },
                      { text: '性别', id: '3' },
                      { text: '部门', id: '5' },
                      { text: '手机', id: '7' },
                      { text: 'Email', id: '8' }
                        ];
    $("#search_type").ligerComboBox({
        data: searchType, valueFieldID: 'type_value', initText: '用户名', width: 70
    });
    $("#search_content").ligerTextBox({ nullText: '请输入查询内容' });
    $("#search_content").ligerTextBox({ nullText: '请输入查询内容' });



    $("#DLSex").ligerComboBox({
        data: SexData, valueFieldID: 'sex_value', initText: '男', width: 70
    });

    $("#DLDepartment").ligerComboBox({
        data: DepartmentData, valueFieldID: 'dep_value', initText: '电信学院', width: 70
    });
});

//显示用户信息
function ShowUserInfo(){
    var s = document.getElementById("JsonData").value;
    var UsersData = JSON2.parse(s);
    data = UsersData;
    manager = $("#maingrid4").ligerGrid({
        columns: [
        { display: '用户名', name: 'UiID', width: 100, align: 'center', frozen: true },
        { display: '姓名', name: 'UiName', width: 100, align: 'center'},
        { display: '性别', name: 'UiSex', width: 80, align: 'center'},
        { display: '身份证号', name: 'UiIdentityNum', width: 100, align: 'center', hide: true },
        { display: '部门', name: 'UiDepartment', width: 150, align: 'center' },
        { display: '电话', name: 'UiTelephone', width: 70, align: 'center', hide: true },
        { display: '手机', name: 'UiMobPhone', width: 120, align: 'center'},
        { display: 'Email', name: 'UiEmail', width: 150, align: 'center'},
        { display: '地址', name: 'UiAddress', width: 120, align: 'center', hide: true },
        { display: '邮编', name: 'UiZipCode', width: 0, align: 'lecenterft', hide: true },
        { display: '', isSort: false, width: 100, render: function (rowdata, rowindex, value) {
            var h = "";
            h += "<a href='javascript:ShowDetail(" + rowindex + ")'>查看详细</a> ";
            h += "<a href='javascript:DeleteRow(" + rowindex + ")'>删除</a> ";
            return h;
        }
         }],
        usePager: true,pageSize:20,
        data: UsersData,
        width: '100%',
        onSelectRow: function (rowdata, rowindex) {
            $("#txtrowindex").val(rowindex);
        }
    });
    $("#pageloading").hide();
}


function ShowDetail(rowid) {
    var rowdata = manager.getSelectedRow(rowid);    //取得数据
    if (rowdata == null)
        return;
    DetailData = rowdata;
    //
    $("#ShowDetailUserInfo").css("display", "block");
    $("#UserInfo").css("display", "none");
    $(".DetailData").css("display", "block");
    $(".AddData").css("display", "none");
    //设置显示与隐藏
    $(".ShowData").css("display", "block");
    $(".EditData").css("display", "none");
    //设置显示值
    document.getElementById('LID').innerText = rowdata.UiID;
    document.getElementById('LName').innerText = rowdata.UiName;
    document.getElementById('LSex').innerText = rowdata.UiSex;
    document.getElementById('LIdentityNum').innerText = rowdata.UiIdentityNum;
    document.getElementById('LDepartment').innerText = rowdata.UiDepartment;
    document.getElementById('LTelphone').innerText = rowdata.UiTelephone;
    document.getElementById('LPhone').innerText = rowdata.UiMobPhone;
    document.getElementById('LEmail').innerText = rowdata.UiEmail;
    document.getElementById('LAddress').innerText = rowdata.UiAddress;
    document.getElementById('LZipcode').innerText = rowdata.UiZipCode;
}

//编辑用户信息
function EditUserInfo() {
    //设置显示与隐藏
    $(".ShowData").css("display", "none");
    $(".EditData").css("display", "block");
    //设置显示值
    document.getElementById('TBName').value = document.getElementById('LID').innerText;
    document.getElementById('DLSex').value = document.getElementById('LSex').innerText;
    document.getElementById('TBIdentityNum').value = document.getElementById('LIdentityNum').innerText;
    document.getElementById('DLDepartment').value = document.getElementById('LDepartment').innerText;
    document.getElementById('TBTelphone').value = document.getElementById('LTelphone').innerText;
    document.getElementById('TBPhone') .value = document.getElementById('LPhone').innerText;
    document.getElementById('TBEmail').value = document.getElementById('LEmail').innerText;
    document.getElementById('TBAddress').value = document.getElementById('LAddress').innerText;
    document.getElementById('TBZipcode').value = document.getElementById('LZipcode').innerText;
}

//取消编辑
function CancleEdit() {
    $(".ShowData").css("display", "block");
    $(".EditData").css("display", "none");
}

//更新用户信息
function UpdateUserInfo() {
    var id = document.getElementById('LID').innerText;
    var name = document.getElementById('TBName').value;
    if (CheckNull(name)) {
        $.ligerDialog.warn('请输入姓名!');
        return;
    }
    if (!CheckName(name)) {
        $.ligerDialog.warn('请输入中文姓名!');
        return;
    }
    var sex = document.getElementById('DLSex').value;
    var idnum = document.getElementById('TBIdentityNum').value;
    if (CheckNull(idnum)) {
        $.ligerDialog.warn('请输入身份证号!');
        return;
    }
    if (!CheckCardId(idnum)) {
        $.ligerDialog.warn('请输入正确身份证号!');
        return;
    }
    var dep = document.getElementById('DLDepartment').value;
    var tel = document.getElementById('TBTelphone').value;
    if (CheckNull(tel)) {
        $.ligerDialog.warn('请输入电话!');
        return;
    }
    if (!CheckTelPhone(tel)) {
        $.ligerDialog.warn('请输入正确格式的电话!');
        return;
    }
    var phone = document.getElementById('TBPhone').value;
    if (CheckNull(phone)) {
        $.ligerDialog.warn('请输入手机!');
        return;
    }
    if (!CheckMobPhone(phone)) {
        $.ligerDialog.warn('请输入正确的手机号!');
        return;
    }
    var email = document.getElementById('TBEmail').value;
    if (CheckNull(email)) {
        $.ligerDialog.warn('请输入Email!');
        return;
    }
    if (!CheckEmail(email)) {
        $.ligerDialog.warn('请输入正确的Email!');
        return;
    }
    var address = document.getElementById('TBAddress').value;
    if (CheckNull(address)) {
        $.ligerDialog.warn('请输入地址!');
        return;
    }
    var zip = document.getElementById('TBZipcode').value;
    if (CheckNull(zip)) {
        $.ligerDialog.warn('请输入邮编!');
        return;
    }
    if (!CheckZipcode(zip)) {
        $.ligerDialog.warn('请输入正确的邮编!');
        return;
    }
    $.ligerDialog.confirm("确认提交修改？", function (yes) {
        //保存到数据库
        var dataUpdate = [{ UiID: id, UiName: name, UiSex: sex,
            UiIdentityNum: idnum, UiDepartment: dep, UiTelephone: tel,
            UiMobPhone: phone, UiEmail: email, UiAddress: address, UiZipCode: zip
        }];
        document.getElementById("UserData").value = JSON.stringify(dataUpdate);
        document.getElementById("BUpdateUser").click();
    });

}

//更新信息成功
function UpdateSuccess() {
    document.getElementById('LName').innerText = document.getElementById('TBName').value;
    document.getElementById('LSex').innerText = document.getElementById('DLSex').value;
    document.getElementById('LIdentityNum').innerText = document.getElementById('TBIdentityNum').value;
    document.getElementById('LDepartment').innerText = document.getElementById('DLDepartment').value;
    document.getElementById('LTelphone').innerText = document.getElementById('TBTelphone').value;
    document.getElementById('LPhone').innerText = document.getElementById('TBPhone').value;
    document.getElementById('LEmail').innerText = document.getElementById('TBEmail').value;
    document.getElementById('LAddress').innerText = document.getElementById('TBAddress').value;
    document.getElementById('LZipcode').innerText = document.getElementById('TBZipcode').value;
    $(".ShowData").css("display", "block");
    $(".EditData").css("display", "none");
    changed = true;
}

//返回用户列表
function BackToUserList() {
    if (changed == true)
        document.getElementById("BRefrashPage").click();
    else {
        $("#ShowDetailUserInfo").css("display", "none");
        $("#UserInfo").css("display", "block");
    }
}

//刷新
function RefreshPage() {
    document.getElementById("BRefrashPage").click();
}

//删除
function DeleteUser() {
    var id = document.getElementById('LID').innerText;
    $.ligerDialog.confirm("确认删除？", function (yes) {
        document.getElementById("UserData").value = id;
        document.getElementById("BDeleteUser").click();
    });
}

//删除数据
function DeleteRow(rowid) {
    $.ligerDialog.confirm("确认删除？", function (yes) {
        var rowdata = manager.getSelectedRow(rowid);    //取得数据
        var dataID = rowdata.UiID;
        document.getElementById("UserData").value = dataID;
        document.getElementById("BDeleteUser").click();
    });
}

//添加人员信息
function AddUser(item) {
    $("#ShowDetailUserInfo").css("display", "block");
    $("#UserInfo").css("display", "none");
    $(".DetailData").css("display", "none");
    $(".AddData").css("display", "block");
    //设置显示与隐藏
    $(".ShowData").css("display", "none");
    $(".EditData").css("display", "block");
    //设置显示值
    document.getElementById('TBID').value = "";
    document.getElementById('TBName').value = "";
    document.getElementById('DLSex').value = "男";
    document.getElementById('TBIdentityNum').value = "";
    document.getElementById('DLDepartment').value = "电信学院";
    document.getElementById('TBTelphone').value = "";
    document.getElementById('TBPhone').value = "";
    document.getElementById('TBEmail').value = "";
    document.getElementById('TBAddress').value = "";
    document.getElementById('TBZipcode').value = "";
}

//添加
function AddNewUser() {
    var id = document.getElementById('TBID').value;
    //检查用户名是否已经存在
    if (CheckNull(id))
    {
        $.ligerDialog.warn('请输入用户名!');
        return;
    }
    var exist=document.getElementById('idExist').value;
    if (exist != "") {
        $.ligerDialog.warn('用户名已存在！');
        return;
    }
    var name = document.getElementById('TBName').value;
    if (CheckNull(name)) {
        $.ligerDialog.warn('请输入姓名!');
        return;
    }
    if (!CheckName(name)) {
        $.ligerDialog.warn('请输入中文姓名!');
        return;
    }
    var sex = document.getElementById('DLSex').value;
    var idnum = document.getElementById('TBIdentityNum').value;
    if (CheckNull(idnum)) {
        $.ligerDialog.warn('请输入身份证号!');
        return;
    }
    if (!CheckCardId(idnum)) {
        $.ligerDialog.warn('请输入正确身份证号!');
        return;
    }
    var dep = document.getElementById('DLDepartment').value;
    var tel = document.getElementById('TBTelphone').value;
    if (CheckNull(tel)) {
        $.ligerDialog.warn('请输入电话!');
        return;
    }
    if (!CheckTelPhone(tel)) {
        $.ligerDialog.warn('请输入正确格式的电话!');
        return;
    }
    var phone = document.getElementById('TBPhone').value;
    if (CheckNull(phone)) {
        $.ligerDialog.warn('请输入手机!');
        return;
    }
    if (!CheckMobPhone(phone)) {
        $.ligerDialog.warn('请输入正确的手机号!');
        return;
    }
    var email = document.getElementById('TBEmail').value;
    if (CheckNull(email)) {
        $.ligerDialog.warn('请输入Email!');
        return;
    }
    if (!CheckEmail(email)) {
        $.ligerDialog.warn('请输入正确的Email!');
        return;
    }
    var address = document.getElementById('TBAddress').value;
    if (CheckNull(address)) {
        $.ligerDialog.warn('请输入地址!');
        return;
    }
    var zip = document.getElementById('TBZipcode').value;
    if (CheckNull(zip)) {
        $.ligerDialog.warn('请输入邮编!');
        return;
    }
    if (!CheckZipcode(zip)) {
        $.ligerDialog.warn('请输入正确的邮编!');
        return;
    }
   $.ligerDialog.confirm("确认提交修改？", function (yes) {
        //保存到数据库
        var dataUpdate = [{ UiID: id, UiName: name, UiSex: sex,
            UiIdentityNum: idnum, UiDepartment: dep, UiTelephone: tel,
            UiMobPhone: phone, UiEmail: email, UiAddress: address, UiZipCode: zip
        }];
        document.getElementById("UserData").value = JSON.stringify(dataUpdate);
        document.getElementById("BAddUser").click();
    });
}

//重置
function ResetUserInfo() {
    document.getElementById('TBID').value = "";
    document.getElementById('TBName').value = "";
    document.getElementById('DLSex').value = "男";
    document.getElementById('TBIdentityNum').value = "";
    document.getElementById('DLDepartment').value = "电信学院";
    document.getElementById('TBTelphone').value = "";
    document.getElementById('TBPhone').value = "";
    document.getElementById('TBEmail').value = "";
    document.getElementById('TBAddress').value = "";
    document.getElementById('TBZipcode').value = "";
}

//查询
function Search() {
    manager.options.data = $.extend(true, {}, data);
    var key = $("#search_content").val();
    if (key == "请输入查询内容")
        manager.loadData(data);
    else
        manager.loadData(GetWhere(key));
}

//查询方法
function GetWhere(key) {
    if (!manager) return null;
    var clause = function (rowdata, rowindex) {
        var type = $("#search_type").val();
        switch (type) {
            case '用户名':
                return rowdata.UiID.indexOf(key) > -1;
                break;
            case '姓名':
                return rowdata.UiName.indexOf(key) > -1;
                break;
            case '性别':
                return rowdata.UiSex.indexOf(key) > -1;
                break;
            case '身份证号':
                return rowdata.UiIdentityNum.indexOf(key) > -1;
                break;
            case '部门':
                return rowdata.UiDepartment.indexOf(key) > -1;
                break;
            case '电话':
                return rowdata.UiTelephone.indexOf(key) > -1;
                break;
            case '手机':
                return rowdata.UiMobPhone.indexOf(key) > -1;
                break;
            case 'Email':
                return rowdata.UiEmail.indexOf(key) > -1;
                break;
            case '地址':
                return rowdata.UiAddress.indexOf(key) > -1;
                break;
            case '邮编':
                return rowdata.UiZipCode.indexOf(key) > -1;
                break;
            default:
                return rowdata.UiID.indexOf(key) > -1;
                break;
        }
    };
    return clause;
}

