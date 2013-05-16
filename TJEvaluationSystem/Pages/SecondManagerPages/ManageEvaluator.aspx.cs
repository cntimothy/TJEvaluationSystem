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
    public partial class ManageEvaluator : System.Web.UI.Page
    {
        private string exception = "";

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                
            }
        }
        private bool searchEvaluated()
        {
            exception = "";
            string username = (string)Session["username"];
            //string username = "admin2";
            string uiDepart = "";

            List<Manager> managers = new List<Manager>();

            if (ManagerBLL.SelectByID(username, ref managers, ref exception))
            {
                uiDepart = managers.ElementAt(0).MDepartment;
                Title.Text = uiDepart + "被考评人名单：";
                List<UserInfo> Evaluated = new List<UserInfo>();
                string type = "____1%";
                bool b = UserInfoBLL.Select(uiDepart, type, ref Evaluated, ref exception);
                if (b)
                {
                    DataTable table = new DataTable();
                    table = Evaluated.ListToDataTable();
                    //给table增加Comment和Passed栏
                    adjustTable2(table, ref exception);
                    int sumCount = 0, unPassCount = 0, passCount = 0, unMakeCount = 0;

                    countNumber(table, ref sumCount, ref unPassCount, ref passCount, ref unMakeCount);//做汇总
                    //Title.Text += "（总人数：" + sumCount + " \\未制作：" + unMakeCount + " \\已保存：" + savedCount + " \\已提交：" + unPassCount + " \\已审核：" + passCount + "）";
                    Title.Text += "( 未制作：" + unMakeCount + ", 已提交：" + unPassCount + ", 已审核：" + passCount + ", 总人数：" + sumCount + " )";

                    table.DefaultView.Sort = "Passed desc"; //给table按状态排序
                    table = table.DefaultView.ToTable();

                    string json = JSON.DataTableToJson(table);
                    JsonData.Value = json;
                    return true;

                }

                else
                {
                    Errors.Value = "本部门尚无被考评人！";
                    //
                    return false;
                }
            }
            else
            {
                Errors.Value = "您无此操作权限！";
                return false;
            }
        }

        //搜索考评者
        private bool searchEvaluator()
        {
            exception = "";
            string username = (string)Session["username"];
            //string username = "admin2";
            string mDepart = "";
            string evaluatedID = UserID.Value;
            List<Manager> managers = new List<Manager>();

            if (ManagerBLL.SelectByID(username, ref managers, ref exception))
            {
                mDepart = managers.ElementAt(0).MDepartment;
                List<EvaluatorInfo> evi = new List<EvaluatorInfo>();
                EvaluatorInfoBLL.SelectByDepartment(evi, mDepart, ref exception);
                
                if (evi.Count <= 0)
                    return false;
                DataTable table = new DataTable();
                table = evi.ListToDataTable();
                string json = JSON.DataTableToJson(table);
                JsonEvaluator.Value = json;
                return true;
                
            }
            else
                return false;

        }

        //调用searchEvaluated（）搜索被考评者
        protected void Search(object sender, EventArgs e)
        {
            if (searchEvaluated())
            {
                ClientScript.RegisterStartupScript(this.GetType(), "", "load_userinfo()", true);
            }
            else
                ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);
        }

        protected void Search_User(object sender, EventArgs e)
        {
            exception = "";
            string username = (string)Session["username"];
            //string username = "admin2";
            string evaluatedID = UserID.Value;

            LUserName.Text = "被考评人姓名:" + UserName.Value; //显示被考评人姓名

            List<Evaluator> model = new List<Evaluator>();
            EvaluatorBLL.Select(ref model, evaluatedID, 1, ref exception);
            if (model.Count > 0)
            {
                Errors.Value = "考评人名单已制定并通过了审核！";
                this.Chose.Value = "submit";
                ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);
                return;
            }

            else
            {
                if (searchEvaluator())
                {
                    ClientScript.RegisterStartupScript(this.GetType(), "", "show_evaluator()", true);
                }
                else
                {
                    Errors.Value = "无可选考评人！";
                    this.Chose.Value = "submit";
                    ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);
                    return;
                }
            }
        }

        protected void Submit(object sender, EventArgs e)
        {
            exception = "";
            string strData = JsonChose.Value;
            List<tempui> userData = JSON.ScriptDeserialize<List<tempui>>(strData);
            Evaluator[] model = new Evaluator[userData.Count];
            for (int i = 0; i < userData.Count; i++)
            {
                tempui userinfo = new tempui();
                userinfo = userData.ElementAt(i);

                model[i] = new Evaluator();
                model[i].UiID = userinfo.EvID;
                model[i].EvaluatedID = UserID.Value;
                model[i].Pass = 0;
                model[i].Relation = userinfo.Relation;
                 
            }

            if (EvaluatorBLL.Insert(model, ref exception))
            {
                Errors.Value = "提交成功！";
                this.Chose.Value = "submit";
                ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);
                
                return;
            }
            else
            {
                if (exception != "" || exception != null)
                {
                    Errors.Value = exception;
                    this.Chose.Value = "submit";
                    ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);
                    return;
                }
            }
        }

        protected void Check_User(object sender, EventArgs e)
        {
            exception = "";
            string evaluated = UserID.Value;

            List<Evaluator> model = new List<Evaluator>();
            if (EvaluatorBLL.Select(ref model, evaluated, 1, ref exception))
            {
                this.pass.Text = "审核通过";
                DataTable table = new DataTable();
                table = model.ListToDataTable();
                adjustTable(table, ref exception); //为表格加上用户名显示
                string json = JSON.DataTableToJson(table);
                JsonList.Value = json;
                ClientScript.RegisterStartupScript(this.GetType(), "", "showList()", true);
                return;
            }

            if (EvaluatorBLL.Select(ref model, evaluated, 0, ref exception))
            {
                this.pass.Text = "审核未通过";
                DataTable table = new DataTable();
                table = model.ListToDataTable();
                adjustTable(table, ref exception); //为表格加上用户名显示
                string json = JSON.DataTableToJson(table);
                JsonList.Value = json;
                ClientScript.RegisterStartupScript(this.GetType(), "", "showList()", true);
                return;
            }
            Errors.Value = "考评人名单尚未制定";
            this.Chose.Value = "submit";
            ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);

        }

        protected void Delete(object sender, EventArgs e)
        {
            exception = "";
            string json = this.ListDelete.Value;
            List<Evaluator> model = JSON.ScriptDeserialize<List<Evaluator>>(json);

            if (!EvaluatorBLL.Delete(model.ElementAt(0).UiID, model.ElementAt(0).EvaluatedID, ref exception))
            {
                Errors.Value = exception;
                this.Chose.Value = "submit";
                ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);
            }
            else
                Check_User(sender, e);
        }

        public class tempui
        {
            public string EvID;
            public string Relation;
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

        private void adjustTable2(DataTable dt, ref string exception)
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
                if (EvaluatorBLL.SelectByID(evaluators, (string)dr["UiID"], ref exception))
                {
                    if (evaluators[0].Pass.ToString() == "0")
                    {
                        dr["Passed"] = "已提交";
                    }
                    else if (evaluators[0].Pass.ToString() == "1")
                    {
                        dr["Passed"] = "已审核";
                    }
                    else
                    {
                        dr["Passed"] = "已保存";
                    }
                }
                else
                {
                    dr["Passed"] = "未制作";
                }
            }
        }

        //统计汇总情况
        private void countNumber(DataTable dt, ref int sumCount, ref int unPassCount, ref int passCount, ref int unMakeCount)
        {
            foreach (DataRow dr in dt.Rows)
            {
                switch (dr["Passed"].ToString())
                {
                    case "已提交":
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