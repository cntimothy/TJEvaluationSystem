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
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        protected DataTable searchSql()
        {
            string exception = "";
            string department = Department.SelectedValue;
            string type = "____1%";
            List<UserInfo> userinfo = new List<UserInfo>();
            if(department == "0")
            {
                UserInfoBLL.SelectByType(type, ref userinfo, ref exception);
            }
            else
            {
                UserInfoBLL.Select(department, type, ref userinfo, ref exception);
            }
            if (userinfo == null)
                return null;
            DataTable table = new DataTable();
            table = userinfo.ListToDataTable();
            return table;
        }

        protected void Search_Click(object sender, EventArgs e)
        {
            DataTable table = new DataTable();
            table = searchSql();
            if (table == null)
            {
                return;
            }

            string json = JSON.DataTableToJson(table);
            JsonData.Value = json;

            ClientScript.RegisterStartupScript(this.GetType(), "", "load_userinfo()", true);
            return;

        }

        protected void Check_User(object sender, EventArgs e)
        {
            string exception = "";
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
            exception = "";
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
            string exception = "";
            string evaluated = UserID.Value;
            if (evaluated.Length <= 0)
            {
                Errors.Value = "没有选中考评人名单";
                this.Chose.Value = "submit";
                ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);
                return;
            }
            List<Evaluator> model = new List<Evaluator>();
            exception = "";
            if (EvaluatorBLL.Select(ref model, evaluated, 1, ref exception))
            {
                Errors.Value = "考评人名单已通过审核";
                this.Chose.Value = "submit";
                ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);
                return;
            }

            exception = "";
            if (EvaluatorBLL.Select(ref model, evaluated, 0, ref exception))
            {
                for (int i = 0; i < model.Count; i++)
                {
                    model[i].Pass = 1;

                    exception = "";
                    if (!EvaluatorBLL.Update1(model[i], ref exception))
                    {
                        Errors.Value = exception;
                        this.Chose.Value = "submit";
                        ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);
                        return;
                    }
                }
                this.pass.Text = "已通过审核";
                ClientScript.RegisterStartupScript(this.GetType(), "", "showList1()", true);
                return;
            }
            Errors.Value = "考评人名单尚未制定";
            this.Chose.Value = "submit";
            ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);
        }

        protected void Dao_Click(object sender, EventArgs e)
        {
            string exception = "";
            string evaluated = UserID.Value;
            if (evaluated.Length <= 0)
            {
                Errors.Value = "没有选中考评人名单";
                this.Chose.Value = "submit";
                ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);
                return;
            }

            List<Evaluator> model = new List<Evaluator>();

            exception = "";
            if (EvaluatorBLL.Select(ref model, evaluated, 1, ref exception))
            {
                DataTable table = new DataTable();
                table = model.ListToDataTable();
                string filename = evaluated + "的考评人名单(已通过审核)";
                Export(filename, table);
               
                return;
            }

            exception = "";
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

        protected void SendBack_Click(object sender, EventArgs e)
        {
            string exception = "";
            string evaluated = UserID.Value;
            if (evaluated.Length <= 0)
            {
                Errors.Value = "没有选中考评人名单";
                this.Chose.Value = "submit";
                ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);
                return;
            }
            List<Evaluator> model = new List<Evaluator>();

            if (EvaluatorBLL.Select(ref model, evaluated, 0, ref exception))
            {
                Errors.Value = "考评人名单并未通过，待审核";
                this.Chose.Value = "submit";
                ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);
                return;
            }
            if (EvaluatorBLL.Select(ref model, evaluated, 1, ref exception))
            {
                for (int i = 0; i < model.Count; i++)
                {
                    model[i].Pass = 0;
                    exception = "";
                    if (!EvaluatorBLL.Update3(model[i], ref exception))
                    {
                        Errors.Value = exception;
                        this.Chose.Value = "submit";
                        ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);
                        return;
                    }
                }
                this.pass.Text = "考评人名单已退回，待审核";
                ClientScript.RegisterStartupScript(this.GetType(), "", "showList1()", true);
                return;
            }
            Errors.Value = "已退回";
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