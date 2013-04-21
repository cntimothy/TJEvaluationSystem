<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CheckEvaluator.aspx.cs" Inherits="TJEvaluationSystem.Pages.FirstManagerPages.CheckEvaluator" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>审核考评人名单</title>
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
    <script src="../../Script/FirstManager/CheckEvaluator.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server"/>
    <div class="ToolBar">
         <table style="position:relative;left:20px;height:100%">
                <tr> 
                   <td>
                        <asp:SqlDataSource ID="SqlDataSource1" runat="server" 
                           ConnectionString="<%$ ConnectionStrings:ConnectionString %>" 
                           SelectCommand="SELECT DISTINCT [uiDepartment] FROM [tb_UserInfo]"></asp:SqlDataSource>
                       <span>请选择部门</span>
                       <asp:DropDownList ID="Department" runat="server" 
                           DataSourceID="SqlDataSource1" DataTextField="uiDepartment" 
                           DataValueField="uiDepartment" AppendDataBoundItems="True">
                           <asp:ListItem Value="0" >所有部门</asp:ListItem>
                       </asp:DropDownList>
                   </td>
                   <td style="width:10px;"></td>
                   <td style="padding:1px;"><input type="button" value="获取被考评人名单" id="search_button"  onclick="search()" class="l-button" style="width:150px;height:25px;font-size:15px"/></td>
                   <td style="width:10px;"></td>
                   <td style="padding:1px;"><input type="button" value="通过" id="pass_button"  onclick="pass()" class="l-button" style="width:100px;height:25px;font-size:15px;display:none"/> </td>
                    <td style="width:10px;"></td>
                    <td style="padding:1px;"><input type="button" value="退回" id="sendback_button"  onclick="sendback()" class="l-button" style="width:100px;height:25px;font-size:15px;display:none"/> </td>
                    <td style="width:10px;"></td>
                   <td style="padding:1px;"><input type="button" value="导出excel" id="dao_button"  onclick="dao()" class="l-button" style="width:100px;height:25px;font-size:15px;display:none"/> </td>
                </tr>
         </table>
     </div>
     <br />
    <asp:Label ID="Title" runat="server" Text="" style="position:relative;left:20px;font-size:16px;"></asp:Label>
    <br /><br />
     <div id="evaluatedgrid" style="margin:0 auto" ></div> 

      <div id="ShowDetailUserInfo" class="Hidden" style="text-align:center" >
          <div class="DetailUserData" style="border:3px solid #a3c0e8;width:500px;margin:0px auto;">
            <table>
            <tr>
                <td align="right" class="tableKey">用户名：</td>
                <td align="left" class="tableValue">
                    <div class="DetailData">
                        <asp:Label ID="LID" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">姓名：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LName" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">性别：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LSex" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">身份证号：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LIdentityNum" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
             <tr>
                <td align="right" class="tableKey">部门：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LDepartment" runat="server" Text=""></asp:Label>
                    </div>
               </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">岗位（职务）：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LJob" runat="server" Text=""></asp:Label>
                    </div>
               </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">电话：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LTelephone" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">Email：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LEmail" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">手机：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LMobPhone" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">地址：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LAddress" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">邮编：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LZipCode" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
             <tr>
                <td align="right" class="tableKey">经费来源：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LFund" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
             <tr>
                <td align="right" class="tableKey">派遣性质：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LCharacter" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
             <tr>
                <td align="right" class="tableKey">派遣公司：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LCompany" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
             <tr>
                <td align="right" class="tableKey">考评开始时间：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LStartTime" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
             <tr>
                <td align="right" class="tableKey">考评结束时间：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LStopTime" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
            </table>
        </div>
     </div>
     <br /><br />
     <div id="box2"  class="Hidden" style="text-align:center">
         <div><asp:Label ID="pass" runat="server" Text="" style="font-size:18px;font-weight:500;text-align:center;position:relative;"></asp:Label></div>
         <div id="list" style="margin:0 auto" ></div> 
     </div>

     <div class="Hidden">
             <input id="Depart" type="hidden" runat="server"/>    
             <input id="JsonData" type="hidden" runat="server"/>
             <input id="UserID" type="hidden" runat="server"/>
             <input id="JsonList" type="hidden" runat="server"/>
             <input id="Errors" type="hidden" runat="server"/>
             <input id="Chose" type="hidden" runat="server"/>
             <input id="Passed" type="hidden" runat="server"/>
             <asp:Button ID="Search" runat="server" Text="Button" onclick="Search_Click" style="display:none"/>
             <asp:Button ID="CheckUser" runat="server"  OnClick="Check_User"  />
             <asp:Button ID="PassList" runat="server" Text="Button" onclick="Submit_Click" style="display:none" />
             <asp:Button ID="SendBack" runat="server" Text="Button" onclick="SendBack_Click" style="display:none" />
             <asp:Button ID="Dao" runat="server" Text="Button" onclick="Dao_Click" style="display:none" />      
    </div>


    </form>
</body>
</html>
