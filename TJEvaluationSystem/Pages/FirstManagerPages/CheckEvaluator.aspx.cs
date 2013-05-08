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
                Title.Text = "所有被考评者名单:";
            }
            else
            {
                UserInfoBLL.Select(department, type, ref userinfo, ref exception);
                Title.Text = department + "被考评者名单:";
            }
            if (userinfo == null)
                return null;
            DataTable table = new DataTable();
            table = userinfo.ListToDataTable();
            return table;
        }

        protected void Search_Click(object sender, EventArgs e)
        {
            string exception = "";
            DataTable table = new DataTable();
            table = searchSql();
            if (table == null)
            {
                return;
            }

            //给table添加Comment和Passed栏
            adjustTable1(table, ref exception);
            int sumCount = 0, unPassCount = 0, passCount = 0, unMakeCount = 0;

            countNumber(table, ref sumCount, ref unPassCount, ref passCount, ref unMakeCount);//做汇总
            Title.Text += "（总人数：" + sumCount + " \\未制作：" + unMakeCount + " \\未审核：" + unPassCount + " \\已审核：" + passCount + "）";

            table.DefaultView.Sort = "Passed asc"; //给table按状态排序
            table = table.DefaultView.ToTable();

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
                adjustTable(table, ref exception);
                string json = JSON.DataTableToJson(table);
                JsonList.Value = json;
                ClientScript.RegisterStartupScript(this.GetType(), "", "showList1()", true);
                return;
            }
            exception = "";
            if (EvaluatorBLL.Select(ref model, evaluated, 0, ref exception))
            {
                this.pass.Text = "未通过审核";
                if (EvaComment.Value != "")
                {
                    Comment.Text = "审核意见：" + EvaComment.Value;
                }
                DataTable table = new DataTable();
                table = model.ListToDataTable();

                adjustTable(table, ref exception);
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
                EvaluatorComment ec = new EvaluatorComment();
                ec.EcEvaluatedID = evaluated;
                ec.EcComment = "";
                EvaluatorCommentBLL.Update(ec, ref exception);
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
            
            List<Evaluator> model = new List<Evaluator>();
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

        protected void WriteComment_Click(object sender, EventArgs e)
        {
            string exception = "";

            EvaluatorComment ec = new EvaluatorComment();
            ec.EcEvaluatedID = UserID.Value;
            ec.EcComment = EvaComment.Value;
            if (EvaluatorCommentBLL.Select(UserID.Value, ref exception))
            {
                EvaluatorCommentBLL.Update(ec, ref exception);
            }
            else
            {
                EvaluatorCommentBLL.Insert(ec, ref exception);
            }
            Response.Write("<script>alert('已提交意见！')</script>");
        }

        private void adjustTable(DataTable dt, ref string exception)
        {
            dt.Columns.Add("EvaluatedName");
            dt.Columns.Add("EvaluatorName");
            dt.Columns.Add("EvaluatorUnit");
            List<UserInfo> ui = new List<UserInfo>();
            List<EvaluatorInfo> evi = new List<EvaluatorInfo>();
            foreach (DataRow dr in dt.Rows)
            {
                evi.Clear();
                EvaluatorInfoBLL.Select(evi, dr["UiID"].ToString(), ref exception);
                dr["EvaluatorName"] = evi[0].EvName;
                dr["EvaluatorUnit"] = evi[0].EvUnit;
                ui.Clear();
                UserInfoBLL.Select(ref ui, dr["EvaluatedID"].ToString(), ref exception);
                dr["EvaluatedName"] = ui[0].UiName;
            }
        }

        private void adjustTable1(DataTable dt, ref string exception)
        {
            dt.Columns.Add("Comment");
            dt.Columns.Add("Passed");
            List<Evaluator> evaluators = new List<Evaluator>();
            string comment = "";
            foreach (DataRow dr in dt.Rows)
            {
                if (EvaluatorCommentBLL.SelectComment((string)dr["UiID"], ref comment, ref exception))
                {
                    dr["Comment"] = comment;
                }
                else
                {
                    dr["Comment"] = "";
                }
                evaluators.Clear();
                if (EvaluatorBLL.SelectByID(evaluators, (string)dr["UiID"], ref exception))
                {
                    //0：已提交 1：已审核 2：未制作 
                    if (evaluators[0].Pass.ToString() == "1")
                    {
                        dr["Passed"] = "已审核";
                    }
                    else if (evaluators[0].Pass.ToString() == "0")
                    {
                        dr["Passed"] = "未审核";
                    }
                    else
                    {
                        dr["Passed"] = "未制作";
                    }
                }
                else
                {
                    dr["Passed"] = "未制作";
                }
            }
        }

        private void countNumber(DataTable dt, ref int sumCount, ref int unPassCount, ref int passCount, ref int unMakeCount)
        {
            foreach (DataRow dr in dt.Rows)
            {
                switch (dr["Passed"].ToString())
                {
                    case "未审核":
                        unPassCount++;
                        break;
                    case "已审核":
                        passCount++;
                        break;
                    default:
                        unMakeCount++;
                        break;
                }
                sumCount++;
            }
        }
    }
}