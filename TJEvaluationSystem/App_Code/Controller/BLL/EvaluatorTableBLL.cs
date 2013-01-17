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
///EvaluatorTableBLL 的摘要说明
/// </summary>
namespace BLL
{
    public class EvaluatorTableBLL
    {
        public EvaluatorTableBLL()
        { }

        static readonly SQLDatabase db = new SQLDatabase();
        static public bool Insert(EvaluatorTable[] model, ref string e)
        {
            int count = model.Length;
            for (int i = 0; i < count; i++)
            {
                string sql = "insert into tb_EvaluatorTable values("
                                  + "@etEvaluatedID,@etEvaluateID,@etAssessTableID,@etWeight,@etKey,@etResponse,@etAbility,@etAttitude,@etVeto,@etSum)";
                SqlParameter[] parameters =
                {
                    new SqlParameter("@etEvaluatedID", SqlDbType.VarChar,10),
                    new SqlParameter("@etEvaluateID",SqlDbType.VarChar,10),
                    new SqlParameter("@etAssessTableID", SqlDbType.Int,4),
                    new SqlParameter("@etWeight", SqlDbType.Float),
                    new SqlParameter("@etKey",SqlDbType.Int,4),
                    new SqlParameter("@etResponse", SqlDbType.Int,4),
                    new SqlParameter("@etAbility", SqlDbType.Int,4),
                    new SqlParameter("@etAttitude", SqlDbType.Int,4),
                    new SqlParameter("@etVeto",SqlDbType.Int,4),
                    new SqlParameter("@etSum", SqlDbType.Float)

                };
                parameters[0].Value = model[i].EtEvaluatedID;
                parameters[1].Value = model[i].EtEvaluateID;
                parameters[2].Value = model[i].EtAssessTableID;
                parameters[3].Value = model[i].EtWeight;
                parameters[4].Value = model[i].EtKey;
                parameters[5].Value = model[i].EtResponse;
                parameters[6].Value = model[i].EtAbility;
                parameters[7].Value = model[i].EtAttitude;
                parameters[8].Value = model[i].EtVeto;
                parameters[9].Value = model[i].EtSum;

                string exception = db.InsertExec(sql, parameters);
                if (exception != "" && exception != null)
                {
                    e = exception;
                    return false;
                }
            }
            return true;
        }

        public static bool Select(string etEvaluatedID, string etEvaluateID, ref List<EvaluatorTable> model, ref string e)
        {
            string sql = "select * from tb_EvaluatorTable where etEvaluatedID='" + etEvaluatedID + "' and etEvaluateID='" + etEvaluateID + "'";
            return Select(ref model, ref e, sql);
        }
        public static bool Select(string etEvaluatedID, ref List<EvaluatorTable> model, ref string e)
        {
            string sql = "select * from tb_EvaluatorTable where etEvaluatedID='" + etEvaluatedID + "'";
            return Select(ref model, ref e, sql);
        }

        public static bool Select(ref List<EvaluatorTable> model, ref string e, string sql)
        {
            DataTable table = new DataTable();
            table = db.QueryDataTable(sql, ref e);
            if (table != null && table.Rows.Count > 0)
            {
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    EvaluatorTable et = new EvaluatorTable();
                    et.EtEvaluatedID = (string)table.Rows[i][0];
                    et.EtEvaluateID = (string)table.Rows[i][1];
                    et.EtAssessTableID= (int)table.Rows[i][2];
                    et.EtWeight = (double)table.Rows[i][3];
                    et.EtKey = (int)table.Rows[i][4];
                    et.EtResponse = (int)table.Rows[i][5];
                    et.EtAbility = (int)table.Rows[i][6];
                    et.EtAttitude = (int)table.Rows[i][7];
                    et.EtVeto = (int)table.Rows[i][8];
                    et.EtSum= (double)table.Rows[i][9];
                    model.Add(et);
                }
                return true;
            }
            else
            {
                if (e != "" && e != null)
                    return false;
                e = "被考核者尚未被考核";
                return false;
            }

        }

        public static bool Update(EvaluatorTable model, ref string e)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update tb_EvaluatorTable set ");
            strSql.Append("etWeight=@etWeight,");
            strSql.Append("etKey=@etKey,");
            strSql.Append("etResponse=@etResponse,");
            strSql.Append("etAbility=@etAbility,");
            strSql.Append("etAttitude=@etAttitude,");
            strSql.Append("etVeto=@etVeto,");
            strSql.Append("etSum=@etSum");
            strSql.Append(" where etEvaluatedID=@etEvaluatedID and  etEvaluateID=@etEvaluateID");
            SqlParameter[] parameters =
                {
                    new SqlParameter("@etEvaluatedID", SqlDbType.VarChar,10),
                    new SqlParameter("@etEvaluateID",SqlDbType.VarChar,10),
                    new SqlParameter("@etWeight", SqlDbType.Float),
                    new SqlParameter("@etKey",SqlDbType.Int,4),
                    new SqlParameter("@etResponse", SqlDbType.Int,4),
                    new SqlParameter("@etAbility", SqlDbType.Int,4),
                    new SqlParameter("@etAttitude", SqlDbType.Int,4),
                    new SqlParameter("@etVeto",SqlDbType.Int,4),
                    new SqlParameter("@etSum", SqlDbType.Float)

                };
            parameters[0].Value = model.EtEvaluatedID;
            parameters[1].Value = model.EtEvaluateID;
            parameters[2].Value = model.EtWeight;
            parameters[3].Value = model.EtKey;
            parameters[4].Value = model.EtResponse;
            parameters[5].Value = model.EtAbility;
            parameters[6].Value = model.EtAttitude;
            parameters[7].Value = model.EtVeto;
            parameters[8].Value = model.EtSum;

            e = db.QueryExec(strSql.ToString(), parameters);
            if (e != "" && e != null)
            {
                return false;
            }
            return true;
        }

        public static bool Delete(string etEvaluatedID, string etEvaluateID,ref string e)
        {
            etEvaluatedID = etEvaluatedID.Trim();
            etEvaluateID = etEvaluateID.Trim();
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from tb_EvaluatorTable ");
            strSql.Append(" where etEvaluatedID=@etEvaluatedID and  etEvaluateID=@etEvaluateID");
           
            SqlParameter[] parameters = 
            {
                new SqlParameter("@etEvaluatedID", SqlDbType.VarChar,10),
                new SqlParameter("@etEvaluateID",SqlDbType.VarChar,10)
             };
            parameters[0].Value = etEvaluatedID;
            parameters[1].Value = etEvaluateID;

            e = db.QueryExec(strSql.ToString(), parameters);
            if (e != "" && e != null)
            {
                return false;
            }
            return true;
        }

    }
}