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

namespace TJEvaluationSystem.Pages.FirstManagerPages
{
    
    public partial class SelectSeond : System.Web.UI.Page
    {
        private string exception = "";
        private string fname = "";
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected DataTable searchSql()
        {
            exception = "";
            string department = Depart.Value;
            List<Manager> managers = new List<Manager>();
            string type = "__1%";
            if (department == "0")
            {
                ManagerBLL.SelectByType(type, ref managers, ref exception);
                fname = "所有二级管理员名单:";
            }
            else
            {
                ManagerBLL.Select(department, type, ref managers, ref exception);
                fname = department + "二级管理员名单:";
            }
            DataTable table = new DataTable();
            table = managers.ListToDataTable();
            return table;
           

        }
        protected void Submit_Click(object sender, EventArgs e)
        {
           
            DataTable table = new DataTable();
            table = searchSql();
            if (table.Rows.Count <= 0)
            {
                ClientScript.RegisterStartupScript(this.GetType(), "", "alert('不存在二级管理员！')", true);
                return;
            }
            string json = JSON.DataTableToJson(table);
            JsonData.Value = json;

            ClientScript.RegisterStartupScript(this.GetType(), "", "load_userinfo()", true);
            return;

        }

        protected void Export_Click(object sender, EventArgs e)
        {
            DataTable table = new DataTable();
           // table = userinfo.ListToDataTable();
            table = searchSql();
            table.Columns.Remove("mType");
            table.Columns.Remove("mPassword");
            string filename = fname;
            string path = Server.MapPath("");
            path = path + "\\temp.xls";
            JSON.dataTableToCsv(table, path); 

           Response.Clear();
            Response.Buffer = true;
            Response.Charset = "utf-8";
            Response.AppendHeader("Content-Disposition", "attachment;filename="+filename+".xls");
            Response.ContentEncoding = System.Text.Encoding.GetEncoding("utf-8");

            Response.ContentType = "application/ms-excel";
           this.EnableViewState = false;
            System.IO.StringWriter oStringWriter = new System.IO.StringWriter();
            System.Web.UI.HtmlTextWriter oHtmlTextWriter = new System.Web.UI.HtmlTextWriter(oStringWriter);
            oHtmlTextWriter.WriteLine(JsonData.Value);
            Response.WriteFile(path);
            Response.End();
        }

        protected void Delete_Click(object sender, EventArgs e)
        {
            exception = "";
            string userID = "";
            string userType = "-1";
            List<UserInfo> userinfo = new List<UserInfo>();
            userinfo = JSON.isEfect(UserID.Value);
            UserInfo deleted = userinfo.ElementAt(0);

            userID = deleted.UiID;
            userType = deleted.UiType;
            //if (userType == 2 || userType == 6)
            if(userType.Substring(2, 5) == "100")
            {
                UserBLL.Delete(userID, ref exception);
            }
            else
            {
                List<User> model = new List<Model.User>();
                if (UserBLL.Select(deleted.UiID, ref model, ref exception))
                {
                    User user = model.ElementAt(0);
                    user.UType = user.UType.Remove(2, 1).Insert(2, "1");
                    UserBLL.Update(user, ref exception);
                }
            }
            deleted.UiType = deleted.UiType.Remove(2, 1).Insert(2, "1");
            UserInfoBLL.Update(deleted, ref exception);

            DataTable table = new DataTable();
            table = searchSql();
            if (table == null)
                return;
            string json = JSON.DataTableToJson(table);
            JsonData.Value = json;

            ClientScript.RegisterStartupScript(this.GetType(), "", "load_userinfo()", true);
            return;
        }
    }
}