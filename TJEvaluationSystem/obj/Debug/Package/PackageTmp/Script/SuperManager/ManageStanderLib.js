var manager = null;
var data = null;
var changed = false;

//初始化查询类型
$(function Init() {
    var type=[
        { text: '库类型', id: '1' },
        { text: '指标类型', id: '2' },
        { text: '指标', id: '3' }
    ]; 
    $("#search_type").ligerComboBox({
        data: type, valueFieldID: 'type_value', initText: '指标', width: 70
    });
    $("#search_content").ligerTextBox({ nullText: '请输入查询内容' });
    $("#search_content").ligerTextBox({ nullText: '请输入查询内容' });
});

//显示用户信息
function ShowStander() {
            var s = document.getElementById("JsonData").value;
            var StanderData = JSON2.parse(s);
            data = StanderData;
            manager = $("#maingrid4").ligerGrid({
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
            h += "<a href='javascript:DeleteRow(" + rowindex + ")'>删除</a> ";
            return h;
        }
        }], pageSize: 20,
                data: StanderData,
                height: '100%',
                isScroll: false,
                onSelectRow: function (rowdata, rowindex) {
                    $("#txtrowindex").val(rowindex);
                }
            });
            $("#pageloading").hide();
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
            case '库类型':
                return rowdata.SlLibType.indexOf(key) > -1;
                break;
            case '指标类型':
                return rowdata.SlType.indexOf(key) > -1;
                break;
            case '指标':
                return rowdata.SlName.indexOf(key) > -1;
                break;
            default:
                return rowdata.SlName.indexOf(key) > -1;
                break;
        }
    };
    return clause;
}

//查看详细
function ShowDetail(rowid) {
    var rowdata = manager.getSelectedRow(rowid);    //取得数据
    if (rowdata == null)
        return;
    //
    $("#ShowDetailStanderInfo").css("display", "block");
    $("#StanderInfo").css("display", "none");
    $(".DetailData").css("display", "block");
    $(".AddData").css("display", "none");
    //设置显示与隐藏
    $(".ShowData").css("display", "block");
    $(".EditData").css("display", "none");
    //设置显示值
    document.getElementById('standerID').innerText = rowdata.SlID;
    document.getElementById('LLibType').innerText = rowdata.SlLibType;
    document.getElementById('LStanderType').innerText = rowdata.SlType;
    document.getElementById('LName').innerText = rowdata.SlName;
    document.getElementById('LContentA').innerText = rowdata.SlContentA;
    document.getElementById('LContentB').innerText = rowdata.SlContentB;
    document.getElementById('LContentC').innerText = rowdata.SlContentC;
    document.getElementById('LContentD').innerText = rowdata.SlContentD;
}

//编辑指标
function EditStander() {
    //设置显示与隐藏
    $(".ShowData").css("display", "none");
    $(".EditData").css("display", "block");
    //设置显示值
    document.getElementById('TBLibType').value = document.getElementById('LLibType').innerText;
    document.getElementById('TBStanderType').value = document.getElementById('LStanderType').innerText;
    document.getElementById('TBName').value = document.getElementById('LName').innerText;
    document.getElementById('TBContentA').value = document.getElementById('LContentA').innerText;
    document.getElementById('TBContentB').value = document.getElementById('LContentB').innerText;
    document.getElementById('TBContentC').value = document.getElementById('LContentC').innerText;
    document.getElementById('TBContentD').value = document.getElementById('LContentD').innerText;
}

//返回列表
function BackToStanderList() {
    if (changed == true)
        document.getElementById("BRefrashPage").click();
    else {
        $("#ShowDetailStanderInfo").css("display", "none");
        $("#StanderInfo").css("display", "block");
    }
}

//取消编辑
function CancleEdit() {
    $(".ShowData").css("display", "block");
    $(".EditData").css("display", "none");
}

