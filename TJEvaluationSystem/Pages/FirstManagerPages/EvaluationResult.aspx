<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="EvaluationResult.aspx.cs" Inherits="TJEvaluationSystem.Pages.FirstManagerPages.EvaluationResult" %>

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
    <script src="../../Script/FirstManager/EvaluationResult.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
     <asp:ScriptManager ID="ScriptManager1" runat="server"/>
     <div id="EvaluatedInfo">
         <div class="ToolBar">
         <table style="position:relative;left:20px;height:100%">
                <tr id="GetEvaluatedList"> 
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
                   <td style="padding:1px;"><input type="button" value="获取被考评人名单" id="search_button"  onclick="GetEvaluatedList()" class="l-button" style="width:150px;height:25px;font-size:15px"/></td>
                </tr>
                <tr id="BackToShowList" class="Hidden"> 
                   <td style="width:10px;"></td>
                   <td style="padding:1px;"><input type="button" value="返回" id="Button1"  onclick="BackToShowList()" class="l-button" style="width:80px;height:25px;font-size:15px"/></td>
                </tr>
         </table>
         </div>
    <br />
    <%--<asp:label id="name" runat="server" style="position:relative;left:20px;font-size:16px;"></asp:label>--%>
    <br />
    <div id="secondgrid" style="margin:0 auto"></div> 

        <br />
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
                <td align="right" class="tableKey">电话：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LTelephone" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">手机：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LPhone" runat="server" Text=""></asp:Label>
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
                        <asp:Label ID="LZipcode" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
            </table>
        </div>
     </div>
     </div>

     <div id="DetailResult" class="Hidden">
        <div class="ToolBar">
         <table style="position:relative;left:20px;height:100%">
            <tr id="BackToEvaluatedList"> 
                <td style="width:10px;"></td>
                <td style="padding:1px;"><input type="button" value="返回" onclick="BackToEvaluatedList();" class="l-button" style="width:50px;height:25px;font-size:15px"/></td>
            </tr>
            <tr id="BackToDetailResult" class="Hidden"> 
                <td style="width:10px;"></td>
                <td style="padding:1px;"><input type="button" value="返回" onclick="BackToDetailResult();" class="l-button" style="width:50px;height:25px;font-size:15px"/></td>
            </tr>
         </table>
        </div>
        <br />
        <div id="detailResultGrid" style="margin:0 auto"></div> 
        <br />
       <div id="EvaluatorInfo" class="Hidden" style="text-align:center" >
          <div class="DetailUserData" style="border:3px solid #a3c0e8;width:500px;margin:0px auto;">
            <table>
            <tr>
                <td align="right" class="tableKey">用户名：</td>
                <td align="left" class="tableValue">
                    <div class="DetailData">
                        <asp:Label ID="LEID" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">姓名：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LEName" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">性别：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LESex" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">身份证号：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LEIdentityNum" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
             <tr>
                <td align="right" class="tableKey">部门：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LEDepartment" runat="server" Text=""></asp:Label>
                    </div>
               </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">电话：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LETelephone" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">手机：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LEPhone" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">Email：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LEEmail" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">地址：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LEAddress" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">邮编：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LEZipcode" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
            </table>
        </div>
     </div>
     </div>
     <div id="Result" class="Hidden">
     </div>

    <div class="Hidden">
            <input id="JsonData" type="hidden" runat="server"/>
            <asp:Button ID="BGetEvaluatedList" runat="server" Text="Button" onclick="BGetEvaluatedList_Click" />  
            <input id="UserID" type="hidden" runat="server"/>
            <asp:Button ID="BGetDetailResult" runat="server" Text="Button" onclick="BGetDetailResult_Click" />  
            <asp:Button ID="BGetResult" runat="server" Text="Button" onclick="BGetResult_Click" />  
    </div>
    </form>
</body>
</html>
