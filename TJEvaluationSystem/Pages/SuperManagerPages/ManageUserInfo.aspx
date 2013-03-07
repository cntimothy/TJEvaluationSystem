<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ManageUserInfo.aspx.cs" Inherits="TJEvaluationSystem.Pages.SuperManagerPages.ManageUserInfo" %>

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
    <script src="../../../lib/ligerUI/js/plugins/ligerToolBar.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerTextBox.js" type="text/javascript"></script>
    <script src="../../Script/commondata.js" type="text/javascript"></script>
    <script src="../../Script/SuperManager/ManageUserInfo.js" type="text/javascript"></script>
    <script src="../../Script/messagebox.js" type="text/javascript"></script>
    <script src="../../Script/CommonFunction.js" type="text/javascript"></script>
</head>
<body style="padding:6px; overflow:hidden;">
    <div class="l-loading" style="display:block" id="pageloading"></div> 
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
        <div id="UserInfo">
            <div class="ToolBar">
                <table style="height:100%">
                    <tr>
                        <td style="padding:1px;"><input type="text" id="search_type"/></td>
                        <td style="padding:1px;"><input type="text" id="search_content" style="width:200px" /></td>
                        <td style="padding:1px;"><input type="button" value="查询" id="search_button"  onclick="Search()" class="l-button" style="width:55px;height:22px;"/> </td>
                        <td style="width:30px;"></td>
                        <td style="padding:1px;"><input type="button" value="添加" id="add_button"  onclick="AddUser()" class="l-button" style="width:55px;height:22px;"/> </td>
                        <td style="width:30px;"></td>
                    </tr>
                </table>
            </div>
            <div id="maingrid4" style="margin:0; padding:0"></div>
        </div>

        <div id="ShowDetailUserInfo" class="Hidden" style="text-align:center" >
        <div class="ToolBar" style="height:30px">
            <div class="DetailData" style="vertical-align:middle; height:30px">
                <table style="height:100%">
                    <tr>
                        <td style="padding:1px;">
                            <div class="ShowData"><input type="button" value="编辑"  onclick="EditUserInfo();" class="l-button" style="width:55px;"/></div>
                            <div class="EditData"><input type="button" value="提交"  onclick="UpdateUserInfo();" class="l-button" style="width:55px;"/></div>
                        </td>
                        <td style="padding:1px;">
                            <div class="ShowData"><input type="button" value="删除"  onclick="DeleteUser();" class="l-button" style="width:55px;"/></div>
                            <div class="EditData"><input type="button" value="取消"  onclick="CancleEdit();" class="l-button" style="width:55px;"/></div>
                        </td>
                        <td style="padding:1px;"><input type="button" value="返回"  onclick="BackToUserList()" class="l-button" style="width:55px;"/> </td>
                    </tr>
                </table>
            </div>
            <div class="AddData" >
                <table style="height:100%">
                    <tr>
                        <td style="padding:1px;"><input type="button" value="添加"  onclick="AddNewUser();" class="l-button" style="width:55px;"/></td>
                        <td style="padding:1px;"><input type="button" value=" 重置"  onclick="ResetUserInfo();" class="l-button" style="width:55px;"/></td>
                        <td style="padding:1px;"><input type="button" value="返回"  onclick="BackToUserList()" class="l-button" style="width:55px;"/> </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="DetailUserData" style="border:3px solid #a3c0e8;width:500px;margin:0px auto;">
            <table>
            <tr>
                <td align="right" class="tableKey">工号：</td>
                <td align="left" class="tableValue">
                    <div class="DetailData">
                        <asp:Label ID="LID" runat="server" Text=""></asp:Label>
                    </div>
                    <div class="AddData">
                        <asp:UpdatePanel ID="UpdatePanel2" runat="server" >
                        <ContentTemplate>
                        <asp:TextBox ID="TBID" runat="server" AutoPostBack="True" 
                                ontextchanged="TBID_TextChanged"></asp:TextBox>
                        <input id="idExist" type="hidden" runat="server"/>
                        </ContentTemplate>
                        </asp:UpdatePanel>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">姓名：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LName" runat="server" Text=""></asp:Label>
                    </div>
                    <div class="EditData">
                        <asp:TextBox ID="TBName" runat="server" ></asp:TextBox>
                        <asp:Label ID="LNameInfo" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">性别：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LSex" runat="server" Text=""></asp:Label>
                    </div>
                    <div class="EditData">
                        <input type="text" id="DLSex"/>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">身份证号：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LIdentityNum" runat="server" Text=""></asp:Label>
                    </div>
                    <div class="EditData">
                        <asp:TextBox ID="TBIdentityNum" runat="server"></asp:TextBox>
                        <asp:Label ID="LIdentityNumInfo" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
             <tr>
                <td align="right" class="tableKey">部门：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LDepartment" runat="server" Text=""></asp:Label>
                    </div>
                    <div class="EditData">
                        <input type="text" id="DLDepartment"/>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">电话：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LTelphone" runat="server" Text=""></asp:Label>
                    </div>
                    <div class="EditData">
                        <asp:TextBox ID="TBTelphone" runat="server" ></asp:TextBox>
                        <asp:Label ID="LTelphoneInfo" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">手机：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LPhone" runat="server" Text=""></asp:Label>
                    </div>
                    <div class="EditData">
                        <asp:TextBox ID="TBPhone" runat="server" ></asp:TextBox>
                        <asp:Label ID="LPhoneInfo" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">Email：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LEmail" runat="server" Text=""></asp:Label>
                    </div>
                    <div class="EditData">
                        <asp:TextBox ID="TBEmail" runat="server" ></asp:TextBox>
                        <asp:Label ID="LEmailInfo" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">地址：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LAddress" runat="server" Text=""></asp:Label>
                    </div>
                    <div class="EditData">
                        <asp:TextBox ID="TBAddress" runat="server" TextMode="MultiLine" Width="250" Height="50"></asp:TextBox>
                        <asp:Label ID="LAddressInfo" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">邮编：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LZipcode" runat="server" Text=""></asp:Label>
                    </div>
                    <div class="EditData">
                        <asp:TextBox ID="TBZipcode" runat="server" ></asp:TextBox>
                        <asp:Label ID="LZipCodeInfo" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
            </table>
        </div>
        <div class="Hidden">
        <asp:UpdatePanel ID="UpdatePanel1" runat="server" >
        <ContentTemplate>
            <input id="UserData" type="hidden" runat="server"/>
            <asp:Button ID="BUpdateUser" runat="server" Text="Button" 
                onclick="BUpdateUser_Click" />
            <asp:Button ID="BDeleteUser" runat="server" Text="Button" 
                onclick="BDeleteUser_Click" />
            <asp:Button ID="BAddUser" runat="server" Text="Button" 
                onclick="BAddUser_Click"  />
        </ContentTemplate>
        </asp:UpdatePanel>
        </div>
        </div>

        <div class="Hidden">
            <input id="JsonData" type="hidden" runat="server"/>
            <asp:Button ID="BRefrashPage" runat="server" Text="Button" 
                onclick="BRefrashPage_Click" />
            <input id="TempData" type="hidden" runat="server"/>
        </div>
    </form>
</body>
</html>
