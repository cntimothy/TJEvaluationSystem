<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SecondManagerHome.aspx.cs" Inherits="TJEvaluationSystem.Pages.SecondManagerPages.SecondManagerHome" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>欢迎使用本系统！</title>
    <link href="../../Style/ligerui-all.css" rel="stylesheet" type="text/css" /> 
    <script src="../../Script/Ligerui/jquery-1.3.2.min.js" type="text/javascript"></script>    
    <script src="../../Script/Ligerui/ligerui.min.js" type="text/javascript"></script> 
    <script src="../../Script/SecondManager/Home.js" type="text/javascript"></script>  
    <link href="../../Style/ManagerHome.css" rel="stylesheet" type="text/css" /> 
</head>
<body>
    <form id="form1" runat="server">
    <div id="topmenu" class="l-topmenu">
        <div class="l-topmenu-logo">同济大学派遣员工绩效考核系统</div>
        <div class="l-topmenu-welcome"> 
            <asp:Label ID="LUserName" runat="server" Text="Label" ForeColor="White"></asp:Label>  
            <asp:LinkButton ID="LBAccount" runat="server" onclick="LBAccount_Click">用户</asp:LinkButton>
            <span class="space">|</span>
            <asp:LinkButton ID="LinkButton1" runat="server" onclick="LinkButton1_Click">消息</asp:LinkButton>
            <span class="space">|</span>
            <asp:LinkButton ID="GoHome" runat="server" onclick="GoHome_Click">首页</asp:LinkButton>
            <span class="space">|</span>
            <asp:LinkButton ID="LBLogout" runat="server" onclick="LBLogout_Click">注销</asp:LinkButton>
        </div>
    </div>
    <div id="layout1" style="width:99.2%; margin:0 auto; margin-top:4px; "> 
        <div position="left"  title="系级管理员" id="accordion1"> 
            <div title="考核表管理" class="l-scroll">
                <ul id="tree1" style="margin-top:3px;">
            </div>

             <div title="岗位责任书管理" class="l-scroll">
                <ul id="tree2" style="margin-top:3px;">
            </div>
        </div>

        <div position="center" id="framecenter"> 
            <div tabid="home" title="我的主页" style="height:300px" >
                <iframe frameborder="0" name="home" id="home" src=""></iframe>
            </div> 
        </div> 
    </div>

    <div  style="height:32px; line-height:32px; text-align:center;">Copyright</div>
    <div style="display:none"></div>
    </form>
</body>
</html>
