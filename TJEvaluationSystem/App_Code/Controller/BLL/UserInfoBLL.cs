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
///UserInfoBLL 的摘要说明
/// </summary>
namespace BLL
{
    //已通过验证
    public class UserInfoBLL
    {
        public UserInfoBLL()
        { }
        static readonly SQLDatabase db = new SQLDatabase();


        //设置考评结束
        //evaluated:被考评人ID
        //成功返回true,失败返回false
        static public bool StopEvaluation(string evaluated)
        {
            if (evaluated == "")
                return false;
            string sql = "update tb_UserInfo set uiEvaluationStatus='2' where uiID=" + evaluated;
            if(!db.QueryExec(sql))
            {
                return false;
            }
            return true;
        }

        //获取被考评人名单
        //uis:被考评人信息List;e:异常信息;dep:部门
        //成功返回true,失败返回false
        static public bool GetEvaluatedUser(ref List<UserInfo> uis, ref string e,string dep="")
        {
            string sql = "";    //sql语句
            if(dep=="")
                sql = "select * from tb_UserInfo where uiType like '____1%'";   //全部部门
            else
                sql = "select * from tb_UserInfo where uiType like '____1%' and uiDepartment='" + dep + "'";  
            return Select(ref uis, ref e, sql);
        }

        
        //flag:true——考评人， false——被考评人
         static public bool Insert(UserInfo[] model, ref string e, bool flag)
         {
             int count = model.Length;
             for (int i = 0; i < count; i++)
             {
                 List<UserInfo> uistemp = new List<UserInfo>();
                 if (!Select(ref uistemp, model[i].UiID, ref e))
                 {
                     string sql = "insert into tb_UserInfo values("
                                       + "@uiID,@uiName,@uiSex,@uiIdentityNum,@uiDepartment,@uiTelephone,@uiEmail,@uiMobPhone,@uiAddress,@uiZipCode,@uiType,@uiJob,@uiFund,@uiCharacter,@uiCompany,@uiStartTime,@uiStopTime,@uiEvaluationStatus)";
                     SqlParameter[] parameters =
                     {
                        new SqlParameter("@uiID", SqlDbType.VarChar,10),
                        new SqlParameter("@uiName",SqlDbType.NVarChar,20),
                        new SqlParameter("@uiSex", SqlDbType.NVarChar,10),
                        new SqlParameter("@uiIdentityNum", SqlDbType.VarChar,19),
                        new SqlParameter("@uiDepartment",SqlDbType.NVarChar,50),
                        new SqlParameter("@uiTelephone", SqlDbType.VarChar,20),
                        new SqlParameter("@uiEmail", SqlDbType.NVarChar,50),
                        new SqlParameter("@uiMobPhone", SqlDbType.VarChar,20),
                        new SqlParameter("@uiAddress",SqlDbType.NVarChar,50),
                        new SqlParameter("@uiZipCode", SqlDbType.VarChar,50),
                        new SqlParameter("@uiType", SqlDbType.VarChar,10),
                        new SqlParameter("@uiJob", SqlDbType.NVarChar,10),                    
                        new SqlParameter("@uiFund", SqlDbType.NVarChar,10),
                        new SqlParameter("@uiCharacter", SqlDbType.NVarChar,10),
                        new SqlParameter("@uiCompany", SqlDbType.NVarChar,10),
                        new SqlParameter("@uiStartTime", SqlDbType.VarChar,10),
                        new SqlParameter("@uiStopTime", SqlDbType.VarChar,10),
                        new SqlParameter("@uiEvaluationStatus", SqlDbType.Int,4)
                         };
                     parameters[0].Value = model[i].UiID;
                     parameters[1].Value = model[i].UiName;
                     parameters[2].Value = model[i].UiSex;
                     parameters[3].Value = model[i].UiIdentityNum;
                     parameters[4].Value = model[i].UiDepartment;
                     parameters[5].Value = model[i].UiTelephone;
                     parameters[6].Value = model[i].UiEmail;
                     parameters[7].Value = model[i].UiMobPhone;
                     parameters[8].Value = model[i].UiAddress;
                     parameters[9].Value = model[i].UiZipCode;
                     parameters[10].Value = model[i].UiType;
                     parameters[11].Value = model[i].UiJob;
                     parameters[12].Value = model[i].UiFund;
                     parameters[13].Value = model[i].UiCharacter;
                     parameters[14].Value = model[i].UiCompany;
                     parameters[15].Value = model[i].UiStartTime;
                     parameters[16].Value = model[i].UiStopTime;
                     parameters[17].Value = model[i].UiEvaluationStatus;

                     string uiID = db.InsertExec(sql, parameters);
                     if (uiID != "" && uiID != null)
                     {
                         e = uiID;
                         return false;
                     }
                 }
                 else
                 {
                     //Update(model[i], ref e);
                     if(!uistemp[0].Equals(model[i]))
                     {
                         if (uistemp[0].UiType != model[i].UiType)
                         {
                             if (flag)
                             {
                                 model[i].UiType = uistemp[0].UiType.Remove(3, 1).Insert(3, "1");
                             }
                             else
                             {
                                 model[i].UiType = uistemp[0].UiType.Remove(4, 1).Insert(4, "1");
                             }
                         }
                         Update(model[i], ref e);
                     }
                 }
             }
             return true;
         }
        //选择全部用户数据
         public static bool Select(ref List<UserInfo> ui, ref string e)
         {
             string sql = "select * from tb_UserInfo";
             return Select(ref ui, ref e, sql);
         }
        //根据部门选择
         public static bool SelectByDepartment(string uiDepartment, ref List<UserInfo> ui, ref string e)
         {
             string sql = "select * from tb_UserInfo where uiDepartment='" + uiDepartment + "'";
             return Select(ref ui, ref e, sql);
         }

