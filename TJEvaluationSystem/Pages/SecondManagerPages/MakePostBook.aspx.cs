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

namespace TJEvaluationSystem.Pages.SecondManagerPages
{
    public partial class MakePostBook : System.Web.UI.Page
    {
        private string exception = "";
        private string prbUserID = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
            }
        }

      protected void Search(object sender, EventArgs e)
        {
            string username = (string)Session["username"];
            string uiDepart = "";
            List<UserInfo> user = new List<UserInfo>();
            
            if (UserInfoBLL.Select(ref user, username, ref exception))
            {
                uiDepart = user.ElementAt(0).UiDepartment;
                List<UserInfo> Evaluated = new List<UserInfo>();
                bool b1=UserInfoBLL.Select(uiDepart, 4, ref Evaluated, ref exception);
                bool b2 = UserInfoBLL.Select(uiDepart, 6, ref Evaluated, ref exception);
                bool b3 = UserInfoBLL.Select(uiDepart, 7, ref Evaluated, ref exception);
                bool b4 = UserInfoBLL.Select(uiDepart, 9, ref Evaluated, ref exception);
                if (b1||b2||b3||b4)
                {
                    DataTable table = new DataTable();
                    table = Evaluated.ListToDataTable();
                    string json = JSON.DataTableToJson(table);
                    JsonData.Value = json;
                    ClientScript.RegisterStartupScript(this.GetType(), "", "load_userinfo()", true);
                    return;

                }

                else
                {
                    Errors.Value = "本部门尚无被考评人！";
                    ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);
                    return;
                }
            }
            else
            {
                Errors.Value = "您无此操作权限！";
                ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);
                return;
            }
        }

        protected void SearchPost_Click(object sender, EventArgs e)
        {
            prbUserID =UserID.Value;
            List<PostResponseBook> post = new List<PostResponseBook>();
            if (PostResponseBookBLL.Select(prbUserID, ref post, ref exception))
            {
                PostResponseBook prb = new PostResponseBook();
                prb = post.ElementAt(0);
                if (prb.PrbPassed == 1)
                {
                    pass.Text = "审核已通过！";
                    Passed.Value = "1";

                }
                else
                {
                    pass.Text = "审核未通过！";
                    Passed.Value = "0";
                }
                prbEmployer.Text = prb.PrbEmployer;
                prbLaborUnit.Text = prb.PrbLaborUnit;
                prbLaborDep.Text = prb.PrbLaborDep;
                prbPostName.Text = prb.PrbPostName;
                prbPostType.Text = prb.PrbPostType;
                prbEduBg.Text = prb.PrbEduBg;
                prbCertificate.Text = prb.PrbCertificate;
                prbExperience.Text = prb.PrbExperience;
                prbSkill.Text = prb.PrbSkill;
                prbPersonality.Text = prb.PrbPersonality;
                prbPhycond.Text = prb.PrbPhyCond;
                prbWorkOutline.Text = prb.PrbWorkOutline;
                prbWorkContentRequest.Text = prb.PrbWorkContntRequest;
                prbPower.Text = prb.PrbPower;
                prbResponse.Text = prb.PrbResponse;
                prbDirectLeader.Text = prb.PrbDirectLeader;
                prbSubordinate.Text = prb.PrbSubordinate;
                prbColleague.Text = prb.PrbColleague;
                prbServices.Text = prb.PrbServices;
                prbRelations.Text = prb.PrbReleations;
                prbWorkEnter.Text = prb.PrbWorkEnter;
                prbPostAssess.Text = prb.PrbPostAssess;
                prbOthers.Text = prb.PrbOthers;
            }
            else
            {
                pass.Text = "尚未制定！";
                Passed.Value = "-1";
                prbEmployer.Text = "";
                prbLaborUnit.Text = "";
                prbLaborDep.Text = "";
                prbPostName.Text = "";
                prbPostType.Text = "";
                prbEduBg.Text = "";
                prbCertificate.Text = "";
                prbExperience.Text = "";
                prbSkill.Text = "";
                prbPersonality.Text = "";
                prbPhycond.Text = "";
                prbWorkOutline.Text = "";
                prbWorkContentRequest.Text = "";
                prbPower.Text = "";
                prbResponse.Text = "";
                prbDirectLeader.Text = "";
                prbSubordinate.Text = "";
                prbColleague.Text = "";
                prbServices.Text = "";
                prbRelations.Text = "";
                prbWorkEnter.Text = "";
                prbPostAssess.Text = "";
                prbOthers.Text = "";
            }

            ClientScript.RegisterStartupScript(this.GetType(), "", "EditPost()", true);
        }

        protected void SubmitPost_Click(object sender, EventArgs e)
        {
            PostResponseBook prb = new PostResponseBook();
            if (Passed.Value.Equals(DBNull.Value)||Passed.Value=="")
            {
                Errors.Value = "无待提交制定岗位责任书！";
                this.Hidden1.Value = "submit";
                ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);
                return;
            }
            if (Passed.Value == "1")
            {
                Errors.Value = "岗位责任书已通过审核！";
                this.Hidden1.Value = "submit";
                ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);
                return;
            }
                
            prb.PrbUserID = UserID.Value;
            prb.PrbPassed =0;
            prb.PrbEmployer = prbEmployer.Text;
            prb.PrbLaborUnit = prbLaborUnit.Text;
            prb.PrbLaborDep = prbLaborDep.Text;
            prb.PrbPostName = prbPostName.Text;
            prb.PrbPostType = prbPostType.Text;
            prb.PrbEduBg = prbEduBg.Text;
            prb.PrbCertificate = prbCertificate.Text;
            prb.PrbExperience = prbExperience.Text;
            prb.PrbSkill = prbSkill.Text;
            prb.PrbPersonality = prbPersonality.Text;
            prb.PrbPhyCond = prbPhycond.Text;
            prb.PrbWorkOutline = prbWorkOutline.Text;
            prb.PrbWorkContntRequest = prbWorkContentRequest.Text;
            prb.PrbPower = prbPower.Text;
            prb.PrbResponse = prbResponse.Text;
            prb.PrbDirectLeader = prbDirectLeader.Text;
            prb.PrbSubordinate = prbSubordinate.Text;
            prb.PrbColleague = prbColleague.Text;
            prb.PrbServices = prbServices.Text;
            prb.PrbReleations = prbRelations.Text;
            prb.PrbWorkEnter = prbWorkEnter.Text;
            prb.PrbPostAssess = prbPostAssess.Text;
            prb.PrbOthers = prbOthers.Text;

            List<PostResponseBook> prblist=new List<PostResponseBook>();
            if (PostResponseBookBLL.Select(prb.PrbUserID, ref prblist, ref exception))
            {
                PostResponseBookBLL.Update(prb, ref exception);
            }
            else
            {
                PostResponseBook[] prbs = new PostResponseBook[1];
                prbs[0] = prb;
                PostResponseBookBLL.Insert(prbs, ref exception);
            }
            
            ClientScript.RegisterStartupScript(this.GetType(), "", "load_userinfo()", true);
        }
        


    }
}