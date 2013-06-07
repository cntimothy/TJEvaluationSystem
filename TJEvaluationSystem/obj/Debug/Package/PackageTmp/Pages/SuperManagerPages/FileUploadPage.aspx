<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FileUploadPage.aspx.cs" Inherits="TJEvaluationSystem.Pages.SuperManagerPages.FileUploadPage" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Style/common.css" rel="stylesheet" type="text/css" />
    <link href="../../lib/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript">
        function ShowData() {
            var data = document.getElementById('JsonData').value;
            if (data == "")
                return;
            window.parent.showUserData(data);
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <div class="ToolBar">
            <table style="height:100%">
                <tr>
                <td><asp:Button ID="DownloadFile" runat="server" 
                        Text="下载模版" class="l-button" Width="100px" onclick="DownloadFile_Click"/></td>
                <td style="padding:10px;"></td>
                <td style="padding:10px;"><asp:FileUpload  ID="FUExcel"  runat="server" Height="20px" width="300px" BackColor="White" class="l-text"/></td>
                <td style="padding:10px;"></td>
                <td><asp:Button ID="BLoadFile" runat="server" 
                        Text="导入Excel文件" class="l-button" Width="100px" onclick="BLoadFile_Click"/></td>
                <td style="padding:10px;"><asp:Label ID="LLoadInfo" runat="server" Text="请导入Excel文件！" ForeColor="#FF3300" Width="200px"></asp:Label></td>
                </tr>
            </table>
        </div>
        <div id="hidden" style="display:none;">
            <input id="JsonData" type="hidden" runat="server"/>
        </div>
    </div>
    </form>
</body>
</html>
