using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BLL;
using Model;
using DBUtility;
using System.Web.Script.Serialization;
using System.Data;

namespace TJEvaluationSystem.Pages.FirstManagerPages
{
    public partial class CheckAssess : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                loadSummary();
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

            int sumCount = 0, unPassCount = 0, passCount = 0, unMakeCount = 0;

            countNumber(table, ref sumCount, ref unPassCount, ref passCount, ref unMakeCount);//做汇总
            //Title.Text += "（总人数：" + sumCount + "  未制作：" + unMakeCount + "  未审核：" + unPassCount + "  已审核：" + passCount + "）";
            Title.Text += "（未审核：" + unPassCount + "， 已审核：" + passCount + "， 未制作：" + unMakeCount + "， 总数：" + sumCount + "）";

            table.DefaultView.Sort = "Passed desc"; //给table按状态排序
            table = table.DefaultView.ToTable();
            string json = JSON.DataTableToJson(table);
            JsonData.Value = json;

            ClientScript.RegisterStartupScript(this.GetType(), "", "load_userinfo()", true);
            return;

        }

        protected void SearchAssess_Click(object sender, EventArgs e)
        {
            var jser = new JavaScriptSerializer();
            string exception = "";
            
            //查询指标库，判断是否为空
            string sql2 = "select * from tb_StanderLib";
            List<StanderLib> sls = StanderLibBLL.Select(sql2, ref exception);
            if (sls == null || sls.Count <= 0 || exception != "")
            {
                ClientScript.RegisterStartupScript(this.GetType(), "error", "f_alert('error','指标库为空！');", true);
                return;
            }
            var json2 = jser.Serialize(sls);
            JsonData2.Value = json2;

            //根据ID查询考核表
            string evaluatedID = UserID.Value;
            AssessTable at = new AssessTable();
            exception = "";
            if (AssessTableBLL.Select(evaluatedID, ref at, ref exception))
            {
                if (at.AtPass == 1)
                {
                    passYoN.Text = "已审核";
                    Comment.Text = "";
                }
                else
                {
                    passYoN.Text = "未审核";
                    Comment.Text = "审核意见：" + at.AtComment;
                }

                List<AssessTable> ats = new List<AssessTable>();
                ats.Add(at);
                var json = jser.Serialize(ats);
                json = "{\"Rows\":" + json + ",\"Total\":" + ats.Count + "}";
                JsonData.Value = json;
                ClientScript.RegisterStartupScript(this.GetType(), "fun", "ShowDetail();", true);
            }
        }

        //设置审核状态        
        protected void BSetPassedTrue_Click(object sender, EventArgs e)
        {
            string exception = "";
            string id = UserID.Value;
            if (AssessTableBLL.SetAssesstablePassed(id, 1, ref exception))
            {
                if (AssessTableBLL.UpdateComment(id, "", ref exception)) //审核意见清空
                {
                    ScriptManager.RegisterStartupScript(BSetPassedTrue, this.GetType(), "error", "SetPassedDone();", true);
                }
            }
        }

        protected void BSetPassedFalse_Click(object sender, EventArgs e)
        {
            string exception = "";
            string id = UserID.Value;
            if (AssessTableBLL.SetAssesstablePassed(id, 0, ref exception))
            {
                ScriptManager.RegisterStartupScript(BSetPassedFalse, this.GetType(), "error", "SetPassedDone();", true);
            }
        }
        
        //刷新
        protected void BRefresh_Click(object sender, EventArgs e)
        {
 
        }

        private void adjustTable(DataTable dt, ref string exception)
        {
            //给table添加prbComment栏
            dt.Columns.Add("Comment");
            dt.Columns.Add("Passed");
            AssessTable assessTable = new AssessTable();
            foreach (DataRow dr in dt.Rows)
            {
                if (AssessTableBLL.Select((string)dr["UiID"], ref assessTable, ref exception))
                {
                    //0：已提交 1：已审核 2：未制作 
                    dr["Comment"] = assessTable.AtComment;
                    if (assessTable.AtPass.ToString() == "1")
                    {
                        dr["Passed"] = "已审核";
                    }
                    else if (assessTable.AtPass.ToString() == "0")
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
                    dr["Comment"] = "";
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

        protected void WriteComment_Click(object sender, EventArgs e)
        {
            string exception = "" ;
            string newComment = EvaComment.Value;
            string id = UserID.Value;
            if (AssessTableBLL.UpdateComment(id, newComment, ref exception))
            {
                ScriptManager.RegisterStartupScript(WriteComment, this.GetType(), "error", "setCommentDone();", true);
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
    }
}