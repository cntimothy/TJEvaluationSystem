﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BLL;
using Model;
using DBUtility;
using System.Data;
using System.IO;

namespace TJEvaluationSystem.Pages.FirstManagerPages
{
    public partial class SelectEvaluated : System.Web.UI.Page
    {
        private string exception = "";
        private string fname = "";
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        protected DataTable searchSql()
        {
            string department = Depart.Value;
            List<UserInfo> userinfo = new List<UserInfo>();
            string type = "____1%";
            if (department == "0")
            {
                UserInfoBLL.SelectByType(type, ref userinfo, ref exception);
            }
            else
            {
                UserInfoBLL.Select(department, type, ref userinfo, ref exception);
            }

            DataTable table = new DataTable();
            table = userinfo.ListToDataTable();
            return table;
        }
        protected void Submit_Click(object sender, EventArgs e)
        {
             DataTable table = new DataTable();
             table = searchSql();
             if (table.Rows.Count <= 0)
             {
                 ClientScript.RegisterStartupScript(this.GetType(), "", "alert('不存在被考评者！')", true);
                 return;
             }
            string json = JSON.DataTableToJson(table);
            JsonData.Value = json;

            ClientScript.RegisterStartupScript(this.GetType(), "", "load_userinfo()", true);
            return;

        }

        protected void Export_Click(object sender, EventArgs e)
        {
            DataTable table = new DataTable();
            table = searchSql();
            table.Columns.Remove("UiType");
            string filename = fname;
            string path = Server.MapPath("");
            path = path + "\\temp.xls";
            JSON.dataTableToCsv(table, path);

            Response.Clear();
            Response.Buffer = true;
            Response.Charset = "utf-8";
            Response.AppendHeader("Content-Disposition", "attachment;filename=" + filename + ".xls");
            Response.ContentEncoding = System.Text.Encoding.GetEncoding("utf-8");

            Response.ContentType = "application/ms-excel";
            this.EnableViewState = false;
            System.IO.StringWriter oStringWriter = new System.IO.StringWriter();
            System.Web.UI.HtmlTextWriter oHtmlTextWriter = new System.Web.UI.HtmlTextWriter(oStringWriter);
            oHtmlTextWriter.WriteLine(JsonData.Value);
            Response.WriteFile(path);
            Response.End();
        }

        protected void Delete_Click(object sender, EventArgs e)
        {
           // string userID = "";
            List<UserInfo> userinfo = new List<UserInfo>();
            userinfo = JSON.isEfect(UserID.Value);
            UserInfo deleted = userinfo.ElementAt(0);

            List<User> model = new List<Model.User>();
            if (UserBLL.Select(deleted.UiID, ref model, ref exception))
            {
                User user = model.ElementAt(0);
                user.UType = user.UType.Remove(3, 1).Insert(3, "1");
                //user.UType = deleted.UiType - 4;
                UserBLL.Update(user, ref exception);
            }
           // userID = deleted.UiID;
           // UserBLL.Delete(userID, ref exception);
            //deleted.UiType = deleted.UiType-4;
            deleted.UiType = deleted.UiType.Remove(3, 1).Insert(3, "1");
            UserInfoBLL.Update(deleted, ref exception);

            DataTable table = new DataTable();
            table = searchSql();
            string json = JSON.DataTableToJson(table);
            JsonData.Value = json;

            ClientScript.RegisterStartupScript(this.GetType(), "", "load_userinfo()", true);
            return;
        }
    }
}