using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Model;
using BLL;

namespace TJEvaluationSystem.Pages.AccountPages
{
    public partial class ChangePassword : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void BChangePsw_Click(object sender, EventArgs e)
        {
            //获取原密码，新密码，用户名，用户类型
            string oldPsw = Data1.Value;
            string newPsw = Data2.Value;
            if (oldPsw == null || oldPsw == "" || newPsw == null || newPsw == "")
                return;
            string name = (string)Session["username"];
            int type = (int)Session["usertype"];
            if (name.Equals(DBNull.Value) || type.Equals(DBNull.Value))
                return;
            if (!CheckPassword(name, oldPsw, type))
            {
                //原密码不正确
                ScriptManager.RegisterStartupScript(BChangePsw, this.GetType(), "error", "alert('原密码错误!');", true);
                return;
            }
            //设置新密码
            if (!SetNewPassword(name, newPsw, type))
            {
                //修改失败
                ScriptManager.RegisterStartupScript(BChangePsw, this.GetType(), "error", "alert('修改失败，请重试！');", true);
                return;
            }
            else
            {
                //修改成功
                ScriptManager.RegisterStartupScript(BChangePsw, this.GetType(), "error", "alert('修改成功！');", true);
                return;
            }
        }

        //检查用户名密码
        public bool CheckPassword(string name,string password,int type )
        {
            if (type == 1)
            {
                if (name == "" || password == "" || type < 1 || type > 2)
                    return false;
                Manager manager = new Manager();
                manager.MID = name;
                manager.MPassword = password;
                manager.MType = type;
                string ex = "";
                if (ManagerBLL.Select(manager, ref ex))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if (type == 2)
            {
                if (name == "" || password == "" || type < 1 || type > 2)
                    return false;
                User user = new User();
                user.UID = name;
                user.UPassword = password;
                user.UType = type;
                string ex = "";
                if (UserBLL.Select(user, ref ex))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
                return false;
        }

        //设置新密码
        public bool SetNewPassword(string name, string password, int type)
        {
            if (type == 1)
            {
                if (name == "" || password == "" || type < 1 || type > 2)
                    return false;
                Manager manager = new Manager();
                manager.MID = name;
                manager.MPassword = password;
                manager.MType = type;
                string ex = "";
                if (ManagerBLL.Update(manager, ref ex))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if (type == 2)
            {
                if (name == "" || password == "" || type < 1 || type > 2)
                    return false;
                User user = new User();
                user.UID = name;
                user.UPassword = password;
                user.UType = type;
                string ex = "";
                if (UserBLL.Update(user, ref ex))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
                return false;
        }

    }
}