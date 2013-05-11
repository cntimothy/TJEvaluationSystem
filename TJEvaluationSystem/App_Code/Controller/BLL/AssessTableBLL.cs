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
///AssessTableBLL 的摘要说明
/// </summary>

namespace BLL
{
    //已验证
    public class AssessTableBLL
    {
        public AssessTableBLL()
        { }
        static readonly SQLDatabase db = new SQLDatabase();


        //查询考核表状态
        //evaluatedID:被考评人ID
        //考核表不存在，返回-1；考核表审核未通过，返回0；审核通过返回1
        static public int GetAssessTableStatus(string evaluatedID)
        {
            if (evaluatedID == null || evaluatedID == "")
                return -1;
            AssessTable at = new AssessTable();
            string e = "";
            if (!Select(evaluatedID, ref at, ref e))
                return -1;  //考核表不存在
            else
            {
                if (at.AtPass == 1)
                    return 1;   //审核通过
                else
                    return 0;   //审核未通过
            }
        }

        //根据被考评人ID查询考评表
        //evaluaedID:被考评人ID;at:考核表对象；e:异常字符串；
        //成功返回true.否则返回fasle;
        static public bool Select(string evaluaedID, ref AssessTable at, ref string e)
        {
            if (evaluaedID == null || evaluaedID == "")
                return false;
            string sqlcmd = "select * from tb_AssessTable where atUserID='" + evaluaedID + "'";
            List<AssessTable> ats = new List<AssessTable>();
            if (!Select(sqlcmd, ref ats, ref e) || ats.Count == 0)
                return false;
            else
            {
                at = ats[0];
                return true;
            }
        }

