<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm2.aspx.cs" Inherits="TJEvaluationSystem.Pages.SecondManagerPages.WebForm2" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script type="text/javascript">
        function test() {
            var input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('onchange', "if(!/(^0$)|(^100$)|(^\d{1,2}$)/.test(value)){value='100';}");
//            input.onchange = function () { if (!/(^0$)|(^100$)|(^\d{1,2}$)/.test(value)) { value = '100'; } };
            var div = document.getElementById('t');
            t.appendChild(input);
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <input type="button" onclick="test();"/>
        <div id="t">
        </div>
    </div>
    </form>
</body>
</html>
