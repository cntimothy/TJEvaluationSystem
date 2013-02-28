function Change() {
    var oldPsw = document.getElementById('OldPsw').value;
    if (oldPsw == null || oldPsw == '') {
        alert('请输入原密码');
        return;
    }
    var newPsw = document.getElementById('NewPsw').value;
    if (newPsw == null || newPsw == '') {
        alert('请输入新密码');
        return;
    }
    var newPswConfirm = document.getElementById('NewPswConfirm').value;
    if (newPswConfirm != newPsw) {
        alert('两次输入密码不一致');
        return;
    }

    document.getElementById('Data1').value = oldPsw;
    document.getElementById('Data2').value = newPsw;
    document.getElementById('BChangePsw').click();
}