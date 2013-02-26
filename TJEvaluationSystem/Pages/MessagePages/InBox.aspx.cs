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
            MessageBLL.SelectReceive(userName, 0, ref messages, ref exception);
            DataTable table = new DataTable();
            table = messages.ListToDataTable();
            return table;
        }

        protected DataTable searchAll()
        {
            string userName = (string)Session["username"];
            List<Message> messages = new List<Message>();
            MessageBLL.SelectReceive(userName, ref messages, ref exception);
            if (messages.Count == 0)
                return null;
            DataTable table = new DataTable();
            table = messages.ListToDataTable();
            return table;
        }

        protected void SearchUnRead_Click(object sender, EventArgs e)
        {
            DataTable table = new DataTable();
            table = searchUnRead();
            if (table == null)
                return;
            string json = JSON.DataTableToJson(table);
            //ErrorList.Text = json;
            JsonData.Value = json;
            ClientScript.RegisterStartupScript(this.GetType(), "", "load_message()", true);
            return;
        }

        protected void SearchAll_Click(object sender, EventArgs e)
        {
            DataTable table = new DataTable();
            table = searchAll();
            if (table == null)
                return;
            string json = JSON.DataTableToJson(table);
            JsonData.Value = json;
            ClientScript.RegisterStartupScript(this.GetType(), "", "load_message()", true);
            return;
        }

        protected void GoBack_Click(object sender, EventArgs e)
        {
            int mID = Convert.ToInt32(ReadMsgId.Value);
            Message model = new Message();
            model.MID = mID;
            model.MRead = 1;
            MessageBLL.Update(model, ref exception);
            //ErrorList.Text = ReadMsgId.Text;
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