//更新用户信息
function UpdateStander() {
    var id = document.getElementById('standerID').value;
    var libType = document.getElementById('TBLibType').value;
    var type = document.getElementById('TBStanderType').value;
    var name = document.getElementById('TBName').value;
    var contentA = document.getElementById('TBContentA').value;
    var contentB = document.getElementById('TBContentB').value;
    var contentC = document.getElementById('TBContentC').value;
    var contentD = document.getElementById('TBContentD').value;
    $.ligerDialog.confirm("确认提交修改？", function (yes) {
        //保存到数据库
        var dataUpdate = [{ SlID:id, SlLibType: libType, SlType: type, SlName: name,
            SlContentA: contentA, SlContentB: contentB, SlContentC: contentC, SlContentD: contentD
        }];
        document.getElementById("JsonData").value = JSON.stringify(dataUpdate);
        document.getElementById("BUpdateStander").click();
    });
}

//更新信息成功
function UpdateSuccess() {
    document.getElementById('LLibType').innerText = document.getElementById('TBLibType').value;
    document.getElementById('LStanderType').innerText = document.getElementById('TBStanderType').value;
    document.getElementById('LName').innerText = document.getElementById('TBName').value;
    document.getElementById('LContentA').innerText = document.getElementById('TBContentA').value;
    document.getElementById('LContentB').innerText = document.getElementById('TBContentB').value;
    document.getElementById('LContentC').innerText = document.getElementById('TBContentC').value;
    document.getElementById('LContentD').innerText = document.getElementById('TBContentD').value;
    $(".ShowData").css("display", "block");
    $(".EditData").css("display", "none");
    changed = true;
}

//删除
function DeleteStander() {
    var id = document.getElementById('standerID').value;
    $.ligerDialog.confirm("确认删除？", function (yes) {
        document.getElementById("JsonData").value = id;
        document.getElementById("BDeleteStander").click();
    });
}

//删除数据
function DeleteRow(rowid) {
    $.ligerDialog.confirm("确认删除？", function (yes) {
        var rowdata = manager.getSelectedRow(rowid);    //取得数据
        var dataID = rowdata.SlID;
        document.getElementById("JsonData").value = dataID;
        document.getElementById("BDeleteStander").click();
    });
}

//添加人员信息
function AddStander() {
    $("#ShowDetailStanderInfo").css("display", "block");
    $("#StanderInfo").css("display", "none");
    $(".DetailData").css("display", "none");
    $(".AddData").css("display", "block");
    //设置显示与隐藏
    $(".ShowData").css("display", "none");
    $(".EditData").css("display", "block");
    //设置显示值
    document.getElementById('TBLibType').value = "";
    document.getElementById('TBStanderType').value = "";
    document.getElementById('TBName').value = "";
    document.getElementById('TBContentA').value = "";
    document.getElementById('TBContentB').value = "";
    document.getElementById('TBContentC').value = "";
    document.getElementById('TBContentD').value = "";
}
//添加
function AddNewStander() {
    var libType = document.getElementById('TBLibType').value;
    //检查用户名是否已经存在
    if (libType == "") {
        $.ligerDialog.warn('请输入库类型!');
        return;
    }
    var type = document.getElementById('TBStanderType').value;
    if (type == "") {
        $.ligerDialog.warn('请输入指标类型!');
        return;
    }
    var name = document.getElementById('TBName').value;
    if (name == "") {
        $.ligerDialog.warn('请输入指标名称!');
        return;
    }
    var contentA = document.getElementById('TBContentA').value;
    if (contentA == "") {
        $.ligerDialog.warn('请输入指标描述!');
        return;
    }
    var contentB = document.getElementById('TBContentB').value;
    if (contentB == "") {
        $.ligerDialog.warn('请输入指标描述!');
        return;
    }
    var contentC = document.getElementById('TBContentC').value;
    if (contentC == "") {
        $.ligerDialog.warn('请输入指标描述!');
        return;
    }
    var contentD = document.getElementById('TBContentD').value;
    if (contentD == "") {
        $.ligerDialog.warn('请输入指标描述!');
        return;
    }

    $.ligerDialog.confirm("确认添加？", function (yes) {
        //保存到数据库
        var dataInsert = [{SlLibType: libType, SlType: type, SlName: name,
            SlContentA: contentA, SlContentB: contentB, SlContentC: contentC, SlContentD: contentD
        }];
        document.getElementById("JsonData").value = JSON.stringify(dataInsert);
        document.getElementById("BAddStander").click();
    });
}