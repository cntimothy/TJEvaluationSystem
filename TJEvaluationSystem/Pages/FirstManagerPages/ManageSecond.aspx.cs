using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.OleDb;
using System.Data;
using BLL;
using Model;
using DBUtility;

namespace TJEvaluationSystem.Pages.FirstManagerPages
{
    public partial class ManageSecond : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {

            }
        }


        //读取前台数据，保存到数据库
        protected void BSaveData_Click(object sender, EventArgs e)
        {
            string strData = JsonData.Value;
            Manager[] userData = JSON.ScriptDeserialize<Manager[]>(strData);
            if (userData == null || userData.Length <= 0)
            {
                //数据无效
                ScriptManager.RegisterStartupScript(BSaveData, this.GetType(), "error", "SaveFaild();", true);
                return;
            }
            else
            {
                string message = "";
                if (!ManagerBLL.Insert(userData, ref message))
                {
                    //插入失败
                    ScriptManager.RegisterStartupScript(BSaveData, this.GetType(), "error", "SaveFaild();", true);
                    return;
                }
                if (message != "")
                {
                    //插入失败
                    ScriptManager.RegisterStartupScript(BSaveData, this.GetType(), "error", "SaveFaild();", true);
                    return;
                }
                //导入成功
                ScriptManager.RegisterStartupScript(BSaveData, this.GetType(), "success", "SaveSuccess();", true);
            }
        }
    }
}