        //根据部门选择人数
         public static bool SelectCountByDepartment(string uiDepartment, ref int sum, ref string e)
         {
             string sql = "select count(*) from tb_UserInfo where uiDepartment='" + uiDepartment + "'";
             sum = Convert.ToInt32(db.QueryValue(sql));
             if (sum != 0)
             {
                 return true;
             }
             else
             {
                 return false;
             }
         }
         //根据类型选择
         public static bool SelectByType(string uiType, ref List<UserInfo> ui, ref string e)
         {
             string sql = "select * from tb_UserInfo where uiType like '" + uiType + "'";
             return Select(ref ui, ref e, sql);
         }
        //根据部门和类型选择
         public static bool Select(string uiDepartment,string uiType,ref List<UserInfo> ui, ref string e)
         {
             string sql = "select * from tb_UserInfo where uiDepartment='" + uiDepartment + "' and uiType like '" + uiType+"'";
             return Select(ref ui, ref e, sql);
         }
        //根据用户id选择
         public static bool Select(ref List<UserInfo> ui, string uiID, ref string e)
         {
             string sql = "select * from tb_UserInfo where uiID='" + uiID + "'";
             return Select(ref ui, ref e, sql);
         }

        //选择部门
         public static bool Select(List<string> departments, ref string e)
         {
             string strSql = "select distinct uiDepartment from tb_Userinfo";
             DataTable table = new DataTable();
             table = db.QueryDataTable(strSql, ref e);
             if (table != null && table.Rows.Count > 0)
             {
                 foreach (DataRow dr in table.Rows)
                 {
                     departments.Add((string)dr["uiDepartment"]);
                 }
                 return true;
             }
             else
             {
                 return false;
             }
         }

         public static bool Select(ref List<UserInfo> ui, ref string e,string sql)
         {
             DataTable table = new DataTable();
             table = db.QueryDataTable(sql, ref e);
             if (table != null && table.Rows.Count > 0)
             {
                 for (int i = 0; i < table.Rows.Count; i++)
                 {
                     UserInfo userinfo = new UserInfo();
                     userinfo.UiID = (string)table.Rows[i]["uiID"];
                     userinfo.UiName = (string)table.Rows[i]["uiName"];
                     userinfo.UiSex = (string)table.Rows[i]["uiSex"];
                     userinfo.UiIdentityNum = (string)table.Rows[i]["uiIdentityNum"];
                     userinfo.UiDepartment = (string)table.Rows[i]["uiDepartment"];
                     userinfo.UiTelephone = (string)table.Rows[i]["uiTelephone"];
                     userinfo.UiEmail = (string)table.Rows[i]["uiEmail"];
                     userinfo.UiMobPhone = (string)table.Rows[i]["uiMobPhone"];
                     userinfo.UiAddress = (string)table.Rows[i]["uiAddress"];
                     userinfo.UiZipCode = (string)table.Rows[i]["uiZipCode"];
                     userinfo.UiType = (string)table.Rows[i]["uiType"];
                     userinfo.UiJob = (string)table.Rows[i]["uiJob"];
                     userinfo.UiFund = (string)table.Rows[i]["uiFund"];
                     userinfo.UiCharacter = (string)table.Rows[i]["uiCharacter"];
                     userinfo.UiCompany = (string)table.Rows[i]["uiCompany"];
                     userinfo.UiStartTime = (string)table.Rows[i]["uiStartTime"];
                     userinfo.UiStopTime = (string)table.Rows[i]["uiStopTime"];
                     userinfo.UiEvaluationStatus = (int)table.Rows[i]["uiEvaluationStatus"];
                     ui.Add(userinfo);
                 }
                 return true;
             }
             else
             {
                 if (e != "" && e != null)
                     return false;
                 e = "查询用户不存在";
                 return false;
             }
            
         }

