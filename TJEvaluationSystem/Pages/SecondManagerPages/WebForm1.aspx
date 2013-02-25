<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="TJEvaluationSystem.Pages.SecondManagerPages.WebForm1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../../lib/jquery/jquery-1.3.2.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        function test() {
            $('#TBKeyResponseContent').val('test');
            $('#LKeyResponse1Name').html('test');
            var t = $('#TBKeyResponseContent').val();
            alert(t);
        }
    </script>
    <style type="text/css">
    .my_table
    {
    	border: 1px solid #a3c0e8;  
        padding:0;   
        margin:0 auto;  
        border-collapse: collapse;
    }
    .my_table td
    {
    	border: 1px solid #a3c0e8;  
        font-size:12px;  
        padding: 3px 3px 3px 3px;
    }
    .my_table table
    {
        border-top-width: 0px;
        border-right-width: 0px;
        border-bottom-width: 0px;
        border-left-width: 0px;

     }
    .num
    {
    	width:30px;
        text-align:center;
        background-color:#e8ebee;
    }
    .stander_type
    {
    	 width:60px;
         background-color:#e8ebee;   
    }
    .contain_table
    {
    	border:none;
    	padding:0px;
    }
    .key_stander_type
    {
    	width:60px;
        background-color:#e8ebee;  
    }
    .stander_name
    {
    	width:100px;
        text-align:center;
    }
    .stander_name_big
    {
    	width:166px;
        text-align:center;
    }
    .stander_content
    {
    	height:50px;
    }
    .veto_stander_content
    {
    	width:421px;
    	height:50px;
    }
    .score_type
    {
    	 width:100px;
    	 height:20px;
         text-align:center; 
    }
    .fun
    {
    	width:60px;
        background-color:#eaf2fe;
        margin:0px auto;
        text-align:center;
    }
    .stander_name_edit
    {
    	width:100px;
    	height:65px;
        text-align:center;
        background-color:#eaf2fe;
        color:Red;
    }
    .stander_name_big_edit
    {
    	width:160px;
    	height:65px;
        text-align:center;
        background-color:#eaf2fe;
        color:Red;
    }
    .stander_content_edit
    {
    	
    	height:65px;
        text-align:center;
        background-color:#eaf2fe;
        color:Red;
    }
    .weight
    {
    	width:60px;
        margin:0px auto;
        text-align:center;
        border-left:none;
    }
    .input_textbox
    {
    	width:95%;
    }
    .input_textarea
    {
    	width:95%;
    	height:40px;
    }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <div id="EvaluatorTable">
            &#39;<table id="MainTable" class="my_table">
               <tr id="KeyStander">
                    <td class="num">一</td>
                    <td class="stander_type">关键绩效指标</td>
                    <td style="border:none;padding:0px">
                        <table class="my_table" frame="void"> 
                            <tr>
                                <%--关键岗位职责--%>
                                <td class="key_stander_type" style="border-top:none;border-left:none">关键岗位职责指标</td>
                                <td style="border:none;padding:0px">
                                    <table class="my_table" frame="void">
                                        <tr id="KeyResponse1" class="ViewTable">
                                            <td class="stander_name" style="border-top:none;border-left:none;">
                                                    <div class="ShowKeyResponse1">
                                                    <label id="LKeyResponse1Name"></label>
                                                </div>
                                                <div class="EditKeyResponse1"><asp:TextBox ID="TBKeyResponse1Name" runat="server" Width="95%"></asp:TextBox></div>
                                            </td>
                                            <td style="border-top:none;padding:0px">
                                                <table class="my_table"  frame="void">
                                                    <tr>
                                                        <td colspan="4" class="stander_content" style="border-top:none;border-left:none;border-right:none;">
                                                            <div class="ShowKeyResponse1"><asp:Label ID="LKeyResponse1Content" runat="server"></asp:Label></div>
                                                            <div class="EditKeyResponse1"><asp:TextBox ID="TBKeyResponse1Content" runat="server" Width="98%"></asp:TextBox></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="score_type" style="border-left:none;border-bottom:none;">优（9~10）</td>
                                                        <td class="score_type" style="border-bottom:none;">良（7~8）</td>
                                                        <td class="score_type" style="border-bottom:none;">中（4~6）</td>
                                                        <td class="score_type" style="border-bottom:none;border-right:none;">差（0~3）</td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td class="fun" style="border-top:none;border-right:none;">
                                                <div class="ShowKeyResponse1">
                                                    <input type="button" value="编辑" onclick="EditKeyResponse1()" class="l-button" style="width:60px;height:20px;"/>
                                                    <input type="button" value="删除" onclick="DeleteKeyResponse1()" class="l-button" style="width:60px;height:20px;"/>
                                                </div>
                                                <div class="EditKeyResponse1">
                                                    <input type="button" value="完成" onclick="EndEditKeyResponse1()" class="l-button" style="width:60px;height:20px;"/>
                                                    <input type="button" value="取消" onclick="CancelEditKeyResponse1()" class="l-button" style="width:60px;height:20px;"/>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr id="KeyResponse2" class="ViewTable">
                                            <td class="stander_name" style="border-top:none;border-left:none;">
                                                <div class="ShowKeyResponse2"><asp:Label ID="LKeyResponse2Name" runat="server" ></asp:Label></div>
                                                <div class="EditKeyResponse2"><asp:TextBox ID="TBKeyResponse2Name" runat="server" Width="95%"></asp:TextBox></div>
                                            </td>
                                            <td style="border-top:none;padding:0px">
                                                <table class="my_table"  frame="void">
                                                    <tr>
                                                        <td colspan="4" class="stander_content" style="border-left:none;border-right:none;border-top:none;">
                                                            <div class="ShowKeyResponse2"><asp:Label ID="LKeyResponse2Content" runat="server"></asp:Label></div>
                                                            <div class="EditKeyResponse2"><asp:TextBox ID="TBKeyResponse2Content" runat="server" Width="98%"></asp:TextBox></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="score_type" style="border-left:none;border-bottom:none;">优（9~10）</td>
                                                        <td class="score_type" style="border-bottom:none;">良（7~8）</td>
                                                        <td class="score_type" style="border-bottom:none;">中（4~6）</td>
                                                        <td class="score_type" style="border-bottom:none;border-right:none;">差（0~3）</td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td class="fun" style="border-top:none;border-right:none;">
                                                <div class="ShowKeyResponse2">
                                                    <input type="button" value="编辑" onclick="EditKeyResponse2()" class="l-button" style="width:60px;height:20px;"/>
                                                    <input type="button" value="删除" onclick="DeleteKeyResponse2()" class="l-button" style="width:60px;height:20px;"/>
                                                </div>
                                                <div class="EditKeyResponse2">
                                                    <input type="button" value="完成" onclick="EndEditKeyResponse2()" class="l-button" style="width:60px;height:20px;"/>
                                                    <input type="button" value="取消" onclick="CancelEditKeyResponse2()" class="l-button" style="width:60px;height:20px;"/>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr id="KeyResponse3" class="ViewTable">
                                            <td class="stander_name" style="border-top:none;border-left:none;">
                                                <div class="ShowKeyResponse3"><asp:Label ID="LKeyResponse3Name" runat="server" ></asp:Label></div>
                                                <div class="EditKeyResponse3"><asp:TextBox ID="TBKeyResponse3Name" runat="server" Width="95%"></asp:TextBox></div>
                                            </td>
                                            <td style="border-top:none;padding:0px">
                                                <table class="my_table"  frame="void">
                                                    <tr>
                                                        <td colspan="4" class="stander_content" style="border-left:none;border-right:none;border-top:none;">
                                                            <div class="ShowKeyResponse3"><asp:Label ID="LKeyResponse3Content" runat="server"></asp:Label></div>
                                                            <div class="EditKeyResponse3"><asp:TextBox ID="TBKeyResponse3Content" runat="server" Width="98%"></asp:TextBox></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="score_type" style="border-left:none;border-bottom:none;">优（9~10）</td>
                                                        <td class="score_type" style="border-bottom:none;">良（7~8）</td>
                                                        <td class="score_type" style="border-bottom:none;">中（4~6）</td>
                                                        <td class="score_type" style="border-bottom:none;border-right:none;">差（0~3）</td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td class="fun" style="border-top:none;border-right:none;">
                                                <div class="ShowKeyResponse3">
                                                    <input type="button" value="编辑" onclick="EditKeyResponse3()" class="l-button" style="width:60px;height:20px;"/>
                                                    <input type="button" value="删除" onclick="DeleteKeyResponse3()" class="l-button" style="width:60px;height:20px;"/>
                                                </div>
                                                <div class="EditKeyResponse3">
                                                    <input type="button" value="完成" onclick="EndEditKeyResponse3()" class="l-button" style="width:60px;height:20px;"/>
                                                    <input type="button" value="取消" onclick="CancelEditKeyResponse3()" class="l-button" style="width:60px;height:20px;"/>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr id="KeyResponse" class="EditTable" style="height:0px">
                                            <td class="stander_name_edit" style="border-top:none;border-bottom:none;border-left:none">
                                                岗位内容：<br/>
                                                <input type="text" id="TBKeyResponseName" class="input_textbox" />
                                                
                                            </td>
                                            <td class="stander_content_edit" style="border-top:none;border-bottom:none;">
                                                岗位要求:<br/>
                                                <textarea id="TBKeyResponseContent" class="input_textarea"></textarea>
                                                
                                            </td>
                                            <td class="fun" style="border-top:none;border-bottom:none;border-right:none">
                                                <input type="button" value="添加" onclick="AddKeyResponse()" class="l-button" style="width:60px;height:22px;"/>
                                            </td>
                                        </tr>
                                        
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <%--关键岗位胜任能力指标--%>
                                <td class="key_stander_type" style="border-top:none;border-left:none">关键岗位胜任能力指标</td>
                                <td style="border-left:none;border-right:none;padding:0px">
                                    <table  class="my_table" frame="void">
                                        <tr id="KeyAbility1" class="ViewTable">
                                            <td class="stander_name" style="border-top:none;border-left:none;">
                                                <input type="hidden" id="KeyAbility1Num"/>
                                                <asp:Label ID="LKeyAbility1Name" runat="server" ></asp:Label>
                                            </td>
                                            <td style="border-top:none;padding:0px">
                                                <table class="my_table"  frame="void">
                                                    <tr>
                                                        <td class="stander_content" style="border-top:none;border-left:none;">
                                                            <asp:Label ID="LKeyAbility1ContentA" runat="server" ></asp:Label>
                                                        </td>
                                                        <td class="stander_content" style="border-top:none;">
                                                            <asp:Label ID="LKeyAbility1ContentB" runat="server" ></asp:Label>
                                                        </td>
                                                        <td class="stander_content" style="border-top:none;">
                                                            <asp:Label ID="LKeyAbility1ContentC" runat="server" ></asp:Label>
                                                        </td>
                                                        <td class="stander_content" style="border-top:none;border-right:none;">
                                                            <asp:Label ID="LKeyAbility1ContentD" runat="server" ></asp:Label>
                                                        </td>
                                                    </tr>
                                                   <tr>
                                                        <td class="score_type" style="border-left:none;border-bottom:none;width:100px;">优（9~10）</td>
                                                        <td class="score_type" style="border-bottom:none;width:100px;">良（7~8）</td>
                                                        <td class="score_type" style="border-bottom:none;width:100px;">中（4~6）</td>
                                                        <td class="score_type" style="border-bottom:none;border-right:none;width:100px;">差（0~3）</td>
                                                    </tr>
                                                    
                                                </table>
                                            </td>
                                            <td class="fun" style="border-top:none;border-right:none;">
                                                <input type="button" value="重新选择" onclick="SelectStander('KeyAbility1')" class="l-button" style="width:60px;height:20px;"/>
                                                <input type="button" value="删除" onclick="DeleteKeyAbility1()" class="l-button" style="width:60px;height:20px;"/>
                                            </td>
                                        </tr>
                                        <tr id="KeyAbility2" class="ViewTable">
                                            <td class="stander_name" style="border-left:none;border-top:none;">
                                                <input type="hidden" id="KeyAbility2Num"/>
                                                <asp:Label ID="LKeyAbility2Name" runat="server" ></asp:Label>
                                            </td>
                                            <td style="border-top:none;padding:0px">
                                                <table class="my_table"  frame="void">
                                                    <tr>
                                                        <td class="stander_content" style="border-top:none;border-left:none;">
                                                            <asp:Label ID="LKeyAbility2ContentA" runat="server" ></asp:Label>
                                                        </td>
                                                        <td class="stander_content" style="border-top:none;">
                                                            <asp:Label ID="LKeyAbility2ContentB" runat="server" ></asp:Label>
                                                        </td>
                                                        <td class="stander_content" style="border-top:none;">
                                                            <asp:Label ID="LKeyAbility2ContentC" runat="server" ></asp:Label>
                                                        </td>
                                                        <td class="stander_content" style="border-top:none;border-right:none;">
                                                            <asp:Label ID="LKeyAbility2ContentD" runat="server" ></asp:Label>
                                                        </td>
                                                    </tr>
                                                   <tr>
                                                        <td class="score_type" style="border-left:none;border-bottom:none;width:100px;">优（9~10）</td>
                                                        <td class="score_type" style="border-bottom:none;width:100px;">良（7~8）</td>
                                                        <td class="score_type" style="border-bottom:none;width:100px;">中（4~6）</td>
                                                        <td class="score_type" style="border-bottom:none;border-right:none;width:100px;">差（0~3）</td>
                                                    </tr>
                                                    
                                                </table>
                                            </td>
                                            <td class="fun" style="border-top:none;border-right:none;">
                                                <input type="button" value="重新选择" onclick="SelectStander('KeyAbility2')" class="l-button" style="width:60px;height:20px;"/>
                                                <input type="button" value="删除" onclick="DeleteKeyAbility2()" class="l-button" style="width:60px;height:20px;"/>
                                            </td>
                                        </tr>
                                        <tr id="KeyAbility3" class="ViewTable">
                                            <td class="stander_name" style="border-left:none;border-top:none;">
                                                <input type="hidden" id="KeyAbility3Num"/>
                                                <asp:Label ID="LKeyAbility3Name" runat="server" ></asp:Label>
                                            </td>
                                            <td style="border-top:none;padding:0px">
                                                <table class="my_table"  frame="void">
                                                    <tr>
                                                        <td class="stander_content" style="border-top:none;border-left:none;">
                                                            <asp:Label ID="LKeyAbility3ContentA" runat="server" ></asp:Label>
                                                        </td>
                                                        <td class="stander_content" style="border-top:none;">
                                                            <asp:Label ID="LKeyAbility3ContentB" runat="server" ></asp:Label>
                                                        </td>
                                                        <td class="stander_content" style="border-top:none;">
                                                            <asp:Label ID="LKeyAbility3ContentC" runat="server" ></asp:Label>
                                                        </td>
                                                        <td class="stander_content" style="border-top:none;border-right:none;">
                                                            <asp:Label ID="LKeyAbility3ContentD" runat="server" ></asp:Label>
                                                        </td>
                                                    </tr>
                                                   <tr>
                                                        <td class="score_type" style="border-left:none;border-bottom:none;width:100px;">优（9~10）</td>
                                                        <td class="score_type" style="border-bottom:none;width:100px;">良（7~8）</td>
                                                        <td class="score_type" style="border-bottom:none;width:100px;">中（4~6）</td>
                                                        <td class="score_type" style="border-bottom:none;border-right:none;width:100px;">差（0~3）</td>
                                                    </tr>
                                                    
                                                </table>
                                            </td>
                                            <td class="fun" style="border-top:none;border-right:none;">
                                                <input type="button" value="重新选择" onclick="SelectStander('KeyAbility3')" class="l-button" style="width:60px;height:20px;"/>
                                                <input type="button" value="删除" onclick="DeleteKeyAbility3()" class="l-button" style="width:60px;height:20px;"/>
                                            </td>
                                        </tr>
                                        <tr id="KeyAbility" class="EditTable">
                                            <td class="stander_name_edit" style="border-left:none;border-top:none;border-bottom:none;">
                                                <input type="hidden" id="KeyAbilityNum"/>
                                                <asp:Label ID="LKeyAbilityName" runat="server" Text="请选择指标" ></asp:Label>
                                            </td>
                                            <td style="border-top:none;border-bottom:none;padding:0px">
                                                <table class="my_table"  frame="void">
                                                    <tr>
                                                        <td class="stander_content_edit" style="border-top:none;border-left:none;">
                                                            <asp:Label ID="LKeyAbilityContentA" runat="server" ></asp:Label>
                                                        </td>
                                                        <td class="stander_content_edit" style="border-top:none;">
                                                            <asp:Label ID="LKeyAbilityContentB" runat="server" ></asp:Label>
                                                        </td>
                                                        <td class="stander_content_edit" style="border-top:none;">
                                                            <asp:Label ID="LKeyAbilityContentC" runat="server" ></asp:Label>
                                                        </td>
                                                        <td class="stander_content_edit" style="border-top:none;border-right:none;">
                                                            <asp:Label ID="LKeyAbilityContentD" runat="server" ></asp:Label>
                                                        </td>
                                                    </tr>
                                                   <tr>
                                                        <td class="score_type" style="border-left:none;border-bottom:none;width:100px;">优（9~10）</td>
                                                        <td class="score_type" style="border-bottom:none;width:100px;">良（7~8）</td>
                                                        <td class="score_type" style="border-bottom:none;width:100px;">中（4~6）</td>
                                                        <td class="score_type" style="border-bottom:none;border-right:none;width:100px;">差（0~3）</td>
                                                    </tr>
                                                    
                                                </table>
                                            </td>
                                            <td class="fun" style="border:none;">
                                                <input type="button" value="选择指标" onclick="SelectStander('KeyAbility')" class="l-button" style="width:60px;height:20px;"/>
                                                <input type="button" value="添加" onclick="AddKeyAbility()" class="l-button" style="width:60px;height:20px;"/>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <%--关键工作态度指标--%>
                                <td class="key_stander_type" style="border-top:none;border-bottom:none;border-left:none">关键工作态度指标</td>
                                <td style="border-left:none;border-right:none;border-bottom:none;padding:0px">
                                    <table  class="my_table" frame="void">
                                        <tr id="KeyAttitude1" class="ViewTable">
                                            <td class="stander_name" style="border-top:none;border-left:none;">
                                                <input type="hidden" id="KeyAttitude1Num"/>
                                                <asp:Label ID="LKeyAttitude1Name" runat="server" ></asp:Label>
                                            </td>
                                            <td style="border-top:none;padding:0px">
                                                <table class="my_table"  frame="void">
                                                    <tr>
                                                        <td class="stander_content" style="border-top:none;border-left:none;">
                                                            <asp:Label ID="LKeyAttitude1ContentA" runat="server" ></asp:Label>
                                                        </td>
                                                        <td class="stander_content" style="border-top:none;">
                                                            <asp:Label ID="LKeyAttitude1ContentB" runat="server" ></asp:Label>
                                                        </td>
                                                        <td class="stander_content" style="border-top:none;">
                                                            <asp:Label ID="LKeyAttitude1ContentC" runat="server" ></asp:Label>
                                                        </td>
                                                        <td class="stander_content" style="border-top:none;border-right:none;">
                                                            <asp:Label ID="LKeyAttitude1ContentD" runat="server" ></asp:Label>
                                                        </td>
                                                    </tr>
                                                   <tr>
                                                        <td class="score_type" style="border-left:none;border-bottom:none;width:100px;">优（9~10）</td>
                                                        <td class="score_type" style="border-bottom:none;width:100px;">良（7~8）</td>
                                                        <td class="score_type" style="border-bottom:none;width:100px;">中（4~6）</td>
                                                        <td class="score_type" style="border-bottom:none;border-right:none;width:100px;">差（0~3）</td>
                                                    </tr>
                                                    
                                                </table>
                                            </td>
                                            <td class="fun" style="border-top:none;border-right:none;">
                                                <input type="button" value="重新选择" onclick="SelectStander('KeyAttitude1')" class="l-button" style="width:60px;height:20px;"/>
                                                <input type="button" value="删除" onclick="DeleteKeyAttitude1()" class="l-button" style="width:60px;height:20px;"/>
                                            </td>
                                        </tr>
                                        <tr id="KeyAttitude2" class="ViewTable">
                                            <td class="stander_name" style="border-left:none;border-top:none;">
                                                <input type="hidden" id="KeyAttitude2Num"/>
                                                <asp:Label ID="LKeyAttitude2Name" runat="server" ></asp:Label>
                                            </td>
                                            <td style="border-top:none;padding:0px">
                                                <table class="my_table"  frame="void">
                                                    <tr>
                                                        <td class="stander_content" style="border-top:none;border-left:none;">
                                                            <asp:Label ID="LKeyAttitude2ContentA" runat="server" ></asp:Label>
                                                        </td>
                                                        <td class="stander_content" style="border-top:none;">
                                                            <asp:Label ID="LKeyAttitude2ContentB" runat="server" ></asp:Label>
                                                        </td>
                                                        <td class="stander_content" style="border-top:none;">
                                                            <asp:Label ID="LKeyAttitude2ContentC" runat="server" ></asp:Label>
                                                        </td>
                                                        <td class="stander_content" style="border-top:none;border-right:none;">
                                                            <asp:Label ID="LKeyAttitude2ContentD" runat="server" ></asp:Label>
                                                        </td>
                                                    </tr>
                                                   <tr>
                                                        <td class="score_type" style="border-left:none;border-bottom:none;width:100px;">优（9~10）</td>
                                                        <td class="score_type" style="border-bottom:none;width:100px;">良（7~8）</td>
                                                        <td class="score_type" style="border-bottom:none;width:100px;">中（4~6）</td>
                                                        <td class="score_type" style="border-bottom:none;border-right:none;width:100px;">差（0~3）</td>
                                                    </tr>
                                                    
                                                </table>
                                            </td>
                                            <td class="fun" style="border-top:none;border-right:none;">
                                                <input type="button" value="重新选择" onclick="SelectStander('KeyAttitude2')" class="l-button" style="width:60px;height:20px;"/>
                                                <input type="button" value="删除" onclick="DeleteKeyAttitude2()" class="l-button" style="width:60px;height:20px;"/>
                                            </td>
                                        </tr>
                                        <tr id="KeyAttitude3" class="ViewTable">
                                            <td class="stander_name" style="border-left:none;border-top:none;">
                                                <input type="hidden" id="KeyAttitude3Num"/>
                                                <asp:Label ID="LKeyAttitude3Name" runat="server" ></asp:Label>
                                            </td>
                                            <td style="border-top:none;padding:0px">
                                                <table class="my_table"  frame="void">
                                                    <tr>
                                                        <td class="stander_content" style="border-top:none;border-left:none;">
                                                            <asp:Label ID="LKeyAttitude3ContentA" runat="server" ></asp:Label>
                                                        </td>
                                                        <td class="stander_content" style="border-top:none;">
                                                            <asp:Label ID="LKeyAttitude3ContentB" runat="server" ></asp:Label>
                                                        </td>
                                                        <td class="stander_content" style="border-top:none;">
                                                            <asp:Label ID="LKeyAttitude3ContentC" runat="server" ></asp:Label>
                                                        </td>
                                                        <td class="stander_content" style="border-top:none;border-right:none;">
                                                            <asp:Label ID="LKeyAttitude3ContentD" runat="server" ></asp:Label>
                                                        </td>
                                                    </tr>
                                                   <tr>
                                                        <td class="score_type" style="border-left:none;border-bottom:none;width:100px;">优（9~10）</td>
                                                        <td class="score_type" style="border-bottom:none;width:100px;">良（7~8）</td>
                                                        <td class="score_type" style="border-bottom:none;width:100px;">中（4~6）</td>
                                                        <td class="score_type" style="border-bottom:none;border-right:none;width:100px;">差（0~3）</td>
                                                    </tr>
                                                    
                                                </table>
                                            </td>
                                            <td class="fun" style="border-top:none;border-right:none;">
                                                <input type="button" value="重新选择" onclick="SelectStander('KeyAttitude3')" class="l-button" style="width:60px;height:20px;"/>
                                                <input type="button" value="删除" onclick="DeleteKeyAttitude3()" class="l-button" style="width:60px;height:20px;"/>
                                            </td>
                                        </tr>
                                        <tr id="KeyAttitude" class="EditTable">
                                            <td class="stander_name_edit" style="border-left:none;border-top:none;border-bottom:none;">
                                                <input type="hidden" id="KeyAttitudeNum"/>
                                                <asp:Label ID="LKeyAttitudeName" runat="server" Text="请选择指标" ></asp:Label>
                                            </td>
                                            <td style="border-top:none;border-bottom:none;padding:0px">
                                                <table class="my_table"  frame="void">
                                                    <tr>
                                                        <td class="stander_content_edit" style="border-top:none;border-left:none;">
                                                            <asp:Label ID="LKeyAttitudeContentA" runat="server" ></asp:Label>
                                                        </td>
                                                        <td class="stander_content_edit" style="border-top:none;">
                                                            <asp:Label ID="LKeyAttitudeContentB" runat="server" ></asp:Label>
                                                        </td>
                                                        <td class="stander_content_edit" style="border-top:none;">
                                                            <asp:Label ID="LKeyAttitudeContentC" runat="server" ></asp:Label>
                                                        </td>
                                                        <td class="stander_content_edit" style="border-top:none;border-right:none;">
                                                            <asp:Label ID="LKeyAttitudeContentD" runat="server" ></asp:Label>
                                                        </td>
                                                    </tr>
                                                   <tr>
                                                        <td class="score_type" style="border-left:none;border-bottom:none;width:100px;">优（9~10）</td>
                                                        <td class="score_type" style="border-bottom:none;width:100px;">良（7~8）</td>
                                                        <td class="score_type" style="border-bottom:none;width:100px;">中（4~6）</td>
                                                        <td class="score_type" style="border-bottom:none;border-right:none;width:100px;">差（0~3）</td>
                                                    </tr>
                                                    
                                                </table>
                                            </td>
                                            <td class="fun" style="border:none;">
                                                <input type="button" value="选择指标" onclick="SelectStander('KeyAttitude')" class="l-button" style="width:60px;height:20px;"/>
                                                <input type="button" value="添加" onclick="AddKeyAttitude()" class="l-button" style="width:60px;height:20px;"/>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td class="weight">
                        <div class="EditTable" style="color:Red;">
                             权重:<br/><input type="text" id="KeyWeightEdit" style="width:20px;" />
                        </div>
                       <div class="ViewTable">
                            <asp:Label ID="KeyWeightView" runat="server" ></asp:Label>%
                       </div>
                    </td>
               </tr>
               <tr id="ResponseStnder">
                    <td class="num">二</td>
                    <td class="stander_type">岗位职责指标</td>
                    <td style="padding:0px">
                        <table class="my_table" frame="void"> 
                            <tr id="Response1" class="ViewTable">
                                <td class="stander_name_big" style="border-top:none;border-left:none;">
                                    <div class="ShowResponse1"><asp:Label ID="LResponse1Name" runat="server"></asp:Label></div>
                                    <div class="EditResponse1"><asp:TextBox ID="TBResponse1Name" runat="server" Width="95%"></asp:TextBox></div>
                                </td>
                                <td style="border-top:none;padding:0px">
                                    <table class="my_table" frame="void">
                                        <tr>
                                            <td colspan="4" class="stander_content" style="border-top:none;border-left:none;border-right:none;">
                                                <div class="ShowResponse1"><asp:Label ID="LResponse1Content" runat="server"></asp:Label></div>
                                                <div class="EditResponse1"><asp:TextBox ID="TBResponse1Content" runat="server" Width="98%"></asp:TextBox></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="score_type" style="border-bottom:none;border-left:none;">优（9~10）</td>
                                            <td class="score_type" style="border-bottom:none;">良（7~8）</td>
                                            <td class="score_type" style="border-bottom:none;">中（4~6）</td>
                                            <td class="score_type" style="border-bottom:none;border-right:none;">差（0~3）</td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="fun" style="border-top:none;border-right:none;">
                                    <div class="ShowResponse1">
                                        <input type="button" value="编辑" onclick="EditResponse1()" class="l-button" style="width:60px;height:20px;"/>
                                        <input type="button" value="删除" onclick="DeleteResponse1()" class="l-button" style="width:60px;height:20px;"/>
                                    </div>
                                    <div class="EditResponse1">
                                        <input type="button" value="完成" onclick="EndEditResponse1()" class="l-button" style="width:60px;height:20px;"/>
                                        <input type="button" value="取消" onclick="CancelEditResponse1();" class="l-button" style="width:60px;height:20px;"/>
                                    </div>
                                </td>
                            </tr>
                            <tr id="Response2" class="ViewTable">
                                <td class="stander_name_big" style="border-top:none;border-left:none;">
                                    <div class="ShowResponse2"><asp:Label ID="LResponse2Name" runat="server" ></asp:Label></div>
                                    <div class="EditResponse2"><asp:TextBox ID="TBResponse2Name" runat="server" Width="95%"></asp:TextBox></div>
                                </td>
                                <td style="border-top:none;padding:0px">
                                    <table class="my_table" frame="void">
                                        <tr>
                                            <td colspan="4" class="stander_content" style="border-top:none;border-left:none;border-right:none;">
                                                <div class="ShowResponse2"><asp:Label ID="LResponse2Content" runat="server" Text="Label"></asp:Label></div>
                                                <div class="EditResponse2"><asp:TextBox ID="TBResponse2Content" runat="server" Width="98%"></asp:TextBox></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="score_type" style="border-bottom:none;border-left:none;">优（9~10）</td>
                                            <td class="score_type" style="border-bottom:none;">良（7~8）</td>
                                            <td class="score_type" style="border-bottom:none;">中（4~6）</td>
                                            <td class="score_type" style="border-bottom:none;border-right:none;">差（0~3）</td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="fun" style="border-top:none;border-right:none;">
                                    <div class="ShowResponse2">
                                        <input type="button" value="编辑" onclick="EditResponse2()" class="l-button" style="width:60px;height:20px;"/>
                                        <input type="button" value="删除" onclick="DeleteResponse2()" class="l-button" style="width:60px;height:20px;"/>
                                    </div>
                                    <div class="EditResponse2">
                                        <input type="button" value="完成" onclick="EndEditResponse2()" class="l-button" style="width:60px;height:20px;"/>
                                        <input type="button" value="取消" onclick="CancelEditResponse2()" class="l-button" style="width:60px;height:20px;"/>
                                    </div>
                                </td>
                            </tr>
                            <tr id="Response3" class="ViewTable">
                                <td class="stander_name_big" style="border-bottom:none;border-left:none;">
                                    <div class="ShowResponse3"><asp:Label ID="LResponse3Name" runat="server" Text="Label"></asp:Label></div>
                                    <div class="EditResponse3"><asp:TextBox ID="TBResponse3Name" runat="server" Width="95%"></asp:TextBox></div>
                                </td>
                                <td style="border-bottom:none;padding:0px">
                                    <table class="my_table" frame="void">
                                        <tr>
                                            <td colspan="4" class="stander_content" style="border:none;">
                                                <div class="ShowResponse3"><asp:Label ID="LResponse3Content" runat="server"></asp:Label></div>
                                                <div class="EditResponse3"><asp:TextBox ID="TBResponse3Content" runat="server" Width="98%"></asp:TextBox></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="score_type" style="border-bottom:none;border-left:none;">优（9~10）</td>
                                            <td class="score_type" style="border-bottom:none;">良（7~8）</td>
                                            <td class="score_type" style="border-bottom:none;">中（4~6）</td>
                                            <td class="score_type" style="border-bottom:none;border-right:none;">差（0~3）</td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="fun" style="border-bottom:none;border-right:none;">
                                    <div class="ShowResponse3">
                                        <input type="button" value="编辑" onclick="EditResponse3()" class="l-button" style="width:60px;height:20px;"/>
                                        <input type="button" value="删除" onclick="DeleteResponse3()" class="l-button" style="width:60px;height:20px;"/>
                                    </div>
                                    <div class="EditResponse3">
                                        <input type="button" value="完成" onclick="EndEditResponse3()" class="l-button" style="width:60px;height:20px;"/>
                                        <input type="button" value="取消" onclick="CancelEditResponse3()" class="l-button" style="width:60px;height:20px;"/>
                                    </div>
                                </td>
                            </tr>
                            <tr id="Response" class="EditTable">
                                <td class="stander_name_big_edit" style="border-top:none;border-bottom:none;border-left:none">
                                    岗位内容：<br/>
                                    <asp:TextBox ID="TBResponseName" runat="server" Height="40px" Width="95%" class="InputData"></asp:TextBox>
                                </td>
                                <td class="stander_content_edit" style="border-top:none;border-bottom:none;">
                                    岗位要求:<br/>
                                    <asp:TextBox ID="TBResponseContent" runat="server" Height="40px" 
                                        Width="98%" class="InputData"></asp:TextBox>
                                </td>
                                <td class="fun" style="border-top:none;border-bottom:none;border-right:none">
                                    <input type="button" value="添加" onclick="AddResponse()" class="l-button" style="width:60px;height:22px;"/>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td class="weight">
                        <div class="EditTable" style="color:Red;">
                             权重:<br/><input type="text" id="ResponseWeightEdit" style="width:20px;" />
                        </div>
                       <div class="ViewTable">
                            <asp:Label ID="ResponseWeightView" runat="server" ></asp:Label>%
                       </div>
                    </td>
                </tr>
               <tr id="AbilityStander">
                    <td class="num">三</td>
                    <td class="stander_type">岗位胜任能力指标</td>
                    <td style="padding:0px">
                        <table class="my_table" frame="void"> 
                            <tr id="Ability1" class="ViewTable">
                                <td class="stander_name_big" style="border-top:none;border-left:none;">
                                    <input type="hidden" id="Ability1Num"/>
                                    <asp:Label ID="LAbility1Name" runat="server" ></asp:Label>
                                </td>
                                <td style="border-top:none;padding:0px;">
                                    <table class="my_table" frame="void">
                                        <tr>
                                            <td class="stander_content" style="border-top:none;border-left:none;">
                                                <asp:Label ID="LAbility1ContentA" runat="server" ></asp:Label>
                                            </td>
                                            <td class="stander_content" style="border-top:none;">
                                                <asp:Label ID="LAbility1ContentB" runat="server" ></asp:Label>
                                            </td>
                                            <td class="stander_content" style="border-top:none;">
                                                <asp:Label ID="LAbility1ContentC" runat="server" ></asp:Label>
                                            </td>
                                            <td class="stander_content" style="border-top:none;border-right:none;">
                                                <asp:Label ID="LAbility1ContentD" runat="server" ></asp:Label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="score_type" style="border-bottom:none;border-left:none;">优（9~10）</td>
                                            <td class="score_type" style="border-bottom:none;">良（7~8）</td>
                                            <td class="score_type" style="border-bottom:none;">中（4~6）</td>
                                            <td class="score_type" style="border-bottom:none;border-right:none;">差（0~3）</td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="fun" style="border-top:none;border-right:none;">
                                        <input type="button" value="重新选择" onclick="SelectStander('Ability1')" class="l-button" style="width:60px;height:20px;"/>
                                        <input type="button" value="删除" onclick="DeleteAbility1()" class="l-button" style="width:60px;height:20px;"/>
                                </td>
                            </tr>
                            <tr id="Ability2" class="ViewTable">
                                <td class="stander_name_big" style="border-top:none;border-left:none;">
                                    <input type="hidden" id="Ability2Num"/>
                                    <asp:Label ID="LAbility2Name" runat="server" ></asp:Label>
                                </td>
                                <td style="border-top:none;padding:0px;">
                                    <table class="my_table" frame="void">
                                        <tr>
                                            <td class="stander_content" style="border-top:none;border-left:none;">
                                                <asp:Label ID="LAbility2ContentA" runat="server" ></asp:Label>
                                            </td>
                                            <td class="stander_content" style="border-top:none;">
                                                <asp:Label ID="LAbility2ContentB" runat="server" ></asp:Label>
                                            </td>
                                            <td class="stander_content" style="border-top:none;">
                                                <asp:Label ID="LAbility2ContentC" runat="server" ></asp:Label>
                                            </td>
                                            <td class="stander_content" style="border-top:none;border-right:none;">
                                                <asp:Label ID="LAbility2ContentD" runat="server" ></asp:Label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="score_type" style="border-bottom:none;border-left:none;">优（9~10）</td>
                                            <td class="score_type" style="border-bottom:none;">良（7~8）</td>
                                            <td class="score_type" style="border-bottom:none;">中（4~6）</td>
                                            <td class="score_type" style="border-bottom:none;border-right:none;">差（0~3）</td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="fun" style="border-top:none;border-right:none;">
                                        <input type="button" value="重新选择" onclick="SelectStander('Ability2')" class="l-button" style="width:60px;height:20px;"/>
                                        <input type="button" value="删除" onclick="DeleteAbility2()" class="l-button" style="width:60px;height:20px;"/>
                                </td>
                            </tr>
                            <tr id="Ability3" class="ViewTable">
                                <td class="stander_name_big" style="border-top:none;border-left:none;">
                                    <input type="hidden" id="Ability3Num"/>
                                    <asp:Label ID="LAbility3Name" runat="server" ></asp:Label>
                                </td>
                                <td style="border-top:none;padding:0px;">
                                    <table class="my_table" frame="void">
                                        <tr>
                                            <td class="stander_content" style="border-top:none;border-left:none;">
                                                <asp:Label ID="LAbility3ContentA" runat="server" ></asp:Label>
                                            </td>
                                            <td class="stander_content" style="border-top:none;">
                                                <asp:Label ID="LAbility3ContentB" runat="server" ></asp:Label>
                                            </td>
                                            <td class="stander_content" style="border-top:none;">
                                                <asp:Label ID="LAbility3ContentC" runat="server" ></asp:Label>
                                            </td>
                                            <td class="stander_content" style="border-top:none;border-right:none;">
                                                <asp:Label ID="LAbility3ContentD" runat="server" ></asp:Label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="score_type" style="border-bottom:none;border-left:none;">优（9~10）</td>
                                            <td class="score_type" style="border-bottom:none;">良（7~8）</td>
                                            <td class="score_type" style="border-bottom:none;">中（4~6）</td>
                                            <td class="score_type" style="border-bottom:none;border-right:none;">差（0~3）</td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="fun" style="border-top:none;border-right:none;">
                                        <input type="button" value="重新选择" onclick="SelectStander('Ability3')" class="l-button" style="width:60px;height:20px;"/>
                                        <input type="button" value="删除" onclick="DeleteAbility3()" class="l-button" style="width:60px;height:20px;"/>
                                </td>
                            </tr>
                            <tr id="Ability4" class="ViewTable">
                                <td class="stander_name_big" style="border-top:none;border-left:none;">
                                    <input type="hidden" id="Ability4Num"/>
                                    <asp:Label ID="LAbility4Name" runat="server" ></asp:Label>
                                </td>
                                <td style="border-top:none;padding:0px;">
                                    <table class="my_table" frame="void">
                                        <tr>
                                            <td class="stander_content" style="border-top:none;border-left:none;">
                                                <asp:Label ID="LAbility4ContentA" runat="server" ></asp:Label>
                                            </td>
                                            <td class="stander_content" style="border-top:none;">
                                                <asp:Label ID="LAbility4ContentB" runat="server" ></asp:Label>
                                            </td>
                                            <td class="stander_content" style="border-top:none;">
                                                <asp:Label ID="LAbility4ContentC" runat="server" ></asp:Label>
                                            </td>
                                            <td class="stander_content" style="border-top:none;border-right:none;">
                                                <asp:Label ID="LAbility4ContentD" runat="server" ></asp:Label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="score_type" style="border-bottom:none;border-left:none;">优（9~10）</td>
                                            <td class="score_type" style="border-bottom:none;">良（7~8）</td>
                                            <td class="score_type" style="border-bottom:none;">中（4~6）</td>
                                            <td class="score_type" style="border-bottom:none;border-right:none;">差（0~3）</td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="fun" style="border-top:none;border-right:none;">
                                        <input type="button" value="重新选择" onclick="SelectStander('Ability4')" class="l-button" style="width:60px;height:20px;"/>
                                        <input type="button" value="删除" onclick="DeleteAbility4()" class="l-button" style="width:60px;height:20px;"/>
                                </td>
                            </tr>
                            <tr id="Ability" class="EditTable">
                                <td class="stander_name_edit" style="border-top:none;border-bottom:none;border-left:none;">
                                    <input type="hidden" id="AbilityNum"/>
                                    <asp:Label ID="LAbilityName" runat="server" Text="请选择指标" class="SelectNameData"></asp:Label>
                                </td>
                                <td style="border-top:none;border-bottom:none;padding:0px">
                                    <table class="my_table" frame="void">
                                        <tr>
                                            <td class="stander_content_edit" style="border-top:none;border-left:none;">
                                                <asp:Label ID="LAbilityContentA" runat="server" class="SelectContentData"></asp:Label>
                                            </td>
                                            <td class="stander_content_edit" style="border-top:none;">
                                                <asp:Label ID="LAbilityContentB" runat="server" class="SelectContentData"></asp:Label>
                                            </td>
                                            <td class="stander_content_edit" style="border-top:none;">
                                                <asp:Label ID="LAbilityContentC" runat="server" class="SelectContentData"></asp:Label>
                                            </td>
                                            <td class="stander_content_edit" style="border-top:none;border-right:none;">
                                                <asp:Label ID="LAbilityContentD" runat="server" class="SelectContentData"></asp:Label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="score_type" style="border-bottom:none;border-left:none;">优（9~10）</td>
                                            <td class="score_type" style="border-bottom:none;">良（7~8）</td>
                                            <td class="score_type" style="border-bottom:none;">中（4~6）</td>
                                            <td class="score_type" style="border-bottom:none;border-right:none;">差（0~3）</td>
                                        </tr>
                                    </table>
                                </td>     
                                <td class="fun" style="border-top:none;border-bottom:none;border-right:none;">
                                        <input type="button" value="选择指标" onclick="SelectStander('Ability')" class="l-button" style="width:60px;height:20px;"/>
                                        <input type="button" value="添加" onclick="AddAbility()" class="l-button" style="width:60px;height:20px;"/>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td class="weight">
                        <div class="EditTable" style="color:Red;">
                             权重:<br/><input type="text" id="AbilityWeightEdit" style="width:20px;" />
                        </div>
                       <div class="ViewTable">
                            <asp:Label ID="AbilityWeightView" runat="server" ></asp:Label>%
                       </div>
                    </td>
                </tr>
               <tr id="AttitudeStander">
                    <td class="num">四</td>
                    <td class="stander_type">工作态度指标</td>
                    <td style="padding:0px">
                        <table class="my_table" frame="void"> 
                            <tr id="Attitude1" class="ViewTable">
                                <td class="stander_name_big" style="border-top:none;border-left:none;">
                                    <input type="hidden" id="Attitude1Num"/>
                                    <asp:Label ID="LAttitude1Name" runat="server" ></asp:Label>
                                </td>
                                <td style="border-top:none;padding:0px;">
                                    <table class="my_table" frame="void">
                                        <tr>
                                            <td class="stander_content" style="border-top:none;border-left:none;">
                                                <asp:Label ID="LAttitude1ContentA" runat="server" ></asp:Label>
                                            </td>
                                            <td class="stander_content" style="border-top:none;">
                                                <asp:Label ID="LAttitude1ContentB" runat="server" ></asp:Label>
                                            </td>
                                            <td class="stander_content" style="border-top:none;">
                                                <asp:Label ID="LAttitude1ContentC" runat="server" ></asp:Label>
                                            </td>
                                            <td class="stander_content" style="border-top:none;border-right:none;">
                                                <asp:Label ID="LAttitude1ContentD" runat="server" ></asp:Label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="score_type" style="border-bottom:none;border-left:none;">优（9~10）</td>
                                            <td class="score_type" style="border-bottom:none;">良（7~8）</td>
                                            <td class="score_type" style="border-bottom:none;">中（4~6）</td>
                                            <td class="score_type" style="border-bottom:none;border-right:none;">差（0~3）</td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="fun" style="border-top:none;border-right:none;">
                                        <input type="button" value="重新选择" onclick="SelectStander('Attitude1')" class="l-button" style="width:60px;height:20px;"/>
                                        <input type="button" value="删除" onclick="DeleteAttitude1()" class="l-button" style="width:60px;height:20px;"/>
                                </td>
                            </tr>
                            <tr id="Attitude2" class="ViewTable">
                                <td class="stander_name_big" style="border-top:none;border-left:none;">
                                    <input type="hidden" id="Attitude2Num"/>
                                    <asp:Label ID="LAttitude2Name" runat="server" ></asp:Label>
                                </td>
                                <td style="border-top:none;padding:0px;">
                                    <table class="my_table" frame="void">
                                        <tr>
                                            <td class="stander_content" style="border-top:none;border-left:none;">
                                                <asp:Label ID="LAttitude2ContentA" runat="server" ></asp:Label>
                                            </td>
                                            <td class="stander_content" style="border-top:none;">
                                                <asp:Label ID="LAttitude2ContentB" runat="server" ></asp:Label>
                                            </td>
                                            <td class="stander_content" style="border-top:none;">
                                                <asp:Label ID="LAttitude2ContentC" runat="server" ></asp:Label>
                                            </td>
                                            <td class="stander_content" style="border-top:none;border-right:none;">
                                                <asp:Label ID="LAttitude2ContentD" runat="server" ></asp:Label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="score_type" style="border-bottom:none;border-left:none;">优（9~10）</td>
                                            <td class="score_type" style="border-bottom:none;">良（7~8）</td>
                                            <td class="score_type" style="border-bottom:none;">中（4~6）</td>
                                            <td class="score_type" style="border-bottom:none;border-right:none;">差（0~3）</td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="fun" style="border-top:none;border-right:none;">
                                        <input type="button" value="重新选择" onclick="SelectStander('Attitude2')" class="l-button" style="width:60px;height:20px;"/>
                                        <input type="button" value="删除" onclick="DeleteAttitude2()" class="l-button" style="width:60px;height:20px;"/>
                                </td>
                            </tr>
                            <tr id="Attitude3" class="ViewTable">
                                <td class="stander_name_big" style="border-top:none;border-left:none;">
                                    <input type="hidden" id="Attitude3Num"/>
                                    <asp:Label ID="LAttitude3Name" runat="server" ></asp:Label>
                                </td>
                                <td style="border-top:none;padding:0px;">
                                    <table class="my_table" frame="void">
                                        <tr>
                                            <td class="stander_content" style="border-top:none;border-left:none;">
                                                <asp:Label ID="LAttitude3ContentA" runat="server" ></asp:Label>
                                            </td>
                                            <td class="stander_content" style="border-top:none;">
                                                <asp:Label ID="LAttitude3ContentB" runat="server" ></asp:Label>
                                            </td>
                                            <td class="stander_content" style="border-top:none;">
                                                <asp:Label ID="LAttitude3ContentC" runat="server" ></asp:Label>
                                            </td>
                                            <td class="stander_content" style="border-top:none;border-right:none;">
                                                <asp:Label ID="LAttitude3ContentD" runat="server" ></asp:Label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="score_type" style="border-bottom:none;border-left:none;">优（9~10）</td>
                                            <td class="score_type" style="border-bottom:none;">良（7~8）</td>
                                            <td class="score_type" style="border-bottom:none;">中（4~6）</td>
                                            <td class="score_type" style="border-bottom:none;border-right:none;">差（0~3）</td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="fun" style="border-top:none;border-right:none;">
                                        <input type="button" value="重新选择" onclick="SelectStander('Attitude3')" class="l-button" style="width:60px;height:20px;"/>
                                        <input type="button" value="删除" onclick="DeleteAttitude3()" class="l-button" style="width:60px;height:20px;"/>
                                </td>
                            </tr>
                            <tr id="Attitude4" class="ViewTable">
                                <td class="stander_name_big" style="border-top:none;border-left:none;">
                                    <input type="hidden" id="Attitude4Num"/>
                                    <asp:Label ID="LAttitude4Name" runat="server" ></asp:Label>
                                </td>
                                <td style="border-top:none;padding:0px;">
                                    <table class="my_table" frame="void">
                                        <tr>
                                            <td class="stander_content" style="border-top:none;border-left:none;">
                                                <asp:Label ID="LAttitude4ContentA" runat="server" ></asp:Label>
                                            </td>
                                            <td class="stander_content" style="border-top:none;">
                                                <asp:Label ID="LAttitude4ContentB" runat="server" ></asp:Label>
                                            </td>
                                            <td class="stander_content" style="border-top:none;">
                                                <asp:Label ID="LAttitude4ContentC" runat="server" ></asp:Label>
                                            </td>
                                            <td class="stander_content" style="border-top:none;border-right:none;">
                                                <asp:Label ID="LAttitude4ContentD" runat="server" ></asp:Label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="score_type" style="border-bottom:none;border-left:none;">优（9~10）</td>
                                            <td class="score_type" style="border-bottom:none;">良（7~8）</td>
                                            <td class="score_type" style="border-bottom:none;">中（4~6）</td>
                                            <td class="score_type" style="border-bottom:none;border-right:none;">差（0~3）</td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="fun" style="border-top:none;border-right:none;">
                                        <input type="button" value="重新选择" onclick="SelectStander('Attitude4')" class="l-button" style="width:60px;height:20px;"/>
                                        <input type="button" value="删除" onclick="DeleteAttitude4()" class="l-button" style="width:60px;height:20px;"/>
                                </td>
                            </tr>
                            <tr id="Attitude" class="EditTable">
                                <td class="stander_name_big_edit" style="border-top:none;border-bottom:none;border-left:none;">
                                    <input type="hidden" id="AttitudeNum"/>
                                    <asp:Label ID="LAttitudeName" runat="server" Text="请选择指标" class="SelectNameData"></asp:Label>
                                </td>
                                <td style="border-top:none;border-bottom:none;padding:0px">
                                    <table class="my_table" frame="void">
                                        <tr>
                                            <td class="stander_content_edit" style="border-top:none;border-left:none;">
                                                <asp:Label ID="LAttitudeContentA" runat="server" class="SelectContentData"></asp:Label>
                                            </td>
                                            <td class="stander_content_edit" style="border-top:none;">
                                                <asp:Label ID="LAttitudeContentB" runat="server" class="SelectContentData"></asp:Label>
                                            </td>
                                            <td class="stander_content_edit" style="border-top:none;">
                                                <asp:Label ID="LAttitudeContentC" runat="server" class="SelectContentData"></asp:Label>
                                            </td>
                                            <td class="stander_content_edit" style="border-top:none;border-right:none;">
                                                <asp:Label ID="LAttitudeContentD" runat="server" class="SelectContentData"></asp:Label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="score_type" style="border-bottom:none;border-left:none;">优（9~10）</td>
                                            <td class="score_type" style="border-bottom:none;">良（7~8）</td>
                                            <td class="score_type" style="border-bottom:none;">中（4~6）</td>
                                            <td class="score_type" style="border-bottom:none;border-right:none;">差（0~3）</td>
                                        </tr>
                                    </table>
                                </td>     
                                <td class="fun" style="border-top:none;border-bottom:none;border-right:none;">
                                        <input type="button" value="选择指标" onclick="SelectStander('Attitude')" class="l-button" style="width:60px;height:20px;"/>
                                        <input type="button" value="添加" onclick="AddAttitude()" class="l-button" style="width:60px;height:20px;"/>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td class="weight">
                        <div class="EditTable" style="color:Red;">
                             权重:<br/><input type="text" id="AttitudeWeightEdit" style="width:20px;" />
                        </div>
                       <div class="ViewTable">
                            <asp:Label ID="AttitudeWeightView" runat="server" ></asp:Label>%
                       </div>
                    </td>
                </tr>
               <tr id="VetoStander">
                    <td class="num">五</td>
                    <td class="stander_type">否决指标</td>
                    <td style="padding:0px">
                        <table class="my_table" frame="void"> 
                            <tr>
                                <td class="stander_name_big" style="border-top:none;border-left:none;">违反规章制度</td>
                                <td style="border:none;padding:0px;">
                                    <table class="my_table" frame="void">
                                        <tr id="Veto1" class="ViewTable">
                                            <td  class="veto_stander_content" style="border-top:none;border-left:none;height:45px;">
                                                <input type="hidden" id="Veto1Num"/>
                                                <asp:Label ID="LVeto1Content" runat="server"></asp:Label>
                                            </td>
                                            <td class="fun" style="border-top:none;border-right:none;">
                                                <input type="button" value="重新选择" onclick="SelectVetoStander('Veto1')" class="l-button" style="width:60px;height:20px;"/>
                                                <input type="button" value="删除" onclick="DeleteVeto1()" class="l-button" style="width:60px;height:20px;"/>
                                            </td>
                                        </tr>
                                        <tr id="Veto2" class="ViewTable">
                                            <td class="veto_stander_content" style="border-top:none;border-left:none;height:45px;">
                                                <input type="hidden" id="Veto2Num"/>
                                                <asp:Label ID="LVeto2Content" runat="server"></asp:Label>
                                            </td>
                                            <td class="fun" style="border-top:none;border-right:none;">
                                                <input type="button" value="重新选择" onclick="SelectVetoStander('Veto2')" class="l-button" style="width:60px;height:20px;"/>
                                                <input type="button" value="删除" onclick="DeleteVeto2()" class="l-button" style="width:60px;height:20px;"/>
                                            </td>
                                        </tr>
                                        <tr id="Veto3" class="ViewTable">
                                            <td class="veto_stander_content" style="border-top:none;border-left:none;height:45px;">
                                                <input type="hidden" id="Veto3Num"/>
                                                <asp:Label ID="LVeto3Content" runat="server"></asp:Label>
                                            </td>
                                            <td class="fun" style="border-top:none;border-right:none;">
                                                <input type="button" value="重新选择" onclick="SelectVetoStander('Veto3')" class="l-button" style="width:60px;height:20px;"/>
                                                <input type="button" value="删除" onclick="DeleteVeto3()" class="l-button" style="width:60px;height:20px;"/>
                                            </td>
                                        </tr>
                                        <tr id="Veto4" class="ViewTable">
                                            <td class="veto_stander_content" style="border-top:none;border-left:none;height:45px;">
                                                <input type="hidden" id="Veto4Num"/>
                                                <asp:Label ID="LVeto4Content" runat="server"></asp:Label>
                                            </td>
                                            <td class="fun" style="border-top:none;border-right:none;">
                                                <input type="button" value="重新选择" onclick="SelectVetoStander('Veto4')" class="l-button" style="width:60px;height:20px;"/>
                                                <input type="button" value="删除" onclick="DeleteVeto4()" class="l-button" style="width:60px;height:20px;"/>
                                            </td>
                                        </tr>
                                        <tr id="Veto5" class="ViewTable">
                                            <td class="veto_stander_content" style="border-top:none;border-left:none;height:45px;">
                                                <input type="hidden" id="Veto5Num"/>
                                                <asp:Label ID="LVeto5Content" runat="server"></asp:Label>
                                            </td>
                                            <td class="fun" style="border-top:none;border-right:none;">
                                                <input type="button" value="重新选择" onclick="SelectVetoStander('Veto5')" class="l-button" style="width:60px;height:20px;"/>
                                                <input type="button" value="删除" onclick="DeleteVeto5()" class="l-button" style="width:60px;height:20px;"/>
                                            </td>
                                        </tr>
                                        <tr id="Veto" class="EditTable">
                                            <td class="stander_content_edit" style="border-bottom:none;border-top:none;border-left:none;height:45px;">
                                                <input type="hidden" id="VetoNum"/>
                                                <asp:Label ID="LVetoContent" runat="server" class="SelectNameData"></asp:Label>
                                            </td>
                                            <td class="fun" style="border-bottom:none;border-top:none;border-right:none;">
                                                <input type="button" value="选择" onclick="SelectVetoStander('Veto')" class="l-button" style="width:60px;height:20px;"/>
                                                <input type="button" value="添加" onclick="AddVeto()" class="l-button" style="width:60px;height:20px;"/>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td class="stander_name_big" style="border-bottom:none;border-left:none;">其它</td>
                                <td style="border-bottom:none;border-right:none;"></td>
                            </tr>
                        </table>
                    </td>
                    <td class="weight">
                        100%
                    </td>
                </tr>
            </table>
        </div>

        <input type="button" value="test" onclick="test();" />
    </div>
    </form>
</body>
</html>
