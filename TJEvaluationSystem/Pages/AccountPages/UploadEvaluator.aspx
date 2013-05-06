<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="UploadEvaluator.aspx.cs" Inherits="TJEvaluationSystem.Pages.AccountPages.UploadEvaluator" %>

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
    <script src="../../lib/ligerUI/js/plugins/ligerTextBox.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerCheckBox.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerComboBox.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerGrid.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerDateEditor.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerSpinner.js" type="text/javascript"></script>
    <script src="../../script/commondata.js" type="text/javascript"></script>
    <script src="../../script/Account/UploadEvaluated.js" type="text/javascript"></script>
    <script src="../../script/messagebox.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>
        <asp:UpdatePanel ID="UpdatePanel1" runat="server" UpdateMode="Conditional">
        <ContentTemplate>
        <iframe id="FileUpload" name="FileUpload" src="UploadEvaluatorFrame.aspx" frameborder="0" 
                height="40" scrolling="no" width="100%"  ></iframe>
        </ContentTemplate>
        </asp:UpdatePanel>
        <div id="ExcelDate" style="display:none">
            <div id="maingrid" ></div>
            <div class="ToolBar" style="height:31px;" >
                <table ><tr>
                    <td style="padding:4px 10px 4px 10px;">
                    <input type="button" class="l-button" style="width:120px" onclick="save()" value="保存到数据库"/>
                    </td>
                </tr></table>
            </div>
        </div>
        <div id="hidden" style="display:none;">
            <input id="JsonData" type="hidden" runat="server"/>
            <asp:UpdatePanel ID="UpdatePanel2" runat="server" UpdateMode="Conditional">
            <ContentTemplate>
            <asp:Button ID="BSaveData" runat="server" Text="Button" onclick="BSaveData_Click" />
             </ContentTemplate>
            </asp:UpdatePanel>
        </div>
    </div>
    </form>
</body>
</html>
