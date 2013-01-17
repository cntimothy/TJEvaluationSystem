using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Model;
using BLL;
using DBUtility;
using System.Data;
using System.Reflection;
using System.IO;

namespace TJEvaluationSystem.Pages.FirstManagerPages
{
    public partial class MakeEvaluated : System.Web.UI.Page
    {
        private string exception = "";
        protected List<UserInfo> userinfo = new List<UserInfo>();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {

            }  
        }
        protected void Search_Click(object sender, EventArgs e)
        {
            int s = Convert.ToInt32(Depart.Value);
            //List<UserInfo> userinfo = new List<UserInfo>();
            switch (s)
            {
                case 0:
                    UserInfoBLL.Select(ref userinfo, ref exception);
                    //name.Text = "所有员工名单:";
                    break;
                case 1:
                    UserInfoBLL.Select("cs", ref userinfo, ref exception);
                    //name.Text = "电信学院员工名单:";
                    break;
                default:
                    UserInfoBLL.Select(ref userinfo, ref exception);
                    //name.Text = "所有员工名单:";
                    break;

            }
            if (exception != null && exception != "")
            {
                Errors.Value = exception;
                ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);
                return;
            }

            DataTable table = new DataTable();
            table = userinfo.ListToDataTable();
            //table.Columns.Remove("UiType");
            string json = JSON.DataTableToJson(table);
            JsonData.Value = json;

            ClientScript.RegisterStartupScript(this.GetType(), "", "load_userinfo()", true);
            return;
        }

        protected void Submit_Click(object sender, EventArgs e)
        {
            string strData = JsonChecked.Value;
            List<UserInfo> userData = JSON.ScriptDeserialize<List<UserInfo>>(strData);
            for (int i = 0; i < userData.Count; i++)
            {
                UserInfo userinfo = new UserInfo();
                userinfo = userData.ElementAt(i);
                if (userinfo.UiType == 0 || userinfo.UiType == 4)
                    userinfo.UiType = 4;
                else
                    if (userinfo.UiType == 2 || userinfo.UiType == 3||userinfo.UiType==5)
                    {
                        userinfo.UiType += 4;
                    }
                    else
                        if (userinfo.UiType == 6 || userinfo.UiType == 7 || userinfo.UiType == 9)
                        {
                            userinfo.UiType = userinfo.UiType;
                        }
                        
              
                UserInfoBLL.Update(userinfo, ref exception);

                List<User> users = new List<User>();
                if (UserBLL.Select(userinfo.UiID, ref users, ref exception))
                {
                    User user = new Model.User();
                    user = users.ElementAt(0);
                    user.UType = userinfo.UiType;
                    UserBLL.Update(user, ref exception);
                }
                else
                {
                    exception = "";
                }
            }

            if (exception == "" || exception == null)
            {
                Errors.Value = "提交成功";
                Hidden1.Value = "submit";
                ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);
                return;
            }
            else
            {
                Errors.Value = exception;
                Hidden1.Value = "submit";
                ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);
                return;
            }


        }
    }
}