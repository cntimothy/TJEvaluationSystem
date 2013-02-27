<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="InBox.aspx.cs" Inherits="TJEvaluationSystem.Pages.MessagePages.InBox" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>收件箱</title>
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
    <script src="../../Script/Message/InBox.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server"/>
    <div class="ToolBar">
         <table style="position:relative;left:20px;height:100%">
                <tr> 
                    <td style="padding:1px;"><input type="button" value="未读" id="unread_button"  onclick="searchUnRead()" class="l-button" style="width:100px;height:25px;font-size:15px"/></td>
                    <td style="width:10px;"></td>
                    <td style="padding:1px;"><input type="button" value="全部" id="all_button"  onclick="searchAll()" class="l-button" style="width:100px;height:25px;font-size:15px"/></td>
                    <td style="width:10px;"></td>
                </tr>
         </table>
     </div>

     <br /><br />
     <div id="Messagegrid" style="margin:0 auto" ></div> 

      <div id="ShowDetailMessage" class="Hidden" style="text-align:center" >
          <div class="DetailMessage" style="border:3px solid #a3c0e8;width:500px;margin:0px auto;">
            <table>
            <tr>
                <td align="right" class="tableKey">发送时间:</td>
                <td align="left" class="tableValue">
                    <div class="DetailData">
                        <asp:Label ID="mSendTime" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">发信人:</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="mSenderId" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">标题:</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="mTitle" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right" class="tableKey">内容:</td>
                <td align="left" class="tableValue">
                    <div class="ShowData">
                        <asp:Label ID="mMessage" runat="server" Text=""></asp:Label>
                    </div>
                </td>
            </tr> 
            <tr>
                <td align="center" class="tableValue">
                    <div class="ShowData">
                        <asp:LinkButton ID="GoBack" runat="server" OnClick="GoBack_Click">返回</asp:LinkButton>
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
             <input id="JsonData" type="hidden" runat="server"/>
             <input id="UserID" type="hidden" runat="server"/>
             <input id="JsonList" type="hidden" runat="server"/>
             <input id="Errors" type="hidden" runat="server"/>
             <input id="ReadMsgId" type="hidden" runat="server" />
             <asp:Button ID="SearchUnRead" runat="server" Text="Button" onclick="SearchUnRead_Click" style="display:none" />
             <asp:Button ID="SearchAll" runat="server" Text="Button" onclick="SearchAll_Click" style="display:none" />
    </div>
    </form>
    <asp:Label ID="ErrorList" runat="server" Text=""></asp:Label>
</body>
</html>
