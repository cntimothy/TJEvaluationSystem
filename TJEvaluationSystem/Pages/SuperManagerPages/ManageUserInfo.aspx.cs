using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;
using BLL;
using Model;
using DBUtility;

namespace TJEvaluationSystem.Pages.SuperManagerPages
{
    public partial class ManageUserInfo : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if(!IsPostBack)
                LoadUserData();
        }

        protected void BAddUser_Click(object sender, EventArgs e)
        {
            //insert to db
            string dataAdd = UserData.Value;
            UserInfo[] user = JSON.ScriptDeserialize<UserInfo[]>(dataAdd);  //将Json字符串转换为UserInfo对象
            foreach (UserInfo ui in user)
            {
                ui.UiType = "00000";
            }
            if (user.Length == 0)
            {
                ScriptManager.RegisterStartupScript(BAddUser,this.GetType(), "error", "f_alert('error','添加人员信息失败，请重试!');", true);
                return;
            }
            string message="";
            //插入到数据库
            if (!UserInfoBLL.Insert(user, ref message))
            {
                //添加失败
                ScriptManager.RegisterStartupScript(BAddUser,this.GetType(), "error", "f_alert('error','添加人员信息失败，请重试!');", true);
            }
            else
            {
                //添加成功
                ScriptManager.RegisterStartupScript(BAddUser, this.GetType(), "error", "f_alert('success',' 添加成功');", true);
                ScriptManager.RegisterStartupScript(BAddUser, this.GetType(), "success", "RefreshPage();", true);
            }
        }

        //导入数据到页面显示
        public void LoadUserData()
        {
            string sqlCmd = "select * from tb_UserInfo";
            string exception = "";
            List<UserInfo> ui = new List<UserInfo>();
            UserInfoBLL.Select(ref ui, ref exception, sqlCmd);
            if (exception.Length > 0)
            {
                //Alert
                ClientScript.RegisterStartupScript(this.GetType(), "error", "f_alert('error','获取数据失败，请重试');", true);
            }
            else
            {
                if (ui.Count <= 0)
                {
                    ClientScript.RegisterStartupScript(this.GetType(), "error", "f_alert('error','数据库中没有用户信息');", true);
                }
                else
                {
                    var jser = new JavaScriptSerializer();
                    var json = jser.Serialize(ui);
                    json = "{\"Rows\":" + json + ",\"Total\":" + ui.Count + "}";
                    JsonData.Value = json;
                    ClientScript.RegisterStartupScript(this.GetType(), "showdata", "ShowUserInfo();", true);
                }
            }
        }

        //更新数据
        protected void BUpdateUser_Click(object sender, EventArgs e)
        {
            
            string dataUpdate = UserData.Value;
            if (dataUpdate == "")
            {
                ScriptManager.RegisterStartupScript(BUpdateUser, this.GetType(), "error", "f_alert('error','提交失败，请重试!');", true);
                return;
            }
            UserInfo[] user = JSON.ScriptDeserialize<UserInfo[]>(dataUpdate);  //将Json字符串转换为UserInfo对象
            if (user.Length == 0)
            {
                ScriptManager.RegisterStartupScript(BUpdateUser, this.GetType(), "error", "f_alert('error','提交失败，请重试!');", true);
                return;
            }
            string message = "";
            //更新数据库
            if (!UserInfoBLL.Update(user[0], ref message))
            {
                // 失败
                ScriptManager.RegisterStartupScript(BUpdateUser, this.GetType(), "error", "f_alert('error','提交失败，请重试!');", true);
            }
            else
            {
                //成功
                ScriptManager.RegisterStartupScript(BUpdateUser, this.GetType(), "error", "f_alert('success','更新成功');", true);
                ScriptManager.RegisterStartupScript(BUpdateUser,this.GetType(), "success", "UpdateSuccess();", true);
            }
        }

        //删除数据
        protected void BDeleteUser_Click(object sender, EventArgs e)
        {
            //insert to db
            string dataID = UserData.Value;
            if (dataID == "")
            {
                ScriptManager.RegisterStartupScript(BDeleteUser, this.GetType(), "error", "f_alert('error',' 删除失败，请重试!');", true);
                return;
            }
            string message = "";
            //更新数据库
            if (!UserInfoBLL.Delete(dataID, ref message))
            {
                //删除失败
                ScriptManager.RegisterStartupScript(BDeleteUser, this.GetType(), "error", "f_alert('error',' 删除失败，请重试!');", true);
            }
            else
            {
                //删除成功
                ScriptManager.RegisterStartupScript(BDeleteUser, this.GetType(), "error", "f_alert('success',' 删除成功');", true);
                ScriptManager.RegisterStartupScript(BDeleteUser, this.GetType(), "success", "RefreshPage();", true);
            }
        }

        //刷新页面
        protected void BRefrashPage_Click(object sender, EventArgs e)
        {
            LoadUserData();
        }

        //检查工号
        protected void TBID_TextChanged(object sender, EventArgs e)
        {
            string id = TBID.Text;
            if (id == "")
                return;
            //Check
            List<UserInfo> ui = new List<UserInfo>();
            string m="";
            if (UserInfoBLL.Select(ref ui, id, ref m))
            {
                
                idExist.Value = "exist";
            }
            else
            {
                idExist.Value = "";
            }
        }
        
    }
}