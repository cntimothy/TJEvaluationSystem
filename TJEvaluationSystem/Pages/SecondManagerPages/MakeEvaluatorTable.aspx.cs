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

namespace TJEvaluationSystem.Pages.SecondManagerPages
{
    public partial class MakeEvaluatorTable : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
                LoadStanderData();
        }

        //导入数据到页面显示
        public void LoadStanderData()
        {
            string sqlCmd = "select * from tb_StanderLib";
            string exception = "";

            List<StanderLib> ui = StanderLibBLL.Select(sqlCmd, ref exception);
            if (exception.Length > 0)
            {
                //Alert
                ClientScript.RegisterStartupScript(this.GetType(), "error", "f_alert('error','指标库为空！');", true);
            }
            else
            {
                if (ui.Count <= 0)
                {
                    ClientScript.RegisterStartupScript(this.GetType(), "error", "f_alert('error','数据库中没有相关人员信息！');", true);
                }
                else
                {
                    var jser = new JavaScriptSerializer();
                    var json = jser.Serialize(ui);
                    json = "{\"Rows\":" + json + ",\"Total\":" + ui.Count + "}";
                    JsonData.Value = json;
                    ClientScript.RegisterStartupScript(this.GetType(), "showdata", "ShowStander();", true);
                }
            }
        }
    }
}