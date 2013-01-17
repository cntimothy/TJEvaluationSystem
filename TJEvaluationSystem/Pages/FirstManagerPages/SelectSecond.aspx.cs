using System;
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
    
    public partial class SelectSeond : System.Web.UI.Page
    {
        private string exception = "";
        private string fname = "";
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected DataTable searchSql()
        {
            int s = Convert.ToInt32(Depart.Value);
            List<UserInfo> userinfo = new List<UserInfo>();
            switch (s)
            {
                case 0:
                    UserInfoBLL.Select(2, ref userinfo, ref exception);
                    UserInfoBLL.Select(5, ref userinfo, ref exception);
                    UserInfoBLL.Select(6, ref userinfo, ref exception);
                    UserInfoBLL.Select(9, ref userinfo, ref exception);
                    fname = "所有二级管理员名单:";
                    break;
                case 1:
                    UserInfoBLL.Select("cs", 2, ref userinfo, ref exception);
                    UserInfoBLL.Select("cs", 5, ref userinfo, ref exception);
                    UserInfoBLL.Select("cs", 6, ref userinfo, ref exception);
                    UserInfoBLL.Select("cs", 9, ref userinfo, ref exception);
                    fname = "电信学院二级管理员名单:";
                    break;
                default:
                    UserInfoBLL.Select(2, ref userinfo, ref exception);
                    UserInfoBLL.Select(5, ref userinfo, ref exception);
                    UserInfoBLL.Select(6, ref userinfo, ref exception);
                    UserInfoBLL.Select(9, ref userinfo, ref exception);
                    fname = "所有二级管理员名单:";
                    break;

            }

            DataTable table = new DataTable();
            table = userinfo.ListToDataTable();
            return table;
           

        }
        protected void Submit_Click(object sender, EventArgs e)
        {
           
            DataTable table = new DataTable();
           // table = userinfo.ListToDataTable();
            //table.Columns.Remove("UiType");
            table = searchSql();
            string json = JSON.DataTableToJson(table);
            JsonData.Value = json;

            ClientScript.RegisterStartupScript(this.GetType(), "", "load_userinfo()", true);
            return;

        }

       /*protected void Dao_Click(object sender, EventArgs e)
        {
            int s = Convert.ToInt32(Depart.Value);
            List<UserInfo> userinfo = new List<UserInfo>();
            switch (s)
            {
                case 0:
                    UserInfoBLL.Select(2, ref userinfo, ref exception);
                    name.Text = "所有二级管理员名单:";
                    break;
                case 1:
                    UserInfoBLL.Select("cs", 2, ref userinfo, ref exception);
                    name.Text = "电信学院二级管理员名单:";
                    break;
                default:
                    UserInfoBLL.Select(2, ref userinfo, ref exception);
                    name.Text = "所有二级管理员名单:";
                    break;

            }

            DataTable table = new DataTable();
            table = userinfo.ListToDataTable();
            
            JSON.dataTableToCsv(table, @"e:\1.xls"); //调用函数

            System.Diagnostics.Process.Start(@"e:\1.xls");  //打开excel文件
        }*/
        protected void Export_Click(object sender, EventArgs e)
        {
            DataTable table = new DataTable();
           // table = userinfo.ListToDataTable();
            table = searchSql();
            table.Columns.Remove("UiType");
            string filename = fname;
            string path = Server.MapPath("");
            path = path + "\\temp.xls";
            JSON.dataTableToCsv(table, path); 

           Response.Clear();
            Response.Buffer = true;
            Response.Charset = "utf-8";
            Response.AppendHeader("Content-Disposition", "attachment;filename="+filename+".xls");
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
            string userID = "";
            int userType = -1;
            List<UserInfo> userinfo = new List<UserInfo>();
            userinfo = JSON.isEfect(UserID.Value);
            UserInfo deleted = userinfo.ElementAt(0);

            userID = deleted.UiID;
            userType = deleted.UiType;
            if (userType == 2 || userType == 6)
            {
                UserBLL.Delete(userID, ref exception);
            }
            else
                if (userType == 5 || userType == 9)
                {
                    List<User> model = new List<Model.User>();
                    if (UserBLL.Select(deleted.UiID, ref model, ref exception))
                    {
                        User user = model.ElementAt(0);
                        user.UType = userType - 2;
                        UserBLL.Update(user, ref exception);
                    }


                }
            deleted.UiType = deleted.UiType - 2 ;
            UserInfoBLL.Update(deleted, ref exception);

            DataTable table = new DataTable();
            // table = userinfo.ListToDataTable();
            //table.Columns.Remove("UiType");
            table = searchSql();
            string json = JSON.DataTableToJson(table);
            JsonData.Value = json;

            ClientScript.RegisterStartupScript(this.GetType(), "", "load_userinfo()", true);
            return;
        }
    }
}