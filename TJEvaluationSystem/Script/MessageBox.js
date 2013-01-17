function f_alert(type,message) {
    switch (type) {
        case "success":
            $.ligerDialog.success(message);
            break;
        case "warn":
            $.ligerDialog.warn(message);
            break;
        case "question":
            $.ligerDialog.question(message);
            break;
        case "error":
            $.ligerDialog.error(message);
            break;
        case "confirm":
            $.ligerDialog.confirm(message, function (yes) {
                alert(yes);
            });
            break;
        case "warning":
            $.ligerDialog.warning(message, function (type) {
                alert(type);
            });
            break;
        case "prompt":
            $.ligerDialog.prompt(message, function (yes, value) {
                if (yes) alert(value);
            });
            break;
        case "prompt2":
            $.ligerDialog.prompt(message, message, function (yes, value) {
                if (yes) alert(value);
            });
            break;
        case "prompt3":
            $.ligerDialog.prompt(message, true, function (yes, value) {
                if (yes) alert(value);
            });
            break;
        case "prompt4":
            $.ligerDialog.prompt(message, '初始化多选框值', true, function (yes, value) {
                if (yes) alert(value);
            });
            break;
        case "waitting":
            $.ligerDialog.waitting('正在保存中,请稍候...');
            setTimeout(function () {
                $.ligerDialog.closeWaitting();
            }, 2000);
            break;
        case "waitting2":
            var manager = $.ligerDialog.waitting('正在保存中,请稍候...');
            setTimeout(function () {
                manager.close();
            }, 1000);
            break;
    }
}
