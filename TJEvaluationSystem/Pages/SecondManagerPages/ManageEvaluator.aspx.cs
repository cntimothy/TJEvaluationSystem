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
            //string username = (string)Session["username"];
            string username = "admin2";
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
                    string json = JSON.DataTableToJson(table);
                    JsonData.Value = json;
                    //
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
            //string username = (string)Session["username"];
            string username = "admin2";
            string uiDepart = "";
            string evaluatedID = UserID.Value;
            List<Manager> managers = new List<Manager>();

            if (ManagerBLL.SelectByID(username, ref managers, ref exception))
            {
                uiDepart = managers.ElementAt(0).MDepartment;
                List<UserInfo> ui = new List<UserInfo>();
                UserInfoBLL.SelectByDepartment(uiDepart, ref ui, ref exception);
                int i = 0;
                for (; i < ui.Count; i++)
                {
                    if (ui.ElementAt(i).UiID == evaluatedID)
                        break;
                }

                ui.RemoveAt(i);
                if (ui.Count <= 0)
                    return false;
                DataTable table = new DataTable();
                table = ui.ListToDataTable();
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
            //string username = (string)Session["username"];
            string username = "admin2";
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
            //List<UserInfo> user = new List<UserInfo>();

           

        }

        protected void Submit(object sender, EventArgs e)
        {
            exception = "";
            string role = "";
            string strData = JsonChose.Value;
            List<tempui> userData = JSON.ScriptDeserialize<List<tempui>>(strData);
            Evaluator[] model = new Evaluator[userData.Count];
            for (int i = 0; i < userData.Count; i++)
            {
                tempui userinfo = new tempui();
                userinfo = userData.ElementAt(i);

                model[i] = new Evaluator();
                model[i].UiID = userinfo.UiID;
                model[i].EvaluatedID = UserID.Value;
                model[i].Relation = role;
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
                ClientScript.RegisterStartupScript(this.GetType(), "", "showList1()", true);
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
                ClientScript.RegisterStartupScript(this.GetType(), "", "showList2()", true);
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
            public string UiID;
            public string Relation;
        }

        private void adjustTable(DataTable dt, ref string exception)
        {
            dt.Columns.Add("EvaluatedName");
            dt.Columns.Add("EvaluatorName");
            dt.Columns.Add("EvaluatorDep");
            List<UserInfo> ui = new List<UserInfo>();
            foreach (DataRow dr in dt.Rows)
            {
                ui.Clear();
                UserInfoBLL.Select(ref ui, dr["UiID"].ToString(), ref exception);
                dr["EvaluatorName"] = ui[0].UiName;
                dr["EvaluatorDep"] = ui[0].UiDepartment;
                ui.Clear();
                UserInfoBLL.Select(ref ui, dr["EvaluatedID"].ToString(), ref exception);
                dr["EvaluatedName"] = ui[0].UiName;
            }
        }
    }
}