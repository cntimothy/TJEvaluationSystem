using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BLL;
using Model;
using DBUtility;

namespace TJEvaluationSystem.Pages.FirstManagerPages
{
    public partial class ManageCurrentEvaluation : System.Web.UI.Page
    {
        private int EvaluationID;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                //检查是否存在正在进行的考评
                if (EvaluationHistoryBLL.CheckActiveEvaluation()!=-1)
                {
                    //存在
                    ClientScript.RegisterStartupScript(this.GetType(), "", "ExistActiveEvaluation();", true);
                }
                else
                {
                    //不存在
                    ClientScript.RegisterStartupScript(this.GetType(), "", "NoActiveEvaluation();", true);
                }
            }
        }

        //开始新考评
        protected void BStartNewEvaluation_Click(object sender, EventArgs e)
        {
            if (EvaluationHistoryBLL.StartNewEvaluation())
            {
                //成功
                ScriptManager.RegisterStartupScript(BStartNewEvaluation, this.GetType(), "fun", "SuccessStartNewEvaluation();", true);
            } 
            else
            {
                //失败
                ScriptManager.RegisterStartupScript(BStartNewEvaluation, this.GetType(), "fun", "FailStartNewEvaluation();", true);
            }
        }
    }
}