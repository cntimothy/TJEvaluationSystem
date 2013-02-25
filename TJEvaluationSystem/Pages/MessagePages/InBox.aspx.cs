using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BLL;
using Model;
using DBUtility;
using System.Data;
using System.IO;

namespace TJEvaluationSystem.Pages.MessagePages
{
    public partial class InBox : System.Web.UI.Page
    {
        private string exception = "";
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected DataTable searchUnRead()
        {
            string userName = (string)Session["username"];
            List<Message> messages = new List<Message>();            
            MessageBLL.Select(userName, 0, ref messages, ref exception);
            DataTable table = new DataTable();
            table = messages.ListToDataTable();
            //ErrorList.Text = (string)table.Rows[0][0] + "   " + table.Rows[0][1].ToString();
            return table;
        }

        protected void SearchUnRead_Click(object sender, EventArgs e)
        {
            DataTable table = new DataTable();
            table = searchUnRead();
            string json = JSON.DataTableToJson(table);
            //ErrorList.Text = json;
            JsonData.Value = json;
            ClientScript.RegisterStartupScript(this.GetType(), "", "load_message()", true);
            return;
        }

        protected void Check_User(object sender, EventArgs e)
        {
            
        }

        protected void Submit_Click(object sender, EventArgs e)
        {
            
        }

        protected void Dao_Click(object sender, EventArgs e)
        {
            
        }

        private void Export(string filename, DataTable table)
        {
  
        }
    }
}