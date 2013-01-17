<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ManageStander.aspx.cs" Inherits="TJEvaluationSystem.Pages.SuperManagerPages.ManageStander" %>

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
    <script src="../../lib/ligerUI/js/plugins/ligerToolBar.js" type="text/javascript"></script>
    <script src="../../lib/ligerUI/js/plugins/ligerTextBox.js" type="text/javascript"></script>
    <script src="../../Script/commondata.js" type="text/javascript"></script>
    <script src="../../Script/managestanderlib.js" type="text/javascript"></script>
    <script src="../../Script/messagebox.js" type="text/javascript"></script>
    <script type="text/javascript">
        
    </script>
</head>
<body style="padding:6px; overflow:hidden;">
    <div class="l-loading" style="display:block" id="pageloading"></div> 
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
        <div id="StanderInfo">
            <div class="ToolBar">
                <table style="height:100%">
                    <tr>
                        <td style="padding:1px;"><input type="button" value="添加" id="add_button"  onclick="AddStander()" class="l-button" style="width:55px;height:22px;"/> </td>
                        <td style="width:30px;"></td>
                        <td style="padding:1px;"><input type="text" id="search_type"/></td>
                        <td style="padding:1px;"><input type="text" id="search_content" style="width:200px" /></td>
                        <td style="padding:1px;"><input type="button" value="查询" id="search_button"  onclick="Search()" class="l-button" style="width:55px;height:22px;"/> </td>
                    </tr>
                </table>
            </div>
            <div id="maingrid4" style="margin:0; padding:0"></div>
        </div>
        <div id="ShowDetailStanderInfo" class="Hidden" style="text-align:center" >
        <div class="ToolBar" style="height:30px">
            <div class="DetailData" style="vertical-align:middle; height:30px">
                <table style="height:100%">
                    <tr>
                        <td style="padding:1px;">
                            <div class="ShowData"><input type="button" value="编辑"  onclick="EditStander();" class="l-button" style="width:55px;"/></div>
                            <div class="EditData"><input type="button" value="提交"  onclick="UpdateStander();" class="l-button" style="width:55px;"/></div>
                        </td>
                        <td style="padding:1px;">
                            <div class="ShowData"><input type="button" value="删除"  onclick="DeleteStander();" class="l-button" style="width:55px;"/></div>
                            <div class="EditData"><input type="button" value="取消"  onclick="CancleStander();" class="l-button" style="width:55px;"/></div>
                        </td>
                        <td style="padding:1px;"><input type="button" value="返回"  onclick="BackToStanderList()" class="l-button" style="width:55px;"/> </td>
                    </tr>
                </table>
            </div>
            <div class="AddData" >
                <table style="height:100%">
                    <tr>
                        <td style="padding:1px;"><input type="button" value="添加"  onclick="AddNewStander();" class="l-button" style="width:55px;"/></td>
                        <td style="padding:1px;"><input type="button" value=" 重置"  onclick="ResetStander();" class="l-button" style="width:55px;"/></td>
                        <td style="padding:1px;"><input type="button" value="返回"  onclick="BackToStanderList()" class="l-button" style="width:55px;"/> </td>
                    </tr>
                </table>
            </div>
        </div>
        <div id="StanderDetail" style="border:3px solid #a3c0e8;width:500px;margin:0px auto;">
            <input id="standerID" type="hidden"/>
             <table >
             <tr>
                <td align="right" class="tableKey">库类型：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LLibType" runat="server" Text=""></asp:Label>
                    </div>
                    <div class="EditData">
                        <asp:TextBox ID="TBLibType" runat="server" ></asp:TextBox>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">指标类型：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LStanderType" runat="server" Text=""></asp:Label>
                    </div>
                    <div class="EditData">
                        <asp:TextBox ID="TBStanderType" runat="server" ></asp:TextBox>
                    </div>
                </td>
             </tr>
             <tr>
                <td align="right" class="tableKey">指标名称：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LName" runat="server" Text=""></asp:Label>
                    </div>
                    <div class="EditData">
                        <asp:TextBox ID="TBName" runat="server" ></asp:TextBox>
                    </div>
                </td>
             </tr>
             <tr>
                <td align="right" class="tableKey">指标描述：</td>
                <td align="left"></td>
             </tr>
             <tr>
                <td align="right" class="tableKey">优：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LContentA" runat="server" Text=""></asp:Label>
                    </div>
                    <div class="EditData">
                        <asp:TextBox ID="TBContentA" runat="server" TextMode="MultiLine" Width="250" Height="50"></asp:TextBox>
                    </div>
                </td>
             </tr>   
             <tr>
                <td align="right" class="tableKey">良：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LContentB" runat="server" Text=""></asp:Label>
                    </div>
                    <div class="EditData">
                        <asp:TextBox ID="TBContentB" runat="server" TextMode="MultiLine" Width="250" Height="50"></asp:TextBox>
                    </div>
                </td>
             </tr>
             <tr>
                <td align="right" class="tableKey">中：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LContentC" runat="server" Text=""></asp:Label>
                    </div>
                    <div class="EditData">
                        <asp:TextBox ID="TBContentC" runat="server" TextMode="MultiLine" Width="250" Height="50"></asp:TextBox>
                    </div>
                </td>
             </tr>
             <tr>
                <td align="right" class="tableKey">差：</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="LContentD" runat="server" Text=""></asp:Label>
                    </div>
                    <div class="EditData">
                        <asp:TextBox ID="TBContentD" runat="server" TextMode="MultiLine" Width="250" Height="50"></asp:TextBox>
                    </div>
                </td>
             </tr>
             </table>
        </div>
        </div>

        <div class="Hidden">
            <asp:UpdatePanel ID="UpdatePanel1" runat="server" >
            <ContentTemplate>
                <input id="JsonData" type="hidden" runat="server"/>
                <asp:Button ID="BUpdateStander" runat="server"
                    Text="Button" onclick="BUpdateStander_Click" />
                <asp:Button ID="BDeleteStander" runat="server" Text="Button" onclick="BDeleteStander_Click" />
                <asp:Button ID="BAddStander" runat="server" Text="Button" 
                    onclick="BAddStander_Click" /></ContentTemplate>
            </asp:UpdatePanel>
            <asp:Button ID="BRefrashPage" runat="server" Text="Button" 
                    onclick="BRefrashPage_Click"/>
        </div>
    </form>
</body>
</html>
