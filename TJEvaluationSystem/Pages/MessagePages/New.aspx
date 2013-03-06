<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="New.aspx.cs" Inherits="TJEvaluationSystem.Pages.MessagePages.New" %>

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
    <div class="DetailMessage" style="border:3px solid #a3c0e8;width:500px;margin:0px auto;">
            <table>
            <tr>
                <td align="right" class="tableKey">收件人:</td>
                <td align="left" class="style2">
                    <div class="DetailData">
                        <asp:DropDownList ID="Receive" runat="server" DataSourceID="SqlDataSource1" 
                            DataTextField="mID" DataValueField="mID" AppendDataBoundItems="True" >
                             <asp:ListItem Value="0" >所有人</asp:ListItem>
                        </asp:DropDownList>
                        <asp:SqlDataSource ID="SqlDataSource1" runat="server" 
                            ConnectionString="Data Source=.\SQLEXPRESS;AttachDbFilename=|DataDirectory|\Database.mdf;Integrated Security=True;User Instance=True" 
                            ProviderName="System.Data.SqlClient" >
                            <SelectParameters>
                                <asp:SessionParameter Name="mID" SessionField="username" Type="String" />
                            </SelectParameters>
                        </asp:SqlDataSource>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">标题：</td>
                <td align="left" class="style2">
                    <div class="ShowData">
                        <asp:TextBox ID="Title" runat="server" Width="355px"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" 
                            ControlToValidate="Title" ErrorMessage="标题不能为空"></asp:RequiredFieldValidator>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">正文：</td>
                <td align="left" class="style2">
                    <div class="ShowData">
                        <asp:TextBox ID="Message" runat="server" TextMode="MultiLine" Width="355px" 
                            Rows="10"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" 
                            ControlToValidate="Message" ErrorMessage="正文不能为空"></asp:RequiredFieldValidator>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">
                    <asp:Button ID="Send" runat="server" Text="发送" onclick="Send_Click" />
                </td>
                <td align="left" class="style2">
                    <asp:Button ID="Cancel" runat="server" Text="重写" onclick="Cancel_Click" />
                </td>
            </tr>                  
            </table>
        </div>
    </form>
    </body>
</html>
