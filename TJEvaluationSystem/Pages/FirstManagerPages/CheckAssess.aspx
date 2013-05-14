<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CheckAssess.aspx.cs" Inherits="TJEvaluationSystem.Pages.FirstManagerPages.CheckAssess" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Style/EvaluatorTable.css" rel="stylesheet" type="text/css" />
    <link href="../../Style/common.css" rel="stylesheet" type="text/css" />
    <link href="../../lib/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />
    <script src="../../lib/jquery/jquery-1.3.2.min.js" type="text/javascript"></script>
    <script src="../../lib/json2.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/core/base.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerDialog.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerComboBox.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerTextBox.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerGrid.js" type="text/javascript"></script>
    <script src="../../Script/FirstManager/CheckAssess.js" type="text/javascript"></script>
    <script src="../../Script/MessageBox.js" type="text/javascript"></script>
    <script src="../../Script/CommonData.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" />
    <div class="ToolBar">
        <table style="position: relative; left: 20px; height: 100%">
            <tr>
                <td>
                    <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:ConnectionString %>"
                        SelectCommand="SELECT DISTINCT [uiDepartment] FROM [tb_UserInfo]"></asp:SqlDataSource>
                    <span>请选择部门</span>
                    <asp:DropDownList ID="Department" runat="server" DataSourceID="SqlDataSource1" DataTextField="uiDepartment"
                        DataValueField="uiDepartment" AppendDataBoundItems="True">
                        <asp:ListItem Value="0">所有部门</asp:ListItem>
                    </asp:DropDownList>
                </td>
                <td style="width: 10px;">
                </td>
                <td style="padding: 1px;">
                    <input type="button" value="获取被考评人名单" id="search_button" onclick="search()" class="l-button"
                        style="width: 150px; height: 25px; font-size: 15px" />
                </td>
                <td style="width: 10px;">
                </td>
                <td style="padding: 1px;">
                    <input type="button" value="通过" id="pass_button" onclick="SetPassedTrue()" class="l-button"
                        style="width: 100px; height: 25px; font-size: 15px; display: none" />
                </td>
                <td style="width: 10px;">
                </td>
                <td style="padding: 1px;">
                    <input type="button" value="退回" id="sendback_button" onclick="SetPassedFalse()" class="l-button"
                        style="width: 100px; height: 25px; font-size: 15px; display: none" />
                </td>
                <td style="width: 10px;">
                </td>
                <td style="padding: 1px;">
                    <input type="button" value="导出word" id="dao_button" onclick="dao()" class="l-button"
                        style="width: 100px; height: 25px; font-size: 15px; display: none" />
                </td>
                <td style="width: 10px;">
                </td>
                <td style="padding: 1px;">
                    <input type="button" value="审核意见" id="comment_button" onclick="comment()" class="l-button"
                        style="width: 100px; height: 25px; font-size: 15px; display: none" />
                </td>
            </tr>
        </table>
    </div>
    <br />
    <div id="summarygrid" style="margin: 0 auto">
    </div>
    <asp:Label ID="Title" runat="server" Style="position: relative; left: 20px; font-size: 16px;
        display: block"></asp:Label>
    <br />
    <div id="evaluatedgrid" style="margin: 0 auto">
    </div>
    <div id="ShowDetailUserInfo" class="Hidden" style="text-align: center">
        <div class="DetailUserData" style="border: 3px solid #a3c0e8; width: 500px; margin: 0px auto;">
            <table>
                <tr>
                    <td align="right" class="tableKey">
                        用户名：
                    </td>
                    <td align="left" class="tableValue">
                        <div class="DetailData">
                            <asp:Label ID="LID" runat="server" Text=""></asp:Label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="right" class="tableKey">
                        姓名：
                    </td>
                    <td align="left" class="tableValue">
                        <div class="ShowData">
                            <asp:Label ID="LName" runat="server" Text=""></asp:Label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="right" class="tableKey">
                        性别：
                    </td>
                    <td align="left" class="tableValue">
                        <div class="ShowData">
                            <asp:Label ID="LSex" runat="server" Text=""></asp:Label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="right" class="tableKey">
                        身份证号：
                    </td>
                    <td align="left" class="tableValue">
                        <div class="ShowData">
                            <asp:Label ID="LIdentityNum" runat="server" Text=""></asp:Label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="right" class="tableKey">
                        部门：
                    </td>
                    <td align="left" class="tableValue">
                        <div class="ShowData">
                            <asp:Label ID="LDepartment" runat="server" Text=""></asp:Label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="right" class="tableKey">
                        岗位（职务）：
                    </td>
                    <td align="left" class="tableValue">
                        <div class="ShowData">
                            <asp:Label ID="LJob" runat="server" Text=""></asp:Label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="right" class="tableKey">
                        电话：
                    </td>
                    <td align="left" class="tableValue">
                        <div class="ShowData">
                            <asp:Label ID="LTelephone" runat="server" Text=""></asp:Label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="right" class="tableKey">
                        Email：
                    </td>
                    <td align="left" class="tableValue">
                        <div class="ShowData">
                            <asp:Label ID="LEmail" runat="server" Text=""></asp:Label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="right" class="tableKey">
                        手机：
                    </td>
                    <td align="left" class="tableValue">
                        <div class="ShowData">
                            <asp:Label ID="LMobPhone" runat="server" Text=""></asp:Label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="right" class="tableKey">
                        地址：
                    </td>
                    <td align="left" class="tableValue">
                        <div class="ShowData">
                            <asp:Label ID="LAddress" runat="server" Text=""></asp:Label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="right" class="tableKey">
                        邮编：
                    </td>
                    <td align="left" class="tableValue">
                        <div class="ShowData">
                            <asp:Label ID="LZipCode" runat="server" Text=""></asp:Label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="right" class="tableKey">
                        经费来源：
                    </td>
                    <td align="left" class="tableValue">
                        <div class="ShowData">
                            <asp:Label ID="LFund" runat="server" Text=""></asp:Label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="right" class="tableKey">
                        派遣性质：
                    </td>
                    <td align="left" class="tableValue">
                        <div class="ShowData">
                            <asp:Label ID="LCharacter" runat="server" Text=""></asp:Label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="right" class="tableKey">
                        派遣公司：
                    </td>
                    <td align="left" class="tableValue">
                        <div class="ShowData">
                            <asp:Label ID="LCompany" runat="server" Text=""></asp:Label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="right" class="tableKey">
                        考评开始时间：
                    </td>
                    <td align="left" class="tableValue">
                        <div class="ShowData">
                            <asp:Label ID="LStartTime" runat="server" Text=""></asp:Label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="right" class="tableKey">
                        考评结束时间：
                    </td>
                    <td align="left" class="tableValue">
                        <div class="ShowData">
                            <asp:Label ID="LStopTime" runat="server" Text=""></asp:Label>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div id="box" class="Hidden">
        <asp:Label ID="LUserName" runat="server" Text="" Style="font-size: 18px; font-weight: 500;
            text-align: center; position: relative; left: 0px"></asp:Label>
        <p id="head" style="font-size: 20px; font-weight: 700; text-align: center">
            考核表</p>
        <asp:Label ID="passYoN" runat="server" Text="" Style="font-size: 18px; font-weight: 500;
            text-align: center; position: relative; left: 530px"></asp:Label><br />
        <asp:Label ID="Comment" runat="server" Text="" Style="font-size: 18px; font-weight: 500;
            text-align: center; position: relative; left: 530px; color: Red"></asp:Label>
        <br />
        <br />
        <div id="ShowAllTables">
            <div id="maingrid" style="margin: 0; padding: 0;">
            </div>
        </div>
        <div id="ShowTableInfo" style="padding-top: 5px;">
            <div id="Div1">
                被考核人姓名：<label id="LEEvaluatdName"></label>&nbsp&nbsp&nbsp&nbsp
                岗位名称：<label id="LEJobName"></label>&nbsp&nbsp&nbsp&nbsp
                用工部门：<label id="LEDep"></label>&nbsp&nbsp&nbsp&nbsp
                用工单位：<label id="LEUnit"></label>&nbsp&nbsp&nbsp&nbsp
                <br/>
                考核时间段：<label id="LEStartEndTime"></label>&nbsp&nbsp&nbsp&nbsp
            </div>
            <div id="AssessTable">
            </div>
        </div>
        <div class="Hidden">
            <asp:UpdatePanel ID="UpdatePanel1" runat="server">
                <ContentTemplate>
                    <input type="hidden" id="JsonData" runat="server" />
                    <input type="hidden" id="JsonData2" runat="server" />
                    <input type="hidden" id="JsonData3" runat="server" />
                    <asp:Button ID="BSetPassedTrue" runat="server" Text="Button" OnClick="BSetPassedTrue_Click" />
                    <asp:Button ID="BSetPassedFalse" runat="server" Text="Button" OnClick="BSetPassedFalse_Click" />
                    
                </ContentTemplate>
            </asp:UpdatePanel>
            <asp:Button ID="BRefresh" runat="server" Text="" OnClick="BRefresh_Click" />
            <asp:Button ID="Search" runat="server" Text="Button" OnClick="Search_Click" Style="display: none" />
            <input type="hidden" id="UserID" runat="server" />
            <input type="hidden" id="Passed" runat="server" />
            <input type="hidden" id="EvaComment" runat="server" />
            <input type="hidden" id="JsonSummary" runat="server" />
            <asp:Button ID="SearchAssess" runat="server" Text="" OnClick="SearchAssess_Click" />
            <asp:Button ID="WriteComment" runat="server" Text="" OnClick="WriteComment_Click" />
        </div>
    </div>
    </form>
</body>
</html>
