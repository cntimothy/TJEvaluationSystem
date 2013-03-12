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
            exception = "";
            string department = Department.SelectedValue; 
            if (department == "0")
            {
                UserInfoBLL.Select(ref userinfo, ref exception);
            }
            else
            {
                UserInfoBLL.SelectByDepartment(department, ref userinfo, ref exception);
            }
            if (exception != null && exception != "")
            {
                Errors.Value = exception;
                ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);
                return;
            }

            DataTable table = new DataTable();
            table = userinfo.ListToDataTable();
            string json = JSON.DataTableToJson(table);
            JsonData.Value = json;

            ClientScript.RegisterStartupScript(this.GetType(), "", "load_userinfo()", true);
            return;
        }

        protected void Submit_Click(object sender, EventArgs e)
        {
            string strData = JsonChecked.Value;
            exception = "";
            List<UserInfo> userData = JSON.ScriptDeserialize<List<UserInfo>>(strData);
            for (int i = 0; i < userData.Count; i++)
            {
                UserInfo userinfo = new UserInfo();
                userinfo = userData.ElementAt(i);
                userinfo.UiType = userinfo.UiType.Remove(4, 1).Insert(4, "1");
                UserInfoBLL.Update(userinfo, ref exception);
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