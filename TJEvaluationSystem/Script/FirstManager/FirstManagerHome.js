var indexdata1 =
[
   { url: "ManageSecond.aspx", text: "制定名单" },
   { url: "SelectSecond.aspx", text: "查看名单" },
    { url: "ResetPassword.aspx", text: "重置密码" }
];
var indexdata2=
[
    { url: "../AccountPages/UploadEvaluated.aspx", text: "制定名单" },
    { url: "SelectEvaluated.aspx", text: "查看名单" }
];
var indexdata3 =
[
        { url: "CheckPost.aspx", text: "审核岗位责任书" },
        { url: "CheckAssess.aspx", text: "审核考评表" },
        { url: "CheckEvaluator.aspx", text: "审核考评人名单" }
];
var indexdata4 =
[
        { url: "ManageCurrentEvaluation.aspx", text: "管理当前考评" },
        { url: "EvaluationResult.aspx", text: "考评结果" }
];


var tab= null;
var accordion = null;
var tree= null;
$(function () {

    //布局
    $("#layout1").ligerLayout({ leftWidth: 190, height: '100%', heightDiff: -34, space: 4, onHeightChanged: f_heightChanged });

    var height = $(".l-layout-center").height();

    //Tab
    $("#framecenter").ligerTab({ height: height });

    //面板
    $("#accordion1").ligerAccordion({ height: height - 24, speed: null });

    $(".l-link").hover(function () {
        $(this).addClass("l-link-over");
    }, function () {
        $(this).removeClass("l-link-over");
    });
    //树
    $("#tree1").ligerTree({
        data: indexdata1,
        checkbox: false,
        slide: false,
        nodeWidth: 120,
        attribute: ['nodename', 'url'],
        onSelect: function (node) {
            if (!node.data.url) return;
            var tabid = $(node.target).attr("tabid");
            if (!tabid) {
                tabid = new Date().getTime();
                $(node.target).attr("tabid", tabid)
            }
            f_addTab(tabid, node.data.text, node.data.url);
        }
    });

    $("#tree2").ligerTree({
        data: indexdata2,
        checkbox: false,
        slide: false,
        nodeWidth: 120,
        attribute: ['nodename', 'url'],
        onSelect: function (node) {
            if (!node.data.url) return;
            var tabid = $(node.target).attr("tabid");
            if (!tabid) {
                tabid = new Date().getTime();
                $(node.target).attr("tabid", tabid)
            }
            f_addTab(tabid, node.data.text, node.data.url);
        }
    });
    $("#tree3").ligerTree({
        data: indexdata3,
        checkbox: false,
        slide: false,
        nodeWidth: 120,
        attribute: ['nodename', 'url'],
        onSelect: function (node) {
            if (!node.data.url) return;
            var tabid = $(node.target).attr("tabid");
            if (!tabid) {
                tabid = new Date().getTime();
                $(node.target).attr("tabid", tabid)
            }
            f_addTab(tabid, node.data.text, node.data.url);
        }
    });

    $("#tree4").ligerTree({
        data: indexdata4,
        checkbox: false,
        slide: false,
        nodeWidth: 120,
        attribute: ['nodename', 'url'],
        onSelect: function (node) {
            if (!node.data.url) return;
            var tabid = $(node.target).attr("tabid");
            if (!tabid) {
                tabid = new Date().getTime();
                $(node.target).attr("tabid", tabid)
            }
            f_addTab(tabid, node.data.text, node.data.url);
        }
    });

    tab = $("#framecenter").ligerGetTabManager();
    accordion = $("#accordion1").ligerGetAccordionManager();
    tree = $("#tree1").ligerGetTreeManager();
    $("#pageloading").hide();
});
function f_heightChanged(options) {
    if (tab)
        tab.addHeight(options.diff);
    if (accordion && options.middleHeight - 24 > 0)
        accordion.setHeight(options.middleHeight - 24);
}
function f_addTab(tabid, text, url) {
    tab.addTabItem({ tabid: tabid, text: text, url: url });
}     