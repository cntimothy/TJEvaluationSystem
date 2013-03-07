<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AddUser.aspx.cs" Inherits="TJEvaluationSystem.Pages.SuperManagerPages.AddUser" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../style/common.css" rel="stylesheet" type="text/css" /> 
    
    <link href="../../lib/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" /> 
    <link href="../../lib/ligerUI/skins/Gray/css/all.css" rel="stylesheet" type="text/css" /> 
    <script src="../../lib/jquery/jquery-1.3.2.min.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/core/base.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerForm.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerDateEditor.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerComboBox.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerButton.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerDialog.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerRadio.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerSpinner.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerTextBox.js" type="text/javascript"></script> 
    <script src="../../lib/ligerUI/js/plugins/ligerTip.js" type="text/javascript"></script>
    <script src="../../lib/jquery-validation/jquery.validate.min.js" type="text/javascript"></script> 
    <script src="../../lib/jquery-validation/jquery.metadata.js" type="text/javascript"></script>
    <script src="../../lib/jquery-validation/messages_cn.js" type="text/javascript"></script>
    <script src="../../script/SuperManager/adduser.js" type="text/javascript"></script>
    <script src="../../Script/messagebox.js" type="text/javascript"></script>
    <style type="text/css">
           body{ font-size:12px;padding:10px}
        .l-table-edit {}
        .l-table-edit-td{ padding:4px;}
        .l-button-submit,.l-button-test{width:80px; float:left; margin-left:10px; padding-bottom:2px;}
        .l-verify-tip{ left:230px; top:120px;}
    </style>
</head>
<body >
    <form id="form1" runat="server">
    <div>
        <table cellpadding="0" cellspacing="0" class="l-table-edit" >
            <tr>
                <td align="right" class="l-table-edit-td">工号:</td>
                <td align="left" class="l-table-edit-td"><input name="txtID" type="text" id="txtID"  runat="server" ltype="text" validate="{required:true}"/></td>
                <td align="left"><input id="data_id" type="hidden" runat="server"/></td>
            </tr>
            <tr>
                <td align="right" class="l-table-edit-td">姓名:</td>
                <td align="left" class="l-table-edit-td"><input name="txtName" type="text" id="txtName" ltype="text" validate="{required:true}"/></td>
                <td align="left"><input id="data_name" type="hidden" runat="server"/></td>
            </tr>
            <tr>
                <td align="right" class="l-table-edit-td" valign="top">性别:</td>
                <td align="left" class="l-table-edit-td">
                    <input id="rSex_0" type="radio" name="rSex" value="1" checked="checked" /><label for="rSex_0">男</label> <input id="rSex_1" type="radio" name="rSex" value="2" /><label for="rSex_1">女</label></td>
                <td align="left"><input id="data_sex" type="hidden" runat="server"/></td>
            </tr>  
            <tr>
                <td align="right" class="l-table-edit-td">身份证号:</td>
                <td align="left" class="l-table-edit-td"><input name="txtIdentityNum" type="text" id="txtIdentityNum" ltype="text" validate="{required:true}" /></td>
                <td align="left"><input id="data_idnum" type="hidden" runat="server"/></td>
            </tr>
            <tr>
                <td align="right" class="l-table-edit-td">部门:</td>
                <td align="left" class="l-table-edit-td"><input name="txtDepartment" type="text" id="txtDepartment" ltype="text" validate="{required:true}"/></td>
                <td align="left"><input id="data_dep" type="hidden" runat="server"/></td>
            </tr>
            <tr>
                <td align="right" class="l-table-edit-td">电话:</td>
                <td align="left" class="l-table-edit-td"><input name="txtTelephone" type="text" id="txtTelephone" ltype="text" validate="{required:true}"/></td>
                <td align="left"><input id="data_phone" type="hidden" runat="server"/></td>
            </tr> 
            <tr>
                <td align="right" class="l-table-edit-td">手机:</td>
                <td align="left" class="l-table-edit-td"><input name="txtMobphone" type="text" id="txtMobphone"  ltype="text" validate="{required:true}"/></td>
                <td align="left"><input id="data_mphone" type="hidden" runat="server"/></td>
            </tr>      
            <tr>
                <td align="right" class="l-table-edit-td">Email:</td>
                <td align="left" class="l-table-edit-td"><input name="txtEmail" type="text" id="txtEmail"  ltype="text" validate="{required:true}"/></td>
                <td align="left"><input id="data_email" type="hidden" runat="server"/></td>
            </tr>
            <tr>
                <td align="right" class="l-table-edit-td">地址:</td>
                <td align="left" class="l-table-edit-td"> 
                <textarea cols="100" rows="4" class="l-textarea" id="txtAddress" style="width:250px" ltype="text" validate="{required:true}"></textarea></td>
                <td align="left"><input id="data_address" type="hidden" runat="server"/></td>
            </tr>
            <tr>
                <td align="right" class="l-table-edit-td">邮编:</td>
                <td align="left" class="l-table-edit-td"><input name="txtZipCode" type="text" id="txtZipCode" ltype="text" validate="{required:true}"/></td>
                <td align="left"><input id="data_zip" type="hidden" runat="server"/></td>
            </tr>  
        </table>
    </div>
    <div id="hidden" style="display:none;">
        <input type="submit" value="提交" id="bsubmit" class="l-button l-button-submit" />     
    </div>
    </form>
</body>
</html>
