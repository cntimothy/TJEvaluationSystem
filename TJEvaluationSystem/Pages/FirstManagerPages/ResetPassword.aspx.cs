﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using BLL;
using DBUtility;
using Model;

namespace TJEvaluationSystem.Pages.FirstManagerPages
{
    public partial class ResetPassword : System.Web.UI.Page
    {
        string exception = "";
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        
        protected void Search_Click(object sender, EventArgs e)
        {
            DataTable table = new DataTable();
            table = Search1();
            if (table == null)
                return;
            string json = JSON.DataTableToJson(table);
            JsonData.Value = json;
            ClientScript.RegisterStartupScript(this.GetType(), "", "load_message()", true);
            return;
        }

        protected DataTable Search1()
        {
            string uiDepartment = Department.Text;
            List<UserInfo> UserInfoes = new List<UserInfo>();
            string type = "__1%";
            UserInfoBLL.Select(uiDepartment, type, ref UserInfoes,  ref exception);
            if (UserInfoes.Count == 0)
                return null;
            DataTable table = new DataTable();
            table = UserInfoes.ListToDataTable();
            return table;
        }

        protected void Reset_Click(object sender, EventArgs e)
        {
            string uID = UID.Value;
            string uType = UType.Value;
            string newPassword = "000000";
            if (UserBLL.UpdatePassword(uID, uType, newPassword, ref exception))
                Response.Write("<script>alert('该用户的密码已重置为000000！')</script>");
            else
                Response.Write("<script>alert('重置失败！')</script>");
        }
    }
}