using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace TJEvaluationSystem.Pages.SecondManagerPages
{
    public partial class SecondManagerHome : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string name = (string)Session["username"];
                if (name == null || name == "")
                    Response.Redirect("../Login.aspx");
            }
        }
    }
}