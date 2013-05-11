<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Evaluate.aspx.cs" Inherits="TJEvaluationSystem.Pages.EvaluatorPages.Evaluate" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link href="../../Style/EvaluatorTable.css" rel="stylesheet" type="text/css" />
    <link href="../../Style/common.css" rel="stylesheet" type="text/css" />
    <link href="../../lib/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />
    <script src="../../lib/jquery/jquery-1.3.2.min.js" type="text/javascript"></script>
    <script src="../../lib/json2.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/core/base.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerDialog.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerDrag.js" type="text/javascript"></script> 
    <script src="../../lib/ligerUI/js/plugins/ligerComboBox.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerTextBox.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerGrid.js" type="text/javascript"></script>
    <script src="../../Script/Evaluator/Evaluate.js" type="text/javascript"></script>
    <script src="../../Script/MessageBox.js" type="text/javascript"></script>
    <script src="../../Script/CommonData.js" type="text/javascript"></script>
</head>
<body style="padding: 5px;">
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    <div>
        <div class="l-loading" style="display: block" id="pageloading">
        </div>
        <div class="ToolBar " id="EvaluateToolBar">
            <table class="tool_bar_table">
                <tr>
                    <td class="tool_bar_td">
                        <input type="button" value="提交" onclick="FinishEvaluate()" class="l-button" style="width: 70px;" />
                    </td>
                    <td class="tool_bar_td">
                        <input type="button" value="返回" onclick="Back()" class="l-button" style="width: 70px;" />
                    </td>
                </tr>
            </table>
        </div>
        <div id="ShowEvaluateUsers">
            <div id="maingrid" style="margin: 0; padding: 0;">
            </div>
        </div>
        <div id="ShowEvaluateTable" style="padding-top: 5px; display: none;">
            <div id="AssessTable"></div>
        </div>
        <div class="Hidden">
            <asp:UpdatePanel ID="UpdatePanel1" runat="server">
                <ContentTemplate>
                    <input type="hidden" id="JsonData" runat="server" />
                    <input type="hidden" id="JsonData2" runat="server" />
                    <input type="hidden" id="JsonData3" runat="server" />
                    <asp:Button ID="BGetEvaluateData" runat="server"
                        Text="Button" onclick="BGetEvaluateData_Click" />
                    <asp:Button ID="BFinishEvaluate" runat="server"
                        Text="Button" onclick="BFinishEvaluate_Click"  />
                </ContentTemplate>
            </asp:UpdatePanel>
        </div>
    </div>
    </form>    
</body>
</html>
