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
    public partial class CheckEvaluator : System.Web.UI.Page
    {
        private string exception = "";
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        protected DataTable searchSql()
        {
            int s = Convert.ToInt32(Depart.Value);
            List<UserInfo> userinfo = new List<UserInfo>();
            switch (s)
            {
                case 0:
                    UserInfoBLL.Select(4, ref userinfo, ref exception);
                    UserInfoBLL.Select(6, ref userinfo, ref exception);
                    UserInfoBLL.Select(7, ref userinfo, ref exception);
                    UserInfoBLL.Select(9, ref userinfo, ref exception);
                    
                    break;
                case 1:
                    UserInfoBLL.Select("cs", 4, ref userinfo, ref exception);
                    UserInfoBLL.Select("cs", 6, ref userinfo, ref exception);
                    UserInfoBLL.Select("cs", 7, ref userinfo, ref exception);
                    UserInfoBLL.Select("cs", 9, ref userinfo, ref exception);
                    
                    break;
                default:
                    UserInfoBLL.Select(4, ref userinfo, ref exception);
                    UserInfoBLL.Select(6, ref userinfo, ref exception);
                    UserInfoBLL.Select(7, ref userinfo, ref exception);
                    UserInfoBLL.Select(9, ref userinfo, ref exception);
                    
                    break;

            }

            DataTable table = new DataTable();
            table = userinfo.ListToDataTable();
            return table;
        }

        protected void Search_Click(object sender, EventArgs e)
        {
            // Session.RemoveAll();
            //UpdatePanel1.Update();

            DataTable table = new DataTable();
            table = searchSql();

            string json = JSON.DataTableToJson(table);
            JsonData.Value = json;

            ClientScript.RegisterStartupScript(this.GetType(), "", "load_userinfo()", true);
            return;

        }

        protected void Check_User(object sender, EventArgs e)
        {
            string evaluated = UserID.Value;
            
            List<Evaluator> model = new List<Evaluator>();
            if (EvaluatorBLL.Select(ref model, evaluated, 1, ref exception))
            {
                this.pass.Text = "已通过审核";
                DataTable table = new DataTable();
                table = model.ListToDataTable();
                string json = JSON.DataTableToJson(table);
                JsonList.Value = json;
                ClientScript.RegisterStartupScript(this.GetType(), "", "showList1()", true);
                return;
            }

            if (EvaluatorBLL.Select(ref model, evaluated, 0, ref exception))
            {
                this.pass.Text = "未通过审核";
                DataTable table = new DataTable();
                table = model.ListToDataTable();
                string json = JSON.DataTableToJson(table);
                JsonList.Value = json;
                ClientScript.RegisterStartupScript(this.GetType(), "", "showList1()", true);
                return;
            }
            Errors.Value = "考评人名单尚未制定";
            this.Chose.Value = "submit";
            ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);

        }

        protected void Submit_Click(object sender, EventArgs e)
        {
            string evaluated = UserID.Value;
            if (evaluated.Length <= 0)
            {
                Errors.Value = "没有选中考评人名单";
                this.Chose.Value = "submit";
                ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);
                return;
            }
            List<Evaluator> model = new List<Evaluator>();
            if (EvaluatorBLL.Select(ref model, evaluated, 1, ref exception))
            {
                Errors.Value = "考评人名单已通过审核";
                this.Chose.Value = "submit";
                ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);
                return;
            }

            if (EvaluatorBLL.Select(ref model, evaluated, 0, ref exception))
            {
                for (int i = 0; i < model.Count; i++)
                {
                    model[i].Pass = 1;
                    if (!EvaluatorBLL.Update1(model[i], ref exception))
                    {
                        Errors.Value = exception;
                        this.Chose.Value = "submit";
                        ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);
                        return;
                    }
                }
                this.pass.Text = "已通过审核";
                //DataTable table = new DataTable();
                //table = model.ListToDataTable();
                //string json = JSON.DataTableToJson(table);
                //JsonList.Value = json;
                ClientScript.RegisterStartupScript(this.GetType(), "", "showList1()", true);
                return;
            }
            Errors.Value = "考评人名单尚未制定";
            this.Chose.Value = "submit";
            ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);
        }

        protected void Dao_Click(object sender, EventArgs e)
        {
            string evaluated = UserID.Value;
            if (evaluated.Length <= 0)
            {
                Errors.Value = "没有选中考评人名单";
                this.Chose.Value = "submit";
                ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);
                return;
            }

            List<Evaluator> model = new List<Evaluator>();
            if (EvaluatorBLL.Select(ref model, evaluated, 1, ref exception))
            {
                DataTable table = new DataTable();
                table = model.ListToDataTable();
                string filename = evaluated + "的考评人名单(已通过审核)";
                Export(filename, table);
               
                return;
            }

            if (EvaluatorBLL.Select(ref model, evaluated, 0, ref exception))
            {
                DataTable table = new DataTable();
                table = model.ListToDataTable();
                string filename = evaluated + "的考评人名单(未通过审核)";
                Export(filename, table);
                return;
            }
            Errors.Value = "考评人名单尚未制定";
            this.Chose.Value = "submit";
            ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);

            
        }

        private void Export(string filename, DataTable table)
        {
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

        
    }
}