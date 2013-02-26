﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

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
                        LUserName.Text = name;
                }
                catch (Exception ex)
                {
                    ex.ToString();
                    Response.Redirect("../Login.aspx");
                }
            }
        }

        protected void LBLogout_Click(object sender, EventArgs e)
        {
            Session["username"] = null;
            Session["usertype"] = null;
            Response.Redirect("../Login.aspx");
        }

        protected void LinkButton1_Click(object sender, EventArgs e)
        {
            
        }
    }
}