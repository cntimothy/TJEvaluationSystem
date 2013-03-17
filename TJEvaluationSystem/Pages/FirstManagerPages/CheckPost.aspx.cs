using System;
using System.Collections.Generic;
using System.Linq;
using BLL;
using Model;
using DBUtility;
using System.Data;
using System.IO;
using MSWord = Microsoft.Office.Interop.Word;
using System.Reflection;
using Microsoft.Office.Interop.Word;

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
                name.Text = "所有被考评者名单:";
            }
            else
            {
                UserInfoBLL.Select(department, type, ref userinfo, ref exception);
                name.Text = department + "被考评者名单:";
            }
            if (userinfo == null)
                return null;
            System.Data.DataTable table = new System.Data.DataTable();
            table = userinfo.ListToDataTable();
            return table;
        }

        protected void Search_Click(object sender, EventArgs e)
        {
            System.Data.DataTable table = new System.Data.DataTable();
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
            exception = "";
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
        public class Generator
        {
            private object path;
            private string strContent;
            private MSWord.Application wordApp;
            private MSWord.Document wordDoc;
            private object Nothing;
            private System.Data.DataTable dt;

            public Generator(System.Data.DataTable dt)
            {
                path = System.AppDomain.CurrentDomain.BaseDirectory.ToString() + "uploadfile\\岗位责任书.doc";
                wordApp = new MSWord.Application();
                if (File.Exists((string)path))
                {
                    File.Delete((string)path);
                }
                Nothing = Missing.Value;
                wordDoc = wordApp.Documents.Add(ref Nothing, ref Nothing, ref Nothing, ref Nothing);
                wordApp.Selection.ParagraphFormat.LineSpacing = 16;
                this.dt = dt;

            }

            public void Generate()
            {
                writeParagraph("岗位责任书", "宋体", 1, 18, MSWord.WdParagraphAlignment.wdAlignParagraphCenter);
                writeParagraph("一、岗位概述", "黑体", 1, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);
                if (dt.Rows.Count <= 0)
                {
                    return;
                }
                DataRow row = dt.Rows[0];
                strContent = "\t1、用人单位：\t" + ((string)row["prbEmployer"]).TrimEnd();
                writeParagraph(strContent, "宋体", 0, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);

                strContent = "\t2、用工单位：\t同济大学" + (string)row["prbLaborUnit"] + "\n" +
                             "\t3、用工部门：" + "\t" + (string)row["prbLaborDep"] + "\n" +
                             "\t4、岗位名称：" + "\t" + (string)row["prbPostName"];
                writeParagraph(strContent, "宋体", 0, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);

                switch ((string)row["prbPostType"])
                {
                    case "管理":
                        strContent = "\t5、岗位类别：\t■管理 □教辅 □思政 □教师 □工勤";
                        break;
                    case "教辅":
                        strContent = "\t5、岗位类别：\t□管理 ■教辅 □思政 □教师 □工勤";
                        break;
                    case "思政":
                        strContent = "\t5、岗位类别：\t□管理 □教辅 ■思政 □教师 □工勤";
                        break;
                    case "教师":
                        strContent = "\t5、岗位类别：\t□管理 □教辅 □思政 ■教师 □工勤";
                        break;
                    case "工勤":
                        strContent = "\t5、岗位类别：□管理 □教辅 □思政 □教师 ■工勤";
                        break;
                }
                writeParagraph(strContent, "宋体", 0, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);

                writeParagraph("二、岗位职责", "黑体", 1, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);

                writeParagraph("（一）任职条件", "宋体", 1, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);

                strContent = "1、学历背景：";
                writeParagraph(strContent, "宋体", 1, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);
                strContent = (string)row["prbEduBg"];
                writeParagraph(strContent, "宋体", 0, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);

                strContent = "2、培训及资历：";
                writeParagraph(strContent, "宋体", 1, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);
                strContent = (string)row["prbCertificate"];
                writeParagraph(strContent, "宋体", 0, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);

                strContent = "3、工作经验：";
                writeParagraph(strContent, "宋体", 1, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);
                strContent = (string)row["prbExperience"];
                writeParagraph(strContent, "宋体", 0, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);

                strContent = "4、基本技能和素质：";
                writeParagraph(strContent, "宋体", 1, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);
                strContent = (string)row["prbSkill"];
                writeParagraph(strContent, "宋体", 0, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);

                strContent = "5、特性特征：";
                writeParagraph(strContent, "宋体", 1, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);
                strContent = (string)row["prbPersonality"];
                writeParagraph(strContent, "宋体", 0, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);

                strContent = "6、体质条件：";
                writeParagraph(strContent, "宋体", 1, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);
                strContent = (string)row["prbPhyCond"];
                writeParagraph(strContent, "宋体", 0, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);

                writeParagraph("（二）工作内容、工作要求", "宋体", 1, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);

                strContent = "1、岗位概述：";
                writeParagraph(strContent, "宋体", 1, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);
                strContent = (string)row["prbWorkOutline"];
                writeParagraph(strContent, "宋体", 0, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);

                strContent = "2、工作内容及工作要求：";
                writeParagraph(strContent, "宋体", 1, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);
                strContent = ((string)row["prbWorkContntRequest"]).Replace("&", "\n").Replace("$", "\n").Replace("*", "");
                writeParagraph(strContent, "宋体", 0, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);

                writeParagraph("（三）权责范围", "宋体", 1, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);

                strContent = "1、权利：";
                writeParagraph(strContent, "宋体", 1, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);
                strContent = (string)row["prbPower"];
                writeParagraph(strContent, "宋体", 0, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);

                strContent = "2、责任：";
                writeParagraph(strContent, "宋体", 1, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);
                strContent = (string)row["prbResponse"];
                writeParagraph(strContent, "宋体", 0, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);

                writeParagraph("（四）工作关系", "宋体", 1, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);

                strContent = "1、直接领导：" + (string)row["prbDirectLeader"];
                writeParagraph(strContent, "宋体", 0, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);

                strContent = "2、下属：" + (string)row["prbSubordinate"];
                writeParagraph(strContent, "宋体", 0, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);

                strContent = "3、同事：" + (string)row["prbColleague"];
                writeParagraph(strContent, "宋体", 0, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);

                strContent = "4、服务对象：" + (string)row["prbServices"];
                writeParagraph(strContent, "宋体", 0, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);

                strContent = "5、外部关系：" + (string)row["prbReleations"];
                writeParagraph(strContent, "宋体", 0, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);

                writeParagraph("（五）工作环境", "宋体", 1, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);

                writeParagraph((string)row["prbWorkEnter"], "宋体", 0, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);

                writeParagraph("三、岗位考核", "黑体", 1, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);

                writeParagraph((string)row["prbPostAssess"], "宋体", 0, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);

                writeParagraph("四、其他规定", "黑体", 1, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);

                writeParagraph((string)row["prbOthers"], "宋体", 0, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);

                writeParagraph("", "宋体", 0, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);
                writeParagraph("", "宋体", 0, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);
                writeParagraph("", "宋体", 0, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);

                strContent = "部门负责人签章：\t\t\t\t个人签字：\n" +
                             "\t\t\t\t\t\t\t\t身份证号码：\n" +
                             "\t\t\t\t\t\t\t\t联系电话（固定电话）：\n" +
                             "\t\t\t\t\t\t\t\t联系电话（移动电话）：\n" +
                             "\t\t\t\t\t\t\t\t联系地址：\n" +
                             "\t\t\t\t\t\t\t\t邮编：\n" +
                             "日期：    年    月    日\t\t日期：    年    月    日";

                writeParagraph(strContent, "宋体", 0, 11, MSWord.WdParagraphAlignment.wdAlignParagraphLeft);



                save();
            }

            private void writeParagraph(string strContent, string font, int bold, int size, MSWord.WdParagraphAlignment align)
            {
                wordDoc.Paragraphs.Add();
                wordDoc.Paragraphs.Last.Range.Font.Name = font;
                wordDoc.Paragraphs.Last.Range.Font.Bold = bold;
                wordDoc.Paragraphs.Last.Range.Font.Size = size;
                wordDoc.Paragraphs.Last.Alignment = align;
                wordDoc.Paragraphs.Last.Range.Text = strContent;

            }

            private void save()
            {
                object format = MSWord.WdSaveFormat.wdFormatDocument97;
                wordDoc.SaveAs(ref path, ref format, ref Nothing, ref Nothing, ref Nothing, ref Nothing, ref Nothing, ref Nothing, ref Nothing, ref Nothing, ref Nothing, ref Nothing, ref Nothing, ref Nothing, ref Nothing, ref Nothing);
                wordDoc.Close(ref Nothing, ref Nothing, ref Nothing);
                wordApp.Quit(ref Nothing, ref Nothing, ref Nothing);
                Console.WriteLine(path + " 创建完毕！");
            }


        }
    }

 
}