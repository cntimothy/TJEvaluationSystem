﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SelectSecond.aspx.cs" Inherits="TJEvaluationSystem.Pages.FirstManagerPages.SelectSeond" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>查看二级管理员</title>
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
    <script src="../../Script/FirstManager/SelectSecond.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" />
    <div class="ToolBar">
        <table style="position: relative; left: 20px; height: 100%">
            <tr>
                <td>
                    <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:ConnectionString %>"
                        SelectCommand="SELECT DISTINCT [uiDepartment] FROM [tb_UserInfo]"></asp:SqlDataSource>
                    <span>请选择部门</span>
                    <asp:DropDownList ID="department" runat="server" DataSourceID="SqlDataSource1" DataTextField="uiDepartment"
                        DataValueField="uiDepartment" AppendDataBoundItems="True">
                        <asp:ListItem Value="0">所有部门</asp:ListItem>
                    </asp:DropDownList>
                </td>
                <td style="padding: 1px;">
                    <input type="button" value="查询" id="search_button" onclick="search()" class="l-button"
                        style="width: 100px; height: 25px; font-size: 15px" />
                </td>
                <td style="width: 10px;">
                </td>
            </tr>
        </table>
    </div>
    <br />
    <%--<asp:label id="name" runat="server" style="position:relative;left:20px;font-size:16px;"></asp:label>--%>
    <br />
    <div id="secondgrid" style="margin: 0 auto">
    </div>
    <div id="ShowDetailUserInfo" class="Hidden" style="text-align: center">
        <div class="DetailUserData" style="border: 3px solid #a3c0e8; width: 500px; margin: 0px auto;">
            <table>
                <tr>
                    <td align="right" class="tableKey">
                        用户名：
                    </td>
                    <td align="left" class="tableValue">
                        <div class="DetailData">
                            <asp:Label ID="MID" runat="server" Text=""></asp:Label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="right" class="tableKey">
                        部门：
                    </td>
                    <td align="left" class="tableValue">
                        <div class="ShowData">
                            <asp:Label ID="MDepartment" runat="server" Text=""></asp:Label>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div class="Hidden">
        <input id="JsonData" type="hidden" runat="server" />
        <asp:Button ID="submit" runat="server" Text="Button" OnClick="Submit_Click" />
        <asp:Button ID="Button1" runat="server" Text="Button" OnClick="Export_Click" />
        <asp:Button ID="Button2" runat="server" Text="Button" OnClick="Delete_Click" />
        <input id="Depart" type="hidden" runat="server" />
        <input id="UserID" type="hidden" runat="server" />
    </div>
    </form>
</body>
</html>
