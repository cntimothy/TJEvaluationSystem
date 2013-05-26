<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ManageEvaluator.aspx.cs"
    Inherits="TJEvaluationSystem.Pages.SecondManagerPages.ManageEvaluator" %>

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
    <script src="../../Script/SecondManager/ManageEvaluator.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" />
    <div class="ToolBar">
        <table style="position: relative; left: 20px; height: 100%">
            <tr>
                <td style="width: 10px;">
                </td>
                <td style="padding: 1px;">
                    <input type="button" value="刷新/返回" id="search_button" onclick="search()" class="l-button"
                        style="width: 130px; height: 25px; font-size: 15px" />
                </td>
                <td style="width: 10px;">
                </td>
                <td style="padding: 1px;">
                    <input type="button" value="提交" id="submit_button" onclick="submitList()" class="l-button"
                        style="width: 100px; height: 25px; font-size: 15px; display: none" />
                </td>
            </tr>
        </table>
    </div>
    <br />
    <asp:Label ID="Title" runat="server" Text="" Style="position: relative; left: 20px;
        font-size: 16px;"></asp:Label>
    <br />
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
    <br />
    <br />
    <div id="box" class="Hidden">
    <p id="P1" style="font-size: 20px; font-weight: 700; text-align: center">
            考评人名单</p>
        <table style="position: relative; left: 40px;">
            <tr>
                <td align="right" class="tableKey">
                    <span>姓名:</span>
                </td>
                <td align="left" class="tableKey">
                    <asp:Label ID="LUserName" runat="server" Text=""></asp:Label>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">
                    <span>状态:</span>
                </td>
                <td align="left" class="tableKey">
                    <asp:Label ID="pass" runat="server" Text=""></asp:Label>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">
                    <span>意见:</span>
                </td>
                <td align="left" class="tableKey">
                    <asp:Label ID="LComment" runat="server" Text=""></asp:Label>
                </td>
            </tr>
        </table>
        <br />
        <div id="evaluator" style="margin: 0 auto">
        </div>
        <div class="ToolBar">
            <table style="position: relative; left: 20px; height: 100%">
                <tr>
                    <td style="width: 10px;">
                    </td>
                    <td style="padding: 1px;">
                        <input type="button" value="刷新/返回" id="search_button_shadow" onclick="search()" class="l-button"
                            style="width: 130px; height: 25px; font-size: 15px" />
                    </td>
                    <td style="width: 10px;">
                    </td>
                    <td style="padding: 1px;">
                        <input type="button" value="提交" id="submit_button_shadow" onclick="submitList()"
                            class="l-button" style="width: 100px; height: 25px; font-size: 15px; display: none" />
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div id="box2" class="Hidden" style="text-align: center">
    <p id="head" style="font-size: 20px; font-weight: 700; text-align: center">
            考评人名单</p>
    <table style="position: relative; left: 40px;">
            <tr>
                <td align="right" class="tableKey">
                    <span>姓名:</span>
                </td>
                <td align="left" class="tableKey">
                    <asp:Label ID="LUserName1" runat="server" Text=""></asp:Label>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">
                    <span>状态:</span>
                </td>
                <td align="left" class="tableKey">
                    <asp:Label ID="pass1" runat="server" Text=""></asp:Label>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">
                    <span>意见:</span>
                </td>
                <td align="left" class="tableKey">
                    <asp:Label ID="LComment1" runat="server" Text=""></asp:Label>
                </td>
            </tr>
        </table>
        <div id="list" style="margin: 0 auto">
        </div>
    </div>
    <div class="Hidden">
        <input id="JsonData" type="hidden" runat="server" />
        <input id="JsonEvaluator" type="hidden" runat="server" />
        <input id="JsonChose" type="hidden" runat="server" />
        <input id="JsonList" type="hidden" runat="server" />
        <input id="ListDelete" type="hidden" runat="server" />
        <input id="Chose" type="hidden" runat="server" />
        <input id="Errors" type="hidden" runat="server" />
        <input id="UserID" type="hidden" runat="server" />
        <input id="UserName" type="hidden" runat="server" />
        <input id="Passed" type="hidden" runat="server" />
        <input id="Comment" type="hidden" runat="server" /> 
        <asp:Button ID="SearchEvaluated" runat="server" OnClick="Search" />
        <asp:Button ID="SearchUser" runat="server" OnClick="Search_User" />
        <asp:Button ID="CheckUser" runat="server" OnClick="Check_User" />
        <asp:Button ID="Button1" runat="server" OnClick="Submit" />
        <asp:Button ID="Button2" runat="server" OnClick="Delete" />
    </div>
    </form>
</body>
</html>
