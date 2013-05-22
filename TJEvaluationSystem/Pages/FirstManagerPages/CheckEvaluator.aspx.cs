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
            if (!IsPostBack)
            {
                loadSummary();
            }
        }

        protected DataTable searchSql()
        {
            string exception = "";
            string department = Department.SelectedValue;
            string type = "____1%";
            List<UserInfo> userinfo = new List<UserInfo>();
            if (department == "0")
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
            Title.Text += "（未审核：" + unPassCount + "， 已审核：" + passCount + "， 未制作：" + unMakeCount + "， 总数：" + sumCount + "）";

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
            if (EvaluatorBLL.SelectByID(model, evaluated, ref exception))
            {
                this.pass.Text = "未审核";
                foreach (Evaluator er in model)
                {
                    if (er.Pass == 1)
                    {
                        this.pass.Text = "已审核";
                        break;
                    }
                }
                DataTable table = new DataTable();
                table = model.ListToDataTable();
                adjustTable(table, ref exception); //为表格加上用户名显示
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
            List<Evaluator> model = new List<Evaluator>();
            string exception = "";
            string evaluated = UserID.Value;
            string strData = JsonChose.Value;

            List<TempEvaluator> tempEvaluatorList = JSON.ScriptDeserialize<List<TempEvaluator>>(strData);//从前端获取考评人名单
            List<string> evaluatorList = new List<String>();
            foreach (TempEvaluator te in tempEvaluatorList)
            {
                evaluatorList.Add(te.UiID);
            }

            //构造新的考评人名单
            if (EvaluatorBLL.SelectByID(model, evaluated, ref exception))
            {
                foreach (Evaluator evaluator in model)
                {
                    if (evaluatorList.Contains(evaluator.UiID))
                    {
                        evaluator.Pass = 1;
                    }
                    else
                    {
                        evaluator.Pass = 0;
                    }

                    exception = "";
                    if (!EvaluatorBLL.Update1(evaluator, ref exception))
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
                this.pass.Text = "已审核";
                ClientScript.RegisterStartupScript(this.GetType(), "", "doneCommit()", true);
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
                    //0：已提交 1：已审核
                    dr["Passed"] = "未审核";
                    foreach (Evaluator e in evaluators)
                    {
                        if (e.Pass.ToString() == "1")
                        {
                            dr["Passed"] = "已审核";
                            break;
                        }
                    }
                    //if (evaluators[0].Pass.ToString() == "1")
                    //{
                    //    dr["Passed"] = "已审核";
                    //}
                    //else if (evaluators[0].Pass.ToString() == "0")
                    //{
                    //    dr["Passed"] = "未审核";
                    //}
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

        private void loadSummary()
        {
            string exception = "";
            DataTable dt = new DataTable();
            DataRow dr;
            List<Summary> ss = new List<Summary>();
            Dictionary<string, TempSummary> dicSummary = new Dictionary<string, TempSummary>();
            //初始化table
            dt.Columns.Add("SDepartment");
            dt.Columns.Add("SUnpass");
            dt.Columns.Add("SUnmake");
            dt.Columns.Add("SPass");
            dt.Columns.Add("SSum");
            List<string> departments = new List<string>();
            UserInfoBLL.Select(departments, ref exception);
            foreach (string depart in departments)
            {
                dr = dt.NewRow();
                dr["SDepartment"] = depart;
                dr["SUnpass"] = 0;
                dr["SUnmake"] = 0;
                dr["SPass"] = 0;
                dr["SSum"] = 0;
                dt.Rows.Add(dr);
            }

            //查询数据库，获取汇总
            if (EvaluatorBLL.SelectSummary(ss, ref exception))
            {
                foreach (Summary s in ss)
                {
                    if (!dicSummary.Keys.Contains(s.Department))
                    {
                        dicSummary.Add(s.Department, new TempSummary());
                    }
                    if (s.Passed == 0)
                    {
                        dicSummary[s.Department].Unpass++;
                    }
                    else if (s.Passed == 1)
                    {
                        dicSummary[s.Department].Pass++;
                    }
                    else
                    {
                        dicSummary[s.Department].Unmake++;
                    }
                    dicSummary[s.Department].Sum++;
                }
            }
            foreach (DataRow dr1 in dt.Rows)
            {
                dr1["SUnpass"] = dicSummary[(string)dr1["SDepartment"]].Unpass;
                dr1["SUnmake"] = dicSummary[(string)dr1["SDepartment"]].Unmake;
                dr1["SPass"] = dicSummary[(string)dr1["SDepartment"]].Pass;
                dr1["SSum"] = dicSummary[(string)dr1["SDepartment"]].Sum;
            }
            if (dt.Rows.Count == 0)
            {
                return;
            }
            string json = JSON.DataTableToJson(dt);
            JsonSummary.Value = json;

            ClientScript.RegisterStartupScript(this.GetType(), "", "load_summary()", true);
        }

        public class TempSummary
        {
            public int Unpass, Unmake, Pass, Sum;
        }

        public class TempEvaluator
        {
            public string UiID = "";
        }
    }
}