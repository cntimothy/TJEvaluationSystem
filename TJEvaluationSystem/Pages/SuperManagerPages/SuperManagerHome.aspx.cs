using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace TJEvaluationSystem.Pages.SuperManagerPages
{
    public partial class SuperManagerHome : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            LUserName.Text=Session["username"]+",您好！";
        }
    }
}