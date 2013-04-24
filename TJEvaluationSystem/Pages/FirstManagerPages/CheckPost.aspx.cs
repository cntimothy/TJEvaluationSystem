using System;
using System.Collections.Generic;
using System.Linq;
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
        protected System.Data.DataTable searchSql()
        {
            string department = Department.SelectedValue;
            List<UserInfo> userinfo = new List<UserInfo>();
            string type = "____1%";
            if (department == "0")
            {
                UserInfoBLL.SelectByType(type, ref userinfo, ref exception);
                Title.Text = "所有被考评者名单:";
            }
            else
            {
                UserInfoBLL.Select(department, type, ref userinfo, ref exception);
                Title.Text = department + "被考评者名单:";
            }
            if (userinfo == null)
                return null;
            System.Data.DataTable table = new System.Data.DataTable();
            table = userinfo.ListToDataTable();
            return table;
        }

        protected void Search_Click(object sender, EventArgs e)
        {
            exception = "";
            System.Data.DataTable table = new System.Data.DataTable();
            table = searchSql();
            string comment = "";
            if (table == null)
                return;

            //给table添加prbComment栏
            table.Columns.Add("PrbComment");
            foreach(DataRow dr in table.Rows)
            {
                PostResponseBookBLL.SelectComment(dr["UiID"].ToString(), ref comment, ref exception);
                dr["PrbComment"] = comment;
            }

            string json = JSON.DataTableToJson(table);
            JsonData.Value = json;

            ClientScript.RegisterStartupScript(this.GetType(), "", "load_userinfo()", true);
            return;

        }

        protected void SearchPost_Click(object sender, EventArgs e)
        {
            prbUserID = UserID.Value;
            List<PostResponseBook> post1 = new List<PostResponseBook>();
            exception = "";
            LUserName.Text = "被考评人姓名：" + UserName.Value;
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
                if (prb.PrbComment != "")
                {
                    Comment.Text = "审核意见：" + prb.PrbComment;
                }
                else
                {
                    Comment.Text = "";
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
                prbWorkContentRequestTemp.Value = prb.PrbWorkContntRequest;
                prbWorkContentRequest.Text = prbWorkContentRequestTemp.Value.Replace("&", "\n").Replace("$", "\n").Replace("*", "");
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
                Comment.Text = "";
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
            prb.PrbWorkContntRequest = prbWorkContentRequestTemp.Value;
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
            prb.PrbComment = "";

            exception = "";
            PostResponseBookBLL.Update(prb, ref exception);

            System.Data.DataTable table = new System.Data.DataTable();
            table = searchSql();
            if (table == null)
            {
                return;
            }
            string json = JSON.DataTableToJson(table);
            JsonData.Value = json;
            ClientScript.RegisterStartupScript(this.GetType(), "", "load_userinfo()", true);
        }

        protected void SendBack_Click(object Sender, EventArgs e)
        {
            Errors.Value = "";
            PostResponseBook prb = new PostResponseBook();
            if (Passed.Value.Equals(DBNull.Value) || Passed.Value == "")
            {
                Errors.Value = "无待退回岗位责任书！";
                ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);
                return;
            }
            if (Passed.Value == "0")
                return;
            prb.PrbUserID = UserID.Value;
            prb.PrbPassed = 0;
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
            prb.PrbWorkContntRequest = prbWorkContentRequestTemp.Value;
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
            prb.PrbComment = "";

            PostResponseBookBLL.Update(prb, ref exception);


            System.Data.DataTable table = new System.Data.DataTable();
            table = searchSql();
            if (table == null)
            {
                return;
            }
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
            exception = "";
            PostResponseBookBLL.Select(UserID.Value, ref prb, ref exception);

            System.Data.DataTable table = new System.Data.DataTable();
            table = prb.ListToDataTable<PostResponseBook>();


            Generator g = new Generator(table);
            g.Generate();

            //下载
            Response.ContentType =  "application/msword";
            //Response.AddHeader("Content-Disposition", "attachment;filename=岗位责任书.doc");
            string filename = Server.MapPath("../../uploadfile/岗位责任书.doc");
            //指定编码 防止中文文件名乱码 
            Response.HeaderEncoding = System.Text.Encoding.GetEncoding("gb2312");
            Response.TransmitFile(filename);


            System.Data.DataTable table1 = new System.Data.DataTable();
            table1 = searchSql();

            string json = JSON.DataTableToJson(table1);
            JsonData.Value = json;
            ClientScript.RegisterStartupScript(this.GetType(), "", "load_userinfo()", true);
        }

        protected void WriteComment_Click(object sender, EventArgs e)
        {
            exception = "";
            PostResponseBookBLL.UpdateComment(UserID.Value, prbComment.Value, ref exception);
            Response.Write("<script>alert('已提交意见！')</script>");
        }
    }

 
}