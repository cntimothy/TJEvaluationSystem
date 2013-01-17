<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ManageSecond.aspx.cs" Inherits="TJEvaluationSystem.Pages.FirstManagerPages.ManageSecond" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>管理二级管理员</title>
     <link href="../../Style/common.css" rel="stylesheet" type="text/css" />
    <link href="../../lib/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />
    <script src="../../lib/jquery/jquery-1.3.2.min.js" type="text/javascript"></script>
    <script src="../../lib/json2.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/core/base.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerDialog.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerTextBox.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerCheckBox.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerComboBox.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerGrid.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerDateEditor.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerSpinner.js" type="text/javascript"></script>
    <script src="../../../lib/ligerUI/js/plugins/ligerToolBar.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerTextBox.js" type="text/javascript"></script>
    <script src="../../Script/FirstManager/ManagerSecond.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
     <asp:ScriptManager ID="ScriptManager1" runat="server"/>
         <div class="ToolBar">
         <table style="position:relative;left:20px;height:100%">
                <tr> 
                   <td style="padding:1px;">
                         <select id="department" style="width:100px;height:25px;font-size:15px">
                         <option value="0">所有部门</option>
                         <option value="1">电信学院</option>
                         <option value="2">后勤部门</option>
                         <option value="3">行政部门</option>
                         </select> </td>
                   <td style="width:10px;"></td>
                   <td style="padding:1px;"><input type="button" value="查询" id="search_button"  onclick="search()" class="l-button" style="width:100px;height:25px;font-size:15px"/></td>
                   <td style="width:10px;"></td>
                   <td style="padding:1px;"><input type="button" value="提交" id="dao_button"  onclick=" getSelected()" class="l-button" style="width:100px;height:25px;font-size:15px"/> </td>
                  
                </tr>
         </table>
         </div>
    <br />
    <%--<asp:label id="name" runat="server" style="position:relative;left:20px;font-size:16px;"></asp:label>--%>
    <br /><br />
    <div id="secondgrid" style="margin:0 auto"></div> 
    <div class="Hidden">
            <input id="JsonData" type="hidden" runat="server"/>
            <input id="JsonChecked" type="hidden" runat="server"/>
            <input id="Errors" type="hidden" runat="server"/>
             <input id="Hidden1" type="hidden" runat="server"/>
            <asp:Button ID="Search" runat="server" Text="Button" onclick="Search_Click" />  
            <asp:Button ID="Button1" runat="server" Text="Button" onclick="Submit_Click" />
            
            <input id="Depart" type="hidden" runat="server"/>    
    </div>
    </form>
</body>
</html>
