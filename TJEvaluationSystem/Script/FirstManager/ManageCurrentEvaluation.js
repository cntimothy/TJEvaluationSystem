
function ExistActiveEvaluation() 
{
    //显示，隐藏，相关按钮
    $('#TrExistActiveEvaluation').css("display", "block");
    $('#TrNoActiveEvaluation').css("display", "none");
}

//不存在正在进行的考评
function NoActiveEvaluation() 
{
    //显示，隐藏，相关按钮
    $('#TrNoActiveEvaluation').css("display", "block");
    $('#TrExistActiveEvaluation').css("display", "none");

    f_alert('warn', '不存在正在进行的考评和，请开始新考评!');
}

//开始新考评
function StartNewEvaluation() 
{
    document.getElementById("BStartNewEvaluation").click();
}

//开始新考评成功
function SuccessStartNewEvaluation()
{
    //显示，隐藏，相关按钮
    $('#TrExistActiveEvaluation').css("display", "block");
    $('#TrNoActiveEvaluation').css("display", "none");
}

//开始新考评失败
function FailStartNewEvaluation()
{
    f_alert('error', '开始考评失败，请重试!');
}
