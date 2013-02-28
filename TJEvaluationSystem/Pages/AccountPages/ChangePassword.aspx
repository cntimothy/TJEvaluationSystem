<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ChangePassword.aspx.cs" Inherits="TJEvaluationSystem.Pages.AccountPages.ChangePassword" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Style/common.css" rel="stylesheet" type="text/css" />
    <script src="../../Script/Account/ChangePassword.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    <div>
        <div class="DetailMessage" style="border:3px solid #a3c0e8;width:500px;margin:0px auto; text-align:center;">
            <table>
                <tr>
                    <td>原密码</td>
                    <td><input type="password" id="OldPsw"/></td>
                </tr>
                <tr>
                    <td>新密码</td>
                    <td><input type="password" id="NewPsw"/></td>
                </tr>
                <tr>
                    <td>确认新密码</td>
                    <td><input type="password" id="NewPswConfirm"/></td>
                </tr>
                <tr>
                    <td>
                        <input type="button" onclick="Change();" value="修改" />
                    </td>
                </tr>
            </table>
        </div>
        <div class="Hidden">
            <asp:UpdatePanel ID="UpdatePanel1" runat="server" >
            <ContentTemplate>
            <input id="Data1" type="hidden" runat="server"/>
            <input id="Data2" type="hidden" runat="server"/>
            <asp:Button ID="BChangePsw" runat="server" Text="Button" onclick="BChangePsw_Click" 
                />
            </ContentTemplate>
            </asp:UpdatePanel>
        </div>
    </div>
    </form>
</body>
</html>
