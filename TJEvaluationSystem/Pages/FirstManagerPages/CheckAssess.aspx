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
<body style="padding:5px;">
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    <div>
        <div class="l-loading" style="display:block" id="pageloading"></div> 
        <div class="ToolBar ">
            <table class="tool_bar_table">
                <tr id="TrShowAllTables">
                    <td class="tool_bar_td"><input type="text" id="DepType"/></td>
                    <td class="tool_bar_td"><input type="text" id="PassedType"/></td>
                    <td class="tool_bar_td"><input type="button" value="查询" onclick="Search()" class="l-button" style="width:70px;"/> </td>
                </tr>
                <tr id="TrShowTableInfo">
                    <td class="tool_bar_td"><input type="button" value="返回" onclick="Back()" class="l-button" style="width:70px;"/> </td>
                </tr>
            </table>
        </div>
        <div id="ShowAllTables" >
            <div id="maingrid" style="margin:0; padding:0;"></div>
        </div>
        <div id="ShowTableInfo" style="padding-top: 5px; display: none;">
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
                                                <label id="LKeyResponse2Name" class="my_lable"></label>
                                            </td>
                                            <td style="border-top: none; padding: 0px">
                                                <table class="my_table" frame="void">
                                                    <tr>
                                                        <td colspan="4" class="stander_content" style="border-left: none; border-right: none;
                                                            border-top: none;">
                                                            <label id="LKeyResponse2Content" class="my_lable"></label>
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
                                                <label id="LKeyResponse3Name" class="my_lable"></label>
                                            </td>
                                            <td style="border-top: none; padding: 0px">
                                                <table class="my_table" frame="void">
                                                    <tr>
                                                        <td colspan="4" class="stander_content" style="border-left: none; border-right: none;
                                                            border-top: none;">
                                                            <label id="LKeyResponse3Content" class="my_lable"></label>
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
                                            <td class="score" style="border-top: none; border-right: none;">
                                                <div class="ShowScore">
                                                    <label id="LKeyResponse3Score" class="my_lable">
                                                    </label>
                                                </div>
                                                <div class="EditScore">
                                                    <input type="text" id="CBKeyResponse3Score" class="my_combobox" /></div>
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
                                            <td class="score" style="border-top: none; border-right: none;">
                                                <div class="ShowScore">
                                                    <label id="LKeyAbility3Score" class="my_lable">
                                                    </label>
                                                </div>
                                                <div class="EditScore">
                                                    <input type="text" id="CBKeyAbility3Score" class="my_combobox" /></div>
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
                                            <td class="score" style="border-top: none; border-right: none;">
                                                <div class="ShowScore">
                                                    <label id="LKeyAttitude3Score" class="my_lable">
                                                    </label>
                                                </div>
                                                <div class="EditScore">
                                                    <input type="text" id="CBKeyAttitude3Score" class="my_combobox" /></div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td class="weight">
                            <label id="KeyWeightView" class="my_lable"></label>
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
                                    <label id="LResponse1Name" class="my_lable"></label>
                                </td>
                                <td style="border-top: none; padding: 0px">
                                    <table class="my_table" frame="void">
                                        <tr>
                                            <td colspan="4" class="stander_content" style="border-top: none; border-left: none;
                                                border-right: none;">
                                                <label id="LResponse1Content" class="my_lable"></label>
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
                                    <label id="LResponse2Name" class="my_lable"></label>
                                </td>
                                <td style="border-top: none; padding: 0px">
                                    <table class="my_table" frame="void">
                                        <tr>
                                            <td colspan="4" class="stander_content" style="border-top: none; border-left: none;
                                                border-right: none;">
                                                <label id="LResponse2Content" class="my_lable"></label>
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
                                    <label id="LResponse3Name" class="my_lable"></label>
                                </td>
                                <td style="border-bottom: none; padding: 0px">
                                    <table class="my_table" frame="void">
                                        <tr>
                                            <td colspan="4" class="stander_content" style="border: none;">
                                                <label id="LResponse3Content" class="my_lable"></label>
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
                                <td class="score" style="border-top: none; border-right: none;">
                                    <div class="ShowScore">
                                        <label id="LResponse3Score" class="my_lable">
                                        </label>
                                    </div>
                                    <div class="EditScore">
                                        <input type="text" id="CBResponse3Score" class="my_combobox" /></div>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td class="weight">
                        <label id="ResponseWeightView" class="my_lable"></label>%
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
                                <td class="score" style="border-top: none; border-right: none;">
                                    <div class="ShowScore">
                                        <label id="LAbility4Score" class="my_lable">
                                        </label>
                                    </div>
                                    <div class="EditScore">
                                        <input type="text" id="CBAbility4Score" class="my_combobox" /></div>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td class="weight">
                        <label id="AbilityWeightView" class="my_lable"></label>%
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
                                <td class="score" style="border-top: none; border-right: none;">
                                    <div class="ShowScore">
                                        <label id="LAttitude4Score" class="my_lable">
                                        </label>
                                    </div>
                                    <div class="EditScore">
                                        <input type="text" id="CBAttitude4Score" class="my_combobox" /></div>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td class="weight">
                        <label id="AttitudeWeightView" class="my_lable"></label>%
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
                                            <td class="score" style="border-top: none; border-right: none;">
                                                <div class="ShowScore">
                                                    <label id="LVeto5Score" class="my_lable">
                                                    </label>
                                                </div>
                                                <div class="EditScore">
                                                    <input type="text" id="CBVeto5Score" class="my_combobox" /></div>
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
        <div class="Hidden">
            <asp:UpdatePanel ID="UpdatePanel1" runat="server" >
            <ContentTemplate>
                <input type="hidden" id="JsonData"  runat="server"/>
                <input type="hidden" id="JsonData2" runat="server"/>
                <input type="hidden" id="JsonData3" runat="server"/>
                <asp:Button ID="BSetPassed" runat="server"
                    Text="Button" onclick="BSetPassed_Click" />
            </ContentTemplate>
            </asp:UpdatePanel>
            <asp:Button ID="BRefresh" runat="server" Text="" onclick="BRefresh_Click" />
        </div>
    </div>
    </form>
</body>
</html>
