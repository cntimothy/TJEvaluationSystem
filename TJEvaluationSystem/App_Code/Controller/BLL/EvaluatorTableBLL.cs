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

        //提交考评结果
        //成功返回true,否则返回false
        static public bool SubmitEvaluateResult(EvaluatorTable et)
        {
            if (et == null)
                return false;
            //获取EvaluationID
            string e = "";
            if (Insert(et, ref e))
                return true;
            else
                return false;
        }

        static public bool Insert(EvaluatorTable model, ref string e)
        {
                
            string sql = "insert into tb_EvaluatorTable values("
                                + "@etEvaluatedID,@etEvaluateID,@etAssessTableID,@etEvaluationID,@etRelation,@etKey,@etResponse,@etAbility,@etAttitude,@etVeto,@etSum)";
            SqlParameter[] parameters =
            {
                new SqlParameter("@etEvaluatedID", SqlDbType.VarChar,10),
                new SqlParameter("@etEvaluateID",SqlDbType.VarChar,10),
                new SqlParameter("@etAssessTableID", SqlDbType.Int,4),
                new SqlParameter("@etEvaluationID", SqlDbType.Int,4),
                new SqlParameter("@etRelation", SqlDbType.VarChar,10),
                new SqlParameter("@etKey",SqlDbType.Float),
                new SqlParameter("@etResponse", SqlDbType.Float),
                new SqlParameter("@etAbility", SqlDbType.Float),
                new SqlParameter("@etAttitude", SqlDbType.Float),
                new SqlParameter("@etVeto",SqlDbType.Float),
                new SqlParameter("@etSum", SqlDbType.Float)

            };
            parameters[0].Value = model.EtEvaluatedID;
            parameters[1].Value = model.EtEvaluateID;
            parameters[2].Value = model.EtAssessTableID;
            parameters[3].Value = model.EtEvaluationID;
            parameters[4].Value = model.EtRelation;
            parameters[5].Value = model.EtKey;
            parameters[6].Value = model.EtResponse;
            parameters[7].Value = model.EtAbility;
            parameters[8].Value = model.EtAttitude;
            parameters[9].Value = model.EtVeto;
            parameters[10].Value = model.EtSum;

            string exception = db.InsertExec(sql, parameters);
            if (exception != "" && exception != null)
            {
                e = exception;
                return false;
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
                    et.EtEvaluatedID = (string)table.Rows[i]["etEvaluatedID"];
                    et.EtEvaluateID = (string)table.Rows[i]["etEvaluateID"];
                    et.EtAssessTableID= (int)table.Rows[i]["etAssessTableID"];
                    et.EtEvaluationID = (int)table.Rows[i]["etEvaluationID"];
                    et.EtRelation = (string)table.Rows[i]["etRelation"];
                    var test = table.Rows[i][4];
                    et.EtKey = (float)Convert.ToDouble(table.Rows[i]["etKey"]);
                    et.EtResponse = (float)Convert.ToDouble(table.Rows[i]["etResponse"]);
                    et.EtAbility = (float)Convert.ToDouble(table.Rows[i]["etAbility"]);
                    et.EtAttitude = (float)Convert.ToDouble(table.Rows[i]["etAttitude"]);
                    et.EtVeto = (float)Convert.ToDouble(table.Rows[i]["etVeto"]);
                    et.EtSum = (float)Convert.ToDouble(table.Rows[i]["etSum"]);
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
            strSql.Append("etRelation=@etRelation,");
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
                    new SqlParameter("@etRelation", SqlDbType.VarChar,10),
                    new SqlParameter("@etKey",SqlDbType.Float),
                    new SqlParameter("@etResponse", SqlDbType.Float),
                    new SqlParameter("@etAbility", SqlDbType.Float),
                    new SqlParameter("@etAttitude", SqlDbType.Float),
                    new SqlParameter("@etVeto",SqlDbType.Float),
                    new SqlParameter("@etSum", SqlDbType.Float)

                };
            parameters[0].Value = model.EtEvaluatedID;
            parameters[1].Value = model.EtEvaluateID;
            parameters[2].Value = model.EtRelation;
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