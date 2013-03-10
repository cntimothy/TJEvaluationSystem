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
    public partial class CheckPost : System.Web.UI.Page
    {
        private string exception = "";
        private string prbUserID = "";

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
            }

        }
        protected DataTable searchSql()
        {
            string department = Department.SelectedValue;
            List<UserInfo> userinfo = new List<UserInfo>();
            string type = "____1%";
            if (department == "0")
            {
                UserInfoBLL.SelectByType(type, ref userinfo, ref exception);
                name.Text = "所有被考评者名单:";
            }
            else
            {
                UserInfoBLL.Select(department, type, ref userinfo, ref exception);
                name.Text = department + "被考评者名单:";
            }

            DataTable table = new DataTable();
            table = userinfo.ListToDataTable();
            return table;
        }
       
        protected void Search_Click(object sender, EventArgs e)
        {
            DataTable table = new DataTable();
            table = searchSql();
            if (table == null)
                return;

            string json = JSON.DataTableToJson(table);
            JsonData.Value = json;

            ClientScript.RegisterStartupScript(this.GetType(), "", "load_userinfo()", true);
            return;

        }

        protected void SearchPost_Click(object sender, EventArgs e)
        {
            prbUserID = UserID.Value;
            List<PostResponseBook> post1 = new List<PostResponseBook>();
            if (PostResponseBookBLL.Select(prbUserID, ref post1, ref exception))
            {
                PostResponseBook prb = new PostResponseBook();
                prb = post1.ElementAt(0);
                if (prb.PrbPassed == 1)
                {
                    passYoN.Text = "已通过审核！";
                    Passed.Value = "1";

                }
                else
                {
                    passYoN.Text = "未通过审核！";
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
                passYoN.Text = "尚未制定！";
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

        protected void Submit_Click(object sender, EventArgs e)
        {
            PostResponseBook prb = new PostResponseBook();
            if (Passed.Value.Equals(DBNull.Value) || Passed.Value == "")
            {
                Errors.Value = "无待提交岗位责任书！";
                ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);
                return;
            }
            if (Passed.Value == "1")
                return;
            prb.PrbUserID = UserID.Value;
            prb.PrbPassed = 1;
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

            PostResponseBookBLL.Update(prb, ref exception);

            DataTable table = new DataTable();
            table = searchSql();

            string json = JSON.DataTableToJson(table);
            JsonData.Value = json;
            ClientScript.RegisterStartupScript(this.GetType(), "", "load_userinfo()", true);
        }


        protected void Dao_Click(object sender, EventArgs e)
        {
            List<PostResponseBook> prb = new List<PostResponseBook>();
            if (Passed.Value.Equals(DBNull.Value) || Passed.Value == "")
            {
                Errors.Value = "无可导出岗位责任书！";
                ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);
                return;
            }

            PostResponseBookBLL.Select(UserID.Value, ref prb, ref exception);
            

            DataTable table = new DataTable();
            table = prb.ListToDataTable<PostResponseBook>();

            
            //Generator g = new Generator(table);
            //g.Generate();


            DataTable table1 = new DataTable();
            table1 = searchSql();

            string json = JSON.DataTableToJson(table1);
            JsonData.Value = json;
            ClientScript.RegisterStartupScript(this.GetType(), "", "load_userinfo()", true);
        }


    }
}