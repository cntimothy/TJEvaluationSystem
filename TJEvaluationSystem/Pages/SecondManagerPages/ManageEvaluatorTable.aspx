<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ManageEvaluatorTable.aspx.cs"
    Inherits="TJEvaluationSystem.Pages.SecondManagerPages.ManageEvaluatorTable" %>

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
    <script src="../../Script/SecondManager/ManageEvaluatorTable.js" type="text/javascript"></script>
    <script src="../../Script/MessageBox.js" type="text/javascript"></script>
</head>
<body style="padding: 5px;">
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    <div>
        <div class="l-loading" style="display: block" id="pageloading">
        </div>
        <div id="ShowUserList" style="height:100%">
            <div id="UserList">
                <div id="UserListGrid" style="margin: 0; padding: 0;height:100%""></div>
            </div>
            <div id="UserInfo" class="Hidden" style="text-align:center">
                <div class="ToolBar">
                    <table class="tool_bar_table">
                        <tr>
                            <td class="tool_bar_td">
                                <input type="button" class="l-button" value="返回" style="width: 70px;" onclick="BackToUserList();" />
                            </td>
                        </tr>
                    </table>
                </div>
                <div id="DetailUserData" style="border:3px solid #a3c0e8;width:500px;margin:0px auto;padding-top:10px;">
                    <table>
                    <tr>
                        <td align="right" class="tableKey">工号：</td>
                        <td align="left" class="tableValue">
                            <asp:Label ID="LUID" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td align="right" class="tableKey">姓名：</td>
                        <td align="left" class="tableValue">
                            <asp:Label ID="LUName" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td align="right" class="tableKey">性别：</td>
                        <td align="left" class="tableValue">
                            <asp:Label ID="LUSex" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td align="right" class="tableKey">身份证号：</td>
                        <td align="left" class="tableValue">
                            <asp:Label ID="LUIdentityNum" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                     <tr>
                        <td align="right" class="tableKey">部门：</td>
                        <td align="left" class="tableValue">
                            <asp:Label ID="LUDepartment" runat="server" Text=""></asp:Label>
                       </td>
                    </tr>
                    <tr>
                        <td align="right" class="tableKey">电话：</td>
                        <td align="left" class="tableValue">
                            <asp:Label ID="LUTelphone" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td align="right" class="tableKey">手机：</td>
                        <td align="left" class="tableValue">
                            <asp:Label ID="LUPhone" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td align="right" class="tableKey">Email：</td>
                        <td align="left" class="tableValue">
                            <asp:Label ID="LUEmail" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td align="right" class="tableKey">地址：</td>
                        <td align="left" class="tableValue">
                            <asp:Label ID="LUAddress" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td align="right" class="tableKey">邮编：</td>
                        <td align="left" class="tableValue">
                            <asp:Label ID="LUZipcode" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                    </table>
                </div>
             </div>
            </div>
        </div>
        <div id="ShowEvaluateTable" class="Hidden">
        <div class="ToolBar Hidden">
            <div id="ShowTableBar">
                <table class="tool_bar_table">
                    <tr id="TrViewTable">
                        <td class="tool_bar_td">
                            <label id="LPassed" style="color: Red">
                            </label>
                        </td>
                        <td class="tool_bar_td" id="EditTableButton">
                            <input type="button" class="l-button" value="编辑" style="width: 70px;" onclick="EditEvaluatorTable();" />
                        </td>
                        <td class="tool_bar_td">
                            <input type="button" class="l-button" value="返回" style="width: 70px;" onclick="BackToUserList();" />
                        </td>
                    </tr>
                    <tr id="TrNoTable">
                        <td class="tool_bar_td">
                            <input type="button" class="l-button" value="制作考核表" style="width: 70px;" onclick="MakeEvaluatorTable();" />
                        </td>
                        <td class="tool_bar_td">
                            <input type="button" class="l-button" value="返回" style="width: 70px;" onclick="BackToUserList();" />
                        </td>
                    </tr>
                </table>
            </div>
            <div id="EditTableBar" class="Hidden">
                <table class="tool_bar_table">
                    <tr id="TrMakeTable">
                        <td class="tool_bar_td">
                            <input type="button" class="l-button" value="保存考核表" style="width: 70px;" onclick="FinishMakeTable();" />
                        </td>
                        <td class="tool_bar_td ">
                            <input type="button" class="l-button" value="重置考核表" style="width: 70px;" onclick="ResetTable();" />

                        </td>
                        <td class="tool_bar_td">
                            <input type="button" class="l-button" value="返回" style="width: 70px;" onclick="BackToUserList();" />
                        </td>
                    </tr>
                    <tr id="TrEditTable">
                        <td class="tool_bar_td">
                            <input type="button" class="l-button" value="保存考核表" style="width: 70px;" onclick="FinishEditTable();" />
                        </td>
                        <td class="tool_bar_td ">
                            <input type="button" class="l-button" value="重置考核表" style="width: 70px;" onclick="ResetTable();" />
                        </td>
                        <td class="tool_bar_td ">
                            <input type="button" class="l-button" value="取消" style="width: 70px;" onclick="CancelEdit();" />
                        </td>
                    </tr>
                </table>
            </div>
            <div id="StanderInfoBar" class="Hidden">
                <table class="tool_bar_table">
                    <tr>
                        <td class="tool_bar_td">
                            <input type="button" value="返回" onclick="BackToTable()" class="l-button" style="width: 70px" />
                        </td>
                        <td class="tool_bar_td">
                        </td>
                        <td class="tool_bar_td">
                            <input type="text" id="search_type" />
                        </td>
                        <td class="tool_bar_td">
                            <input type="text" id="search_content" />
                        </td>
                        <td class="tool_bar_td">
                            <input type="button" value="查询" onclick="Search()" class="l-button" style="width: 70px;" />
                        </td>
                    </tr>
                </table>
            </div>
            <div id="VetoStanderInfoBar" class="Hidden">
                <table class="tool_bar_table">
                    <tr>
                        <td class="tool_bar_td">
                            <input type="button" value="返回" onclick="BackToTable()" class="l-button" style="width: 70px" />
                        </td>
                    </tr>
                </table>
            </div>
            <div id="DetailStanderInfoBar" class="Hidden">
                <table class="tool_bar_table">
                    <tr>
                        <td class="tool_bar_td">
                            <input type="button" value="返回" onclick="BackToStanderList()" class="l-button" style="width: 70px" />
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div id="EvaluatorTable" style="padding-top: 5px; display: none;">
            <table id="MainTable" class="my_table">
                <tr id="KeyStander">
                    <td class="num">
                        一
                    </td>
                    <td class="stander_type">
                        关键绩效指标
                    </td>
                    <td style="border: none; padding: 0px">
                        <table class="my_table" frame="void">
                            <tr>
                                <%--关键岗位职责--%>
                                <td class="key_stander_type" style="border-top: none; border-left: none">
                                    关键岗位职责指标
                                </td>
                                <td style="border-top: none; border-right: none; padding: 0px">
                                    <table class="my_table" frame="void">
                                        <tr id="KeyResponse1" class="ViewTable">
                                            <td class="stander_name" style="border-top: none; border-left: none;">
                                                <label id="LKeyResponse1Name" class="my_lable"></label>
                                            </td>
                                            <td style="border-top: none; padding: 0px">
                                                <table class="my_table" frame="void">
                                                    <tr>
                                                        <td colspan="4" class="stander_content" style="border-top: none; border-left: none;
                                                            border-right: none;">
                                                            <label id="LKeyResponse1Content" class="my_lable"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="score_type" style="border-left: none; border-bottom: none;">
                                                            优（9~10）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none;">
                                                            良（7~8）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none;">
                                                            中（4~6）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none; border-right: none;">
                                                            差（0~3）
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td class="fun" style="border-top: none; border-right: none;">
                                                <input type="button" value="重新选择" onclick="SelectResponseStander('KeyResponse1')" class="l-button" style="width: 60px;
                                                    height: 20px;" />
                                                <input type="button" value="删除" onclick="DeleteKeyResponse1()" class="l-button" style="width: 60px;
                                                    height: 20px;" />
                                            </td>
                                            <td class="score" style="border-top: none; border-right: none;">
                                                <div class="ShowScore">
                                                    <label id="LKeyResponse1Score" class="my_lable">
                                                    </label>
                                                </div>
                                                <div class="EditScore">
                                                    <input type="text" id="CBKeyResponse1Score" class="my_combobox" /></div>
                                            </td>
                                        </tr>
                                        <tr id="KeyResponse2" class="ViewTable">
                                            <td class="stander_name" style="border-top: none; border-left: none;">
                                                <label id="LKeyResponse2Name" class="my_lable">
                                                </label>
                                            </td>
                                            <td style="border-top: none; padding: 0px">
                                                <table class="my_table" frame="void">
                                                    <tr>
                                                        <td colspan="4" class="stander_content" style="border-left: none; border-right: none;
                                                            border-top: none;">
                                                            <label id="LKeyResponse2Content" class="my_lable">
                                                            </label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="score_type" style="border-left: none; border-bottom: none;">
                                                            优（9~10）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none;">
                                                            良（7~8）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none;">
                                                            中（4~6）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none; border-right: none;">
                                                            差（0~3）
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td class="fun" style="border-top: none; border-right: none;">
                                                <input type="button" value="重新选择" onclick="SelectResponseStander('KeyResponse2')" class="l-button" style="width: 60px;
                                                    height: 20px;" />
                                                <input type="button" value="删除" onclick="DeleteKeyResponse2()" class="l-button" style="width: 60px;
                                                    height: 20px;" />
                                            </td>
                                            <td class="score" style="border-top: none; border-right: none;">
                                                <div class="ShowScore">
                                                    <label id="LKeyResponse2Score" class="my_lable">
                                                    </label>
                                                </div>
                                                <div class="EditScore">
                                                    <input type="text" id="CBKeyResponse2Score" class="my_combobox" /></div>
                                            </td>
                                        </tr>
                                        <tr id="KeyResponse3" class="ViewTable">
                                            <td class="stander_name" style="border-top: none; border-left: none;">
                                                <label id="LKeyResponse3Name" class="my_lable">
                                                </label>
                                            </td>
                                            <td style="border-top: none; padding: 0px">
                                                <table class="my_table" frame="void">
                                                    <tr>
                                                        <td colspan="4" class="stander_content" style="border-left: none; border-right: none;
                                                            border-top: none;">
                                                            <label id="LKeyResponse3Content" class="my_lable">
                                                            </label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="score_type" style="border-left: none; border-bottom: none;">
                                                            优（9~10）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none;">
                                                            良（7~8）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none;">
                                                            中（4~6）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none; border-right: none;">
                                                            差（0~3）
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td class="fun" style="border-top: none; border-right: none;">
                                                <input type="button" value="重新选择" onclick="SelectResponseStander('KeyResponse3')" class="l-button" style="width: 60px;
                                                    height: 20px;" />
                                                <input type="button" value="删除" onclick="DeleteKeyResponse3()" class="l-button" style="width: 60px;
                                                    height: 20px;" />
                                            </td>
                                            <td class="score" style="border-top: none; border-right: none;">
                                                <div class="ShowScore">
                                                    <label id="LKeyResponse3Score" class="my_lable">
                                                    </label>
                                                </div>
                                                <div class="EditScore">
                                                    <input type="text" id="CBKeyResponse3Score" class="my_combobox" /></div>
                                            </td>
                                        </tr>
                                        <tr id="KeyResponse" class="EditTable">
                                            <td class="stander_name_edit" style="border-top: none; border-bottom: none; border-left: none">
                                                岗位内容：<br />
                                                <label id="LKeyResponseName" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="stander_content_big_edit" style="border-top: none; border-bottom: none;">
                                                岗位要求:<br />
                                                <label id="LKeyResponseContent" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="fun" style="border-top: none; border-bottom: none; border-right: none">
                                                <input type="button" value="选择" onclick="SelectResponseStander('KeyResponse')" class="l-button" style="width: 60px;
                                                    height: 22px;" />
                                                <input type="button" value="添加" onclick="AddKeyResponse()" class="l-button" style="width: 60px;
                                                    height: 22px;" />
                                            </td>
                                            <td class="score" style="border-top: none; border-right: none;">
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <%--关键岗位胜任能力指标--%>
                                <td class="key_stander_type" style="border-top: none; border-left: none">
                                    关键岗位胜任能力指标
                                </td>
                                <td style="border-left: none; border-right: none; padding: 0px">
                                    <table class="my_table" frame="void">
                                        <tr id="KeyAbility1" class="ViewTable">
                                            <td class="stander_name" style="border-top: none; border-left: none;">
                                                <input type="hidden" id="KeyAbility1Num" />
                                                <label id="LKeyAbility1Name" class="my_lable">
                                                </label>
                                            </td>
                                            <td style="border-top: none; padding: 0px">
                                                <table class="my_table" frame="void">
                                                    <tr>
                                                        <td class="stander_content" style="border-top: none; border-left: none;">
                                                            <label id="LKeyAbility1ContentA" class="my_lable">
                                                            </label>
                                                        </td>
                                                        <td class="stander_content" style="border-top: none;">
                                                            <label id="LKeyAbility1ContentB" class="my_lable">
                                                            </label>
                                                        </td>
                                                        <td class="stander_content" style="border-top: none;">
                                                            <label id="LKeyAbility1ContentC" class="my_lable">
                                                            </label>
                                                        </td>
                                                        <td class="stander_content" style="border-top: none; border-right: none;">
                                                            <label id="LKeyAbility1ContentD" class="my_lable">
                                                            </label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="score_type" style="border-left: none; border-bottom: none; width: 100px;">
                                                            优（9~10）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none; width: 100px;">
                                                            良（7~8）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none; width: 100px;">
                                                            中（4~6）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none; border-right: none; width: 100px;">
                                                            差（0~3）
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td class="fun" style="border-top: none; border-right: none;">
                                                <input type="button" value="重新选择" onclick="SelectStander('KeyAbility1')" class="l-button"
                                                    style="width: 60px; height: 20px;" />
                                                <input type="button" value="删除" onclick="DeleteKeyAbility1()" class="l-button" style="width: 60px;
                                                    height: 20px;" />
                                            </td>
                                            <td class="score" style="border-top: none; border-right: none;">
                                                <div class="ShowScore">
                                                    <label id="LKeyAbility1Score" class="my_lable">
                                                    </label>
                                                </div>
                                                <div class="EditScore">
                                                    <input type="text" id="CBKeyAbility1Score" class="my_combobox" /></div>
                                            </td>
                                        </tr>
                                        <tr id="KeyAbility2" class="ViewTable">
                                            <td class="stander_name" style="border-left: none; border-top: none;">
                                                <input type="hidden" id="KeyAbility2Num" />
                                                <label id="LKeyAbility2Name" class="my_lable">
                                                </label>
                                            </td>
                                            <td style="border-top: none; padding: 0px">
                                                <table class="my_table" frame="void">
                                                    <tr>
                                                        <td class="stander_content" style="border-top: none; border-left: none;">
                                                            <label id="LKeyAbility2ContentA" class="my_lable">
                                                            </label>
                                                        </td>
                                                        <td class="stander_content" style="border-top: none;">
                                                            <label id="LKeyAbility2ContentB" class="my_lable">
                                                            </label>
                                                        </td>
                                                        <td class="stander_content" style="border-top: none;">
                                                            <label id="LKeyAbility2ContentC" class="my_lable">
                                                            </label>
                                                        </td>
                                                        <td class="stander_content" style="border-top: none; border-right: none;">
                                                            <label id="LKeyAbility2ContentD" class="my_lable">
                                                            </label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="score_type" style="border-left: none; border-bottom: none; width: 100px;">
                                                            优（9~10）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none; width: 100px;">
                                                            良（7~8）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none; width: 100px;">
                                                            中（4~6）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none; border-right: none; width: 100px;">
                                                            差（0~3）
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td class="fun" style="border-top: none; border-right: none;">
                                                <input type="button" value="重新选择" onclick="SelectStander('KeyAbility2')" class="l-button"
                                                    style="width: 60px; height: 20px;" />
                                                <input type="button" value="删除" onclick="DeleteKeyAbility2()" class="l-button" style="width: 60px;
                                                    height: 20px;" />
                                            </td>
                                            <td class="score" style="border-top: none; border-right: none;">
                                                <div class="ShowScore">
                                                    <label id="LKeyAbility2Score" class="my_lable">
                                                    </label>
                                                </div>
                                                <div class="EditScore">
                                                    <input type="text" id="CBKeyAbility2Score" class="my_combobox" /></div>
                                            </td>
                                        </tr>
                                        <tr id="KeyAbility3" class="ViewTable">
                                            <td class="stander_name" style="border-left: none; border-top: none;">
                                                <input type="hidden" id="KeyAbility3Num" />
                                                <label id="LKeyAbility3Name" class="my_lable">
                                                </label>
                                            </td>
                                            <td style="border-top: none; padding: 0px">
                                                <table class="my_table" frame="void">
                                                    <tr>
                                                        <td class="stander_content" style="border-top: none; border-left: none;">
                                                            <label id="LKeyAbility3ContentA" class="my_lable">
                                                            </label>
                                                        </td>
                                                        <td class="stander_content" style="border-top: none;">
                                                            <label id="LKeyAbility3ContentB" class="my_lable">
                                                            </label>
                                                        </td>
                                                        <td class="stander_content" style="border-top: none;">
                                                            <label id="LKeyAbility3ContentC" class="my_lable">
                                                            </label>
                                                        </td>
                                                        <td class="stander_content" style="border-top: none; border-right: none;">
                                                            <label id="LKeyAbility3ContentD" class="my_lable">
                                                            </label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="score_type" style="border-left: none; border-bottom: none; width: 100px;">
                                                            优（9~10）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none; width: 100px;">
                                                            良（7~8）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none; width: 100px;">
                                                            中（4~6）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none; border-right: none; width: 100px;">
                                                            差（0~3）
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td class="fun" style="border-top: none; border-right: none;">
                                                <input type="button" value="重新选择" onclick="SelectStander('KeyAbility3')" class="l-button"
                                                    style="width: 60px; height: 20px;" />
                                                <input type="button" value="删除" onclick="DeleteKeyAbility3()" class="l-button" style="width: 60px;
                                                    height: 20px;" />
                                            </td>
                                            <td class="score" style="border-top: none; border-right: none;">
                                                <div class="ShowScore">
                                                    <label id="LKeyAbility3Score" class="my_lable">
                                                    </label>
                                                </div>
                                                <div class="EditScore">
                                                    <input type="text" id="CBKeyAbility3Score" class="my_combobox" /></div>
                                            </td>
                                        </tr>
                                        <tr id="KeyAbility" class="EditTable">
                                            <td class="stander_name_edit" style="border-left: none; border-bottom: none;">
                                                <input type="hidden" id="KeyAbilityNum" />
                                                <label id="LKeyAbilityName" class="my_lable">
                                                    请选择指标！</label>
                                            </td>
                                            <td style="border-bottom: none; padding: 0px">
                                                <table class="my_table" frame="void">
                                                    <tr>
                                                        <td class="stander_content_edit" style="border-top: none; border-left: none;">
                                                            <label id="LKeyAbilityContentA" class="my_lable">
                                                            </label>
                                                        </td>
                                                        <td class="stander_content_edit" style="border-top: none;">
                                                            <label id="LKeyAbilityContentB" class="my_lable">
                                                            </label>
                                                        </td>
                                                        <td class="stander_content_edit" style="border-top: none;">
                                                            <label id="LKeyAbilityContentC" class="my_lable">
                                                            </label>
                                                        </td>
                                                        <td class="stander_content_edit" style="border-top: none; border-right: none;">
                                                            <label id="LKeyAbilityContentD" class="my_lable">
                                                            </label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="score_type" style="border-left: none; border-bottom: none; width: 100px;">
                                                            优（9~10）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none; width: 100px;">
                                                            良（7~8）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none; width: 100px;">
                                                            中（4~6）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none; border-right: none; width: 100px;">
                                                            差（0~3）
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td class="fun" style="border: none;">
                                                <input type="button" value="选择指标" onclick="SelectStander('KeyAbility')" class="l-button"
                                                    style="width: 60px; height: 20px;" />
                                                <input type="button" value="添加" onclick="AddKeyAbility()" class="l-button" style="width: 60px;
                                                    height: 20px;" />
                                            </td>
                                            <td class="score" style="border-top: none; border-right: none;">
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <%--关键工作态度指标--%>
                                <td class="key_stander_type" style="border-top: none; border-bottom: none; border-left: none">
                                    关键工作态度指标
                                </td>
                                <td style="border-left: none; border-right: none; border-bottom: none; padding: 0px">
                                    <table class="my_table" frame="void">
                                        <tr id="KeyAttitude1" class="ViewTable">
                                            <td class="stander_name" style="border-top: none; border-left: none;">
                                                <input type="hidden" id="KeyAttitude1Num" />
                                                <label id="LKeyAttitude1Name" class="my_lable">
                                                </label>
                                            </td>
                                            <td style="border-top: none; padding: 0px">
                                                <table class="my_table" frame="void">
                                                    <tr>
                                                        <td class="stander_content" style="border-top: none; border-left: none;">
                                                            <label id="LKeyAttitude1ContentA" class="my_lable">
                                                            </label>
                                                        </td>
                                                        <td class="stander_content" style="border-top: none;">
                                                            <label id="LKeyAttitude1ContentB" class="my_lable">
                                                            </label>
                                                        </td>
                                                        <td class="stander_content" style="border-top: none;">
                                                            <label id="LKeyAttitude1ContentC" class="my_lable">
                                                            </label>
                                                        </td>
                                                        <td class="stander_content" style="border-top: none; border-right: none;">
                                                            <label id="LKeyAttitude1ContentD" class="my_lable">
                                                            </label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="score_type" style="border-left: none; border-bottom: none; width: 100px;">
                                                            优（9~10）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none; width: 100px;">
                                                            良（7~8）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none; width: 100px;">
                                                            中（4~6）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none; border-right: none; width: 100px;">
                                                            差（0~3）
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td class="fun" style="border-top: none; border-right: none;">
                                                <input type="button" value="重新选择" onclick="SelectStander('KeyAttitude1')" class="l-button"
                                                    style="width: 60px; height: 20px;" />
                                                <input type="button" value="删除" onclick="DeleteKeyAttitude1()" class="l-button" style="width: 60px;
                                                    height: 20px;" />
                                            </td>
                                            <td class="score" style="border-top: none; border-right: none;">
                                                <div class="ShowScore">
                                                    <label id="LKeyAttitude1Score" class="my_lable">
                                                    </label>
                                                </div>
                                                <div class="EditScore">
                                                    <input type="text" id="CBKeyAttitude1Score" class="my_combobox" /></div>
                                            </td>
                                        </tr>
                                        <tr id="KeyAttitude2" class="ViewTable">
                                            <td class="stander_name" style="border-left: none; border-top: none;">
                                                <input type="hidden" id="KeyAttitude2Num" />
                                                <label id="LKeyAttitude2Name" class="my_lable">
                                                </label>
                                            </td>
                                            <td style="border-top: none; padding: 0px">
                                                <table class="my_table" frame="void">
                                                    <tr>
                                                        <td class="stander_content" style="border-top: none; border-left: none;">
                                                            <label id="LKeyAttitude2ContentA" class="my_lable">
                                                            </label>
                                                        </td>
                                                        <td class="stander_content" style="border-top: none;">
                                                            <label id="LKeyAttitude2ContentB" class="my_lable">
                                                            </label>
                                                        </td>
                                                        <td class="stander_content" style="border-top: none;">
                                                            <label id="LKeyAttitude2ContentC" class="my_lable">
                                                            </label>
                                                        </td>
                                                        <td class="stander_content" style="border-top: none; border-right: none;">
                                                            <label id="LKeyAttitude2ContentD" class="my_lable">
                                                            </label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="score_type" style="border-left: none; border-bottom: none; width: 100px;">
                                                            优（9~10）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none; width: 100px;">
                                                            良（7~8）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none; width: 100px;">
                                                            中（4~6）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none; border-right: none; width: 100px;">
                                                            差（0~3）
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td class="fun" style="border-top: none; border-right: none;">
                                                <input type="button" value="重新选择" onclick="SelectStander('KeyAttitude2')" class="l-button"
                                                    style="width: 60px; height: 20px;" />
                                                <input type="button" value="删除" onclick="DeleteKeyAttitude2()" class="l-button" style="width: 60px;
                                                    height: 20px;" />
                                            </td>
                                            <td class="score" style="border-top: none; border-right: none;">
                                                <div class="ShowScore">
                                                    <label id="LKeyAttitude2Score" class="my_lable">
                                                    </label>
                                                </div>
                                                <div class="EditScore">
                                                    <input type="text" id="CBKeyAttitude2Score" class="my_combobox" /></div>
                                            </td>
                                        </tr>
                                        <tr id="KeyAttitude3" class="ViewTable">
                                            <td class="stander_name" style="border-left: none; border-top: none;">
                                                <input type="hidden" id="KeyAttitude3Num" />
                                                <label id="LKeyAttitude3Name" class="my_lable">
                                                </label>
                                            </td>
                                            <td style="border-top: none; padding: 0px">
                                                <table class="my_table" frame="void">
                                                    <tr>
                                                        <td class="stander_content" style="border-top: none; border-left: none;">
                                                            <label id="LKeyAttitude3ContentA" class="my_lable">
                                                            </label>
                                                        </td>
                                                        <td class="stander_content" style="border-top: none;">
                                                            <label id="LKeyAttitude3ContentB" class="my_lable">
                                                            </label>
                                                        </td>
                                                        <td class="stander_content" style="border-top: none;">
                                                            <label id="LKeyAttitude3ContentC" class="my_lable">
                                                            </label>
                                                        </td>
                                                        <td class="stander_content" style="border-top: none; border-right: none;">
                                                            <label id="LKeyAttitude3ContentD" class="my_lable">
                                                            </label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="score_type" style="border-left: none; border-bottom: none; width: 100px;">
                                                            优（9~10）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none; width: 100px;">
                                                            良（7~8）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none; width: 100px;">
                                                            中（4~6）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none; border-right: none; width: 100px;">
                                                            差（0~3）
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td class="fun" style="border-top: none; border-right: none;">
                                                <input type="button" value="重新选择" onclick="SelectStander('KeyAttitude3')" class="l-button"
                                                    style="width: 60px; height: 20px;" />
                                                <input type="button" value="删除" onclick="DeleteKeyAttitude3()" class="l-button" style="width: 60px;
                                                    height: 20px;" />
                                            </td>
                                            <td class="score" style="border-top: none; border-right: none;">
                                                <div class="ShowScore">
                                                    <label id="LKeyAttitude3Score" class="my_lable">
                                                    </label>
                                                </div>
                                                <div class="EditScore">
                                                    <input type="text" id="CBKeyAttitude3Score" class="my_combobox" /></div>
                                            </td>
                                        </tr>
                                        <tr id="KeyAttitude" class="EditTable">
                                            <td class="stander_name_edit" style="border-left: none; border-top: none; border-bottom: none;">
                                                <input type="hidden" id="KeyAttitudeNum" />
                                                <label id="LKeyAttitudeName" class="my_lable">
                                                    请选择指标！</label>
                                            </td>
                                            <td style="border-top: none; border-bottom: none; padding: 0px">
                                                <table class="my_table" frame="void">
                                                    <tr>
                                                        <td class="stander_content_edit" style="border-top: none; border-left: none;">
                                                            <label id="LKeyAttitudeContentA" class="my_lable">
                                                            </label>
                                                        </td>
                                                        <td class="stander_content_edit" style="border-top: none;">
                                                            <label id="LKeyAttitudeContentB" class="my_lable">
                                                            </label>
                                                        </td>
                                                        <td class="stander_content_edit" style="border-top: none;">
                                                            <label id="LKeyAttitudeContentC" class="my_lable">
                                                            </label>
                                                        </td>
                                                        <td class="stander_content_edit" style="border-top: none; border-right: none;">
                                                            <label id="LKeyAttitudeContentD" class="my_lable">
                                                            </label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="score_type" style="border-left: none; border-bottom: none; width: 100px;">
                                                            优（9~10）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none; width: 100px;">
                                                            良（7~8）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none; width: 100px;">
                                                            中（4~6）
                                                        </td>
                                                        <td class="score_type" style="border-bottom: none; border-right: none; width: 100px;">
                                                            差（0~3）
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td class="fun" style="border: none;">
                                                <input type="button" value="选择指标" onclick="SelectStander('KeyAttitude')" class="l-button"
                                                    style="width: 60px; height: 20px;" />
                                                <input type="button" value="添加" onclick="AddKeyAttitude()" class="l-button" style="width: 60px;
                                                    height: 20px;" />
                                            </td>
                                            <td class="score" style="border-top: none; border-right: none;">
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td class="weight">
                        <div class="EditTableWeight" style="color: Red;">
                            权重:<br />
                            <input type="text" id="KeyWeightEdit" style="width: 20px;" onkeyup="this.value=this.value.replace(/\D/g,'')"
                                onafterpaste="this.value=this.value.replace(/\D/g,'')" />
                        </div>
                        <div class="ViewTableWeight">
                            <label id="KeyWeightView" class="my_lable">
                            </label>
                            %
                        </div>
                    </td>
                </tr>
                <tr id="ResponseStnder">
                    <td class="num">
                        二
                    </td>
                    <td class="stander_type">
                        岗位职责指标
                    </td>
                    <td style="padding: 0px">
                        <table class="my_table" frame="void">
                            <tr id="Response1" class="ViewTable">
                                <td class="stander_name_big" style="border-top: none; border-left: none;">
                                    <label id="LResponse1Name" class="my_lable">
                                    </label>
                                </td>
                                <td style="border-top: none; padding: 0px">
                                    <table class="my_table" frame="void">
                                        <tr>
                                            <td colspan="4" class="stander_content" style="border-top: none; border-left: none;
                                                border-right: none;">
                                                <label id="LResponse1Content" class="my_lable">
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="score_type" style="border-bottom: none; border-left: none;">
                                                优（9~10）
                                            </td>
                                            <td class="score_type" style="border-bottom: none;">
                                                良（7~8）
                                            </td>
                                            <td class="score_type" style="border-bottom: none;">
                                                中（4~6）
                                            </td>
                                            <td class="score_type" style="border-bottom: none; border-right: none;">
                                                差（0~3）
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="fun" style="border-top: none; border-right: none;">
                                    <input type="button" value="重新选择" onclick="SelectResponseStander('Response1')" class="l-button" style="width: 60px;
                                        height: 20px;" />
                                    <input type="button" value="删除" onclick="DeleteResponse1()" class="l-button" style="width: 60px;
                                        height: 20px;" />
                                </td>
                                <td class="score" style="border-top: none; border-right: none;">
                                    <div class="ShowScore">
                                        <label id="LResponse1Score" class="my_lable">
                                        </label>
                                    </div>
                                    <div class="EditScore">
                                        <input type="text" id="CBResponse1Score" class="my_combobox" /></div>
                                </td>
                            </tr>
                            <tr id="Response2" class="ViewTable">
                                <td class="stander_name_big" style="border-top: none; border-left: none;">
                                    <label id="LResponse2Name" class="my_lable">
                                    </label>
                                </td>
                                <td style="border-top: none; padding: 0px">
                                    <table class="my_table" frame="void">
                                        <tr>
                                            <td colspan="4" class="stander_content" style="border-top: none; border-left: none;
                                                border-right: none;">
                                                <label id="LResponse2Content" class="my_lable">
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="score_type" style="border-bottom: none; border-left: none;">
                                                优（9~10）
                                            </td>
                                            <td class="score_type" style="border-bottom: none;">
                                                良（7~8）
                                            </td>
                                            <td class="score_type" style="border-bottom: none;">
                                                中（4~6）
                                            </td>
                                            <td class="score_type" style="border-bottom: none; border-right: none;">
                                                差（0~3）
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="fun" style="border-top: none; border-right: none;">
                                    <input type="button" value="重新选择" onclick="SelectResponseStander('Response2')" class="l-button" style="width: 60px;
                                        height: 20px;" />
                                    <input type="button" value="删除" onclick="DeleteResponse2()" class="l-button" style="width: 60px;
                                        height: 20px;" />
                                </td>
                                <td class="score" style="border-top: none; border-right: none;">
                                    <div class="ShowScore">
                                        <label id="LResponse2Score" class="my_lable">
                                        </label>
                                    </div>
                                    <div class="EditScore">
                                        <input type="text" id="CBResponse2Score" class="my_combobox" /></div>
                                </td>
                            </tr>
                            <tr id="Response3" class="ViewTable">
                                <td class="stander_name_big" style="border-bottom: none; border-left: none;">
                                    <label id="LResponse3Name" class="my_lable">
                                    </label>
                                </td>
                                <td style="border-bottom: none; padding: 0px">
                                    <table class="my_table" frame="void">
                                        <tr>
                                            <td colspan="4" class="stander_content" style="border: none;">
                                                <label id="LResponse3Content" class="my_lable">
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="score_type" style="border-bottom: none; border-left: none;">
                                                优（9~10）
                                            </td>
                                            <td class="score_type" style="border-bottom: none;">
                                                良（7~8）
                                            </td>
                                            <td class="score_type" style="border-bottom: none;">
                                                中（4~6）
                                            </td>
                                            <td class="score_type" style="border-bottom: none; border-right: none;">
                                                差（0~3）
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="fun" style="border-bottom: none; border-right: none;">
                                    <input type="button" value="重新选择" onclick="SelectResponseStander('Response3')" class="l-button" style="width: 60px;
                                        height: 20px;" />
                                    <input type="button" value="删除" onclick="DeleteResponse3()" class="l-button" style="width: 60px;
                                        height: 20px;" />
                                </td>
                                <td class="score" style="border-top: none; border-right: none;">
                                    <div class="ShowScore">
                                        <label id="LResponse3Score" class="my_lable">
                                        </label>
                                    </div>
                                    <div class="EditScore">
                                        <input type="text" id="CBResponse3Score" class="my_combobox" /></div>
                                </td>
                            </tr>
                            <tr id="Response" class="EditTable">
                                <td class="stander_name_big_edit" style="border-top: none; border-bottom: none; border-left: none">
                                    岗位内容：<br />
                                    <label id="LResponseName" class="my_lable">
                                    </label>
                                </td>
                                <td class="stander_content_big_edit" style="border-top: none; border-bottom: none;">
                                    岗位要求:<br />
                                    <label id="LResponseContent" class="my_lable">
                                    </label>
                                </td>
                                <td class="fun" style="border-top: none; border-bottom: none; border-right: none">
                                    <input type="button" value="选择" onclick="SelectResponseStander('Response')" class="l-button" style="width: 60px;
                                        height: 20px;" />
                                    <input type="button" value="添加" onclick="AddResponse()" class="l-button" style="width: 60px;
                                        height: 22px;" />
                                </td>
                                <td class="score" style="border-top: none; border-right: none;">
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td class="weight">
                        <div class="EditTableWeight" style="color: Red;">
                            权重:<br />
                            <input type="text" id="ResponseWeightEdit" style="width: 20px;" onkeyup="this.value=this.value.replace(/\D/g,'')"
                                onafterpaste="this.value=this.value.replace(/\D/g,'')" />
                        </div>
                        <div class="ViewTableWeight">
                            <label id="ResponseWeightView" class="my_lable">
                            </label>
                            %
                        </div>
                    </td>
                </tr>
                <tr id="AbilityStander">
                    <td class="num">
                        三
                    </td>
                    <td class="stander_type">
                        岗位胜任能力指标
                    </td>
                    <td style="padding: 0px">
                        <table class="my_table" frame="void">
                            <tr id="Ability1" class="ViewTable">
                                <td class="stander_name_big" style="border-top: none; border-left: none;">
                                    <input type="hidden" id="Ability1Num" />
                                    <label id="LAbility1Name" class="my_lable">
                                    </label>
                                </td>
                                <td style="border-top: none; padding: 0px;">
                                    <table class="my_table" frame="void">
                                        <tr>
                                            <td class="stander_content" style="border-top: none; border-left: none;">
                                                <label id="LAbility1ContentA" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="stander_content" style="border-top: none;">
                                                <label id="LAbility1ContentB" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="stander_content" style="border-top: none;">
                                                <label id="LAbility1ContentC" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="stander_content" style="border-top: none; border-right: none;">
                                                <label id="LAbility1ContentD" class="my_lable">
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="score_type" style="border-bottom: none; border-left: none;">
                                                优（9~10）
                                            </td>
                                            <td class="score_type" style="border-bottom: none;">
                                                良（7~8）
                                            </td>
                                            <td class="score_type" style="border-bottom: none;">
                                                中（4~6）
                                            </td>
                                            <td class="score_type" style="border-bottom: none; border-right: none;">
                                                差（0~3）
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="fun" style="border-top: none; border-right: none;">
                                    <input type="button" value="重新选择" onclick="SelectStander('Ability1')" class="l-button"
                                        style="width: 60px; height: 20px;" />
                                    <input type="button" value="删除" onclick="DeleteAbility1()" class="l-button" style="width: 60px;
                                        height: 20px;" />
                                </td>
                                <td class="score" style="border-top: none; border-right: none;">
                                    <div class="ShowScore">
                                        <label id="LAbility1Score" class="my_lable">
                                        </label>
                                    </div>
                                    <div class="EditScore">
                                        <input type="text" id="CBAbility1Score" class="my_combobox" /></div>
                                </td>
                            </tr>
                            <tr id="Ability2" class="ViewTable">
                                <td class="stander_name_big" style="border-top: none; border-left: none;">
                                    <input type="hidden" id="Ability2Num" />
                                    <label id="LAbility2Name" class="my_lable">
                                    </label>
                                </td>
                                <td style="border-top: none; padding: 0px;">
                                    <table class="my_table" frame="void">
                                        <tr>
                                            <td class="stander_content" style="border-top: none; border-left: none;">
                                                <label id="LAbility2ContentA" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="stander_content" style="border-top: none;">
                                                <label id="LAbility2ContentB" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="stander_content" style="border-top: none;">
                                                <label id="LAbility2ContentC" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="stander_content" style="border-top: none; border-right: none;">
                                                <label id="LAbility2ContentD" class="my_lable">
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="score_type" style="border-bottom: none; border-left: none;">
                                                优（9~10）
                                            </td>
                                            <td class="score_type" style="border-bottom: none;">
                                                良（7~8）
                                            </td>
                                            <td class="score_type" style="border-bottom: none;">
                                                中（4~6）
                                            </td>
                                            <td class="score_type" style="border-bottom: none; border-right: none;">
                                                差（0~3）
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="fun" style="border-top: none; border-right: none;">
                                    <input type="button" value="重新选择" onclick="SelectStander('Ability2')" class="l-button"
                                        style="width: 60px; height: 20px;" />
                                    <input type="button" value="删除" onclick="DeleteAbility2()" class="l-button" style="width: 60px;
                                        height: 20px;" />
                                </td>
                                <td class="score" style="border-top: none; border-right: none;">
                                    <div class="ShowScore">
                                        <label id="LAbility2Score" class="my_lable">
                                        </label>
                                    </div>
                                    <div class="EditScore">
                                        <input type="text" id="BCAbility2Score" class="my_combobox" /></div>
                                </td>
                            </tr>
                            <tr id="Ability3" class="ViewTable">
                                <td class="stander_name_big" style="border-top: none; border-left: none;">
                                    <input type="hidden" id="Ability3Num" />
                                    <label id="LAbility3Name" class="my_lable">
                                    </label>
                                </td>
                                <td style="border-top: none; padding: 0px;">
                                    <table class="my_table" frame="void">
                                        <tr>
                                            <td class="stander_content" style="border-top: none; border-left: none;">
                                                <label id="LAbility3ContentA" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="stander_content" style="border-top: none;">
                                                <label id="LAbility3ContentB" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="stander_content" style="border-top: none;">
                                                <label id="LAbility3ContentC" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="stander_content" style="border-top: none; border-right: none;">
                                                <label id="LAbility3ContentD" class="my_lable">
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="score_type" style="border-bottom: none; border-left: none;">
                                                优（9~10）
                                            </td>
                                            <td class="score_type" style="border-bottom: none;">
                                                良（7~8）
                                            </td>
                                            <td class="score_type" style="border-bottom: none;">
                                                中（4~6）
                                            </td>
                                            <td class="score_type" style="border-bottom: none; border-right: none;">
                                                差（0~3）
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="fun" style="border-top: none; border-right: none;">
                                    <input type="button" value="重新选择" onclick="SelectStander('Ability3')" class="l-button"
                                        style="width: 60px; height: 20px;" />
                                    <input type="button" value="删除" onclick="DeleteAbility3()" class="l-button" style="width: 60px;
                                        height: 20px;" />
                                </td>
                                <td class="score" style="border-top: none; border-right: none;">
                                    <div class="ShowScore">
                                        <label id="LAbility3Score" class="my_lable">
                                        </label>
                                    </div>
                                    <div class="EditScore">
                                        <input type="text" id="CBAbility3Score" class="my_combobox" /></div>
                                </td>
                            </tr>
                            <tr id="Ability4" class="ViewTable">
                                <td class="stander_name_big" style="border-top: none; border-left: none;">
                                    <input type="hidden" id="Ability4Num" />
                                    <label id="LAbility4Name" class="my_lable">
                                    </label>
                                </td>
                                <td style="border-top: none; padding: 0px;">
                                    <table class="my_table" frame="void">
                                        <tr>
                                            <td class="stander_content" style="border-top: none; border-left: none;">
                                                <label id="LAbility4ContentA" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="stander_content" style="border-top: none;">
                                                <label id="LAbility4ContentB" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="stander_content" style="border-top: none;">
                                                <label id="LAbility4ContentC" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="stander_content" style="border-top: none; border-right: none;">
                                                <label id="LAbility4ContentD" class="my_lable">
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="score_type" style="border-bottom: none; border-left: none;">
                                                优（9~10）
                                            </td>
                                            <td class="score_type" style="border-bottom: none;">
                                                良（7~8）
                                            </td>
                                            <td class="score_type" style="border-bottom: none;">
                                                中（4~6）
                                            </td>
                                            <td class="score_type" style="border-bottom: none; border-right: none;">
                                                差（0~3）
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="fun" style="border-top: none; border-right: none;">
                                    <input type="button" value="重新选择" onclick="SelectStander('Ability4')" class="l-button"
                                        style="width: 60px; height: 20px;" />
                                    <input type="button" value="删除" onclick="DeleteAbility4()" class="l-button" style="width: 60px;
                                        height: 20px;" />
                                </td>
                                <td class="score" style="border-top: none; border-right: none;">
                                    <div class="ShowScore">
                                        <label id="LAbility4Score" class="my_lable">
                                        </label>
                                    </div>
                                    <div class="EditScore">
                                        <input type="text" id="CBAbility4Score" class="my_combobox" /></div>
                                </td>
                            </tr>
                            <tr id="Ability" class="EditTable">
                                <td class="stander_name_big_edit" style="border-top: none; border-bottom: none; border-left: none;">
                                    <input type="hidden" id="AbilityNum" />
                                    <label id="LAbilityName" class="my_lable">
                                        请选择指标！</label>
                                </td>
                                <td style="border-top: none; border-bottom: none; padding: 0px">
                                    <table class="my_table" frame="void">
                                        <tr>
                                            <td class="stander_content_edit" style="border-top: none; border-left: none;">
                                                <label id="LAbilityContentA" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="stander_content_edit" style="border-top: none;">
                                                <label id="LAbilityContentB" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="stander_content_edit" style="border-top: none;">
                                                <label id="LAbilityContentC" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="stander_content_edit" style="border-top: none; border-right: none;">
                                                <label id="LAbilityContentD" class="my_lable">
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="score_type" style="border-bottom: none; border-left: none;">
                                                优（9~10）
                                            </td>
                                            <td class="score_type" style="border-bottom: none;">
                                                良（7~8）
                                            </td>
                                            <td class="score_type" style="border-bottom: none;">
                                                中（4~6）
                                            </td>
                                            <td class="score_type" style="border-bottom: none; border-right: none;">
                                                差（0~3）
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="fun" style="border-top: none; border-bottom: none; border-right: none;">
                                    <input type="button" value="选择指标" onclick="SelectStander('Ability')" class="l-button"
                                        style="width: 60px; height: 20px;" />
                                    <input type="button" value="添加" onclick="AddAbility()" class="l-button" style="width: 60px;
                                        height: 20px;" />
                                </td>
                                <td class="score" style="border-top: none; border-right: none;">
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td class="weight">
                        <div class="EditTableWeight" style="color: Red;">
                            权重:<br />
                            <input type="text" id="AbilityWeightEdit" style="width: 20px;" onkeyup="this.value=this.value.replace(/\D/g,'')"
                                onafterpaste="this.value=this.value.replace(/\D/g,'')" />
                        </div>
                        <div class="ViewTableWeight">
                            <label id="AbilityWeightView" class="my_lable">
                            </label>
                            %
                        </div>
                    </td>
                </tr>
                <tr id="AttitudeStander">
                    <td class="num">
                        四
                    </td>
                    <td class="stander_type">
                        工作态度指标
                    </td>
                    <td style="padding: 0px">
                        <table class="my_table" frame="void">
                            <tr id="Attitude1" class="ViewTable">
                                <td class="stander_name_big" style="border-top: none; border-left: none;">
                                    <input type="hidden" id="Attitude1Num" />
                                    <label id="LAttitude1Name" class="my_lable">
                                    </label>
                                </td>
                                <td style="border-top: none; padding: 0px;">
                                    <table class="my_table" frame="void">
                                        <tr>
                                            <td class="stander_content" style="border-top: none; border-left: none;">
                                                <label id="LAttitude1ContentA" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="stander_content" style="border-top: none;">
                                                <label id="LAttitude1ContentB" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="stander_content" style="border-top: none;">
                                                <label id="LAttitude1ContentC" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="stander_content" style="border-top: none; border-right: none;">
                                                <label id="LAttitude1ContentD" class="my_lable">
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="score_type" style="border-bottom: none; border-left: none;">
                                                优（9~10）
                                            </td>
                                            <td class="score_type" style="border-bottom: none;">
                                                良（7~8）
                                            </td>
                                            <td class="score_type" style="border-bottom: none;">
                                                中（4~6）
                                            </td>
                                            <td class="score_type" style="border-bottom: none; border-right: none;">
                                                差（0~3）
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="fun" style="border-top: none; border-right: none;">
                                    <input type="button" value="重新选择" onclick="SelectStander('Attitude1')" class="l-button"
                                        style="width: 60px; height: 20px;" />
                                    <input type="button" value="删除" onclick="DeleteAttitude1()" class="l-button" style="width: 60px;
                                        height: 20px;" />
                                </td>
                                <td class="score" style="border-top: none; border-right: none;">
                                    <div class="ShowScore">
                                        <label id="LAttitude1Score" class="my_lable">
                                        </label>
                                    </div>
                                    <div class="EditScore">
                                        <input type="text" id="CBAttitude1Score" class="my_combobox" /></div>
                                </td>
                            </tr>
                            <tr id="Attitude2" class="ViewTable">
                                <td class="stander_name_big" style="border-top: none; border-left: none;">
                                    <input type="hidden" id="Attitude2Num" />
                                    <label id="LAttitude2Name" class="my_lable">
                                    </label>
                                </td>
                                <td style="border-top: none; padding: 0px;">
                                    <table class="my_table" frame="void">
                                        <tr>
                                            <td class="stander_content" style="border-top: none; border-left: none;">
                                                <label id="LAttitude2ContentA" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="stander_content" style="border-top: none;">
                                                <label id="LAttitude2ContentB" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="stander_content" style="border-top: none;">
                                                <label id="LAttitude2ContentC" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="stander_content" style="border-top: none; border-right: none;">
                                                <label id="LAttitude2ContentD" class="my_lable">
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="score_type" style="border-bottom: none; border-left: none;">
                                                优（9~10）
                                            </td>
                                            <td class="score_type" style="border-bottom: none;">
                                                良（7~8）
                                            </td>
                                            <td class="score_type" style="border-bottom: none;">
                                                中（4~6）
                                            </td>
                                            <td class="score_type" style="border-bottom: none; border-right: none;">
                                                差（0~3）
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="fun" style="border-top: none; border-right: none;">
                                    <input type="button" value="重新选择" onclick="SelectStander('Attitude2')" class="l-button"
                                        style="width: 60px; height: 20px;" />
                                    <input type="button" value="删除" onclick="DeleteAttitude2()" class="l-button" style="width: 60px;
                                        height: 20px;" />
                                </td>
                                <td class="score" style="border-top: none; border-right: none;">
                                    <div class="ShowScore">
                                        <label id="LAttitude2Score" class="my_lable">
                                        </label>
                                    </div>
                                    <div class="EditScore">
                                        <input type="text" id="CBAttitude2Score" class="my_combobox" /></div>
                                </td>
                            </tr>
                            <tr id="Attitude3" class="ViewTable">
                                <td class="stander_name_big" style="border-top: none; border-left: none;">
                                    <input type="hidden" id="Attitude3Num" />
                                    <label id="LAttitude3Name" class="my_lable">
                                    </label>
                                </td>
                                <td style="border-top: none; padding: 0px;">
                                    <table class="my_table" frame="void">
                                        <tr>
                                            <td class="stander_content" style="border-top: none; border-left: none;">
                                                <label id="LAttitude3ContentA" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="stander_content" style="border-top: none;">
                                                <label id="LAttitude3ContentB" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="stander_content" style="border-top: none;">
                                                <label id="LAttitude3ContentC" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="stander_content" style="border-top: none; border-right: none;">
                                                <label id="LAttitude3ContentD" class="my_lable">
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="score_type" style="border-bottom: none; border-left: none;">
                                                优（9~10）
                                            </td>
                                            <td class="score_type" style="border-bottom: none;">
                                                良（7~8）
                                            </td>
                                            <td class="score_type" style="border-bottom: none;">
                                                中（4~6）
                                            </td>
                                            <td class="score_type" style="border-bottom: none; border-right: none;">
                                                差（0~3）
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="fun" style="border-top: none; border-right: none;">
                                    <input type="button" value="重新选择" onclick="SelectStander('Attitude3')" class="l-button"
                                        style="width: 60px; height: 20px;" />
                                    <input type="button" value="删除" onclick="DeleteAttitude3()" class="l-button" style="width: 60px;
                                        height: 20px;" />
                                </td>
                                <td class="score" style="border-top: none; border-right: none;">
                                    <div class="ShowScore">
                                        <label id="LAttitude3Score" class="my_lable">
                                        </label>
                                    </div>
                                    <div class="EditScore">
                                        <input type="text" id="CBAttitude3Score" class="my_combobox" /></div>
                                </td>
                            </tr>
                            <tr id="Attitude4" class="ViewTable">
                                <td class="stander_name_big" style="border-top: none; border-left: none;">
                                    <input type="hidden" id="Attitude4Num" />
                                    <label id="LAttitude4Name" class="my_lable">
                                    </label>
                                </td>
                                <td style="border-top: none; padding: 0px;">
                                    <table class="my_table" frame="void">
                                        <tr>
                                            <td class="stander_content" style="border-top: none; border-left: none;">
                                                <label id="LAttitude4ContentA" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="stander_content" style="border-top: none;">
                                                <label id="LAttitude4ContentB" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="stander_content" style="border-top: none;">
                                                <label id="LAttitude4ContentC" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="stander_content" style="border-top: none; border-right: none;">
                                                <label id="LAttitude4ContentD" class="my_lable">
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="score_type" style="border-bottom: none; border-left: none;">
                                                优（9~10）
                                            </td>
                                            <td class="score_type" style="border-bottom: none;">
                                                良（7~8）
                                            </td>
                                            <td class="score_type" style="border-bottom: none;">
                                                中（4~6）
                                            </td>
                                            <td class="score_type" style="border-bottom: none; border-right: none;">
                                                差（0~3）
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="fun" style="border-top: none; border-right: none;">
                                    <input type="button" value="重新选择" onclick="SelectStander('Attitude4')" class="l-button"
                                        style="width: 60px; height: 20px;" />
                                    <input type="button" value="删除" onclick="DeleteAttitude4()" class="l-button" style="width: 60px;
                                        height: 20px;" />
                                </td>
                                <td class="score" style="border-top: none; border-right: none;">
                                    <div class="ShowScore">
                                        <label id="LAttitude4Score" class="my_lable">
                                        </label>
                                    </div>
                                    <div class="EditScore">
                                        <input type="text" id="CBAttitude4Score" class="my_combobox" /></div>
                                </td>
                            </tr>
                            <tr id="Attitude" class="EditTable">
                                <td class="stander_name_big_edit" style="border-top: none; border-bottom: none; border-left: none;">
                                    <input type="hidden" id="AttitudeNum" />
                                    <label id="LAttitudeName" class="my_lable">
                                        请选择指标！</label>
                                </td>
                                <td style="border-top: none; border-bottom: none; padding: 0px">
                                    <table class="my_table" frame="void">
                                        <tr>
                                            <td class="stander_content_edit" style="border-top: none; border-left: none;">
                                                <label id="LAttitudeContentA" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="stander_content_edit" style="border-top: none;">
                                                <label id="LAttitudeContentB" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="stander_content_edit" style="border-top: none;">
                                                <label id="LAttitudeContentC" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="stander_content_edit" style="border-top: none; border-right: none;">
                                                <label id="LAttitudeContentD" class="my_lable">
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="score_type" style="border-bottom: none; border-left: none;">
                                                优（9~10）
                                            </td>
                                            <td class="score_type" style="border-bottom: none;">
                                                良（7~8）
                                            </td>
                                            <td class="score_type" style="border-bottom: none;">
                                                中（4~6）
                                            </td>
                                            <td class="score_type" style="border-bottom: none; border-right: none;">
                                                差（0~3）
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="fun" style="border-top: none; border-bottom: none; border-right: none;">
                                    <input type="button" value="选择指标" onclick="SelectStander('Attitude')" class="l-button"
                                        style="width: 60px; height: 20px;" />
                                    <input type="button" value="添加" onclick="AddAttitude()" class="l-button" style="width: 60px;
                                        height: 20px;" />
                                </td>
                                <td class="score" style="border-top: none; border-right: none;">
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td class="weight">
                        <div class="EditTableWeight" style="color: Red;">
                            权重:<br />
                            <input type="text" id="AttitudeWeightEdit" style="width: 20px;" onkeyup="this.value=this.value.replace(/\D/g,'')"
                                onafterpaste="this.value=this.value.replace(/\D/g,'')" />
                        </div>
                        <div class="ViewTableWeight">
                            <label id="AttitudeWeightView" class="my_lable">
                            </label>
                            %
                        </div>
                    </td>
                </tr>
                <tr id="VetoStander">
                    <td class="num">
                        五
                    </td>
                    <td class="stander_type">
                        否决指标
                    </td>
                    <td style="padding: 0px">
                        <table class="my_table" frame="void">
                            <tr>
                                <td class="stander_name_big" style="border-top: none; border-left: none;">
                                    违反规章制度
                                </td>
                                <td style="border: none; padding: 0px;">
                                    <table class="my_table" frame="void">
                                        <tr id="Veto1" class="ViewTable">
                                            <td class="veto_stander_content" style="border-top: none; border-left: none; height: 45px;">
                                                <input type="hidden" id="Veto1Num" />
                                                <label id="LVeto1Content" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="fun" style="border-top: none; border-right: none;">
                                                <input type="button" value="重新选择" onclick="SelectVetoStander('Veto1')" class="l-button"
                                                    style="width: 60px; height: 20px;" />
                                                <input type="button" value="删除" onclick="DeleteVeto1()" class="l-button" style="width: 60px;
                                                    height: 20px;" />
                                            </td>
                                            <td class="score" style="border-top: none; border-right: none;">
                                                <div class="ShowScore">
                                                    <label id="LVeto1Score" class="my_lable">
                                                    </label>
                                                </div>
                                                <div class="EditScore">
                                                    <input type="text" id="CBVeto1Score" class="my_combobox" /></div>
                                            </td>
                                        </tr>
                                        <tr id="Veto2" class="ViewTable">
                                            <td class="veto_stander_content" style="border-top: none; border-left: none; height: 45px;">
                                                <input type="hidden" id="Veto2Num" />
                                                <label id="LVeto2Content" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="fun" style="border-top: none; border-right: none;">
                                                <input type="button" value="重新选择" onclick="SelectVetoStander('Veto2')" class="l-button"
                                                    style="width: 60px; height: 20px;" />
                                                <input type="button" value="删除" onclick="DeleteVeto2()" class="l-button" style="width: 60px;
                                                    height: 20px;" />
                                            </td>
                                            <td class="score" style="border-top: none; border-right: none;">
                                                <div class="ShowScore">
                                                    <label id="LVeto2Score" class="my_lable">
                                                    </label>
                                                </div>
                                                <div class="EditScore">
                                                    <input type="text" id="CBVeto2Score" class="my_combobox" /></div>
                                            </td>
                                        </tr>
                                        <tr id="Veto3" class="ViewTable">
                                            <td class="veto_stander_content" style="border-top: none; border-left: none; height: 45px;">
                                                <input type="hidden" id="Veto3Num" />
                                                <label id="LVeto3Content" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="fun" style="border-top: none; border-right: none;">
                                                <input type="button" value="重新选择" onclick="SelectVetoStander('Veto3')" class="l-button"
                                                    style="width: 60px; height: 20px;" />
                                                <input type="button" value="删除" onclick="DeleteVeto3()" class="l-button" style="width: 60px;
                                                    height: 20px;" />
                                            </td>
                                            <td class="score" style="border-top: none; border-right: none;">
                                                <div class="ShowScore">
                                                    <label id="LVeto3Score" class="my_lable">
                                                    </label>
                                                </div>
                                                <div class="EditScore">
                                                    <input type="text" id="CBVeto3Score" class="my_combobox" /></div>
                                            </td>
                                        </tr>
                                        <tr id="Veto4" class="ViewTable">
                                            <td class="veto_stander_content" style="border-top: none; border-left: none; height: 45px;">
                                                <input type="hidden" id="Veto4Num" />
                                                <label id="LVeto4Content" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="fun" style="border-top: none; border-right: none;">
                                                <input type="button" value="重新选择" onclick="SelectVetoStander('Veto4')" class="l-button"
                                                    style="width: 60px; height: 20px;" />
                                                <input type="button" value="删除" onclick="DeleteVeto4()" class="l-button" style="width: 60px;
                                                    height: 20px;" />
                                            </td>
                                            <td class="score" style="border-top: none; border-right: none;">
                                                <div class="ShowScore">
                                                    <label id="LVeto4Score" class="my_lable">
                                                    </label>
                                                </div>
                                                <div class="EditScore">
                                                    <input type="text" id="CBVeto4Score" class="my_combobox" /></div>
                                            </td>
                                        </tr>
                                        <tr id="Veto5" class="ViewTable">
                                            <td class="veto_stander_content" style="border-top: none; border-left: none; height: 45px;">
                                                <input type="hidden" id="Veto5Num" />
                                                <label id="LVeto5Content" class="my_lable">
                                                </label>
                                            </td>
                                            <td class="fun" style="border-top: none; border-right: none;">
                                                <input type="button" value="重新选择" onclick="SelectVetoStander('Veto5')" class="l-button"
                                                    style="width: 60px; height: 20px;" />
                                                <input type="button" value="删除" onclick="DeleteVeto5()" class="l-button" style="width: 60px;
                                                    height: 20px;" />
                                            </td>
                                            <td class="score" style="border-top: none; border-right: none;">
                                                <div class="ShowScore">
                                                    <label id="LVeto5Score" class="my_lable">
                                                    </label>
                                                </div>
                                                <div class="EditScore">
                                                    <input type="text" id="CBVeto5Score" class="my_combobox" /></div>
                                            </td>
                                        </tr>
                                        <tr id="Veto" class="EditTable">
                                            <td class="veto_stander_content_edit" style="border-bottom: none; border-top: none;
                                                border-left: none; height: 45px;">
                                                <input type="hidden" id="VetoNum" />
                                                <label id="LVetoContent" class="my_lable">
                                                    请选择指标！</label>
                                            </td>
                                            <td class="fun" style="border-bottom: none; border-top: none; border-right: none;">
                                                <input type="button" value="选择" onclick="SelectVetoStander('Veto')" class="l-button"
                                                    style="width: 60px; height: 20px;" />
                                                <input type="button" value="添加" onclick="AddVeto()" class="l-button" style="width: 60px;
                                                    height: 20px;" />
                                            </td>
                                            <td class="score" style="border-top: none; border-right: none;">
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td class="stander_name_big" style="border-bottom: none; border-left: none;">
                                    其它
                                </td>
                                <td style="border-bottom: none; border-right: none;">
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td class="weight">
                        100%
                    </td>
                </tr>
            </table>
        </div>
        <div id="SelectStander" class="Hidden">
            <div id="StanderInfo">
                <div id="maingrid4" style="margin: 0; padding: 0;">
                </div>
            </div>
            <div id="VetoStanderInfo">
                <div id="maingrid5" style="margin: 0; padding: 0;">
                </div>
            </div>
            <div id="ResponseStanderInfo">
                <div id="maingrid6" style="margin: 0; padding: 0;">
                </div>
            </div>
            <div id="DetailStanderInfo" class="Hidden">
                <div id="StanderDetail" style="border: 3px solid #a3c0e8; width: 500px; margin: 0px auto;">
                    <table style="border: none">
                        <tr>
                            <td align="right" class="tableKey">
                                指标类型：
                            </td>
                            <td align="left" class="tableValue">
                                <asp:Label ID="LStanderType" runat="server" Text=""></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td align="right" class="tableKey">
                                指标名称：
                            </td>
                            <td align="left" class="tableValue">
                                <asp:Label ID="LName" runat="server" Text=""></asp:Label>
                            </td>
                        </tr>
                        <tr class="NormalStander">
                            <td align="right" class="tableKey">
                                指标描述：
                            </td>
                        </tr>
                        <tr class="NormalStander">
                            <td align="right" class="tableKey">
                                优：
                            </td>
                            <td align="left" class="tableValue">
                                <asp:Label ID="LContentA" runat="server" Text=""></asp:Label>
                            </td>
                        </tr>
                        <tr class="NormalStander">
                            <td align="right" class="tableKey">
                                良：
                            </td>
                            <td align="left" class="tableValue">
                                <asp:Label ID="LContentB" runat="server" Text=""></asp:Label>
                            </td>
                        </tr>
                        <tr class="NormalStander">
                            <td align="right" class="tableKey">
                                中：
                            </td>
                            <td align="left" class="tableValue">
                                <asp:Label ID="LContentC" runat="server" Text=""></asp:Label>
                            </td>
                        </tr>
                        <tr class="NormalStander">
                            <td align="right" class="tableKey">
                                差：
                            </td>
                            <td align="left" class="tableValue">
                                <asp:Label ID="LContentD" runat="server" Text=""></asp:Label>
                            </td>
                        </tr>
                        <tr class="VetoStander Hidden">
                            <td align="right" class="tableKey">
                                指标描述：
                            </td>
                            <td align="left" class="tableValue">
                                <asp:Label ID="LContent" runat="server" Text=""></asp:Label>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        </div>
        <div class="Hidden">
            <asp:UpdatePanel ID="UpdatePanel1" runat="server">
                <ContentTemplate>
                    <input id="JsonData" type="hidden" runat="server" />
                    <input id="JsonData2" type="hidden" runat="server" />
                    <input id="JsonData3" type="hidden" runat="server" />
                    <input id="JsonData4" type="hidden" runat="server" />
                    <asp:Button ID="BGetStanderLib" runat="server" Text="Button" OnClick="BGetStanderLib_Click" />
                    <asp:Button ID="BFinishMakeTable" runat="server" Text="" OnClick="BFinishMakeTable_Click" />
                    <asp:Button ID="BFinishEditTable" runat="server" Text="" OnClick="BFinishEditTable_Click" />
                    <asp:Button ID="BGetEvaluateTable" runat="server" Text="" OnClick="BGetEvaluateTable_Click"/>
                </ContentTemplate>
            </asp:UpdatePanel>
            <asp:Button ID="BRefresh" runat="server" Text="" OnClick="BRefresh_Click" />
        </div>
    </div>
    </form>
</body>
</html>
