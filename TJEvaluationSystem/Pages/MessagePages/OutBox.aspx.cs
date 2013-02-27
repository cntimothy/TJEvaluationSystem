using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using DBUtility;
using Model;
using BLL;

namespace TJEvaluationSystem.Pages.MessagePages
{
    public partial class OutBox : System.Web.UI.Page
    {
        private string exception = "";
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Search_Click(object sender, EventArgs e)
        {
            DataTable table = new DataTable();
            table = search();
            if (table == null)
                return;
            string json = JSON.DataTableToJson(table);
            JsonData.Value = json;
            ClientScript.RegisterStartupScript(this.GetType(), "", "load_message()", true);
            return;
        }

        protected DataTable search()
        {
            string userName = (string)Session["username"];
            List<Message> messages = new List<Message>();
            MessageBLL.Select(userName, ref messages, ref exception);
            if (messages.Count == 0)
                return null;
            DataTable table = new DataTable();
            table = messages.ListToDataTable();
            return table;
        }

        protected void GoBack_Click(object sender, EventArgs e)
        { 
        
        }
    }
}