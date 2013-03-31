using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MSWord = Microsoft.Office.Interop.Word;
using System.Reflection;
using Microsoft.Office.Interop.Word;
using System.Data;
using System.IO;

namespace DBUtility
{
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