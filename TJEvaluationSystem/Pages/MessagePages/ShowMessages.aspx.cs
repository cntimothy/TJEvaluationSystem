﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BLL;

namespace TJEvaluationSystem.Pages.MessagePages
{
    public partial class ShowMessages : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                try
                {
                    string name = (string)Session["username"];
                    if (name.Equals(DBNull.Value))
                    {
                        Response.Redirect("../Login.aspx");
                    }
                    else
                        LUserName.Text = "欢迎您：";
                        LBAccount.Text = name;
                }
                catch (Exception ex)
                {
                    ex.ToString();
                    Response.Redirect("../Login.aspx");
                }
            }
            int count = 0;
            string exception = "";
            string colname = "mRead";
            string receiveID = (string)Session["username"];
            if (MessageBLL.SelectUnReadCount(ref count, colname, receiveID, ref exception))
            {
                LinkButton1.Text = "消息（" + count + "）";
            }
        }

        protected void LBLogout_Click(object sender, EventArgs e)
        {
            Session["username"] = null;
            Session["usertype"] = null;
            Session["userlevel"] = null;
            Response.Redirect("../Login.aspx");
        }

        protected void LinkButton1_Click(object sender, EventArgs e)
        {
            
        }

        protected void GoHome_Click(object sender, EventArgs e)
        {
            if ((string)Session["userlevel"] == "10000")
            {
                Response.Redirect("../SuperManagerPages/SuperManagerHome.aspx");
            }
            else if ((string)Session["userlevel"] == "01000")
            {
                Response.Redirect("../FirstManagerPages/FirstManagerHome.aspx");
            }
            else if ((string)Session["userlevel"] == "00100")
            {
                Response.Redirect("../SecondManagerPages/SecondManagerHome.aspx");
            }
            else if ((string)Session["userlevel"] == "00010")
            {
                Response.Redirect("../EvaluatorPages/EvaluatorHome.aspx");
            }
        }

        protected void LBAccount_Click(object sender, EventArgs e)
        {
            Response.Redirect("../AccountPages/AccountManage.aspx");
        }
    }
}