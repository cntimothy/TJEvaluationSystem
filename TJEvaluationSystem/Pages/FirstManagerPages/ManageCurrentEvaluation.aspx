<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ManageCurrentEvaluation.aspx.cs" Inherits="TJEvaluationSystem.Pages.FirstManagerPages.ManageCurrentEvaluation" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Style/common.css" rel="stylesheet" type="text/css" />
    <link href="../../lib/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />
    <script src="../../lib/jquery/jquery-1.3.2.min.js" type="text/javascript"></script>
    <script src="../../lib/json2.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/core/base.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerDialog.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerComboBox.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerTextBox.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerGrid.js" type="text/javascript"></script>
    <script src="../../Script/FirstManager/ManageCurrentEvaluation.js" type="text/javascript"></script>
    <script src="../../Script/MessageBox.js" type="text/javascript"></script>
</head>
<body style="padding: 5px;">
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    <div>
        <div class="ToolBar">
            <table class="tool_bar_table">
                <tr id="TrExistActiveEvaluation">
                    <td class="tool_bar_td">
                        <input type="button" class="l-button" value="结束考评" style="width: 70px;" onclick="EndEvaluation();" />
                    </td>
                </tr>
                <tr id="TrNoActiveEvaluation">
                    <td class="tool_bar_td">
                        <input type="button" class="l-button" value="开始新考评" style="width: 70px;" onclick="StartNewEvaluation();" />
                    </td>
                </tr>
            </table>
        </div>
        <div class="Hidden">
            <asp:UpdatePanel ID="UpdatePanel1" runat="server">
                <ContentTemplate>
                    <input id="JsonData" type="hidden" runat="server" />
                    <asp:Button ID="BStartNewEvaluation" runat="server" Text="Button" OnClick="BStartNewEvaluation_Click" />
                </ContentTemplate>
            </asp:UpdatePanel>
        </div>
    </div>
    </form>
</body>
</html>
