using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace TJEvaluationSystem.Pages.EvaluatorPages
{
    public partial class EvaluatorHome : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string name = (string)Session["username"];
            if (name == null || name == "")
                Response.Redirect("../Login.aspx");
        }
    }
}