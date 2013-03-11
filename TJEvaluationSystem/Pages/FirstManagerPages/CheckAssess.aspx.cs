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

            }

        }

        protected void LoadTableData(object sender, EventArgs e)
        {
            string department = Department.SelectedValue;
            string sql1 = "";
            if (department == "0")
            {
                sql1 = "select * from tb_AssessTable ";
            }
            else
            {
                sql1 = "select * from tb_AssessTable where atDep = '" + department + "'";
            }
            string sql2 = "select * from tb_StanderLib";
            List<AssessTable> at = new List<AssessTable>();
            string exception = "";
            if (!AssessTableBLL.Select(sql1, ref at, ref exception) || exception != "" || at.Count <= 0)
            {
                ClientScript.RegisterStartupScript(this.GetType(), "error", "f_alert('error','数据库中没有考核表！');", true);
                return;
            }
            exception = "";
            List<StanderLib> ui = StanderLibBLL.Select(sql2, ref exception);
            if (ui == null || ui.Count <= 0 || exception != "")
            {
                ClientScript.RegisterStartupScript(this.GetType(), "error", "f_alert('error','指标库为空！');", true);
                return;
            }
           
            var jser = new JavaScriptSerializer();
            var json = jser.Serialize(at);
            var json2 = jser.Serialize(ui);
            json = "{\"Rows\":" + json + ",\"Total\":" + at.Count + "}";
            JsonData.Value = json;
            JsonData2.Value = json2;
            ClientScript.RegisterStartupScript(this.GetType(), "fun", "ShowAllTables();", true);
        }

        //设置审核状态
        protected void BSetPassed_Click(object sender, EventArgs e)
        {
            string id = JsonData.Value;
            string type = JsonData2.Value;
            if (id == "" || id == null || type == "" || type == null)
            {
                ScriptManager.RegisterStartupScript(BSetPassed, this.GetType(), "error", "f_alert('error','获取数据失败，请重试');", true);
                return;
            }
            int atID=int.Parse(id);
            int atPass;
            if (type == "true")
                atPass=1;
            else if (type == "false")
                atPass=0;
            else
            {
                ScriptManager.RegisterStartupScript(BSetPassed, this.GetType(), "error", "f_alert('error','获取数据失败，请重试');", true);
                return;
            }
            string massge="";
            if (!AssessTableBLL.SetAssesstablePassed(atID, atPass, ref massge) || massge != "")
            {
                ScriptManager.RegisterStartupScript(BSetPassed, this.GetType(), "error", "f_alert('error','设置审核状态失败，请重试');", true);
                return;
            }
            ScriptManager.RegisterStartupScript(BSetPassed, this.GetType(), "error", "SetPassedDone();", true);
        }   
        
        //刷新
        protected void BRefresh_Click(object sender, EventArgs e)
        {
 
        }
    }
}