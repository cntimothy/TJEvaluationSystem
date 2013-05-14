<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ManageEvaluatorTable.aspx.cs"
    Inherits="TJEvaluationSystem.Pages.SecondManagerPages.ManageEvaluatorTable" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>管理考评表</title>
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
<body>
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    <div class="ToolBar">
        <table style="position: relative; left: 20px; height: 100%">
            <tr>
                <td style="width: 10px;">
                </td>
                <td style="padding: 1px;">
                    <input type="button" value="获取被考评人名单" id="search_button" onclick="search()" class="l-button"
                        style="width: 150px; height: 25px; font-size: 15px" />
                </td>
                <td style="width: 10px;">
                </td>
                <td style="padding: 1px;">
                    <input type="button" value="提交" id="submit_button" onclick="submitpost()" class="l-button"
                        style="width: 100px; height: 25px; font-size: 15px; display: none" />
                </td>
            </tr>
        </table>
    </div>
    <div id="TitleDiv">
        <br />
        <asp:Label ID="Title" runat="server" Text="" Style="position: relative; left: 20px;
            font-size: 16px; display: block"></asp:Label>
        <br />
    </div>
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
                            <asp:Label ID="LName1" runat="server" Text=""></asp:Label>
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
    <div id="MakeEditAssessTable" class="Hidden">
        <div class="ToolBar">
            <div id="MakeTableBar">
                <table class="tool_bar_table">
                    <tr>
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
                </table>
            </div>
            <div id="EditTableBar">
                <table class="tool_bar_table">
                    <tr>
                        <td class="tool_bar_td">
                            <input type="button" class="l-button" value="保存考核表" style="width: 70px;" onclick="FinishEditTable();" />
                        </td>
                        <td class="tool_bar_td ">
                            <input type="button" class="l-button" value="重置考核表" style="width: 70px;" onclick="ResetTable();" />
                        </td>
                        <td class="tool_bar_td">
                            <input type="button" class="l-button" value="返回" style="width: 70px;" onclick="BackToUserList();" />
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div id="AssessTable" style="padding-top: 5px;">
            <asp:Label ID="pass" runat="server" Text="" Style="font-size: 18px; font-weight: 500;
                text-align: center; position: relative; left: 480px"></asp:Label><br />
            <asp:Label ID="Comment" runat="server" Text="" Style="font-size: 18px; font-weight: 500;
                text-align: center; position: relative; left: 480px; color: Red"></asp:Label>
            <div id="TableHeader">
                被考核人姓名：<label id="LMEEvaluatdName"></label>&nbsp&nbsp&nbsp&nbsp 岗位名称：<label id="LMEJobName"></label>&nbsp&nbsp&nbsp&nbsp
                用工部门：<label id="LMEDep"></label>&nbsp&nbsp&nbsp&nbsp 用工单位：<label id="LMEUnit"></label>&nbsp&nbsp&nbsp&nbsp
                <br />
                考核时间段：<label id="LMETime"></label>
            </div>
            <table id="MainTable" class="my_table">
                <tr>
                    <td colspan="4" class="td_title">
                        指标体系
                    </td>
                    <td colspan="4" class="td_title">
                        指标描述及分值
                    </td>
                    <td class="td_title" style="width: 60px;">
                        操作
                    </td>
                    <td class="td_title" style="width: 50px;">
                        权重
                    </td>
                </tr>
                <tr>
                    <td rowspan="33" class="td_title" style="width: 20px;">
                        一
                    </td>
                    <td rowspan="33" class="td_title" style="width: 30px;">
                        关键绩效指标
                    </td>
                    <td rowspan="11" class="td_title" style="width: 30px;">
                        关键岗位职责指标
                    </td>
                    <td colspan="6" class="td_reminder">
                        点击选择按钮选择关键岗位职责指标，要求最少2项，最多5项
                    </td>
                    <td rowspan="33" class="td_weight">
                        50%
                    </td>
                </tr>
                <tr>
                    <td rowspan="2" style="width: 120px;">
                        <label id="LKeyResponse1Name" class="td_label_no_content">
                        </label>
                    </td>
                    <td colspan="4">
                        <label id="LKeyResponse1Content" class="td_label_no_content">
                            &nbsp</label>
                    </td>
                    <td rowspan="2" class="td_fun">
                        <input type="button" value="选择" onclick="SelectResponseStander('KeyResponse1')" class="l-button"
                            style="width: 60px; height: 20px;" />
                        <input type="button" value="删除" onclick="DeleteStander('KeyResponse1')" class="l-button"
                            style="width: 60px; height: 20px;" />
                    </td>
                </tr>
                <tr class="KeyResponse">
                    <td class="td_score_type">
                        优（9~10）
                    </td>
                    <td class="td_score_type">
                        良（7~8）
                    </td>
                    <td class="td_score_type">
                        中（4~6）
                    </td>
                    <td class="td_score_type">
                        差（0~3）
                    </td>
                </tr>
                <tr>
                    <td rowspan="2">
                        <label id="LKeyResponse2Name" class="td_label_no_content">
                        </label>
                    </td>
                    <td colspan="4">
                        <label id="LKeyResponse2Content" class="td_label_no_content">
                            &nbsp</label>
                    </td>
                    <td rowspan="2" class="td_fun">
                        <input type="button" value="选择" onclick="SelectResponseStander('KeyResponse2')" class="l-button"
                            style="width: 60px; height: 20px;" />
                        <input type="button" value="删除" onclick="DeleteStander('KeyResponse2')" class="l-button"
                            style="width: 60px; height: 20px;" />
                    </td>
                </tr>
                <tr>
                    <td class="td_score_type">
                        优（9~10）
                    </td>
                    <td class="td_score_type">
                        良（7~8）
                    </td>
                    <td class="td_score_type">
                        中（4~6）
                    </td>
                    <td class="td_score_type">
                        差（0~3）
                    </td>
                </tr>
                <tr>
                    <td rowspan="2">
                        <label id="LKeyResponse3Name" class="td_label_no_content">
                        </label>
                    </td>
                    <td colspan="4">
                        <label id="LKeyResponse3Content" class="td_label_no_content">
                            &nbsp</label>
                    </td>
                    <td rowspan="2" class="td_fun">
                        <input type="button" value="选择" onclick="SelectResponseStander('KeyResponse3')" class="l-button"
                            style="width: 60px; height: 20px;" />
                        <input type="button" value="删除" onclick="DeleteStander('KeyResponse3')" class="l-button"
                            style="width: 60px; height: 20px;" />
                    </td>
                </tr>
                <tr>
                    <td class="td_score_type">
                        优（9~10）
                    </td>
                    <td class="td_score_type">
                        良（7~8）
                    </td>
                    <td class="td_score_type">
                        中（4~6）
                    </td>
                    <td class="td_score_type">
                        差（0~3）
                    </td>
                </tr>
                <tr>
                    <td rowspan="2">
                        <label id="LKeyResponse4Name" class="td_label_no_content">
                        </label>
                    </td>
                    <td colspan="4">
                        <label id="LKeyResponse4Content" class="td_label_no_content">
                            &nbsp</label>
                    </td>
                    <td rowspan="2" class="td_fun">
                        <input type="button" value="选择" onclick="SelectResponseStander('KeyResponse4')" class="l-button"
                            style="width: 60px; height: 20px;" />
                        <input type="button" value="删除" onclick="DeleteStander('KeyResponse4')" class="l-button"
                            style="width: 60px; height: 20px;" />
                    </td>
                </tr>
                <tr>
                    <td class="td_score_type">
                        优（9~10）
                    </td>
                    <td class="td_score_type">
                        良（7~8）
                    </td>
                    <td class="td_score_type">
                        中（4~6）
                    </td>
                    <td class="td_score_type">
                        差（0~3）
                    </td>
                </tr>
                <tr>
                    <td rowspan="2">
                        <label id="LKeyResponse5Name" class="td_label_no_content">
                        </label>
                    </td>
                    <td colspan="4">
                        <label id="LKeyResponse5Content" class="td_label_no_content">
                            &nbsp</label>
                    </td>
                    <td rowspan="2" class="td_fun">
                        <input type="button" value="选择" onclick="SelectResponseStander('KeyResponse5')" class="l-button"
                            style="width: 60px; height: 20px;" />
                        <input type="button" value="删除" onclick="DeleteStander('KeyResponse5')" class="l-button"
                            style="width: 60px; height: 20px;" />
                    </td>
                </tr>
                <tr>
                    <td class="td_score_type">
                        优（9~10）
                    </td>
                    <td class="td_score_type">
                        良（7~8）
                    </td>
                    <td class="td_score_type">
                        中（4~6）
                    </td>
                    <td class="td_score_type">
                        差（0~3）
                    </td>
                </tr>
                <tr>
                    <td rowspan="11" class="td_title" style="width: 30px;">
                        关键岗位胜任能力指标
                    </td>
                    <td colspan="6" class="td_reminder">
                        点击选择按钮选择关键岗位胜任能力指标，要求最少2项，最多5项
                    </td>
                </tr>
                <tr>
                    <td rowspan="2">
                        <label id="LKeyAbility1Name" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LKeyAbility1ContentA" class="td_label_no_content">
                            &nbsp</label>
                    </td>
                    <td>
                        <label id="LKeyAbility1ContentB" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LKeyAbility1ContentC" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LKeyAbility1ContentD" class="td_label_no_content">
                        </label>
                    </td>
                    <td rowspan="2" class="td_fun">
                        <input type="button" value="选择" onclick="SelectStander('KeyAbility1')" class="l-button"
                            style="width: 60px; height: 20px;" />
                        <input type="button" value="删除" onclick="DeleteStander('KeyAbility1')" class="l-button"
                            style="width: 60px; height: 20px;" />
                    </td>
                </tr>
                <tr>
                    <td class="td_score_type">
                        优（9~10）
                    </td>
                    <td class="td_score_type">
                        良（7~8）
                    </td>
                    <td class="td_score_type">
                        中（4~6）
                    </td>
                    <td class="td_score_type">
                        差（0~3）
                    </td>
                </tr>
                <tr>
                    <td rowspan="2">
                        <label id="LKeyAbility2Name" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LKeyAbility2ContentA" class="td_label_no_content">
                            &nbsp</label>
                    </td>
                    <td>
                        <label id="LKeyAbility2ContentB" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LKeyAbility2ContentC" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LKeyAbility2ContentD" class="td_label_no_content">
                        </label>
                    </td>
                    <td rowspan="2" class="td_fun">
                        <input type="button" value="选择" onclick="SelectStander('KeyAbility2')" class="l-button"
                            style="width: 60px; height: 20px;" />
                        <input type="button" value="删除" onclick="DeleteStander('KeyAbility2')" class="l-button"
                            style="width: 60px; height: 20px;" />
                    </td>
                </tr>
                <tr>
                    <td class="td_score_type">
                        优（9~10）
                    </td>
                    <td class="td_score_type">
                        良（7~8）
                    </td>
                    <td class="td_score_type">
                        中（4~6）
                    </td>
                    <td class="td_score_type">
                        差（0~3）
                    </td>
                </tr>
                <tr>
                    <td rowspan="2">
                        <label id="LKeyAbility3Name" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LKeyAbility3ContentA" class="td_label_no_content">
                            &nbsp</label>
                    </td>
                    <td>
                        <label id="LKeyAbility3ContentB" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LKeyAbility3ContentC" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LKeyAbility3ContentD" class="td_label_no_content">
                        </label>
                    </td>
                    <td rowspan="2" class="td_fun">
                        <input type="button" value="选择" onclick="SelectStander('KeyAbility3')" class="l-button"
                            style="width: 60px; height: 20px;" />
                        <input type="button" value="删除" onclick="DeleteStander('KeyAbility3')" class="l-button"
                            style="width: 60px; height: 20px;" />
                    </td>
                </tr>
                <tr>
                    <td class="td_score_type">
                        优（9~10）
                    </td>
                    <td class="td_score_type">
                        良（7~8）
                    </td>
                    <td class="td_score_type">
                        中（4~6）
                    </td>
                    <td class="td_score_type">
                        差（0~3）
                    </td>
                </tr>
                <tr>
                    <td rowspan="2">
                        <label id="LKeyAbility4Name" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LKeyAbility4ContentA" class="td_label_no_content">
                            &nbsp</label>
                    </td>
                    <td>
                        <label id="LKeyAbility4ContentB" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LKeyAbility4ContentC" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LKeyAbility4ContentD" class="td_label_no_content">
                        </label>
                    </td>
                    <td rowspan="2" class="td_fun">
                        <input type="button" value="选择" onclick="SelectStander('KeyAbility4')" class="l-button"
                            style="width: 60px; height: 20px;" />
                        <input type="button" value="删除" onclick="DeleteStander('KeyAbility4')" class="l-button"
                            style="width: 60px; height: 20px;" />
                    </td>
                </tr>
                <tr>
                    <td class="td_score_type">
                        优（9~10）
                    </td>
                    <td class="td_score_type">
                        良（7~8）
                    </td>
                    <td class="td_score_type">
                        中（4~6）
                    </td>
                    <td class="td_score_type">
                        差（0~3）
                    </td>
                </tr>
                <tr>
                    <td rowspan="2">
                        <label id="LKeyAbility5Name" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LKeyAbility5ContentA" class="td_label_no_content">
                            &nbsp</label>
                    </td>
                    <td>
                        <label id="LKeyAbility5ContentB" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LKeyAbility5ContentC" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LKeyAbility5ContentD" class="td_label_no_content">
                        </label>
                    </td>
                    <td rowspan="2" class="td_fun">
                        <input type="button" value="选择" onclick="SelectStander('KeyAbility5')" class="l-button"
                            style="width: 60px; height: 20px;" />
                        <input type="button" value="删除" onclick="DeleteStander('KeyAbility5')" class="l-button"
                            style="width: 60px; height: 20px;" />
                    </td>
                </tr>
                <tr>
                    <td class="td_score_type">
                        优（9~10）
                    </td>
                    <td class="td_score_type">
                        良（7~8）
                    </td>
                    <td class="td_score_type">
                        中（4~6）
                    </td>
                    <td class="td_score_type">
                        差（0~3）
                    </td>
                </tr>
                <tr>
                    <td rowspan="11" class="td_title" style="width: 30px;">
                        关键工作态度指标
                    </td>
                    <td colspan="6" class="td_reminder">
                        点击选择按钮选择关键工作态度指标，要求最少2项，最多5项
                    </td>
                </tr>
                <tr>
                    <td rowspan="2">
                        <label id="LKeyAttitude1Name" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LKeyAttitude1ContentA" class="td_label_no_content">
                            &nbsp</label>
                    </td>
                    <td>
                        <label id="LKeyAttitude1ContentB" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LKeyAttitude1ContentC" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LKeyAttitude1ContentD" class="td_label_no_content">
                        </label>
                    </td>
                    <td rowspan="2" class="td_fun">
                        <input type="button" value="选择" onclick="SelectStander('KeyAttitude1')" class="l-button"
                            style="width: 60px; height: 20px;" />
                        <input type="button" value="删除" onclick="DeleteStander('KeyAttitude1')" class="l-button"
                            style="width: 60px; height: 20px;" />
                    </td>
                </tr>
                <tr>
                    <td class="td_score_type">
                        优（9~10）
                    </td>
                    <td class="td_score_type">
                        良（7~8）
                    </td>
                    <td class="td_score_type">
                        中（4~6）
                    </td>
                    <td class="td_score_type">
                        差（0~3）
                    </td>
                </tr>
                <tr>
                    <td rowspan="2">
                        <label id="LKeyAttitude2Name" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LKeyAttitude2ContentA" class="td_label_no_content">
                            &nbsp</label>
                    </td>
                    <td>
                        <label id="LKeyAttitude2ContentB" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LKeyAttitude2ContentC" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LKeyAttitude2ContentD" class="td_label_no_content">
                        </label>
                    </td>
                    <td rowspan="2" class="td_fun">
                        <input type="button" value="选择" onclick="SelectStander('KeyAttitude2')" class="l-button"
                            style="width: 60px; height: 20px;" />
                        <input type="button" value="删除" onclick="DeleteStander('KeyAttitude2')" class="l-button"
                            style="width: 60px; height: 20px;" />
                    </td>
                </tr>
                <tr>
                    <td class="td_score_type">
                        优（9~10）
                    </td>
                    <td class="td_score_type">
                        良（7~8）
                    </td>
                    <td class="td_score_type">
                        中（4~6）
                    </td>
                    <td class="td_score_type">
                        差（0~3）
                    </td>
                </tr>
                <tr>
                    <td rowspan="2">
                        <label id="LKeyAttitude3Name" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LKeyAttitude3ContentA" class="td_label_no_content">
                            &nbsp</label>
                    </td>
                    <td>
                        <label id="LKeyAttitude3ContentB" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LKeyAttitude3ContentC" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LKeyAttitude3ContentD" class="td_label_no_content">
                        </label>
                    </td>
                    <td rowspan="2" class="td_fun">
                        <input type="button" value="选择" onclick="SelectStander('KeyAttitude3')" class="l-button"
                            style="width: 60px; height: 20px;" />
                        <input type="button" value="删除" onclick="DeleteStander('KeyAttitude3')" class="l-button"
                            style="width: 60px; height: 20px;" />
                    </td>
                </tr>
                <tr>
                    <td class="td_score_type">
                        优（9~10）
                    </td>
                    <td class="td_score_type">
                        良（7~8）
                    </td>
                    <td class="td_score_type">
                        中（4~6）
                    </td>
                    <td class="td_score_type">
                        差（0~3）
                    </td>
                </tr>
                <tr>
                    <td rowspan="2">
                        <label id="LKeyAttitude4Name" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LKeyAttitude4ContentA" class="td_label_no_content">
                            &nbsp</label>
                    </td>
                    <td>
                        <label id="LKeyAttitude4ContentB" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LKeyAttitude4ContentC" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LKeyAttitude4ContentD" class="td_label_no_content">
                        </label>
                    </td>
                    <td rowspan="2" class="td_fun">
                        <input type="button" value="选择" onclick="SelectStander('KeyAttitude4')" class="l-button"
                            style="width: 60px; height: 20px;" />
                        <input type="button" value="删除" onclick="DeleteStander('KeyAttitude4')" class="l-button"
                            style="width: 60px; height: 20px;" />
                    </td>
                </tr>
                <tr>
                    <td class="td_score_type">
                        优（9~10）
                    </td>
                    <td class="td_score_type">
                        良（7~8）
                    </td>
                    <td class="td_score_type">
                        中（4~6）
                    </td>
                    <td class="td_score_type">
                        差（0~3）
                    </td>
                </tr>
                <tr>
                    <td rowspan="2">
                        <label id="LKeyAttitude5Name" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LKeyAttitude5ContentA" class="td_label_no_content">
                            &nbsp</label>
                    </td>
                    <td>
                        <label id="LKeyAttitude5ContentB" class="td_label_no_content">
                            &nbsp</label>
                    </td>
                    <td>
                        <label id="LKeyAttitude5ContentC" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LKeyAttitude5ContentD" class="td_label_no_content">
                        </label>
                    </td>
                    <td rowspan="2" class="td_fun">
                        <input type="button" value="选择" onclick="SelectResponseStander('KeyAttitude5')" class="l-button"
                            style="width: 60px; height: 20px;" />
                        <input type="button" value="删除" onclick="DeleteStander('KeyAttitude5')" class="l-button"
                            style="width: 60px; height: 20px;" />
                    </td>
                </tr>
                <tr>
                    <td class="td_score_type">
                        优（9~10）
                    </td>
                    <td class="td_score_type">
                        良（7~8）
                    </td>
                    <td class="td_score_type">
                        中（4~6）
                    </td>
                    <td class="td_score_type">
                        差（0~3）
                    </td>
                </tr>
                <tr>
                    <td rowspan="11" class="td_title" style="width: 20px;">
                        二
                    </td>
                    <td rowspan="11" class="td_title" style="width: 30px;">
                        岗位职责指标
                    </td>
                    <td colspan="7" class="td_reminder">
                        点击选择按钮选择岗位职责指标，要求最少2项，最多5项
                    </td>
                    <td rowspan="11" class="td_weight">
                        20%
                    </td>
                </tr>
                <tr>
                    <td rowspan="2" colspan="2" style="width: 120px;">
                        <label id="LResponse1Name" class="td_label_no_content">
                        </label>
                    </td>
                    <td colspan="4">
                        <label id="LResponse1Content" class="td_label_no_content">
                            &nbsp</label>
                    </td>
                    <td rowspan="2" class="td_fun">
                        <input type="button" value="选择" onclick="SelectResponseStander('Response1')" class="l-button"
                            style="width: 60px; height: 20px;" />
                        <input type="button" value="删除" onclick="DeleteStander('Response1')" class="l-button"
                            style="width: 60px; height: 20px;" />
                    </td>
                </tr>
                <tr>
                    <td class="td_score_type">
                        优（9~10）
                    </td>
                    <td class="td_score_type">
                        良（7~8）
                    </td>
                    <td class="td_score_type">
                        中（4~6）
                    </td>
                    <td class="td_score_type">
                        差（0~3）
                    </td>
                </tr>
                <tr>
                    <td rowspan="2" colspan="2" style="width: 120px;">
                        <label id="LResponse2Name" class="td_label_no_content">
                        </label>
                    </td>
                    <td colspan="4">
                        <label id="LResponse2Content" class="td_label_no_content">
                            &nbsp</label>
                    </td>
                    <td rowspan="2" class="td_fun">
                        <input type="button" value="选择" onclick="SelectResponseStander('Response2')" class="l-button"
                            style="width: 60px; height: 20px;" />
                        <input type="button" value="删除" onclick="DeleteStander('Response2')" class="l-button"
                            style="width: 60px; height: 20px;" />
                    </td>
                </tr>
                <tr>
                    <td class="td_score_type">
                        优（9~10）
                    </td>
                    <td class="td_score_type">
                        良（7~8）
                    </td>
                    <td class="td_score_type">
                        中（4~6）
                    </td>
                    <td class="td_score_type">
                        差（0~3）
                    </td>
                </tr>
                <tr>
                    <td rowspan="2" colspan="2" style="width: 120px;">
                        <label id="LResponse3Name" class="td_label_no_content">
                        </label>
                    </td>
                    <td colspan="4">
                        <label id="LResponse3Content" class="td_label_no_content">
                            &nbsp</label>
                    </td>
                    <td rowspan="2" class="td_fun">
                        <input type="button" value="选择" onclick="SelectResponseStander('Response3')" class="l-button"
                            style="width: 60px; height: 20px;" />
                        <input type="button" value="删除" onclick="DeleteStander('Response3')" class="l-button"
                            style="width: 60px; height: 20px;" />
                    </td>
                </tr>
                <tr>
                    <td class="td_score_type">
                        优（9~10）
                    </td>
                    <td class="td_score_type">
                        良（7~8）
                    </td>
                    <td class="td_score_type">
                        中（4~6）
                    </td>
                    <td class="td_score_type">
                        差（0~3）
                    </td>
                </tr>
                <tr>
                    <td rowspan="2" colspan="2" style="width: 120px;">
                        <label id="LResponse4Name" class="td_label_no_content">
                        </label>
                    </td>
                    <td colspan="4">
                        <label id="LResponse4Content" class="td_label_no_content">
                            &nbsp</label>
                    </td>
                    <td rowspan="2" class="td_fun">
                        <input type="button" value="选择" onclick="SelectResponseStander('Response4')" class="l-button"
                            style="width: 60px; height: 20px;" />
                        <input type="button" value="删除" onclick="DeleteStander('Response4')" class="l-button"
                            style="width: 60px; height: 20px;" />
                    </td>
                </tr>
                <tr>
                    <td class="td_score_type">
                        优（9~10）
                    </td>
                    <td class="td_score_type">
                        良（7~8）
                    </td>
                    <td class="td_score_type">
                        中（4~6）
                    </td>
                    <td class="td_score_type">
                        差（0~3）
                    </td>
                </tr>
                <tr>
                    <td rowspan="2" colspan="2" style="width: 120px;">
                        <label id="LResponse5Name" class="td_label_no_content">
                        </label>
                    </td>
                    <td colspan="4">
                        <label id="LResponse5Content" class="td_label_no_content">
                            &nbsp</label>
                    </td>
                    <td rowspan="2" class="td_fun">
                        <input type="button" value="选择" onclick="SelectResponseStander('Response5')" class="l-button"
                            style="width: 60px; height: 20px;" />
                        <input type="button" value="删除" onclick="DeleteStander('Response5')" class="l-button"
                            style="width: 60px; height: 20px;" />
                    </td>
                </tr>
                <tr>
                    <td class="td_score_type">
                        优（9~10）
                    </td>
                    <td class="td_score_type">
                        良（7~8）
                    </td>
                    <td class="td_score_type">
                        中（4~6）
                    </td>
                    <td class="td_score_type">
                        差（0~3）
                    </td>
                </tr>
                <tr>
                    <td rowspan="11" class="td_title" style="width: 20px;">
                        三
                    </td>
                    <td rowspan="11" class="td_title" style="width: 30px;">
                        岗位胜任能力指标
                    </td>
                    <td colspan="7" class="td_reminder">
                        点击选择按钮选择岗位胜任能力指标，要求最少2项，最多5项
                    </td>
                    <td rowspan="11" class="td_weight">
                        15%
                    </td>
                </tr>
                <tr>
                    <td rowspan="2" colspan="2" style="width: 120px;">
                        <label id="LAbility1Name" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LAbility1ContentA" class="td_label_no_content">
                            &nbsp</label>
                    </td>
                    <td>
                        <label id="LAbility1ContentB" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LAbility1ContentC" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LAbility1ContentD" class="td_label_no_content">
                        </label>
                    </td>
                    <td rowspan="2" class="td_fun">
                        <input type="button" value="选择" onclick="SelectStander('Ability1')" class="l-button"
                            style="width: 60px; height: 20px;" />
                        <input type="button" value="删除" onclick="DeleteStander('Ability1')" class="l-button"
                            style="width: 60px; height: 20px;" />
                    </td>
                </tr>
                <tr>
                    <td class="td_score_type">
                        优（9~10）
                    </td>
                    <td class="td_score_type">
                        良（7~8）
                    </td>
                    <td class="td_score_type">
                        中（4~6）
                    </td>
                    <td class="td_score_type">
                        差（0~3）
                    </td>
                </tr>
                <tr>
                    <td rowspan="2" colspan="2" style="width: 120px;">
                        <label id="LAbility2Name" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LAbility2ContentA" class="td_label_no_content">
                            &nbsp</label>
                    </td>
                    <td>
                        <label id="LAbility2ContentB" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LAbility2ContentC" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LAbility2ContentD" class="td_label_no_content">
                        </label>
                    </td>
                    <td rowspan="2" class="td_fun">
                        <input type="button" value="选择" onclick="SelectStander('Ability2')" class="l-button"
                            style="width: 60px; height: 20px;" />
                        <input type="button" value="删除" onclick="DeleteStander('Ability2')" class="l-button"
                            style="width: 60px; height: 20px;" />
                    </td>
                </tr>
                <tr>
                    <td class="td_score_type">
                        优（9~10）
                    </td>
                    <td class="td_score_type">
                        良（7~8）
                    </td>
                    <td class="td_score_type">
                        中（4~6）
                    </td>
                    <td class="td_score_type">
                        差（0~3）
                    </td>
                </tr>
                <tr>
                    <td rowspan="2" colspan="2" style="width: 120px;">
                        <label id="LAbility3Name" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LAbility3ContentA" class="td_label_no_content">
                            &nbsp</label>
                    </td>
                    <td>
                        <label id="LAbility3ContentB" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LAbility3ContentC" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LAbility3ContentD" class="td_label_no_content">
                        </label>
                    </td>
                    <td rowspan="2" class="td_fun">
                        <input type="button" value="选择" onclick="SelectStander('Ability3')" class="l-button"
                            style="width: 60px; height: 20px;" />
                        <input type="button" value="删除" onclick="DeleteStander('Ability3')" class="l-button"
                            style="width: 60px; height: 20px;" />
                    </td>
                </tr>
                <tr>
                    <td class="td_score_type">
                        优（9~10）
                    </td>
                    <td class="td_score_type">
                        良（7~8）
                    </td>
                    <td class="td_score_type">
                        中（4~6）
                    </td>
                    <td class="td_score_type">
                        差（0~3）
                    </td>
                </tr>
                <tr>
                    <td rowspan="2" colspan="2" style="width: 120px;">
                        <label id="LAbility4Name" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LAbility4ContentA" class="td_label_no_content">
                            &nbsp</label>
                    </td>
                    <td>
                        <label id="LAbility4ContentB" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LAbility4ContentC" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LAbility4ContentD" class="td_label_no_content">
                        </label>
                    </td>
                    <td rowspan="2" class="td_fun">
                        <input type="button" value="选择" onclick="SelectStander('Ability4')" class="l-button"
                            style="width: 60px; height: 20px;" />
                        <input type="button" value="删除" onclick="DeleteStander('Ability4')" class="l-button"
                            style="width: 60px; height: 20px;" />
                    </td>
                </tr>
                <tr>
                    <td class="td_score_type">
                        优（9~10）
                    </td>
                    <td class="td_score_type">
                        良（7~8）
                    </td>
                    <td class="td_score_type">
                        中（4~6）
                    </td>
                    <td class="td_score_type">
                        差（0~3）
                    </td>
                </tr>
                <tr>
                    <td rowspan="2" colspan="2" style="width: 120px;">
                        <label id="LAbility5Name" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LAbility5ContentA" class="td_label_no_content">
                            &nbsp</label>
                    </td>
                    <td>
                        <label id="LAbility5ContentB" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LAbility5ContentC" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LAbility5ContentD" class="td_label_no_content">
                        </label>
                    </td>
                    <td rowspan="2" class="td_fun">
                        <input type="button" value="选择" onclick="SelectStander('Ability5')" class="l-button"
                            style="width: 60px; height: 20px;" />
                        <input type="button" value="删除" onclick="DeleteStander('Ability5')" class="l-button"
                            style="width: 60px; height: 20px;" />
                    </td>
                </tr>
                <tr>
                    <td class="td_score_type">
                        优（9~10）
                    </td>
                    <td class="td_score_type">
                        良（7~8）
                    </td>
                    <td class="td_score_type">
                        中（4~6）
                    </td>
                    <td class="td_score_type">
                        差（0~3）
                    </td>
                </tr>
                <tr>
                    <td rowspan="11" class="td_title" style="width: 20px;">
                        四
                    </td>
                    <td rowspan="11" class="td_title" style="width: 30px;">
                        工作态度指标
                    </td>
                    <td colspan="7" class="td_reminder">
                        点击选择按钮选择工作态度指标，要求最少2项，最多5项
                    </td>
                    <td rowspan="11" class="td_weight">
                        15%
                    </td>
                </tr>
                <tr>
                    <td rowspan="2" colspan="2" style="width: 120px;">
                        <label id="LAttitude1Name" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LAttitude1ContentA" class="td_label_no_content">
                            &nbsp</label>
                    </td>
                    <td>
                        <label id="LAttitude1ContentB" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LAttitude1ContentC" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LAttitude1ContentD" class="td_label_no_content">
                        </label>
                    </td>
                    <td rowspan="2" class="td_fun">
                        <input type="button" value="选择" onclick="SelectStander('Attitude1')" class="l-button"
                            style="width: 60px; height: 20px;" />
                        <input type="button" value="删除" onclick="DeleteStander('Attitude1')" class="l-button"
                            style="width: 60px; height: 20px;" />
                    </td>
                </tr>
                <tr>
                    <td class="td_score_type">
                        优（9~10）
                    </td>
                    <td class="td_score_type">
                        良（7~8）
                    </td>
                    <td class="td_score_type">
                        中（4~6）
                    </td>
                    <td class="td_score_type">
                        差（0~3）
                    </td>
                </tr>
                <tr>
                    <td rowspan="2" colspan="2" style="width: 120px;">
                        <label id="LAttitude2Name" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LAttitude2ContentA" class="td_label_no_content">
                            &nbsp</label>
                    </td>
                    <td>
                        <label id="LAttitude2ContentB" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LAttitude2ContentC" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LAttitude2ContentD" class="td_label_no_content">
                        </label>
                    </td>
                    <td rowspan="2" class="td_fun">
                        <input type="button" value="选择" onclick="SelectStander('Attitude2')" class="l-button"
                            style="width: 60px; height: 20px;" />
                        <input type="button" value="删除" onclick="DeleteStander('Attitude2')" class="l-button"
                            style="width: 60px; height: 20px;" />
                    </td>
                </tr>
                <tr>
                    <td class="td_score_type">
                        优（9~10）
                    </td>
                    <td class="td_score_type">
                        良（7~8）
                    </td>
                    <td class="td_score_type">
                        中（4~6）
                    </td>
                    <td class="td_score_type">
                        差（0~3）
                    </td>
                </tr>
                <tr>
                    <td rowspan="2" colspan="2" style="width: 120px;">
                        <label id="LAttitude3Name" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LAttitude3ContentA" class="td_label_no_content">
                            &nbsp</label>
                    </td>
                    <td>
                        <label id="LAttitude3ContentB" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LAttitude3ContentC" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LAttitude3ContentD" class="td_label_no_content">
                        </label>
                    </td>
                    <td rowspan="2" class="td_fun">
                        <input type="button" value="选择" onclick="SelectStander('Attitude3')" class="l-button"
                            style="width: 60px; height: 20px;" />
                        <input type="button" value="删除" onclick="DeleteStander('Attitude3')" class="l-button"
                            style="width: 60px; height: 20px;" />
                    </td>
                </tr>
                <tr>
                    <td class="td_score_type">
                        优（9~10）
                    </td>
                    <td class="td_score_type">
                        良（7~8）
                    </td>
                    <td class="td_score_type">
                        中（4~6）
                    </td>
                    <td class="td_score_type">
                        差（0~3）
                    </td>
                </tr>
                <tr>
                    <td rowspan="2" colspan="2" style="width: 120px;">
                        <label id="LAttitude4Name" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LAttitude4ContentA" class="td_label_no_content">
                            &nbsp</label>
                    </td>
                    <td>
                        <label id="LAttitude4ContentB" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LAttitude4ContentC" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LAttitude4ContentD" class="td_label_no_content">
                        </label>
                    </td>
                    <td rowspan="2" class="td_fun">
                        <input type="button" value="选择" onclick="SelectStander('Attitude4')" class="l-button"
                            style="width: 60px; height: 20px;" />
                        <input type="button" value="删除" onclick="DeleteStander('Attitude4')" class="l-button"
                            style="width: 60px; height: 20px;" />
                    </td>
                </tr>
                <tr>
                    <td class="td_score_type">
                        优（9~10）
                    </td>
                    <td class="td_score_type">
                        良（7~8）
                    </td>
                    <td class="td_score_type">
                        中（4~6）
                    </td>
                    <td class="td_score_type">
                        差（0~3）
                    </td>
                </tr>
                <tr>
                    <td rowspan="2" colspan="2" style="width: 120px;">
                        <label id="LAttitude5Name" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LAttitude5ContentA" class="td_label_no_content">
                            &nbsp</label>
                    </td>
                    <td>
                        <label id="LAttitude5ContentB" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LAttitude5ContentC" class="td_label_no_content">
                        </label>
                    </td>
                    <td>
                        <label id="LAttitude5ContentD" class="td_label_no_content">
                        </label>
                    </td>
                    <td rowspan="2" class="td_fun">
                        <input type="button" value="选择" onclick="SelectStander('Attitude5')" class="l-button"
                            style="width: 60px; height: 20px;" />
                        <input type="button" value="删除" onclick="DeleteStander('Attitude5')" class="l-button"
                            style="width: 60px; height: 20px;" />
                    </td>
                </tr>
                <tr>
                    <td class="td_score_type">
                        优（9~10）
                    </td>
                    <td class="td_score_type">
                        良（7~8）
                    </td>
                    <td class="td_score_type">
                        中（4~6）
                    </td>
                    <td class="td_score_type">
                        差（0~3）
                    </td>
                </tr>
                <tr>
                    <td rowspan="7" class="td_title" style="width: 20px;">
                        五
                    </td>
                    <td rowspan="7" class="td_title" style="width: 30px;">
                        否决指标
                    </td>
                    <td colspan="7" class="td_reminder">
                        如需要补充否决指标，请在其它项中输入！
                    </td>
                    <td rowspan="7" class="td_weight">
                        100%
                    </td>
                </tr>
                <tr>
                    <td rowspan="5" colspan="2" style="width: 120px; text-align: center">
                        严重违反规章制度
                    </td>
                    <td colspan="3" style="width: 360px;">
                        累计旷工3天以上的
                    </td>
                    <td rowspan="5" class="td_score_type">
                        -10或0
                    </td>
                    <td rowspan="6" class="td_fun">
                    </td>
                </tr>
                <tr>
                    <td colspan="3" style="width: 360px;">
                        严重失职，营私舞弊，给本单位造成3000元以上经济损失或者其它严重后果的
                    </td>
                </tr>
                <tr>
                    <td colspan="3" style="width: 360px;">
                        同时与其他用人单位建立劳动关系，对完成本单位工作任务造成严重影响，或者经本单位提出，拒不改正的
                    </td>
                </tr>
                <tr>
                    <td colspan="3" style="width: 360px;">
                        违背职业道德，行贿、受贿价值超过3000元以上的
                    </td>
                </tr>
                <tr>
                    <td colspan="3" style="width: 360px;">
                        被依法追究刑事责任的
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="width: 120px; text-align: center">
                        其它
                    </td>
                    <td colspan="4" style="width: 480px;">
                        <textarea id="TVetoOthers" style="height: 40px; width: 100%"></textarea>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div id="ViewAssessTable" class="Hidden">
        <div class="ToolBar">
            <table class="tool_bar_table">
                <tr>
                    <td class="tool_bar_td">
                        <input type="button" class="l-button" value="返回" style="width: 70px;" onclick="BackToUserList();" />
                    </td>
                </tr>
            </table>
        </div>
        <div id="Div1">
                被考核人姓名：<label id="LVEvaluatdName"></label>&nbsp&nbsp&nbsp&nbsp
                岗位名称：<label id="LVJobName"></label>&nbsp&nbsp&nbsp&nbsp
                用工部门：<label id="LVEDep"></label>&nbsp&nbsp&nbsp&nbsp
                用工单位：<label id="LVEUnit"></label>&nbsp&nbsp&nbsp&nbsp
                <br/>
                考核时间段：<label id="LVEStartEndTime"></label>&nbsp&nbsp&nbsp&nbsp
        </div>
        <div id="ShowAssessTable">
        </div>
    </div>
    <div id="ResponseLib" class="Hidden">
        <div class="ToolBar">
            <table class="tool_bar_table">
                <tr>
                    <td class="tool_bar_td">
                        <input type="button" value="返回" onclick="BackToAssessTable()" class="l-button" style="width: 70px" />
                    </td>
                </tr>
            </table>
        </div>
        <div id="GResponseLib" style="margin: 0; padding: 0;">
        </div>
    </div>
    <div id="StanderLib" class="Hidden">
        <div class="ToolBar">
            <table class="tool_bar_table">
                <tr>
                    <td class="tool_bar_td">
                        <input type="button" value="返回" onclick="BackToAssessTable()" class="l-button" style="width: 70px" />
                    </td>
                </tr>
            </table>
        </div>
        <div id="GStanderLib" style="margin: 0; padding: 0;">
        </div>
    </div>
    <div id="DetailStanderInfo" class="Hidden">
        <div class="ToolBar">
            <table class="tool_bar_table">
                <tr>
                    <td class="tool_bar_td">
                        <input type="button" value="返回" onclick="BackToStanderList()" class="l-button" style="width: 70px" />
                    </td>
                </tr>
            </table>
        </div>
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
        </div>
    </div>
    <div class="Hidden">
        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <ContentTemplate>
                <input id="Errors" type="hidden" runat="server" />
                <input id="JsonData" type="hidden" runat="server" />
                <input id="JsonData2" type="hidden" runat="server" />
                <input id="JsonData3" type="hidden" runat="server" />
                <input id="JsonData4" type="hidden" runat="server" />
                <asp:Button ID="BGetStanderLib" runat="server" Text="Button" OnClick="BGetStanderLib_Click" />
                <asp:Button ID="BFinishMakeTable" runat="server" Text="" OnClick="BFinishMakeTable_Click" />
                <asp:Button ID="BFinishEditTable" runat="server" Text="" OnClick="BFinishEditTable_Click" />
                <asp:Button ID="BGetEvaluateTable" runat="server" Text="" OnClick="BGetEvaluateTable_Click" />
            </ContentTemplate>
        </asp:UpdatePanel>
        <asp:Button ID="BRefresh" runat="server" Text="" OnClick="BRefresh_Click" />
        <asp:Button ID="SearchEvaluated1" runat="server" OnClick="Search" />
    </div>
    </form>
</body>
</html>
