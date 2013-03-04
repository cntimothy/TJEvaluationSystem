<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ResetPassword.aspx.cs" Inherits="TJEvaluationSystem.Pages.FirstManagerPages.ResetPassword" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
    <head id="Head1" runat="server">
    <title>重置密码</title>
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
    <script src="../../Script/FirstManager/ResetPassword.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server"/>
    <div class="ToolBar">
         <table style="position:relative;left:20px;height:100%">
                <tr>
                    <td>请选择部门：<asp:DropDownList ID="Department" runat="server" 
                            DataSourceID="SqlDataSource1" DataTextField="uiDepartment" 
                            DataValueField="uiDepartment"></asp:DropDownList></td>                    
                    <td style="padding:1px;"><input type="button" value="查询" id="Search_button"  onclick="search()" class="l-button" style="width:100px;height:25px;font-size:15px"/></td>
                    <td style="width:10px;"></td>
                </tr>
         </table>
                    <asp:SqlDataSource ID="SqlDataSource1" runat="server" 
             ConnectionString="<%$ ConnectionStrings:ConnectionString %>" 
             
             
             SelectCommand="SELECT DISTINCT [uiDepartment] FROM [tb_UserInfo] WHERE ([uiType] LIKE '%' + @uiType + '%')">
                        <SelectParameters>
                            <asp:Parameter DefaultValue="__1%" Name="uiType" Type="String" />
                        </SelectParameters>
         </asp:SqlDataSource>
     </div>
     <div id="Messagegrid" style="margin:0 auto" ></div> 
    <div class="Hidden"> 
             <asp:Button ID="Search" runat="server" Text="Button" onclick="Search_Click" />
             <asp:Button ID="Reset" runat="server" Text="Button" onclick="Reset_Click" />
             <input id="JsonData" type="hidden" runat="server"/>
             <input id="UserID" type="hidden" runat="server"/>
             <input id="JsonList" type="hidden" runat="server"/>
             <input id="Errors" type="hidden" runat="server"/>
             <input id="UID" type="hidden" runat="server"/>
             <input id="UType" type="hidden" runat="server"/>
    </div>
     </form>
</body>
</html>
