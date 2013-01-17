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

namespace TJEvaluationSystem.Pages.FirstManagerPages
{
    public partial class CheckAssess : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                LoadTableData();
            }
            
        }

        protected void LoadTableData()
        {
            string sql1 = "select * from tb_AssessTable";
            string sql2 = "select * from tb_StanderLib";
            List<AssessTable> at = new List<AssessTable>();
            string e = "";
            if (!AssessTableBLL.Select(sql1, ref at, ref e) || e != "" || at.Count <= 0)
            {
                ClientScript.RegisterStartupScript(this.GetType(), "error", "f_alert('error','获取数据失败，请重试');", true);
                return;
            }
            e="";
            List<StanderLib> ui = StanderLibBLL.Select(sql2, ref e);
            if(ui==null||ui.Count<=0||e!="")
            {
                ClientScript.RegisterStartupScript(this.GetType(), "error", "f_alert('error','获取数据失败，请重试');", true);
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