         public static bool Update(UserInfo model,ref string e)
         {
             StringBuilder strSql = new StringBuilder();
             strSql.Append("update tb_UserInfo set ");
             strSql.Append("uiName=@uiName,");
             strSql.Append("uiSex=@uiSex,");
             strSql.Append("uiIdentityNum=@uiIdentityNum,");
             strSql.Append("uiDepartment=@uiDepartment,");
             strSql.Append("uiTelephone=@uiTelephone,");
             strSql.Append("uiEmail=@uiEmail,");
             strSql.Append("uiMobPhone=@uiMobPhone,");
             strSql.Append("uiAddress=@uiAddress,");
             strSql.Append("uiZipCode=@uiZipCode,");
             strSql.Append("uiType=@uiType,");
             strSql.Append("uiJob=@uiJob,");
             strSql.Append("uiFund=@uiFund,");
             strSql.Append("uiCharacter=@uiCharacter,");
             strSql.Append("uiCompany=@uiCompany,");
             strSql.Append("uiStartTime=@uiStartTime,");
             strSql.Append("uiStopTime=@uiStopTime ");
             strSql.Append("uiEvaluationStatus=@uiEvaluationStatus ");
             strSql.Append(" where uiID=@uiID ");
             SqlParameter[] parameters =
            {
                new SqlParameter("@uiID", SqlDbType.VarChar,10),
                new SqlParameter("@uiName",SqlDbType.NVarChar,20),
                new SqlParameter("@uiSex", SqlDbType.NVarChar,10),
                new SqlParameter("@uiIdentityNum", SqlDbType.VarChar,19),
                new SqlParameter("@uiDepartment",SqlDbType.NVarChar,50),
                new SqlParameter("@uiTelephone", SqlDbType.VarChar,20),
                new SqlParameter("@uiEmail", SqlDbType.NVarChar,50),
                new SqlParameter("@uiMobPhone", SqlDbType.VarChar,20),
                new SqlParameter("@uiAddress",SqlDbType.NVarChar,50),
                new SqlParameter("@uiZipCode", SqlDbType.VarChar,50),
                new SqlParameter("@uiType", SqlDbType.VarChar,10),
                new SqlParameter("@uiJob", SqlDbType.NVarChar,10),                    
                new SqlParameter("@uiFund", SqlDbType.NVarChar,10),
                new SqlParameter("@uiCharacter", SqlDbType.NVarChar,10),
                new SqlParameter("@uiCompany", SqlDbType.NVarChar,10),
                new SqlParameter("@uiStartTime", SqlDbType.VarChar,10),
                new SqlParameter("@uiStopTime", SqlDbType.VarChar,10),
                new SqlParameter("@uiEvaluationStatus", SqlDbType.Int,4)
            };
             parameters[0].Value = model.UiID;
             parameters[1].Value = model.UiName;
             parameters[2].Value = model.UiSex;
             parameters[3].Value = model.UiIdentityNum;
             parameters[4].Value = model.UiDepartment;
             parameters[5].Value = model.UiTelephone;
             parameters[6].Value = model.UiEmail;
             parameters[7].Value = model.UiMobPhone;
             parameters[8].Value = model.UiAddress;
             parameters[9].Value = model.UiZipCode;
             parameters[10].Value = model.UiType;
             parameters[11].Value = model.UiJob;
             parameters[12].Value = model.UiFund;
             parameters[13].Value = model.UiCharacter;
             parameters[14].Value = model.UiCompany;
             parameters[15].Value = model.UiStartTime;
             parameters[16].Value = model.UiStopTime;
             parameters[17].Value = model.UiEvaluationStatus;
             e=db.QueryExec(strSql.ToString(), parameters);
             if (e != "" && e != null)
             {
                 return false;
             }

             return true;
         }

         public static bool Delete(string uiID,ref string e)
         {
             uiID = uiID.Trim();
             StringBuilder strSql = new StringBuilder();
             strSql.Append("delete from tb_UserInfo ");
             strSql.Append(" where uiID=@uiID ");
             SqlParameter[] parameters = {
					new SqlParameter("@uiID", SqlDbType.VarChar,10)};
             parameters[0].Value = uiID;

             e = db.QueryExec(strSql.ToString(), parameters);
             if (e != "" && e != null)
             {
                 return false;
             }
             return true;
         }
    }
}