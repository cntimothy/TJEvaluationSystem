using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Model;
using DBUtility;
using System.Data;
using System.Text;
using System.Data.SqlClient;

namespace BLL
{
    public class EvaluatorInfoBLL
    {
        public EvaluatorInfoBLL()
        { }
        static readonly SQLDatabase db = new SQLDatabase();

         static public bool Insert(EvaluatorInfo[] model, ref string e)
         {
             int count = model.Length;
             for (int i = 0; i < count; i++)
             {
                 List<EvaluatorInfo> evistemp = new List<EvaluatorInfo>();
                 if (!Select(evistemp, model[i].EvID, ref e))
                 {
                     string sql = "insert into tb_EvaluatorInfo values("
                                       + "@evID,@evName,@evSex,@evDepartment,@evMobPhone,@evTelephone,@evEmail,@evAddress,@evZipCode,@evUnit)";
                     SqlParameter[] parameters =
                     {
                        new SqlParameter("@evID", SqlDbType.VarChar,10),
                        new SqlParameter("@evName",SqlDbType.NVarChar,20),
                        new SqlParameter("@evSex", SqlDbType.NVarChar,10),
                        new SqlParameter("@evDepartment",SqlDbType.NVarChar,50),
                        new SqlParameter("@evMobPhone", SqlDbType.VarChar,20),
                        new SqlParameter("@evTelephone", SqlDbType.VarChar,20),
                        new SqlParameter("@evEmail", SqlDbType.NVarChar,50),
                        new SqlParameter("@evAddress",SqlDbType.NVarChar,50),
                        new SqlParameter("@evZipCode", SqlDbType.VarChar,50),
                        new SqlParameter("@evUnit",SqlDbType.NVarChar,50),
                         };
                     parameters[0].Value = model[i].EvID;
                     parameters[1].Value = model[i].EvName;
                     parameters[2].Value = model[i].EvSex;
                     parameters[3].Value = model[i].EvDepartment;
                     parameters[4].Value = model[i].EvMobPhone;
                     parameters[5].Value = model[i].EvTelephone;
                     parameters[6].Value = model[i].EvEmail;
                     parameters[7].Value = model[i].EvAddress;
                     parameters[8].Value = model[i].EvZipCode;
                     parameters[9].Value = model[i].EvUnit;

                     string eviID = db.InsertExec(sql, parameters);
                     if (eviID != "" && eviID != null)
                     {
                         e = eviID;
                         return false;
                     }
                 }
                 else
                 {
                     //Update(model[i], ref e);
                     if(!evistemp[0].Equals(model[i]))
                     {
                         Update(model[i], ref e);
                     }
                 }
             }
             return true;
         }
        //选择全部用户数据
         public static bool Select(List<EvaluatorInfo> evi, ref string e)
         {
             string sql = "select * from tb_EvaluatorInfo";
             return Select(evi, ref e, sql);
         }

        //根据用户id选择
         public static bool Select(List<EvaluatorInfo> evi, string evID, ref string e)
         {
             string sql = "select * from tb_EvaluatorInfo where evID='" + evID + "'";
             return Select(evi, ref e, sql);
         }

        //根据用户单位选择
         public static bool SelectByUnit(List<EvaluatorInfo> evi, string evUnit, ref string e)
         {
             string sql = "Select * from tb_EvaluatorInfo where evUnit='" + evUnit + "'";
             return Select(evi, ref e, sql);
         }

         public static bool Select(List<EvaluatorInfo> evi, ref string e,string sql)
         {
             DataTable table = new DataTable();
             table = db.QueryDataTable(sql, ref e);
             if (table != null && table.Rows.Count > 0)
             {
                 for (int i = 0; i < table.Rows.Count; i++)
                 {
                     EvaluatorInfo evaluatorInfo = new EvaluatorInfo();
                     evaluatorInfo.EvID = (string)table.Rows[i]["evID"];
                     evaluatorInfo.EvName = (string)table.Rows[i]["evName"];
                     evaluatorInfo.EvSex = (string)table.Rows[i]["evSex"];
                     evaluatorInfo.EvDepartment = (string)table.Rows[i]["evIdentityNum"];
                     evaluatorInfo.EvMobPhone = (string)table.Rows[i]["evDepartment"];
                     evaluatorInfo.EvTelephone = (string)table.Rows[i]["evTelephone"];
                     evaluatorInfo.EvEmail = (string)table.Rows[i]["evEmail"];
                     evaluatorInfo.EvAddress = (string)table.Rows[i]["evAddress"];
                     evaluatorInfo.EvZipCode = (string)table.Rows[i]["evZipCode"];
                     evaluatorInfo.EvUnit = (string)table.Rows[i]["evUnit"];

                     evi.Add(evaluatorInfo);
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

         public static bool Update(EvaluatorInfo model, ref string e)
         {
             StringBuilder strSql = new StringBuilder();
             strSql.Append("update tb_EvaluatorInfo set ");
             strSql.Append("evName=@evName,");
             strSql.Append("evSex=@evSex,");
             strSql.Append("evDepartment=@evDepartment,");
             strSql.Append("evMobPhone=@evMobPhone,");
             strSql.Append("evTelephone=@evTelephone,");
             strSql.Append("evEmail=@evEmail,");
             strSql.Append("evAddress=@evAddress,");
             strSql.Append("evZipCode=@evZipCode,");
             strSql.Append("evUnitt=@evUnit");
             strSql.Append(" where evID=@evID ");
             SqlParameter[] parameters =
            {
                new SqlParameter("@evID", SqlDbType.VarChar,10),
                new SqlParameter("@evName",SqlDbType.NVarChar,20),
                new SqlParameter("@evSex", SqlDbType.NVarChar,10),
                new SqlParameter("@evDepartment",SqlDbType.NVarChar,50),
                new SqlParameter("@evMobPhone", SqlDbType.VarChar,20),
                new SqlParameter("@evTelephone", SqlDbType.VarChar,20),
                new SqlParameter("@evEmail", SqlDbType.NVarChar,50),
                new SqlParameter("@evAddress",SqlDbType.NVarChar,50),
                new SqlParameter("@evZipCode", SqlDbType.VarChar,50),
                new SqlParameter("@evUnit",SqlDbType.NVarChar,50),
            };
             parameters[0].Value = model.EvID;
             parameters[1].Value = model.EvName;
             parameters[2].Value = model.EvSex;
             parameters[3].Value = model.EvDepartment;
             parameters[4].Value = model.EvMobPhone;
             parameters[5].Value = model.EvTelephone;
             parameters[6].Value = model.EvEmail;
             parameters[7].Value = model.EvAddress;
             parameters[8].Value = model.EvZipCode;
             parameters[9].Value = model.EvUnit;

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
             strSql.Append("delete from tb_EvaluatorInfo ");
             strSql.Append(" where evID=@evID ");
             SqlParameter[] parameters = {
					new SqlParameter("@evID", SqlDbType.VarChar,10)};
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