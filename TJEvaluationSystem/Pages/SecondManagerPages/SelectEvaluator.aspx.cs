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

namespace TJEvaluationSystem.Pages.SecondManagerPages
{
    public partial class SelectEvaluator : System.Web.UI.Page
    {
        private string exception = "";
        private string fname = "";
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        protected DataTable searchSql()
        {
            exception = "";
            //获取管理员部门
            string mID = (string)Session["username"];
            List<Manager> managers = new List<Manager>();
            ManagerBLL.SelectByID(mID, ref managers, ref exception);
            string department = managers[0].MDepartment;
            
            List<EvaluatorInfo> evaluatorinfo = new List<EvaluatorInfo>();
            EvaluatorInfoBLL.SelectByDepartment(evaluatorinfo, department, ref exception);
            Title.Text = department + "考评人名单:";

            DataTable table = new DataTable();
            table = evaluatorinfo.ListToDataTable();
            return table;
        }
        protected void Submit_Click(object sender, EventArgs e)
        {
            DataTable table = new DataTable();
            table = searchSql();
            if (table.Rows.Count <= 0)
            {
                ClientScript.RegisterStartupScript(this.GetType(), "", "alert('考评者名单尚未制定！')", true);
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
            table = searchSql();
            table.Columns.Remove("UiType");
            string filename = fname;
            string path = Server.MapPath("");
            path = path + "\\temp.xls";
            JSON.dataTableToCsv(table, path);

            Response.Clear();
            Response.Buffer = true;
            Response.Charset = "utf-8";
            Response.AppendHeader("Content-Disposition", "attachment;filename=" + filename + ".xls");
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
            List<EvaluatorInfo> evaluatorinfo = new List<EvaluatorInfo>();
            evaluatorinfo = JSON.isEfect1(UserID.Value);
            EvaluatorInfo deleted = evaluatorinfo.ElementAt(0);

            //EvaluatorInfoBLL.Update(deleted, ref exception);
            EvaluatorInfoBLL.Delete(deleted.EvID, ref exception);

            DataTable table = new DataTable();
            table = searchSql();
            string json = JSON.DataTableToJson(table);
            JsonData.Value = json;

            ClientScript.RegisterStartupScript(this.GetType(), "", "load_userinfo()", true);
            return;
        }
    }
}