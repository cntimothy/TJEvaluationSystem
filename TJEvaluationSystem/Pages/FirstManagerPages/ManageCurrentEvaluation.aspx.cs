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

namespace TJEvaluationSystem.Pages.FirstManagerPages
{
    public partial class ManageCurrentEvaluation : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                //检查是否存在正在进行的考评
                if (EvaluationHistoryBLL.CheckActiveEvaluation()!=-1)
                {
                    //存在
                    ClientScript.RegisterStartupScript(this.GetType(), "", "ExistActiveEvaluation();", true);
                }
                else
                {
                    //不存在
                    ClientScript.RegisterStartupScript(this.GetType(), "", "NoActiveEvaluation();", true);
                }
            }
        }

        protected System.Data.DataTable searchSql()
        {
            string exception = "";
            string department = Department.SelectedValue;
            List<UserInfo> userinfo = new List<UserInfo>();
            string type = "____1%";
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
            System.Data.DataTable table = new System.Data.DataTable();
            table = userinfo.ListToDataTable();
            return table;
        }

        protected void Search_Click(object sender, EventArgs e)
        {
            string exception = "";
            System.Data.DataTable table = new System.Data.DataTable();
            table = searchSql();
            if (table == null)
                return;

            adjustTable(table, ref exception); //改table，加栏目

            table.DefaultView.Sort = "UiEvaluationStatus asc"; //给table按状态排序
            table = table.DefaultView.ToTable();

            string json = JSON.DataTableToJson(table);
            JsonData.Value = json;

            ClientScript.RegisterStartupScript(this.GetType(), "", "load_userinfo()", true);
            return;

        }

        //开始新考评
        protected void BStartNewEvaluation_Click(object sender, EventArgs e)
        {
            if (EvaluationHistoryBLL.StartNewEvaluation())
            {
                //成功
                ScriptManager.RegisterStartupScript(BStartNewEvaluation, this.GetType(), "fun", "SuccessStartNewEvaluation();", true);
            } 
            else
            {
                //失败
                ScriptManager.RegisterStartupScript(BStartNewEvaluation, this.GetType(), "fun", "FailStartNewEvaluation();", true);
            }
        }

        private void adjustTable(DataTable dt, ref string exception)
        {
            //0：未开始， 1：正在考评， 2：已结束
            dt.Columns.Add("EvaluationStatus");
            foreach (DataRow dr in dt.Rows)
            {
                switch ((int)dr["UiEvaluationStatus"])
                { 
                    case 0:
                        dr["EvaluationStatus"] = "未开始";
                        break;
                    case 1:
                        dr["EvaluationStatus"] = "正在考评";
                        break;
                    case 2:
                        dr["EvaluationStatus"] = "已结束";
                        break;
                }
            }
        }
    }
}