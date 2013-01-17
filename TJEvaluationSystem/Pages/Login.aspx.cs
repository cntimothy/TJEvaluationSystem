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
            string username = TBUserName.Text.Trim();
            string userpwd = TBPassword.Text.Trim();
            int userType = -1;
            //判断是否为空
            if (username.Length == 0 || userpwd.Length == 0)
            {
                return;
            }
            int userLevel=-1;
            if (this.RadioButton1.Checked)
            {
                userLevel = 0;
            }
            else
                if (this.RadioButton2.Checked)
                {
                    userLevel = 1;
                }
                else
                    if (this.RadioButton3.Checked)
                    {
                        userLevel = 2;
                    }
                    else
                        if (this.RadioButton4.Checked)
                        {
                            userLevel = 3;
                        }
                        else
                        {
                            LBPrompt.Visible = true;
                            LBPrompt.Text = "请选择登陆身份！";
                            return;

                        }

            if (userLevel == 0 || userLevel == 1)
            {
                Manager manager = new Manager();
                manager.MID = username;
                manager.MPassword = userpwd;
                manager.MType = userLevel;
                string ex = "";
                if (ManagerBLL.Select(manager, ref ex))
                {
                    userType = userLevel;
                }
                else
                {
                    //登录失败
                    LBPrompt.Visible = true;
                    LBPrompt.Text =ex;
                    return;
                }
                 
            }
            else
                 userType = Commondo.login(username, userpwd);
            if (userType == -1)
            {
                //登录失败
                LBPrompt.Visible = true;
                LBPrompt.Text = "用户名或密码错误！";
                return;
            }
            else
            {
                RememberMe(username,userType);
                LBPrompt.Visible = false;
                
                switch(userLevel)
                {
                    case 0:
                        Response.Redirect("SuperManagerPages/SuperManagerHome.aspx");
                        break;
                    case 1:
                        Response.Redirect("FirstManagerPages/FirstManagerHome.aspx");
                        break;
                    case 2:
                        if (userType == 2 || userType == 5 || userType == 6 || userType == 9)
                        {
                            Response.Redirect("SecondManagerPages/SecondManagerHome.aspx");
                        }
                        else
                        {
                            //登录失败
                            LBPrompt.Visible = true;
                            LBPrompt.Text = "您没有访问权限！";
                            return;
                        }

                        break;
                    case 3:
                        if (userType == 3 || userType == 5 || userType == 7 || userType == 9)
                        {
                            Response.Redirect("EvaluatorPages/EvaluatorHome.aspx");
                        }
                        else
                        {
                            //登录失败
                            LBPrompt.Visible = true;
                            LBPrompt.Text = "您没有访问权限！";
                            return;
                        }
                        
                        break;
                    default:
                        break;
                }
            }
        }

        protected void RememberMe(string username, int usertype)
        {
            Session["username"] = username;
            Session["usertype"] = usertype;
            if (CBRemindMe.Checked == true)
            {
                Response.Cookies["username"].Value = username;
                Response.Cookies["username"].Expires = DateTime.Now.AddMonths(1);
            }
        }
    }
}