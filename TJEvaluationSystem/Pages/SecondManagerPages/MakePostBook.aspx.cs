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
            //string username = "admin2";
            string uiDepart = "";
            List<Manager> manager = new List<Manager>();
            exception = "";
            if (ManagerBLL.SelectByID(username, ref manager, ref exception))
            {
                uiDepart = manager.ElementAt(0).MDepartment;
                Title.Text = uiDepart + "被考评人名单：";
                List<UserInfo> Evaluated = new List<UserInfo>();
                string type = "____1%";
                bool b=UserInfoBLL.Select(uiDepart, type, ref Evaluated, ref exception);
                if (b)
                {
                    DataTable table = new DataTable();
                    table = Evaluated.ListToDataTable();

                    //给table添加prbComment栏
                    adjustTable(table, ref exception);
                    int sumCount = 0, unPassCount = 0, passCount = 0, savedCount = 0, unMakeCount = 0;

                    countNumber(table, ref sumCount, ref unPassCount, ref passCount, ref savedCount, ref unMakeCount);//做汇总
                    Title.Text += "（总人数：" + sumCount + " \\未制作：" + unMakeCount + " \\已保存：" + savedCount + " \\已提交：" + unPassCount + " \\已审核：" + passCount + "）";

                    table.DefaultView.Sort = "PrbPassed desc"; //给table按状态排序
                    table = table.DefaultView.ToTable();

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
            exception = "";
            prbUserID =UserID.Value;
            LUserName.Text = "被考评人姓名：" + UserName.Value;
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
                prbWorkContentRequest.Value = prb.PrbWorkContntRequest;
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
                prbWorkContentRequest.Value = "";
                prbPower.Text = "";
                prbResponse.Text = "";
                prbDirectLeader.Text = "";
                prbSubordinate.Text = "";
                prbColleague.Text = "";
                prbServices.Text = "";
                prbRelations.Text = "";
                prbWorkEnter.Text = "办公室内，环境舒适，无职业病危害。";
                prbPostAssess.Text = "按同济大学派遣员工考核文件的规定执行。";
                prbOthers.Text = "本岗位责任书自双方签字盖章且经人才中心审核盖章后生效，与劳动合同具有相同效力，双方均应遵照执行。\n" +
                                 "自本岗位责任书生效之日起，双方之前就受聘人员岗位达成的约定、协议或岗位责任书与本岗位责任书不一致的，以本岗位责任书为准。\n" +
                                 "本岗位责任书一式四份，人才中心持两份，个人及个人所在部门各持一份。";
                Comment.Text = "";
            }

            ClientScript.RegisterStartupScript(this.GetType(), "", "EditPost()", true);
        }

        protected void SubmitPost_Click(object sender, EventArgs e)
        {
            exception = "";
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
            prb.PrbWorkContntRequest = prbWorkContentRequest.Value;
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

        private void adjustTable(DataTable dt, ref string exception)
        {
            //给table添加prbComment栏
            dt.Columns.Add("PrbComment");
            dt.Columns.Add("PrbPassed");
            List<PostResponseBook> posts = new List<PostResponseBook>();
            foreach (DataRow dr in dt.Rows)
            {
                posts.Clear();
                //0：已提交 1：已审核 2：已保存 
                if (PostResponseBookBLL.Select(dr["UiID"].ToString(), ref posts, ref exception))
                {
                    dr["PrbComment"] = posts[0].PrbComment;
                    if (posts[0].PrbPassed.ToString() == "0")
                    {
                        dr["PrbPassed"] = "已提交";
                    }
                    else if (posts[0].PrbPassed.ToString() == "1")
                    {
                        dr["PrbPassed"] = "已审核";
                    }
                    else 
                    {
                        dr["PrbPassed"] = "已保存";
                    }
                }
                else
                {
                    dr["PrbComment"] = "";
                    dr["PrbPassed"] = "未制作";
                }
            }
        }

        private void countNumber(DataTable dt, ref int sumCount, ref int unPassCount, ref int passCount, ref int savedCount, ref int unMakeCount)
        {
            foreach (DataRow dr in dt.Rows)
            {
                switch (dr["PrbPassed"].ToString())
                {
                    case "已提交":
                        unPassCount++;
                        break;
                    case "已审核":
                        passCount++;
                        break;
                    case "已保存":
                        savedCount++;
                        break;
                    default:
                        unMakeCount++;
                        break;
                }
                sumCount++;
            }
        }
    }
}