        static public bool Insert(AssessTable[] at, ref string e)
        {
            int count = at.Length;
            for (int i = 0; i < count; i++)
            {
                List<AssessTable> model = new List<AssessTable>();
                if (Select(at[i].AtUserID, at[i].AtDep, at[i].AtDate, ref model, ref e))
                {
                    if (model.ElementAt(0).AtPass == 0)
                        e = "部门 " + at[i].AtDep + "  " + at[i].AtDate + " 的考核表已存在，尚未通过审核";
                    else
                    {
                        e = "部门 " + at[i].AtDep + "  " + at[i].AtDate + " 的考核表已存在，并通过审核";
                    }
                    return false;
                }

                string sql = "insert into tb_AssessTable values(@atUserID,@atDep,@atDate,@atPass,"
                                  + "@atKeyResponse1,@atKeyResponse2,@atKeyResponse3,@atKeyResponse4,@atKeyResponse5,"
                                  + "@atKeyAbility1,@atKeyAbility2,@atKeyAbility3,@atKeyAbility4,@atKeyAbility5,"
                                  + "@atKeyAttitude1,@atKeyAttitude2,@atKeyAttitude3,@atKeyAttitude4,@atKeyAttitude5,"
                                  + "@atResponse1,@atResponse2,@atResponse3,@atResponse4,@atResponse5,"
                                  + "@atAbility1,@atAbility2,@atAbility3,@atAbility4,@atAbility5,"
                                  + "@atAttitude1,@atAttitude2,@atAttitude3,@atAttitude4,@atAttitude5,"
                                  + "@atVeto1,@atVeto2,@atVeto3,@atVeto4,@atVeto5,@atVetoOthers,@atComment)";

                SqlParameter[] parameters =
                {
                new SqlParameter("@atUserID", SqlDbType.VarChar,10),
                new SqlParameter("@atDep", SqlDbType.NVarChar,50),
                new SqlParameter("@atDate", SqlDbType.DateTime),  
                new SqlParameter("@atPass", SqlDbType.Int,4),
                new SqlParameter("@atKeyResponse1", SqlDbType.NVarChar,int.MaxValue),
                new SqlParameter("@atKeyResponse2", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@atKeyResponse3", SqlDbType.NVarChar,int.MaxValue),
                new SqlParameter("@atKeyResponse4", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@atKeyResponse5", SqlDbType.NVarChar,int.MaxValue),
                new SqlParameter("@atKeyAbility1", SqlDbType.Int,4), 
                new SqlParameter("@atKeyAbility2", SqlDbType.Int,4), 
                new SqlParameter("@atKeyAbility3", SqlDbType.Int,4),
                new SqlParameter("@atKeyAbility4", SqlDbType.Int,4), 
                new SqlParameter("@atKeyAbility5", SqlDbType.Int,4), 
                new SqlParameter("@atKeyAttitude1", SqlDbType.Int,4), 
                new SqlParameter("@atKeyAttitude2", SqlDbType.Int,4), 
                new SqlParameter("@atKeyAttitude3", SqlDbType.Int,4), 
                new SqlParameter("@atKeyAttitude4", SqlDbType.Int,4), 
                new SqlParameter("@atKeyAttitude5", SqlDbType.Int,4), 
                new SqlParameter("@atResponse1", SqlDbType.NVarChar,int.MaxValue),
                new SqlParameter("@atResponse2", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@atResponse3", SqlDbType.NVarChar,int.MaxValue),
                new SqlParameter("@atResponse4", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@atResponse5", SqlDbType.NVarChar,int.MaxValue),
                new SqlParameter("@atAbility1", SqlDbType.Int,4), 
                new SqlParameter("@atAbility2", SqlDbType.Int,4), 
                new SqlParameter("@atAbility3", SqlDbType.Int,4), 
                new SqlParameter("@atAbility4", SqlDbType.Int,4),
                new SqlParameter("@atAbility5", SqlDbType.Int,4), 
                new SqlParameter("@atAttitude1", SqlDbType.Int,4), 
                new SqlParameter("@atAttitude2", SqlDbType.Int,4), 
                new SqlParameter("@atAttitude3", SqlDbType.Int,4), 
                new SqlParameter("@atAttitude4", SqlDbType.Int,4), 
                new SqlParameter("@atAttitude5", SqlDbType.Int,4), 
                new SqlParameter("@atVeto1", SqlDbType.Int,4), 
                new SqlParameter("@atVeto2", SqlDbType.Int,4), 
                new SqlParameter("@atVeto3", SqlDbType.Int,4), 
                new SqlParameter("@atVeto4", SqlDbType.Int,4), 
                new SqlParameter("@atVeto5", SqlDbType.Int,4),
                new SqlParameter("@atVetoOthers", SqlDbType.NVarChar,int.MaxValue),
                new SqlParameter("@atComment", SqlDbType.NVarChar, 50)
                };
                parameters[0].Value = at[i].AtUserID;
                parameters[1].Value = at[i].AtDep;
                parameters[2].Value = at[i].AtDate;
                parameters[3].Value = at[i].AtPass;
                parameters[4].Value = at[i].AtKeyResponse1;
                parameters[5].Value = at[i].AtKeyResponse2;
                parameters[6].Value = at[i].AtKeyResponse3;
                parameters[7].Value = at[i].AtKeyResponse4;
                parameters[8].Value = at[i].AtKeyResponse5;
                parameters[9].Value = at[i].AtKeyAbility1;
                parameters[10].Value = at[i].AtKeyAbility2;
                parameters[11].Value = at[i].AtKeyAbility3;
                parameters[12].Value = at[i].AtKeyAbility4;
                parameters[13].Value = at[i].AtKeyAbility5;
                parameters[14].Value = at[i].AtKeyAttitude1;
                parameters[15].Value = at[i].AtKeyAttitude2;
                parameters[16].Value = at[i].AtKeyAttitude3;
                parameters[17].Value = at[i].AtKeyAttitude4;
                parameters[18].Value = at[i].AtKeyAttitude5;
                parameters[19].Value = at[i].AtResponse1;
                parameters[20].Value = at[i].AtResponse2;
                parameters[21].Value = at[i].AtResponse3;
                parameters[22].Value = at[i].AtResponse4;
                parameters[23].Value = at[i].AtResponse5;
                parameters[24].Value = at[i].AtAbility1;
                parameters[25].Value = at[i].AtAbility2;
                parameters[26].Value = at[i].AtAbility3;
                parameters[27].Value = at[i].AtAbility4;
                parameters[28].Value = at[i].AtAbility5;
                parameters[29].Value = at[i].AtAttitude1;
                parameters[30].Value = at[i].AtAttitude2;
                parameters[31].Value = at[i].AtAttitude3;
                parameters[32].Value = at[i].AtAttitude4;
                parameters[33].Value = at[i].AtAttitude5;
                parameters[34].Value = at[i].AtVeto1;
                parameters[35].Value = at[i].AtVeto2;
                parameters[36].Value = at[i].AtVeto3;
                parameters[37].Value = at[i].AtVeto4;
                parameters[38].Value = at[i].AtVeto5;
                parameters[39].Value = at[i].AtVetoOthers;
                parameters[40].Value = at[i].AtComment;

                string exception = db.InsertExec(sql, parameters);
                if (exception != "" && exception != null)
                {
                    e = exception;
                    return false;
                }
            }
            return true;
        }

        public static bool Select(string atDep, DateTime atDate, ref List<AssessTable> model, ref string e)
        {
            DateTime newyear = atDate.AddYears(1);
            string sql = "select * from tb_AssessTable where "
                             + " atDep='" + atDep + "' and atDate>='" + atDate + "' and atDate<'" + newyear + "'";
            return Select(sql, ref model, ref e);
        }

        public static bool Select(string atUserID, string atDep, DateTime atDate, ref List<AssessTable> model, ref string e)
        {
            DateTime newyear = atDate.AddYears(1);
            string sql = "select * from tb_AssessTable where atUserID='" + atUserID
                             + "' and atDep='" + atDep + "' and atDate>='" + atDate + "' and atDate<'" + newyear + "'";
            return Select(sql, ref model, ref e);
        }
        
        public static bool Select(string sql, ref List<AssessTable> model, ref string e)
        {
            DataTable table = new DataTable();
            table = db.QueryDataTable(sql, ref e);
            if (table != null && table.Rows.Count > 0)
            {
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    AssessTable at = new AssessTable();
                    at.AtUserID = (string)table.Rows[i]["atUserID"];
                    at.AtDep = (string)table.Rows[i]["atDep"];
                    at.AtDate = (DateTime)table.Rows[i]["atDate"];
                    at.AtPass = (Int32)table.Rows[i]["atPass"];
                    if (!table.Rows[i]["atKeyResponse1"].Equals(DBNull.Value))
                        at.AtKeyResponse1 = (string)table.Rows[i]["atKeyResponse1"];
                    if (!table.Rows[i]["atKeyResponse2"].Equals(DBNull.Value))
                        at.AtKeyResponse2 = (string)table.Rows[i]["atKeyResponse2"];
                    if (!table.Rows[i]["atKeyResponse3"].Equals(DBNull.Value))
                        at.AtKeyResponse3 = (string)table.Rows[i]["atKeyResponse3"];
                    if (!table.Rows[i]["atKeyResponse4"].Equals(DBNull.Value))
                        at.AtKeyResponse4 = (string)table.Rows[i]["atKeyResponse4"];
                    if (!table.Rows[i]["atKeyResponse5"].Equals(DBNull.Value))
                        at.AtKeyResponse5 = (string)table.Rows[i]["atKeyResponse5"];
                    if (!table.Rows[i]["atKeyAbility1"].Equals(DBNull.Value))
                        at.AtKeyAbility1 = (Int32)table.Rows[i]["atKeyAbility1"];
                    if (!table.Rows[i]["atKeyAbility2"].Equals(DBNull.Value))
                        at.AtKeyAbility2 = (Int32)table.Rows[i]["atKeyAbility2"];
                    if (!table.Rows[i]["atKeyAbility3"].Equals(DBNull.Value))
                        at.AtKeyAbility3 = (Int32)table.Rows[i]["atKeyAbility3"];
                    if (!table.Rows[i]["atKeyAbility4"].Equals(DBNull.Value))
                        at.AtKeyAbility4 = (Int32)table.Rows[i]["atKeyAbility4"];
                    if (!table.Rows[i]["atKeyAbility5"].Equals(DBNull.Value))
                        at.AtKeyAbility5 = (Int32)table.Rows[i]["atKeyAbility5"];
                    if (!table.Rows[i]["atKeyAttitude1"].Equals(DBNull.Value))
                        at.AtKeyAttitude1 = (Int32)table.Rows[i]["atKeyAttitude1"];
                    if (!table.Rows[i]["atKeyAttitude2"].Equals(DBNull.Value))
                        at.AtKeyAttitude2 = (Int32)table.Rows[i]["atKeyAttitude2"];
                    if (!table.Rows[i]["atKeyAttitude3"].Equals(DBNull.Value))
                        at.AtKeyAttitude3 = (Int32)table.Rows[i]["atKeyAttitude3"];
                    if (!table.Rows[i]["atKeyAttitude4"].Equals(DBNull.Value))
                        at.AtKeyAttitude4 = (Int32)table.Rows[i]["atKeyAttitude4"];
                    if (!table.Rows[i]["atKeyAttitude5"].Equals(DBNull.Value))
                        at.AtKeyAttitude5 = (Int32)table.Rows[i]["atKeyAttitude5"];
                    if (!table.Rows[i]["atResponse1"].Equals(DBNull.Value))
                        at.AtResponse1 = (string)table.Rows[i]["atResponse1"];
                    if (!table.Rows[i]["atResponse2"].Equals(DBNull.Value))
                        at.AtResponse2 = (string)table.Rows[i]["atResponse2"];
                    if (!table.Rows[i]["atResponse3"].Equals(DBNull.Value))
                        at.AtResponse3 = (string)table.Rows[i]["atResponse3"];
                    if (!table.Rows[i]["atResponse4"].Equals(DBNull.Value))
                        at.AtResponse4 = (string)table.Rows[i]["atResponse4"];
                    if (!table.Rows[i]["atResponse5"].Equals(DBNull.Value))
                        at.AtResponse5 = (string)table.Rows[i]["atResponse5"];
                    if (!table.Rows[i]["atAbility1"].Equals(DBNull.Value))
                        at.AtAbility1 = (Int32)table.Rows[i]["atAbility1"];
                    if (!table.Rows[i]["atAbility2"].Equals(DBNull.Value))
                        at.AtAbility2 = (Int32)table.Rows[i]["atAbility2"];
                    if (!table.Rows[i]["atAbility3"].Equals(DBNull.Value))
                        at.AtAbility3 = (Int32)table.Rows[i]["atAbility3"];
                    if (!table.Rows[i]["atAbility4"].Equals(DBNull.Value))
                        at.AtAbility4 = (Int32)table.Rows[i]["atAbility4"];
                    if (!table.Rows[i]["atAbility5"].Equals(DBNull.Value))
                        at.AtAbility5 = (Int32)table.Rows[i]["atAbility5"];
                    if (!table.Rows[i]["atAttitude1"].Equals(DBNull.Value))
                        at.AtAttitude1 = (Int32)table.Rows[i]["atAttitude1"];
                    if (!table.Rows[i]["atAttitude2"].Equals(DBNull.Value))
                        at.AtAttitude2 = (Int32)table.Rows[i]["atAttitude2"];
                    if (!table.Rows[i]["atAttitude3"].Equals(DBNull.Value))
                        at.AtAttitude3 = (Int32)table.Rows[i]["atAttitude3"];
                    if (!table.Rows[i]["atAttitude4"].Equals(DBNull.Value))
                        at.AtAttitude4 = (Int32)table.Rows[i]["atAttitude4"];
                    if (!table.Rows[i]["atAttitude5"].Equals(DBNull.Value))
                        at.AtAttitude5 = (Int32)table.Rows[i]["atAttitude5"];
                    if (!table.Rows[i]["atVeto1"].Equals(DBNull.Value))
                        at.AtVeto1 = (Int32)table.Rows[i]["atVeto1"];
                    if (!table.Rows[i]["atVeto2"].Equals(DBNull.Value))
                        at.AtVeto2 = (Int32)table.Rows[i]["atVeto2"];
                    if (!table.Rows[i]["atVeto3"].Equals(DBNull.Value))
                        at.AtVeto3 = (Int32)table.Rows[i]["atVeto3"];
                    if (!table.Rows[i]["atVeto4"].Equals(DBNull.Value))
                        at.AtVeto4 = (Int32)table.Rows[i]["atVeto4"];
                    if (!table.Rows[i]["atVeto5"].Equals(DBNull.Value))
                        at.AtVeto5 = (Int32)table.Rows[i]["atVeto5"];
                    if (!table.Rows[i]["atVetoOthers"].Equals(DBNull.Value))
                        at.AtVetoOthers = (string)table.Rows[i]["atVetoOthers"];
                    if (!table.Rows[i]["atComment"].Equals(DBNull.Value))
                        at.AtComment = (string)table.Rows[i]["atComment"];
                    model.Add(at);
                }
                return true;

            }
            else
            {
                if (e != "" && e != null)
                    return false;

                e = "该考核表尚未建立";
                return false;
            }
        }

        public static bool Update(AssessTable model, ref string e)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update tb_AssessTable set ");
            strSql.Append("atDep=@atDep,");
            strSql.Append("atDate=@atDate,");
            strSql.Append("atPass=@atPass,");
            strSql.Append("atKeyResponse1=@atKeyResponse1,");
            strSql.Append("atKeyResponse2=@atKeyResponse2,");
            strSql.Append("atKeyResponse3=@atKeyResponse3,");
            strSql.Append("atKeyResponse4=@atKeyResponse4,");
            strSql.Append("atKeyResponse5=@atKeyResponse5,");
            strSql.Append("atKeyAbility1=@atKeyAbility1,");
            strSql.Append("atKeyAbility2=@atKeyAbility2,");
            strSql.Append("atKeyAbility3=@atKeyAbility3,");
            strSql.Append("atKeyAbility4=@atKeyAbility4,");
            strSql.Append("atKeyAbility5=@atKeyAbility5,");
            strSql.Append("atKeyAttitude1=@atKeyAttitude1,");
            strSql.Append("atKeyAttitude2=@atKeyAttitude2,");
            strSql.Append("atKeyAttitude3=@atKeyAttitude3,");
            strSql.Append("atKeyAttitude4=@atKeyAttitude4,");
            strSql.Append("atKeyAttitude5=@atKeyAttitude5,");
            strSql.Append("atResponse1=@atResponse1,");
            strSql.Append("atResponse2=@atResponse2,");
            strSql.Append("atResponse3=@atResponse3,");
            strSql.Append("atResponse4=@atResponse4,");
            strSql.Append("atResponse5=@atResponse5,");
            strSql.Append("atAbility1=@atAbility1,");
            strSql.Append("atAbility2=@atAbility2,");
            strSql.Append("atAbility3=@atAbility3,");
            strSql.Append("atAbility4=@atAbility4,");
            strSql.Append("atAbility5=@atAbility5,");
            strSql.Append("atAttitude1=@atAttitude1,");
            strSql.Append("atAttitude2=@atAttitude2,");
            strSql.Append("atAttitude3=@atAttitude3,");
            strSql.Append("atAttitude4=@atAttitude4,");
            strSql.Append("atAttitude5=@atAttitude5,");
            strSql.Append("atVeto1=@atVeto1,");
            strSql.Append("atVeto2=@atVeto2,");
            strSql.Append("atVeto3=@atVeto3,");
            strSql.Append("atVeto4=@atVeto4,");
            strSql.Append("atVeto5=@atVeto5,");
            strSql.Append("atVetoOthers=@atVetoOthers,");
            strSql.Append("atComment=@atComment,");
            strSql.Append(" where atUserID=@atUserID");
            SqlParameter[] parameters =
                {
                new SqlParameter("@atUserID", SqlDbType.VarChar,10),
                new SqlParameter("@atDep", SqlDbType.NVarChar,50),
                new SqlParameter("@atDate", SqlDbType.DateTime),  
                new SqlParameter("@atPass", SqlDbType.Int,4),
                new SqlParameter("@atKeyResponse1", SqlDbType.NVarChar,int.MaxValue),
                new SqlParameter("@atKeyResponse2", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@atKeyResponse3", SqlDbType.NVarChar,int.MaxValue),
                new SqlParameter("@atKeyResponse4", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@atKeyResponse5", SqlDbType.NVarChar,int.MaxValue),
                new SqlParameter("@atKeyAbility1", SqlDbType.Int,4), 
                new SqlParameter("@atKeyAbility2", SqlDbType.Int,4), 
                new SqlParameter("@atKeyAbility3", SqlDbType.Int,4),
                new SqlParameter("@atKeyAbility4", SqlDbType.Int,4), 
                new SqlParameter("@atKeyAbility5", SqlDbType.Int,4), 
                new SqlParameter("@atKeyAttitude1", SqlDbType.Int,4), 
                new SqlParameter("@atKeyAttitude2", SqlDbType.Int,4), 
                new SqlParameter("@atKeyAttitude3", SqlDbType.Int,4), 
                new SqlParameter("@atKeyAttitude4", SqlDbType.Int,4), 
                new SqlParameter("@atKeyAttitude5", SqlDbType.Int,4), 
                new SqlParameter("@atResponse1", SqlDbType.NVarChar,int.MaxValue),
                new SqlParameter("@atResponse2", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@atResponse3", SqlDbType.NVarChar,int.MaxValue),
                new SqlParameter("@atResponse4", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@atResponse5", SqlDbType.NVarChar,int.MaxValue),
                new SqlParameter("@atAbility1", SqlDbType.Int,4), 
                new SqlParameter("@atAbility2", SqlDbType.Int,4), 
                new SqlParameter("@atAbility3", SqlDbType.Int,4), 
                new SqlParameter("@atAbility4", SqlDbType.Int,4),
                new SqlParameter("@atAbility5", SqlDbType.Int,4), 
                new SqlParameter("@atAttitude1", SqlDbType.Int,4), 
                new SqlParameter("@atAttitude2", SqlDbType.Int,4), 
                new SqlParameter("@atAttitude3", SqlDbType.Int,4), 
                new SqlParameter("@atAttitude4", SqlDbType.Int,4), 
                new SqlParameter("@atAttitude5", SqlDbType.Int,4), 
                new SqlParameter("@atVeto1", SqlDbType.Int,4), 
                new SqlParameter("@atVeto2", SqlDbType.Int,4), 
                new SqlParameter("@atVeto3", SqlDbType.Int,4), 
                new SqlParameter("@atVeto4", SqlDbType.Int,4), 
                new SqlParameter("@atVeto5", SqlDbType.Int,4),
                new SqlParameter("@atVetoOthers", SqlDbType.NVarChar,int.MaxValue),
                new SqlParameter("@atComment", SqlDbType.NVarChar,50),
                };
            parameters[0].Value = model.AtUserID;
            parameters[1].Value = model.AtDep;
            parameters[2].Value = model.AtDate;
            parameters[3].Value = model.AtPass;
            parameters[4].Value = model.AtKeyResponse1;
            parameters[5].Value = model.AtKeyResponse2;
            parameters[6].Value = model.AtKeyResponse3;
            parameters[7].Value = model.AtKeyResponse4;
            parameters[8].Value = model.AtKeyResponse5;
            parameters[9].Value = model.AtKeyAbility1;
            parameters[10].Value = model.AtKeyAbility2;
            parameters[11].Value = model.AtKeyAbility3;
            parameters[12].Value = model.AtKeyAbility4;
            parameters[13].Value = model.AtKeyAbility5;
            parameters[14].Value = model.AtKeyAttitude1;
            parameters[15].Value = model.AtKeyAttitude2;
            parameters[16].Value = model.AtKeyAttitude3;
            parameters[17].Value = model.AtKeyAttitude4;
            parameters[18].Value = model.AtKeyAttitude5;
            parameters[19].Value = model.AtResponse1;
            parameters[20].Value = model.AtResponse2;
            parameters[21].Value = model.AtResponse3;
            parameters[22].Value = model.AtResponse4;
            parameters[23].Value = model.AtResponse5;
            parameters[24].Value = model.AtAbility1;
            parameters[25].Value = model.AtAbility2;
            parameters[26].Value = model.AtAbility3;
            parameters[27].Value = model.AtAbility4;
            parameters[28].Value = model.AtAbility5;
            parameters[29].Value = model.AtAttitude1;
            parameters[30].Value = model.AtAttitude2;
            parameters[31].Value = model.AtAttitude3;
            parameters[32].Value = model.AtAttitude4;
            parameters[33].Value = model.AtAttitude5;
            parameters[34].Value = model.AtVeto1;
            parameters[35].Value = model.AtVeto2;
            parameters[36].Value = model.AtVeto3;
            parameters[37].Value = model.AtVeto4;
            parameters[38].Value = model.AtVeto5;
            parameters[39].Value = model.AtVetoOthers;
            parameters[40].Value = model.AtComment;


            e = db.QueryExec(strSql.ToString(), parameters);
            if (e != "" && e != null)
            {
                return false;
            }
            return true;
        }

        public static bool SetAssesstablePassed(int atUserID, int atPass, ref string e)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update tb_AssessTable set ");
            strSql.Append("atPass=@atPass ");
            strSql.Append(" where atUserID=@atUserID");
            SqlParameter[] parameters =
            {
                new SqlParameter("@atUserID", SqlDbType.Int,4),
                new SqlParameter("@atPass", SqlDbType.Int,4)
            };
            parameters[0].Value = atUserID;
            parameters[1].Value = atPass;
            e = db.QueryExec(strSql.ToString(), parameters);
            if (e != "" && e != null)
            {
                return false;
            }
            return true;
        }

        public static bool UpdateStander(AssessTable model, ref string e)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update tb_AssessTable set ");
            strSql.Append("atKeyResponse1=@atKeyResponse1,");
            strSql.Append("atKeyResponse2=@atKeyResponse2,");
            strSql.Append("atKeyResponse3=@atKeyResponse3,");
            strSql.Append("atKeyResponse4=@atKeyResponse4,");
            strSql.Append("atKeyResponse5=@atKeyResponse5,");
            strSql.Append("atKeyAbility1=@atKeyAbility1,");
            strSql.Append("atKeyAbility2=@atKeyAbility2,");
            strSql.Append("atKeyAbility3=@atKeyAbility3,");
            strSql.Append("atKeyAbility4=@atKeyAbility4,");
            strSql.Append("atKeyAbility5=@atKeyAbility5,");
            strSql.Append("atKeyAttitude1=@atKeyAttitude1,");
            strSql.Append("atKeyAttitude2=@atKeyAttitude2,");
            strSql.Append("atKeyAttitude3=@atKeyAttitude3,");
            strSql.Append("atKeyAttitude4=@atKeyAttitude4,");
            strSql.Append("atKeyAttitude5=@atKeyAttitude5,");
            strSql.Append("atResponse1=@atResponse1,");
            strSql.Append("atResponse2=@atResponse2,");
            strSql.Append("atResponse3=@atResponse3,");
            strSql.Append("atResponse4=@atResponse4,");
            strSql.Append("atResponse5=@atResponse5,");
            strSql.Append("atAbility1=@atAbility1,");
            strSql.Append("atAbility2=@atAbility2,");
            strSql.Append("atAbility3=@atAbility3,");
            strSql.Append("atAbility4=@atAbility4,");
            strSql.Append("atAbility5=@atAbility5,");
            strSql.Append("atAttitude1=@atAttitude1,");
            strSql.Append("atAttitude2=@atAttitude2,");
            strSql.Append("atAttitude3=@atAttitude3,");
            strSql.Append("atAttitude4=@atAttitude4,");
            strSql.Append("atAttitude5=@atAttitude5,");
            strSql.Append("atVeto1=@atVeto1,");
            strSql.Append("atVeto2=@atVeto2,");
            strSql.Append("atVeto3=@atVeto3,");
            strSql.Append("atVeto4=@atVeto4,");
            strSql.Append("atVeto5=@atVeto5,");
            strSql.Append("atVetoOthers=@atVetoOthers,");
            strSql.Append("atComment=@atComment ");
            strSql.Append(" where atUserID=@atUserID");
            SqlParameter[] parameters =
                {
                new SqlParameter("@atKeyResponse1", SqlDbType.NVarChar,int.MaxValue),
                new SqlParameter("@atKeyResponse2", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@atKeyResponse3", SqlDbType.NVarChar,int.MaxValue),
                new SqlParameter("@atKeyResponse4", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@atKeyResponse5", SqlDbType.NVarChar,int.MaxValue),
                new SqlParameter("@atKeyAbility1", SqlDbType.Int,4), 
                new SqlParameter("@atKeyAbility2", SqlDbType.Int,4), 
                new SqlParameter("@atKeyAbility3", SqlDbType.Int,4),
                new SqlParameter("@atKeyAbility4", SqlDbType.Int,4), 
                new SqlParameter("@atKeyAbility5", SqlDbType.Int,4), 
                new SqlParameter("@atKeyAttitude1", SqlDbType.Int,4), 
                new SqlParameter("@atKeyAttitude2", SqlDbType.Int,4), 
                new SqlParameter("@atKeyAttitude3", SqlDbType.Int,4), 
                new SqlParameter("@atKeyAttitude4", SqlDbType.Int,4), 
                new SqlParameter("@atKeyAttitude5", SqlDbType.Int,4), 
                new SqlParameter("@atResponse1", SqlDbType.NVarChar,int.MaxValue),
                new SqlParameter("@atResponse2", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@atResponse3", SqlDbType.NVarChar,int.MaxValue),
                new SqlParameter("@atResponse4", SqlDbType.NVarChar,int.MaxValue), 
                new SqlParameter("@atResponse5", SqlDbType.NVarChar,int.MaxValue),
                new SqlParameter("@atAbility1", SqlDbType.Int,4), 
                new SqlParameter("@atAbility2", SqlDbType.Int,4), 
                new SqlParameter("@atAbility3", SqlDbType.Int,4), 
                new SqlParameter("@atAbility4", SqlDbType.Int,4),
                new SqlParameter("@atAbility5", SqlDbType.Int,4), 
                new SqlParameter("@atAttitude1", SqlDbType.Int,4), 
                new SqlParameter("@atAttitude2", SqlDbType.Int,4), 
                new SqlParameter("@atAttitude3", SqlDbType.Int,4), 
                new SqlParameter("@atAttitude4", SqlDbType.Int,4), 
                new SqlParameter("@atAttitude5", SqlDbType.Int,4), 
                new SqlParameter("@atVeto1", SqlDbType.Int,4), 
                new SqlParameter("@atVeto2", SqlDbType.Int,4), 
                new SqlParameter("@atVeto3", SqlDbType.Int,4), 
                new SqlParameter("@atVeto4", SqlDbType.Int,4), 
                new SqlParameter("@atVeto5", SqlDbType.Int,4),
                new SqlParameter("@atVetoOthers", SqlDbType.NVarChar,int.MaxValue),
                new SqlParameter("@atComment", SqlDbType.NVarChar,50),
                new SqlParameter("@atUserID", SqlDbType.Int,4)
                };

            parameters[0].Value = model.AtKeyResponse1;
            parameters[1].Value = model.AtKeyResponse2;
            parameters[2].Value = model.AtKeyResponse3;
            parameters[3].Value = model.AtKeyResponse4;
            parameters[4].Value = model.AtKeyResponse5;
            parameters[5].Value = model.AtKeyAbility1;
            parameters[6].Value = model.AtKeyAbility2;
            parameters[7].Value = model.AtKeyAbility3;
            parameters[8].Value = model.AtKeyAbility4;
            parameters[9].Value = model.AtKeyAbility5;
            parameters[10].Value = model.AtKeyAttitude1;
            parameters[11].Value = model.AtKeyAttitude2;
            parameters[12].Value = model.AtKeyAttitude3;
            parameters[13].Value = model.AtKeyAttitude4;
            parameters[14].Value = model.AtKeyAttitude5;
            parameters[15].Value = model.AtResponse1;
            parameters[16].Value = model.AtResponse2;
            parameters[17].Value = model.AtResponse3;
            parameters[18].Value = model.AtResponse4;
            parameters[19].Value = model.AtResponse5;
            parameters[20].Value = model.AtAbility1;
            parameters[21].Value = model.AtAbility2;
            parameters[22].Value = model.AtAbility3;
            parameters[23].Value = model.AtAbility4;
            parameters[24].Value = model.AtAbility5;
            parameters[25].Value = model.AtAttitude1;
            parameters[26].Value = model.AtAttitude2;
            parameters[27].Value = model.AtAttitude3;
            parameters[28].Value = model.AtAttitude4;
            parameters[29].Value = model.AtAttitude5;
            parameters[30].Value = model.AtVeto1;
            parameters[31].Value = model.AtVeto2;
            parameters[32].Value = model.AtVeto3;
            parameters[33].Value = model.AtVeto4;
            parameters[34].Value = model.AtVeto5;
            parameters[35].Value = model.AtVetoOthers;
            parameters[36].Value = model.AtComment;
            parameters[37].Value = model.AtUserID;

            e = db.QueryExec(strSql.ToString(), parameters);
            if (e != "" && e != null)
            {
                return false;
            }
            return true;
        }

        public static bool Delete(int atUserID, ref string e)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from tb_AssessTable ");
            strSql.Append(" where atUserID=@atID ");
            SqlParameter[] parameters = {
					new SqlParameter("@atID", SqlDbType.Int,4)};
            parameters[0].Value = atUserID;

            e = db.QueryExec(strSql.ToString(), parameters);
            if (e != "" && e != null)
            {
                return false;
            }
            return true;
        }
    }
}