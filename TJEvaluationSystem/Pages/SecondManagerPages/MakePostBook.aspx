<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MakePostBook.aspx.cs" Inherits="TJEvaluationSystem.Pages.SecondManagerPages.MakePostBook" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>管理岗位责任书</title>
    <link href="../../Style/common.css" rel="stylesheet" type="text/css" />
    <link href="../../Style/CheckPost.css" rel="stylesheet" type="text/css" />
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
    <script src="../../Script/SecondManager/MakePost.js" type="text/javascript"></script>
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
                <td style="padding: 1px;">
                    <input type="button" value="保存" id="save_button" onclick="savepost()" class="l-button"
                        style="width: 100px; height: 25px; font-size: 15px; display: none" />
                </td>
            </tr>
        </table>
    </div>
    <br />
    <asp:Label ID="Title" runat="server" Text="" Style="position: relative; left: 20px;
        font-size: 16px; display: block"></asp:Label>
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
                <tr>
                    <td align="right" class="tableKey">
                        审核意见：
                    </td>
                    <td align="left" class="tableValue">
                        <div class="ShowData">
                            <asp:Label ID="LComment" runat="server" Text=""></asp:Label>
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
            岗位责任书</p>
        <asp:Label ID="pass" runat="server" Text="" Style="font-size: 18px; font-weight: 500;
            text-align: center; position: relative; left: 480px"></asp:Label>
        <asp:Label ID="Comment" runat="server" Text="" Style="font-size: 18px; font-weight: 500;
            text-align: center; position: relative; left: 480px; color: Red"></asp:Label>
        <br />
        <br />
        <div id="outline">
            <table style="position: relative; left: 40px;">
                <tr>
                    <td>
                        <asp:Label ID="Label1" runat="server" Text="一、岗位描述" Style="font-size: 18px; font-weight: 600;
                            text-align: left;"></asp:Label>
                    </td>
                </tr>
                <tr style="height: 20px">
                    <td style="font-size: 16px; height: 20px; width: auto">
                        <asp:Label ID="Label4" runat="server" Text="1.用人单位："></asp:Label>
                    </td>
                    <td>
                        <asp:RadioButton ID="ERadioButton1" runat="server" GroupName="Employer" Text="上海市东凌国际人才有限公司"
                            Checked="True" />&nbsp
                        <asp:RadioButton ID="ERadioButton2" runat="server" GroupName="Employer" Text="上海黄渡同济人力资源有限公司" />
                    </td>
                </tr>
                <tr style="height: 20px">
                    <td style="font-size: 16px; height: 20px">
                        <asp:Label ID="Label5" runat="server" Text="2.用工单位："></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="prbLaborUnit" runat="server" CssClass="textbox2"></asp:TextBox>
                    </td>
                </tr>
                <tr style="height: 20px">
                    <td style="font-size: 16px; height: 20px">
                        <asp:Label ID="Label6" runat="server" Text="3.用工部门："></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="prbLaborDep" runat="server" CssClass="textbox2"></asp:TextBox>
                    </td>
                </tr>
                <tr style="height: 20px">
                    <td style="font-size: 16px; height: 20px">
                        <asp:Label ID="Label7" runat="server" Text="4.岗位名称："></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="prbPostName" runat="server" CssClass="textbox2"></asp:TextBox>
                    </td>
                </tr>
                <tr style="height: 20px">
                    <td style="font-size: 16px; height: 20px">
                        <asp:Label ID="Label8" runat="server" Text="5.岗位类别："></asp:Label>
                    </td>
                    <td>
                        <asp:RadioButton ID="PTRadioButton1" runat="server" GroupName="PostType" Text="管理"
                            Checked="True" />
                        <asp:RadioButton ID="PTRadioButton2" runat="server" GroupName="PostType" Text="教辅" />&nbsp
                        <asp:RadioButton ID="PTRadioButton3" runat="server" GroupName="PostType" Text="思政" />&nbsp
                        <asp:RadioButton ID="PTRadioButton4" runat="server" GroupName="PostType" Text="教师" />&nbsp
                        <asp:RadioButton ID="PTRadioButton5" runat="server" GroupName="PostType" Text="工勤" />
                    </td>
                </tr>
            </table>
        </div>
        <br />
        <div id="response" style="position: relative; left: 40px;">
            <asp:Label ID="Label2" runat="server" Text="二、岗位职责" Style="font-size: 18px; font-weight: 600;
                text-align: left;"></asp:Label>
            <br />
            <asp:Label ID="Label3" runat="server" Text="(一)任职条件" Style="font-size: 17px; font-weight: 600;
                text-align: left;"></asp:Label>
            <br />
            <asp:Label ID="Label9" runat="server" Text="1.学历背景：" CssClass="label1"></asp:Label>
            <br />
            <asp:TextBox ID="prbEduBg" runat="server" CssClass="textbox1" TextMode="MultiLine"></asp:TextBox>
            <br />
            <asp:Label ID="Label10" runat="server" Text="2.培训及资历：" CssClass="label1"></asp:Label>
            <br />
            <asp:TextBox ID="prbCertificate" runat="server" CssClass="textbox1" TextMode="MultiLine"></asp:TextBox>
            <br />
            <asp:Label ID="Label11" runat="server" Text="3.工作经验：" CssClass="label1"></asp:Label>
            <br />
            <asp:TextBox ID="prbExperience" runat="server" CssClass="textbox1" TextMode="MultiLine"></asp:TextBox>
            <br />
            <asp:Label ID="Label12" runat="server" Text="4.基本技能和素质：" CssClass="label1"></asp:Label>
            <br />
            <asp:TextBox ID="prbSkill" runat="server" CssClass="textbox1" TextMode="MultiLine"></asp:TextBox>
            <br />
            <asp:Label ID="Label13" runat="server" Text="5.个性特征：" CssClass="label1"></asp:Label>
            <br />
            <asp:TextBox ID="prbPersonality" runat="server" CssClass="textbox1" TextMode="MultiLine"></asp:TextBox>
            <br />
            <asp:Label ID="Label14" runat="server" Text="6.体质条件： " CssClass="label1"></asp:Label>
            <br />
            <asp:TextBox ID="prbPhycond" runat="server" CssClass="textbox1" TextMode="MultiLine"></asp:TextBox>
            <br />
            <br />
            <asp:Label ID="Label15" runat="server" Text="(二)工作内容、工作要求" Style="font-size: 17px;
                font-weight: 600; text-align: left;"></asp:Label>
            <br />
            <asp:Label ID="Label16" runat="server" Text="1.岗位概述：" CssClass="label1"></asp:Label>
            <br />
            <asp:TextBox ID="prbWorkOutline" runat="server" CssClass="textbox1" TextMode="MultiLine"></asp:TextBox>
            <br />
            <asp:Label ID="Label17" runat="server" Text="2.工作内容及工作要求：（2~5项）" CssClass="label1"></asp:Label>
            <div id="WorkContentRequest">
            </div>
            <table>
                <tr>
                    <td>
                        <input type="button" id="Add" value="新增" onclick="addItem()" class="l-button" style="width: 100px;
                            height: 25px; font-size: 15px" />
                    </td>
                    <td>
                        <input type="button" id="Del" value="删除" onclick="delItem()" class="l-button" style="width: 100px;
                            height: 25px; font-size: 15px" />
                    </td>
                </tr>
            </table>
            <br />
            <br />
            <br />
            <asp:Label ID="Label18" runat="server" Text="(三)权责范围" Style="font-size: 17px; font-weight: 600;
                text-align: left;"></asp:Label>
            <br />
            <asp:Label ID="Label19" runat="server" Text="1.权力：" CssClass="label1"></asp:Label>
            <br />
            <asp:TextBox ID="prbPower" runat="server" CssClass="textbox1" TextMode="MultiLine"></asp:TextBox>
            <br />
            <asp:Label ID="Label20" runat="server" Text="2.责任：" CssClass="label1"></asp:Label>
            <br />
            <asp:TextBox ID="prbResponse" runat="server" CssClass="textbox1" TextMode="MultiLine"></asp:TextBox>
            <br />
            <br />
            <asp:Label ID="Label21" runat="server" Text="(四)工作关系" Style="font-size: 17px; font-weight: 600;
                text-align: left;"></asp:Label>
            <br />
            <asp:Label ID="Label22" runat="server" Text="1.直接领导：" CssClass="label1"></asp:Label>
            <br />
            <asp:TextBox ID="prbDirectLeader" runat="server" CssClass="textbox1" TextMode="MultiLine"></asp:TextBox>
            <br />
            <asp:Label ID="Label23" runat="server" Text="2.下属：" CssClass="label1"></asp:Label>
            <br />
            <asp:TextBox ID="prbSubordinate" runat="server" CssClass="textbox1" TextMode="MultiLine"></asp:TextBox>
            <br />
            <asp:Label ID="Label24" runat="server" Text="3.同事：" CssClass="label1"></asp:Label>
            <br />
            <asp:TextBox ID="prbColleague" runat="server" CssClass="textbox1" TextMode="MultiLine"></asp:TextBox>
            <br />
            <asp:Label ID="Label25" runat="server" Text="4.服务对象：" CssClass="label1"></asp:Label>
            <br />
            <asp:TextBox ID="prbServices" runat="server" CssClass="textbox1" TextMode="MultiLine"></asp:TextBox>
            <br />
            <asp:Label ID="Label26" runat="server" Text="5.外部关系：" CssClass="label1"></asp:Label>
            <br />
            <asp:TextBox ID="prbRelations" runat="server" CssClass="textbox1" TextMode="MultiLine"></asp:TextBox>
            <br />
            <br />
            <asp:Label ID="Label27" runat="server" Text="(五)工作环境" Style="font-size: 17px; font-weight: 600;
                text-align: left;"></asp:Label>
            <br />
            <asp:TextBox ID="prbWorkEnter" runat="server" CssClass="textbox1" TextMode="MultiLine"></asp:TextBox>
            <br />
            <br />
            <asp:Label ID="Label28" runat="server" Text="(六)岗位考核" Style="font-size: 17px; font-weight: 600;
                text-align: left;"></asp:Label>
            <br />
            <asp:TextBox ID="prbPostAssess" runat="server" CssClass="textbox1" TextMode="MultiLine"></asp:TextBox>
            <br />
            <br />
            <asp:Label ID="Label29" runat="server" Text="(七)其他约定" Style="font-size: 17px; font-weight: 600;
                text-align: left;"></asp:Label>
            <br />
            <asp:TextBox ID="prbOthers" runat="server" CssClass="textbox1" TextMode="MultiLine"></asp:TextBox>
            <br />
            <br />
        </div>
    </div>
    <div class="Hidden">
        <input id="JsonData" type="hidden" runat="server" />
        <input id="Errors" type="hidden" runat="server" />
        <input id="Hidden1" type="hidden" runat="server" />
        <input id="UserID" type="hidden" runat="server" />
        <input id="UserName" type="hidden" runat="server" />
        <input id="Passed" type="hidden" runat="server" />
        <input id="prbWorkContentRequest" type="hidden" runat="server" />
        <input id="prbComment" type="hidden" runat="server" />
        <asp:Button ID="SearchEvaluated" runat="server" OnClick="Search" />
        <asp:Button ID="SubmitPost" runat="server" OnClick="SubmitPost_Click" />
        <asp:Button ID="SavePost" runat="server" OnClick="SavePost_Click" />
        <asp:Button ID="SearchPost" runat="server" Text="Button" OnClick="SearchPost_Click" />
    </div>
    </form>
</body>
</html>
