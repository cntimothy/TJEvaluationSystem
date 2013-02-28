<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AccountInfo.aspx.cs" Inherits="TJEvaluationSystem.Pages.AccountPages.AccountInfo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .style2
        {
            width: 423px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <div class="DetailMessage" style="border:3px solid #a3c0e8;width:500px;margin:0px auto;">
            <table>
                <tr>
                    <td>
                        用户名：
                        <asp:Label ID="LName" runat="server" Text=""></asp:Label>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    </form>
</body>
</html>
