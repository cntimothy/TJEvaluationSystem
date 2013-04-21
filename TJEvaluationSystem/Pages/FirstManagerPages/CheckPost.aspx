<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CheckPost.aspx.cs" Inherits="TJEvaluationSystem.Pages.FirstManagerPages.CheckPost" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>审核岗位责任书</title>
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
    <script src="../../Script/FirstManager/CheckPost.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
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
                   <td style="padding:1px;"><input type="button" value="导出word" id="dao_button"  onclick="dao()" class="l-button" style="width:100px;height:25px;font-size:15px;display:none"/> </td>
                </tr>
         </table>
         </div>         
         <br />
         <asp:label id="name" runat="server" style="position:relative;left:20px;font-size:16px;"></asp:label>
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

    <div id="box"  class="Hidden">
             <p id="head" style="font-size:20px;font-weight:700;text-align:center"> 岗位责任书</p>
             <asp:Label ID="passYoN" runat="server" Text="" style="font-size:18px;font-weight:500;text-align:center;position:relative;left:480px"></asp:Label>
             <br /> <br />
             <div id="outline">
                <table style="position:relative;left:40px;">
                     <tr>
                     <td><asp:Label ID="Label1" runat="server" Text="一、岗位描述" style="font-size:18px;font-weight:600;text-align:left;"></asp:Label></td>
                     </tr>
                     
                     <tr style="height:20px">
                          <td style="font-size:16px;height:20px;width:auto"><asp:Label ID="Label2" runat="server" Text="1.用人单位："></asp:Label></td>
                          <td> <asp:TextBox ID="prbEmployer" runat="server"  CssClass="textbox2"  ReadOnly="true" ></asp:TextBox></td>                         
                     </tr>
                      <tr style="height:20px">
                          <td style="font-size:16px;height:20px"><asp:Label ID="Label5" runat="server" Text="2.用工单位："></asp:Label></td>
                          <td><asp:TextBox ID="prbLaborUnit" runat="server"  CssClass="textbox2"  ReadOnly="true" ></asp:TextBox></td>
                     </tr>
                      <tr style="height:20px">
                          <td style="font-size:16px;height:20px"><asp:Label ID="Label6" runat="server" Text="3.用工部门："></asp:Label></td>
                          <td><asp:TextBox ID="prbLaborDep" runat="server"  CssClass="textbox2" ReadOnly="true"  ></asp:TextBox></td>
                          
                     </tr>
                      <tr style="height:20px">
                          <td style="font-size:16px;height:20px"><asp:Label ID="Label7" runat="server" Text="4.岗位名称："></asp:Label></td>
                          <td> <asp:TextBox ID="prbPostName" runat="server"  CssClass="textbox2"  ReadOnly="true" ></asp:TextBox></td>
                     </tr>
                      <tr style="height:20px">
                          <td style="font-size:16px;height:20px"><asp:Label ID="Label8" runat="server" Text="5.岗位类别："></asp:Label></td>
                          <td> <asp:TextBox ID="prbPostType" runat="server"  CssClass="textbox2" ReadOnly="true"  ></asp:TextBox></td>     
                     </tr>
                    </table>
               </div >
               <br />
               <div id="response" style="position:relative;left:40px;">
                     <asp:Label ID="Label3" runat="server" Text="二、岗位职责" style="font-size:18px;font-weight:600;text-align:left;"></asp:Label>
                     <br />
                     <asp:Label ID="Label4" runat="server" Text="(一)任职条件" style="font-size:17px;font-weight:600;text-align:left;"></asp:Label>
                     <br />
                     <asp:Label ID="Label9" runat="server" Text="1.学历背景：" CssClass="label1" ></asp:Label>
                     <br />
                     <asp:TextBox ID="prbEduBg" runat="server"  CssClass="textbox1"  TextMode="MultiLine" ReadOnly="true" ></asp:TextBox>
                     <br />
                     <asp:Label ID="Label10" runat="server" Text="2.培训及资历："  CssClass="label1"></asp:Label>
                     <br />
                     <asp:TextBox ID="prbCertificate" runat="server" CssClass="textbox1"  TextMode="MultiLine" ReadOnly="true"></asp:TextBox>
                     <br />
                     <asp:Label ID="Label11" runat="server" Text="3.工作经验："   CssClass="label1"></asp:Label>
                     <br />
                     <asp:TextBox ID="prbExperience" runat="server" CssClass="textbox1"  TextMode="MultiLine" ReadOnly="true"></asp:TextBox>
                     <br />
                     <asp:Label ID="Label12" runat="server" Text="4.基本技能和素质：" CssClass="label1"></asp:Label>
                     <br />
                     <asp:TextBox ID="prbSkill" runat="server" CssClass="textbox1"  TextMode="MultiLine" ReadOnly="true"></asp:TextBox>
                     <br />
                     <asp:Label ID="Label13" runat="server" Text="5.个性特征："  CssClass="label1"></asp:Label>
                     <br />
                     <asp:TextBox ID="prbPersonality" runat="server" CssClass="textbox1"  TextMode="MultiLine" ReadOnly="true"></asp:TextBox>
                     <br />
                     <asp:Label ID="Label14" runat="server" Text="6.体质条件： " CssClass="label1" ></asp:Label>
                     <br />
                     <asp:TextBox ID="prbPhycond" runat="server" CssClass="textbox1"  TextMode="MultiLine" ReadOnly="true"></asp:TextBox>
                     <br />
                     <br />
                     <asp:Label ID="Label15" runat="server" Text="(二)工作内容、工作要求" style="font-size:17px;font-weight:600;text-align:left;"></asp:Label>
                     <br />
                     <asp:Label ID="Label16" runat="server" Text="1.岗位概述：" CssClass="label1"></asp:Label>
                     <br />
                     <asp:TextBox ID="prbWorkOutline" runat="server"  CssClass="textbox1"  TextMode="MultiLine"  ReadOnly="true" ></asp:TextBox>
                     <br />
                     <asp:Label ID="Label17" runat="server" Text="2.工作内容及工作要求："  CssClass="label1"></asp:Label>
                     <br />
                     <asp:TextBox ID="prbWorkContentRequest" runat="server" CssClass="textbox1"  TextMode="MultiLine"  ReadOnly="true" ></asp:TextBox>
                     <br /><br />
                     <asp:Label ID="Label18" runat="server" Text="(三)权责范围" style="font-size:17px;font-weight:600;text-align:left;"></asp:Label>
                     <br />
                     <asp:Label ID="Label19" runat="server" Text="1.权力：" CssClass="label1" ></asp:Label>
                     <br />
                     <asp:TextBox ID="prbPower" runat="server"  CssClass="textbox1"  TextMode="MultiLine"  ReadOnly="true" ></asp:TextBox>
                     <br />
                     <asp:Label ID="Label20" runat="server" Text="2.责任："  CssClass="label1"></asp:Label>
                     <br />
                     <asp:TextBox ID="prbResponse" runat="server" CssClass="textbox1"  TextMode="MultiLine"  ReadOnly="true" ></asp:TextBox>
                     <br /><br />
                     <asp:Label ID="Label21" runat="server" Text="(四)工作关系" style="font-size:17px;font-weight:600;text-align:left;"></asp:Label>
                     <br />
                     <asp:Label ID="Label22" runat="server" Text="1.直接领导：" CssClass="label1" ></asp:Label>
                     <br />
                     <asp:TextBox ID="prbDirectLeader" runat="server"  CssClass="textbox1"  TextMode="MultiLine"  ReadOnly="true" ></asp:TextBox>
                     <br />
                     <asp:Label ID="Label23" runat="server" Text="2.下属：" CssClass="label1" ></asp:Label>
                     <br />
                     <asp:TextBox ID="prbSubordinate" runat="server"  CssClass="textbox1"  TextMode="MultiLine"  ReadOnly="true" ></asp:TextBox>
                     <br />
                     <asp:Label ID="Label24" runat="server" Text="3.同事：" CssClass="label1" ></asp:Label>
                     <br />
                     <asp:TextBox ID="prbColleague" runat="server"  CssClass="textbox1"  TextMode="MultiLine"  ReadOnly="true" ></asp:TextBox>
                     <br />
                     <asp:Label ID="Label25" runat="server" Text="4.服务对象：" CssClass="label1" ></asp:Label>
                     <br />
                     <asp:TextBox ID="prbServices" runat="server"  CssClass="textbox1"  TextMode="MultiLine"  ReadOnly="true" ></asp:TextBox>
                     <br />
                     <asp:Label ID="Label26" runat="server" Text="5.外部关系：" CssClass="label1" ></asp:Label>
                     <br />
                     <asp:TextBox ID="prbRelations" runat="server"  CssClass="textbox1"  TextMode="MultiLine"  ReadOnly="true" ></asp:TextBox>
                     <br /><br />
                     <asp:Label ID="Label27" runat="server" Text="(五)工作环境" style="font-size:17px;font-weight:600;text-align:left;"></asp:Label>
                     <br />
                     <asp:TextBox ID="prbWorkEnter" runat="server"  CssClass="textbox1" TextMode="MultiLine"  ReadOnly="true" ></asp:TextBox>
                     <br /><br />
                     <asp:Label ID="Label28" runat="server" Text="(六)岗位考核" style="font-size:17px;font-weight:600;text-align:left;"></asp:Label>
                     <br />
                     <asp:TextBox ID="prbPostAssess" runat="server"  CssClass="textbox1"  TextMode="MultiLine"  ReadOnly="true" ></asp:TextBox>
                     <br /><br />
                     <asp:Label ID="Label29" runat="server" Text="(七)其他约定" style="font-size:17px;font-weight:600;text-align:left;"></asp:Label>
                     <br />
                     <asp:TextBox ID="prbOthers" runat="server"  CssClass="textbox1"  TextMode="MultiLine"  ReadOnly="true" ></asp:TextBox>
                     <br /><br />  
               </div>
    </div>
         <div class="Hidden">
            <input id="JsonData" type="hidden" runat="server"/>
            <input id="Errors" type="hidden" runat="server"/>
            <input id="UserID" type="hidden" runat="server"/>
            <input id="Passed" type="hidden" runat="server"/>
            <input id="prbWorkContentRequestTemp" type="hidden" runat="server" />
             <asp:Button ID="Search" runat="server" Text="Button" onclick="Search_Click" style="display:none"/>
             <asp:Button ID="SearchPost" runat="server" Text="Button" onclick="SearchPost_Click" />  
             <asp:Button ID="Pass" runat="server" Text="Button" onclick="Submit_Click" style="display:none" />
             <asp:Button ID="SendBack" runat="server" Text="Button" onclick="SendBack_Click" style="display:none" />
             <asp:Button ID="Dao" runat="server" Text="Button" onclick="Dao_Click" style="display:none" />
    </div>
    </form>
</body>
</html>
