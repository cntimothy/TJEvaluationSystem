
var page_check = false;
function checkUserInfo() {
    document.getElementById("bsubmit").click();
    if (page_check == false) {
        return null;
    }
    else {
        //document.getElementById("BAddUser").click();
        //得到json字符串
        var uiID = document.getElementById("txtID").value;
        var uiName = document.getElementById("txtName").value;
        var uiSex;
        if (document.getElementsByName("rSex").value == 1)
            uiSex = "男";
        else
            uiSex = "女";
        var uiIdNum=document.getElementById("txtIdentityNum").value;
        var uiDep=document.getElementById("txtDepartment").value;
        var uiTel=document.getElementById("txtTelephone").value;
        var uiMob=document.getElementById("txtMobphone").value;
        var uiEmail=document.getElementById("txtEmail").value;
        var uiAddress=document.getElementById("txtAddress").value;
        var uiZip=document.getElementById("txtZipCode").value;
        var dataAdd = [{ UiID: uiID, UiName: uiName,UiSex:uiSex,UiIdentityNum:uiIdNum,
                        UiDepartment:uiDep,UiTelephone:uiTel,UiMobPhone:uiMob,
                        UiEmail: uiEmail, UiAddress: uiAddress, UiZipCode: uiZip}];
        return dataAdd;
    }
}
$(function () {
    $.metadata.setType("attr", "validate");
    var v = $("form").validate({
        debug: true,
        errorPlacement: function (lable, element) {
            if (element.hasClass("l-textarea")) {
                element.ligerTip({ content: lable.html(), target: element[0] });
            }
            else if (element.hasClass("l-text-field")) {
                element.parent().ligerTip({ content: lable.html(), target: element[0] });
            }
            else {
                lable.appendTo(element.parents("td:first").next("td"));
            }
        },
        success: function (lable) {
            lable.ligerHideTip();
            lable.remove();
        },
        submitHandler: function () {
            $("form .l-text,.l-textarea").ligerHideTip();
            page_check = true;
            
        }
    });
    $("form").ligerForm();
});  
