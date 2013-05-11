<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CheckAssess.aspx.cs" Inherits="TJEvaluationSystem.Pages.FirstManagerPages.CheckAssess" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Style/EvaluatorTable.css" rel="stylesheet" type="text/css" />
    <link href="../../Style/common.css" rel="stylesheet" type="text/css" />
    <link href="../../lib/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />
    <script src="../../lib/jquery/jquery-1.3.2.min.js" type="text/javascript"></script>
    <script src="../../lib/json2.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/core/base.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerDialog.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerComboBox.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerTextBox.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerGrid.js" type="text/javascript"></script>
    <script src="../../Script/FirstManager/CheckAssess.js" type="text/javascript"></script>
    <script src="../../Script/MessageBox.js" type="text/javascript"></script>
    <script src="../../Script/CommonData.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" />
    <div>
        <div class="ToolBar">
         <table style="position:relative;left:20px;height:100%">
                <tr> 
                   <td>
                        <asp:SqlDataSource ID="SqlDataSource1" runat="server" 
                           ConnectionString="<%$ ConnectionStrings:ConnectionString %>" 
                           SelectCommand="SELECT DISTINCT [uiDepartment] FROM [tb_UserInfo]"></asp:SqlDataSource>
                       <span>请选择部门</span>
                       <asp:DropDownList ID="Department" runat="server" 
                           DataSourceID="SqlDataSource1" DataTextField="uiDepartment" 
                           DataValueField="uiDepartment" AppendDataBoundItems="True">
                           <asp:ListItem Value="0" >所有部门</asp:ListItem>
                       </asp:DropDownList>
                   </td>
                   <td style="width:10px;"></td>
                   <td style="padding:1px;"><input type="button" value="获取考评表" id="search_button"  onclick="search()" class="l-button" style="width:150px;height:25px;font-size:15px"/></td>
                   <td style="width:10px;"></td>
                   <td style="padding:1px;"><input type="button" value="通过" id="pass_button"  onclick="SetPassedTrue()" class="l-button" style="width:100px;height:25px;font-size:15px;display:none"/> </td>
                    <td style="width:10px;"></td>
                    <td style="padding:1px;"><input type="button" value="退回" id="sendback_button"  onclick="SetPassedFalse()" class="l-button" style="width:100px;height:25px;font-size:15px;display:none"/> </td>
                    <td style="width:10px;"></td>
                   <td style="padding:1px;"><input type="button" value="导出excel" id="dao_button"  onclick="dao()" class="l-button" style="width:100px;height:25px;font-size:15px;display:none"/> </td>
                </tr>
         </table>
     </div>
     <br />
    <asp:Label ID="Title" runat="server" Text="" style="position:relative;left:20px;font-size:16px;"></asp:Label>
    <br /><br />
        <div id="ShowAllTables" >
            <div id="maingrid" style="margin:0; padding:0;"></div>
        </div>
        <div id="ShowTableInfo" style="padding-top: 5px; display: none;">
            <div id="AssessTable"></div>
        </div>
        <div class="Hidden">
            <asp:UpdatePanel ID="UpdatePanel1" runat="server" >
            <ContentTemplate>
                <input type="hidden" id="JsonData"  runat="server"/>
                <input type="hidden" id="JsonData2" runat="server"/>
                <input type="hidden" id="JsonData3" runat="server"/>
                <asp:Button ID="BSetPassed" runat="server"
                    Text="Button" onclick="BSetPassed_Click" />
            </ContentTemplate>
            </asp:UpdatePanel>
            <asp:Button ID="BRefresh" runat="server" Text="" onclick="BRefresh_Click" />
            <asp:Button ID="LoadButton" runat="server" Text="" onclick="LoadTableData" />
            <input type="hidden" id="RowIndex"  runat="server"/>
        </div>
    </div>
    </form>
</body>
</html>
