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

namespace TJEvaluationSystem.Pages.SuperManagerPages
{
    public partial class ManageStander : System.Web.UI.Page
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
                ClientScript.RegisterStartupScript(this.GetType(), "error", "f_alert('error','获取数据失败，请重试');", true);
            }
            else
            {
                if (ui.Count <= 0)
                {
                    ClientScript.RegisterStartupScript(this.GetType(), "error", "f_alert('error','获取数据失败，请重试');", true);
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

        //删除指标
        protected void BDeleteStander_Click(object sender, EventArgs e)
        {
            string dataID = JsonData.Value;
            if (dataID == "")
            {
                ScriptManager.RegisterStartupScript(BDeleteStander, this.GetType(), "error", "f_alert('error',' 删除失败，请重试!');", true);
                return;
            }
            int id=-1;
            int.TryParse(dataID, out id);
            string message = "";
            //更新数据库
            if (!StanderLibBLL.Delete(id, ref message))
            {
                //删除失败
                ScriptManager.RegisterStartupScript(BDeleteStander, this.GetType(), "error", "f_alert('error',' 删除失败，请重试!');", true);
            }
            else
            {
                //删除成功
                ScriptManager.RegisterStartupScript(BDeleteStander, this.GetType(), "error", "f_alert('success',' 删除成功');", true);
                ScriptManager.RegisterStartupScript(BDeleteStander, this.GetType(), "success", "RefreshPage();", true);
            }
        }

        //刷新
        protected void BRefrashPage_Click(object sender, EventArgs e)
        {
            LoadStanderData();
        }

        //更新Stander
        protected void BUpdateStander_Click(object sender, EventArgs e)
        {
            string dataUpdate = JsonData.Value;
            if (dataUpdate == "")
            {
                ScriptManager.RegisterStartupScript(BUpdateStander, this.GetType(), "error", "f_alert('error','提交失败，请重试!');", true);
                return;
            }
            StanderLib[] s = JSON.ScriptDeserialize<StanderLib[]>(dataUpdate);  //将Json字符串转换为UserInfo对象
            if (s.Length == 0)
            {
                ScriptManager.RegisterStartupScript(BUpdateStander, this.GetType(), "error", "f_alert('error','提交失败，请重试!');", true);
                return;
            }
            string message = "";
            //更新数据库
            if (!StanderLibBLL.Update(s[0], ref message))
            {
                // 失败
                ScriptManager.RegisterStartupScript(BUpdateStander, this.GetType(), "error", "f_alert('error','提交失败，请重试!');", true);
            }
            else
            {
                //成功
                ScriptManager.RegisterStartupScript(BUpdateStander, this.GetType(), "error", "f_alert('success','更新成功');", true);
                ScriptManager.RegisterStartupScript(BUpdateStander, this.GetType(), "success", "UpdateSuccess();", true);
            }
        }

        //添加指标
        protected void BAddStander_Click(object sender, EventArgs e)
        {
            string dataInsert = JsonData.Value;
            if (dataInsert == "")
            {
                ScriptManager.RegisterStartupScript(BUpdateStander, this.GetType(), "error", "f_alert('error','添加失败，请重试!');", true);
                return;
            }
            StanderLib[] s = JSON.ScriptDeserialize<StanderLib[]>(dataInsert);  //将Json字符串转换为UserInfo对象
            if (s.Length == 0)
            {
                ScriptManager.RegisterStartupScript(BUpdateStander, this.GetType(), "error", "f_alert('error','添加失败，请重试!');", true);
                return;
            }
            string message = "";
            //更新数据库
            if (!StanderLibBLL.Insert(s, ref message))
            {
                // 失败
                ScriptManager.RegisterStartupScript(BUpdateStander, this.GetType(), "error", "f_alert('error','添加失败，请重试!');", true);
            }
            else
            {
                //成功
                ScriptManager.RegisterStartupScript(BUpdateStander, this.GetType(), "error", "f_alert('success','添加成功');", true);
                ScriptManager.RegisterStartupScript(BUpdateStander, this.GetType(), "success", "RefreshPage();", true);
            }
        }
    }
}