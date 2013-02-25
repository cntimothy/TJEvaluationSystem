<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="TJEvaluationSystem.Pages.Login" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>同济大学派遣员工绩效考核系统欢迎您！</title>
    <link href="../Style/alogin.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <div class="Main">
        <ul>
            <li class="top"></li>
            <li class="top2"></li>
            <li class="topA"></li>
            <li class="topB"><span>
                <img src="../images/login/logo.gif" alt="" style="" />
            </span></li>
            <li class="topC"></li>
            <li class="topD">
                <ul class="login">
                    <li><span class="left">用户名：</span> <span style="left">&nbsp;</span>
                        <span><asp:TextBox ID="TBUserName" runat="server" 
                            style="margin-top: 0px" Cssclass="txt" ></asp:TextBox>
                    </span></li>
                    <li><span class="left">密 码：</span> <span style="left">&nbsp;</span> <span>
                        <asp:TextBox ID="TBPassword" runat="server"
                            style="margin-top: 0px" Cssclass="txt" TextMode="Password" ></asp:TextBox>
                    </span></li>
                    <li><span class="left">登陆身份：</span> <span style="left">&nbsp;</span>
                         <span>
                            <asp:RadioButton GroupName="Radio" ID="RadioButton1" runat="server" Text="超级管理员" />
                         </span>
                         <span>
                            <asp:RadioButton GroupName="Radio" ID="RadioButton2" runat="server" Text="人事处管理员" />
                        </span>
                    </li>
                    <li><span class="left" >&nbsp;&nbsp;&nbsp;&nbsp;</span> <span style="left">&nbsp;</span>
                       <span>
                            <asp:RadioButton GroupName="Radio" ID="RadioButton3" runat="server" Text="系级管理员" />
                         </span>
                         <span>
                            <asp:RadioButton GroupName="Radio" ID="RadioButton4" runat="server" Text="考评者" />
                        </span>
                    </li>                    
                    <li><span class="left"></span>
                        <span style="left">&nbsp;</span>
                        <span style="left">
                    &nbsp;</span>
                        <span>
                        <asp:Label ID="LBPrompt"
                                runat="server" Visible="False" ForeColor="Red"></asp:Label>
                        <asp:RequiredFieldValidator ID="RFVUserName" runat="server" ControlToValidate="TBUserName"
                            Display="Dynamic" ErrorMessage="用户名不能为空" ForeColor="Red"></asp:RequiredFieldValidator>
                        <asp:RequiredFieldValidator ID="RFVPassword" runat="server" ControlToValidate="TBPassword"
                            Display="Dynamic" ErrorMessage="密码不能为空" ForeColor="Red"></asp:RequiredFieldValidator>
                    </span>
                    </li>
                    
                </ul>
            </li>
            <li class="topE"></li>
            <li class="middle_A"></li>
            <li class="middle_B"></li>
            <li class="middle_C">
            <span class="btn">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <asp:ImageButton ID="IBLogin" runat="server" 
                    ImageUrl="../images/login/btnlogin.gif" onclick="IBLogin_Click"  />
            </span>
            </li>
            <li class="middle_D"></li>
            <li class="bottom_A"></li>
            <li class="bottom_B"></li>
        </ul>
    </div>
    </form>
</body>
</html>
