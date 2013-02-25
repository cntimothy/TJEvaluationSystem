using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace TJEvaluationSystem.Pages.FirstManagerPages
{
    public partial class FirstManagerHome : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                try
                {
                    if (Session["username"].Equals(DBNull.Value))
                    {
                        Response.Redirect("../Login.aspx");
                    }
                }
                catch (Exception ex)
                {
                    ex.ToString();
                    Response.Redirect("../Login.aspx");
                }
            }
        }

        protected void LinkButton1_Click(object sender, EventArgs e)
        {
            Response.Redirect("../MessagePages/ShowMessages.aspx");
        }
    }
}