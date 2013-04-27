using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using DBUtility;
using Model;
using System.Text;


/// <summary>
///PostResponseBookBLL 的摘要说明
/// </summary>
namespace BLL
{
    //已通过验证
    public class PostResponseBookBLL
    {
        public PostResponseBookBLL()
        { }

        static readonly SQLDatabase db = new SQLDatabase();
        static public bool Insert(PostResponseBook[] prb, ref string e)
        {
            int count = prb.Length;
            for (int i = 0; i < count; i++)
            {
                string sql = "insert into tb_PostResponseBook values("
                                  + "@prbUserID,@prbPassed,@prbEmployer,@prbLaborUnit,"
                                  + "@prbLaborDep,@prbPostName,@prbPostType,@prbEduBg,"
                                  + "@prbCertificate,@prbExperience,@prbSkill,@prbPersonality,"
                                  + "@prbPhyCond,@prbWorkOutline,@prbWorkContntRequest,@prbPower,"
                                  + "@prbResponse,@prbDirectLeader,@prbSubordinate,@prbColleague,"
                                  + "@prbServices,@prbReleations,@prbWorkEnter,@prbPostAssess,@prbOthers,@proComment)";


                SqlParameter[] parameters =
                {
                new SqlParameter("@prbUserID", SqlDbType.VarChar,10),
                new SqlParameter("@prbPassed", SqlDbType.Int,4),
                new SqlParameter("@prbEmployer", SqlDbType.NVarChar,50),  
                new SqlParameter("@prbLaborUnit", SqlDbType.NVarChar,50),
                new SqlParameter("@prbLaborDep", SqlDbType.NVarChar,50),
                new SqlParameter("@prbPostName", SqlDbType.NVarChar,50), 
                new SqlParameter("@prbPostType", SqlDbType.NVarChar,20),
                new SqlParameter("@prbEduBg", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@prbCertificate",SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@prbExperience", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@prbSkill", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@prbPersonality", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@prbPhyCond", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@prbWorkOutline", SqlDbType.NVarChar,int.MaxValue),
                new SqlParameter("@prbWorkContntRequest", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@prbPower", SqlDbType.NVarChar,int.MaxValue),
                new SqlParameter("@prbResponse", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@prbDirectLeader", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@prbSubordinate", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@prbColleague", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@prbServices", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@prbReleations", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@prbWorkEnter", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@prbPostAssess", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@prbOthers", SqlDbType.NVarChar,int.MaxValue),
                new SqlParameter("@prbComment", SqlDbType.NVarChar, 50)
                
                };
                parameters[0].Value = prb[i].PrbUserID;
                parameters[1].Value = prb[i].PrbPassed;
                parameters[2].Value = prb[i].PrbEmployer;
                parameters[3].Value = prb[i].PrbLaborUnit;
                parameters[4].Value = prb[i].PrbLaborDep;
                parameters[5].Value = prb[i].PrbPostName;
                parameters[6].Value = prb[i].PrbPostType;
                parameters[7].Value = prb[i].PrbEduBg;
                parameters[8].Value = prb[i].PrbCertificate;
                parameters[9].Value = prb[i].PrbExperience;
                parameters[10].Value = prb[i].PrbSkill;
                parameters[11].Value = prb[i].PrbPersonality;
                parameters[12].Value = prb[i].PrbPhyCond;
                parameters[13].Value = prb[i].PrbWorkOutline;
                parameters[14].Value = prb[i].PrbWorkContntRequest;
                parameters[15].Value = prb[i].PrbPower;
                parameters[16].Value = prb[i].PrbResponse;
                parameters[17].Value = prb[i].PrbDirectLeader;
                parameters[18].Value = prb[i].PrbSubordinate;
                parameters[19].Value = prb[i].PrbColleague;
                parameters[20].Value = prb[i].PrbServices;
                parameters[21].Value = prb[i].PrbReleations;
                parameters[22].Value = prb[i].PrbWorkEnter;
                parameters[23].Value = prb[i].PrbPostAssess;
                parameters[24].Value = prb[i].PrbOthers;
                parameters[25].Value = prb[i].PrbComment;

                string exception = db.InsertExec(sql, parameters);
                if (exception != "" && exception != null)
                {
                    e = exception;
                    return false;
                }
            }
            return true;
        }

        public static bool Select(string prbUserID, ref List<PostResponseBook> model, ref string e)
        {
            prbUserID = prbUserID.Trim();
            string sql = "select * from tb_PostResponseBook where prbUserID='" + prbUserID + "'";
            if (!Select(ref model, ref e, sql))
            {
                if (e != "" && e != null)
                    return false;
                e = "用户" + prbUserID + "的岗位责任书尚未建立！";
                return false;
            }
            else
                return true;
        }

        public static bool Select(string prbUserID, int prbPassed,ref List<PostResponseBook> model, ref string e)
        {
            prbUserID = prbUserID.Trim();
            string sql = "select * from tb_PostResponseBook where prbUserID='" + prbUserID + "' and prbPassed="+prbPassed;
            if (!Select(ref model, ref e, sql))
            {
                if (e != "" && e != null)
                    return false;
                e = "用户" + prbUserID + "的岗位责任书尚未建立！";
                return false;
            }
            else
                return true;
        }
        public static bool SelectComment(string prbUserID, ref string comment, ref string e)
        {
            string sql = "select prbComment from tb_PostResponseBook where prbUserID ='" + prbUserID + "'";
            comment = db.QueryValue(sql);
            if (comment != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public static bool SelectPassed(string prbUserID, ref string passed, ref string e)
        {
            string sql = "select prbPassed from tb_PostResponseBook where prbUserID ='" + prbUserID + "'";
            passed = db.QueryValue(sql);
            if (passed != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        
        public static bool Select(ref List<PostResponseBook> model, ref string e,string sql)
        {
            DataTable table = new DataTable();
            table = db.QueryDataTable(sql, ref e);
            if (table != null && table.Rows.Count > 0)
            {
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    PostResponseBook prb = new PostResponseBook();
                    prb.PrbUserID = (string)table.Rows[i]["prbUserID"];
                    prb.PrbPassed = (Int32)table.Rows[i]["prbPassed"];
                    prb.PrbEmployer = (string)table.Rows[i]["prbEmployer"];
                    prb.PrbLaborUnit = (string)table.Rows[i]["prbLaborUnit"];
                    prb.PrbLaborDep = (string)table.Rows[i]["prbLaborDep"];
                    prb.PrbPostName = (string)table.Rows[i]["prbPostName"];
                    prb.PrbPostType = (string)table.Rows[i]["prbPostType"];
                    prb.PrbEduBg = (string)table.Rows[i]["prbEduBg"];
                    prb.PrbCertificate = (string)table.Rows[i]["prbCertificate"];
                    prb.PrbExperience = (string)table.Rows[i]["prbExperience"];
                    prb.PrbSkill = (string)table.Rows[i]["prbSkill"];
                    prb.PrbPersonality = (string)table.Rows[i]["prbPersonality"];
                    prb.PrbPhyCond = (string)table.Rows[i]["prbPhyCond"];
                    prb.PrbWorkOutline = (string)table.Rows[i]["prbWorkOutline"];
                    prb.PrbWorkContntRequest = (string)table.Rows[i]["prbWorkContntRequest"];
                    prb.PrbPower = (string)table.Rows[i]["prbPower"];
                    prb.PrbResponse = (string)table.Rows[i]["prbResponse"];
                    prb.PrbDirectLeader = (string)table.Rows[i]["prbDirectLeader"];
                    prb.PrbSubordinate = (string)table.Rows[i]["prbSubordinate"];
                    prb.PrbColleague = (string)table.Rows[i]["prbColleague"];
                    prb.PrbServices = (string)table.Rows[i]["prbServices"];
                    prb.PrbReleations = (string)table.Rows[i]["prbReleations"];
                    prb.PrbWorkEnter = (string)table.Rows[i]["prbWorkEnter"];
                    prb.PrbPostAssess = (string)table.Rows[i]["prbPostAssess"];
                    prb.PrbOthers = (string)table.Rows[i]["prbOthers"];
                    if (!table.Rows[i].IsNull("prbComment"))
                    {
                        prb.PrbComment = (string)table.Rows[i]["prbComment"];
                    }
                    else
                    {
                        prb.PrbComment = "";
                    }

                    model.Add(prb);
                }
                return true;
            }
            else
            {
                return false;
            }
        }

        public static bool Update(PostResponseBook model, ref string e)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update tb_PostResponseBook set ");
            strSql.Append("prbPassed=@prbPassed,");
            strSql.Append("prbEmployer=@prbEmployer,");
            strSql.Append("prbLaborUnit=@prbLaborUnit,");
            strSql.Append("prbLaborDep=@prbLaborDep,");
            strSql.Append("prbPostName=@prbPostName,");
            strSql.Append("prbPostType=@prbPostType,");
            strSql.Append("prbEduBg=@prbEduBg,");
            strSql.Append("prbCertificate=@prbCertificate,");
            strSql.Append("prbExperience=@prbExperience,");
            strSql.Append("prbSkill=@prbSkill,");
            strSql.Append("prbPersonality=@prbPersonality,");
            strSql.Append("prbPhyCond=@prbPhyCond,");
            strSql.Append("prbWorkOutline=@prbWorkOutline,");
            strSql.Append("prbWorkContntRequest=@prbWorkContntRequest,");
            strSql.Append("prbPower=@prbPower,");
            strSql.Append("prbResponse=@prbResponse,");
            strSql.Append("prbDirectLeader=@prbDirectLeader,");
            strSql.Append("prbSubordinate=@prbSubordinate,");
            strSql.Append("prbColleague=@prbColleague,");
            strSql.Append("prbServices=@prbServices,");
            strSql.Append("prbReleations=@prbReleations,");
            strSql.Append("prbWorkEnter=@prbWorkEnter,");
            strSql.Append("prbPostAssess=@prbPostAssess,");
            strSql.Append("prbOthers=@prbOthers,");
            strSql.Append("prbComment=@prbComment");
            strSql.Append(" where prbUserID=@prbUserID");
            SqlParameter[] parameters =
                {
                new SqlParameter("@prbUserID", SqlDbType.VarChar,10),
                new SqlParameter("@prbPassed", SqlDbType.Int,4),
                new SqlParameter("@prbEmployer", SqlDbType.NVarChar,50),  
                new SqlParameter("@prbLaborUnit", SqlDbType.NVarChar,50),
                new SqlParameter("@prbLaborDep", SqlDbType.NVarChar,50),
                new SqlParameter("@prbPostName", SqlDbType.NVarChar,50), 
                new SqlParameter("@prbPostType", SqlDbType.NVarChar,20),
                new SqlParameter("@prbEduBg", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@prbCertificate",SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@prbExperience", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@prbSkill", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@prbPersonality", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@prbPhyCond", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@prbWorkOutline", SqlDbType.NVarChar,int.MaxValue),
                new SqlParameter("@prbWorkContntRequest", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@prbPower", SqlDbType.NVarChar,int.MaxValue),
                new SqlParameter("@prbResponse", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@prbDirectLeader", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@prbSubordinate", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@prbColleague", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@prbServices", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@prbReleations", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@prbWorkEnter", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@prbPostAssess", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@prbOthers", SqlDbType.NVarChar,int.MaxValue),
                new SqlParameter("@prbComment", SqlDbType.NVarChar,50)
                
                };
            parameters[0].Value = model.PrbUserID;
            parameters[1].Value = model.PrbPassed;
            parameters[2].Value = model.PrbEmployer;
            parameters[3].Value = model.PrbLaborUnit;
            parameters[4].Value = model.PrbLaborDep;
            parameters[5].Value = model.PrbPostName;
            parameters[6].Value = model.PrbPostType;
            parameters[7].Value = model.PrbEduBg;
            parameters[8].Value = model.PrbCertificate;
            parameters[9].Value = model.PrbExperience;
            parameters[10].Value = model.PrbSkill;
            parameters[11].Value = model.PrbPersonality;
            parameters[12].Value = model.PrbPhyCond;
            parameters[13].Value = model.PrbWorkOutline;
            parameters[14].Value = model.PrbWorkContntRequest;
            parameters[15].Value = model.PrbPower;
            parameters[16].Value = model.PrbResponse;
            parameters[17].Value = model.PrbDirectLeader;
            parameters[18].Value = model.PrbSubordinate;
            parameters[19].Value = model.PrbColleague;
            parameters[20].Value = model.PrbServices;
            parameters[21].Value = model.PrbReleations;
            parameters[22].Value = model.PrbWorkEnter;
            parameters[23].Value = model.PrbPostAssess;
            parameters[24].Value = model.PrbOthers;
            parameters[25].Value = model.PrbComment;

            e = db.QueryExec(strSql.ToString(), parameters);
            if (e != "" && e != null)
            {
                return false;
            }
            return true;
        }

        public static bool UpdateComment(string prbUserID, string prbComment, ref string e)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update tb_PostResponseBook set ");
            strSql.Append("prbComment=@prbComment");
            strSql.Append(" where prbUserID=@prbUserID");
            SqlParameter[] parameters =
                {
                new SqlParameter("@prbUserID", SqlDbType.VarChar,10),
                new SqlParameter("@prbComment", SqlDbType.NVarChar,50),
                };
            parameters[0].Value = prbUserID;
            parameters[1].Value = prbComment;
            e = db.QueryExec(strSql.ToString(), parameters);
            if (e != "" && e != null)
            {
                return false;
            }
            return true;
        }

        public static bool Delete(string prbUserID, ref string e)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from tb_PostResponseBook  ");
            strSql.Append(" where prbUserID=@prbUserID ");
            SqlParameter[] parameters = {
					new SqlParameter("@prbUserID", SqlDbType.VarChar,10)};
            parameters[0].Value = prbUserID;

            e = db.QueryExec(strSql.ToString(), parameters);
            if (e != "" && e != null)
            {
                return false;
            }
            return true;
        }
    }
}
