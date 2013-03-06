using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Model;
using BLL;

namespace TJEvaluationSystem.Pages
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!this.Page.IsPostBack)
            {
                foreach (string key in Request.Cookies.AllKeys)
                {
                    if (key == "username")
                    {
                        TBUserName.Text = Request.Cookies[key].Value;
                    }
                }
            }
            else
            {
                LBPrompt.Visible = false;
            }
        }

        protected void IBLogin_Click(object sender, ImageClickEventArgs e)
        {
            string exception = "";
            string username = TBUserName.Text.Trim();
            string userpwd = TBPassword.Text.Trim();
            string userType = "-1";
            //判断是否为空
            if (username.Length == 0 || userpwd.Length == 0)
            {
                return;
            }
            //得到用户身份类型
            string userLevel = "-1";
            userLevel = DDLLoginType.SelectedValue;
            userType = Commondo.login(username, userpwd, userLevel,ref exception);
            if (userType == "-1")
            {
                //登录失败
                LBPrompt.Visible = true;
                LBPrompt.Text = exception;
                return;
            }
            else
            {
                RememberMe(username, userType, userLevel);
                LBPrompt.Visible = false;

                //登录成功,页面跳转
                if (userLevel.Substring(0, 5) == "10000")
                {
                    if (userType.ElementAt(0) == '1')
                    {
                        Response.Redirect("SuperManagerPages/SuperManagerHome.aspx");
                    }
                    else
                    {
                        //登录失败
                        LBPrompt.Visible = true;
                        LBPrompt.Text = "登录身份选择错误！";
                        return;
                    }
                }
                else if (userLevel.Substring(0, 5) == "01000")
                {
                    if (userType.ElementAt(1) == '1')
                    {
                        Response.Redirect("FirstManagerPages/FirstManagerHome.aspx");
                    }
                    else
                    {
                        //登录失败
                        LBPrompt.Visible = true;
                        LBPrompt.Text = "登录身份选择错误！";
                        return;
                    }
                }
                else if (userLevel.Substring(0, 5) == "00100")
                {
                    if (userType.ElementAt(2) == '1')
                    {
                        Response.Redirect("SecondManagerPages/SecondManagerHome.aspx");
                    }
                    else
                    {
                        //登录失败
                        LBPrompt.Visible = true;
                        LBPrompt.Text = "登录身份选择错误！";
                        return;
                    }
                }
                else if (userLevel.Substring(0, 5) == "00010")
                {
                    if (userType.ElementAt(3) == '1')
                    {
                        Response.Redirect("EvaluatorPages/EvaluatorHome.aspx");
                    }
                    else
                    {
                        //登录失败
                        LBPrompt.Visible = true;
                        LBPrompt.Text = "登录身份选择错误！";
                        return;
                    }
                }
                else
                {
                    //登录失败
                    LBPrompt.Visible = true;
                    LBPrompt.Text = "您无权登录系统！";
                    return;
                }
            }
        }

        protected void RememberMe(string username, string usertype, string userlevel)
        {
            Session["username"] = username;
            Session["usertype"] = usertype;
            Session["userlevel"] = userlevel;
        }
    }
}