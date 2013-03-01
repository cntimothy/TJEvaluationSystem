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
    public partial class ManageEvaluatorTable : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                LoadEvaluatorTable();
            }
            
        }

        //导入考核表
        public void LoadEvaluatorTable()
        {
            //查询考核表
            string username = (string)Session["username"];
            string sqlcmd = "select * from tb_AssessTable where atUserID='" + username+"'";
            List<AssessTable> at = new List<AssessTable>();
            string e = "";
            if (!LoadStanderLib())
                return;
            if (!AssessTableBLL.Select(sqlcmd, ref at, ref e) || at.Count == 0)
                JsonData3.Value = "";
            else 
            {
                JsonData3.Value = JSON.ScriptSerialize<AssessTable>(at[0]);
            }
            ClientScript.RegisterStartupScript(this.GetType(), "fun", "ShowTable();", true);
        }

        //获取指标库
        public bool LoadStanderLib()
        {
            string sqlCmd = "select * from tb_StanderLib  where slType<>'否决指标'";
            string sqlCmdVeto = "select * from tb_StanderLib  where slType='否决指标'";
            string exception = "";

            List<StanderLib> ui = StanderLibBLL.Select(sqlCmd, ref exception);
            if (exception.Length > 0)
            {
                //Alert
                ClientScript.RegisterStartupScript(this.GetType(), "error", "f_alert('error','获取指标数据失败，请重试');", true);
                return false;
            }
            else
            {
                if (ui.Count <= 0)
                {
                    ClientScript.RegisterStartupScript(this.GetType(), "error", "f_alert('error','获取指标数据失败，请重试');", true);
                    return false;
                }
                else
                {
                    List<StanderLib> uiVeto = StanderLibBLL.Select(sqlCmdVeto, ref exception);
                    if (exception.Length > 0)
                    {
                        //Alert
                        ClientScript.RegisterStartupScript(this.GetType(), "error", "f_alert('error','获取指标数据失败，请重试');", true);
                        return false;
                    }
                    if (uiVeto.Count <= 0)
                    {
                        ClientScript.RegisterStartupScript(this.GetType(), "error", "f_alert('error','获取指标数据失败，请重试');", true);
                        return false;
                    }
                    else
                    {
                        var jser = new JavaScriptSerializer();
                        var json = jser.Serialize(ui);
                        var jsonVeto = jser.Serialize(uiVeto);
                        json = "{\"Rows\":" + json + ",\"Total\":" + ui.Count + "}";
                        jsonVeto = "{\"Rows\":" + jsonVeto + ",\"Total\":" + uiVeto.Count + "}";
                        string type = JsonData.Value;
                        JsonData.Value = json;
                        JsonData2.Value = jsonVeto;
                        return true;
                    }
                }
            }
        }

        //获取指标库
        protected void BGetStanderLib_Click(object sender, EventArgs e)
        {
            if (LoadStanderLib())
            {
                ScriptManager.RegisterStartupScript(BGetStanderLib, this.GetType(), "showdata", "ShowStander();", true);
                ScriptManager.RegisterStartupScript(BGetStanderLib, this.GetType(), "showdata", "ShowVetoStander();", true);
            }
        }

        //制作考核表完成
        protected void BFinishMakeTable_Click(object sender, EventArgs e)
        {
            //转换数据
            string data = JsonData.Value;
            if (data == "")
            {
                ScriptManager.RegisterStartupScript(BFinishMakeTable, this.GetType(), "error", "f_alert('error','保存失败，请重试!');", true);
                return;
            }
            AssessTable[] s = JSON.ScriptDeserialize<AssessTable[]>(data);  //将Json字符串转换为UserInfo对象
            if (s.Length == 0)
            {
                ScriptManager.RegisterStartupScript(BFinishMakeTable, this.GetType(), "error", "f_alert('error','保存失败，请重试!');", true);
                return;
            }
            string message = "";
            AssessTable assess = s[0];
            //查询用户信息
            string username = (string)Session["username"];
            List<UserInfo> ui = new List<UserInfo>();
            if (!UserInfoBLL.Select(ref ui, username, ref message) || ui.Count==0)
            {
                // 失败
                ScriptManager.RegisterStartupScript(BFinishMakeTable, this.GetType(), "error", "f_alert('error','保存失败，请重试!');", true);
                return;
            }
            else 
            {
                assess.AtUserID = username;
                assess.AtDep = ui[0].UiDepartment;
            }
            assess.AtDate = DateTime.Now.Date;
            assess.AtPass = 0;
            //更新数据库
            if (!AssessTableBLL.Insert(s, ref message))
            {
                // 失败
                ScriptManager.RegisterStartupScript(BFinishMakeTable, this.GetType(), "error", "f_alert('error','保存失败，请重试!');", true);
            }
            else
            {
                //成功
                JsonData.Value = data;
                ScriptManager.RegisterStartupScript(BFinishMakeTable, this.GetType(), "success", "SaveMakeTableDone();", true);
            }
        }
        //编辑考核表完成
        protected void BFinishEditTable_Click(object sender, EventArgs e)
        {
            //转换数据
            string data = JsonData.Value;
            if (data == "")
            {
                ScriptManager.RegisterStartupScript(BFinishMakeTable, this.GetType(), "error", "f_alert('error','保存失败，请重试!');", true);
                return;
            }
            AssessTable[] s = JSON.ScriptDeserialize<AssessTable[]>(data);  //将Json字符串转换为UserInfo对象
            if (s.Length == 0)
            {
                ScriptManager.RegisterStartupScript(BFinishMakeTable, this.GetType(), "error", "f_alert('error','保存失败，请重试!');", true);
                return;
            }
            string message = "";
            AssessTable assess = s[0];
            
            //更新数据库
            if (!AssessTableBLL.UpdateStander(assess, ref message))
            {
                // 失败
                ScriptManager.RegisterStartupScript(BFinishMakeTable, this.GetType(), "error", "f_alert('error','保存失败，请重试!');", true);
            }
            else
            {
                //成功
                JsonData.Value = data;
                ScriptManager.RegisterStartupScript(BFinishMakeTable, this.GetType(), "success", "SaveEditTableDone();", true);
            }
        }

        //刷新
        protected void BRefresh_Click(object sender, EventArgs e)
        { 
        }
    }
}