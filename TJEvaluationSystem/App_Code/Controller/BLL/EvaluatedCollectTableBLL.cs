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
///EvaluatedCollectTableBLL 的摘要说明
/// </summary>
namespace BLL
{
    public class EvaluatedCollectTableBLL
    {
        public EvaluatedCollectTableBLL()
        { }
        static readonly SQLDatabase db = new SQLDatabase();

        //计算被考评人的考核结果
        //id:被考评人id
        //成功返回true,否则返回false
        static public bool CountEvaluationResultByID(string id)
        {
            if (id == "")
                return false;
            string e = "";
            //获取考核人总数
            List <EvaluatorTable> ets =new List <EvaluatorTable>();
            if(!EvaluatorTableBLL.Select(id,ref ets,ref e))
                return false;
            int nums=ets.Count;
            //获取考核结果
            DataTable tResult = new DataTable();
            
            string sql = "SELECT   etRelation, AVG(etSum) AS AVG FROM tb_EvaluatorTable WHERE (etEvaluatedID = '"+id+"') GROUP BY etRelation";
            tResult = db.QueryDataTable(sql, ref e);
            double sum=0; 
            if (tResult != null && tResult.Rows.Count > 0)
            {
                int weight=0;
                for (int i = 0; i < tResult.Rows.Count; i++)
                {
                    string relation=(string)tResult.Rows[i]["etRelation"];
                    double avg=(double)tResult.Rows[i]["AVG"];
                    if (tResult.Rows.Count==4)
                        weight=RelationBLL.GetWeightByRelation(relation,false);
                    else
                        weight=RelationBLL.GetWeightByRelation(relation,true);
                    sum+=avg*weight;
                }
            }
            else 
                return false;

            EvaluatedCollectTable ect = new EvaluatedCollectTable();
            ect.EctUserID = id;
            ect.EctScore = sum;
            ect.EctResult = sum;
            ect.EctEvaluatorNum = nums;
            ect.EctPs = "";
            if (!Insert(ect, ref e))
                return false;
            return true;
        }

        static public bool Insert(EvaluatedCollectTable ect, ref string e)
        {
            List<EvaluatedCollectTable> model = new List<EvaluatedCollectTable>();
            if (Select(ect.EctUserID, ref model, ref e))
            {
                e = "被考核者 " + ect[i].EctUserID + " 的个人考核汇总表已存在";
                return false;
            }

            string sql = "insert into tb_EvaluatedCollectTable("
                            + "ectUserID,ectScore,ectResult,ectEvaluatorNum,ectPs)"
                            + " values(@ectUserID,@ectScore,@ectResult,@ectEvaluatorNum,@ectPs)";
            SqlParameter[] parameters =
            {
                new SqlParameter("@ectUserID", SqlDbType.VarChar,10),
                new SqlParameter("@ectScore", SqlDbType.Float),
                new SqlParameter("@ectResult", SqlDbType.Float),
                new SqlParameter("@ectEvaluatorNum", SqlDbType.Int,4),
                new SqlParameter("@ectPs", SqlDbType.NVarChar,int.MaxValue)
            };
            parameters[0].Value = ect.EctUserID;
            parameters[1].Value = ect.EctScore;
            parameters[2].Value = ect.EctResult;
            parameters[3].Value = ect.EctEvaluatorNum;
            parameters[4].Value = ect.EctPs;

            string exception = db.InsertExec(sql, parameters);
            if (exception != "" && exception != null)
            {
                e = exception;
                return false;
            }
            return true;
        }

        static public bool Select(string ectUserID, ref List<EvaluatedCollectTable> model, ref string e)
        {
            string sql = "select * from tb_EvaluatedCollectTable where ectUserID='" + ectUserID + "'";
            return Select(ref model, ref e, sql);
        }
        static public bool Select(int ectID, ref List<EvaluatedCollectTable> model, ref string e)
        {
            string sql = "select * from tb_EvaluatedCollectTable where ectID=" + ectID;
            return Select(ref model, ref e, sql);
        }
        static public bool Select(ref List<EvaluatedCollectTable> model, ref string e)
        {
            string sql = "select * from tb_EvaluatedCollectTable";
            return Select(ref model, ref e, sql);
        }
        static public bool Select(ref List<EvaluatedCollectTable> model, ref string e, string sql)
        {
            DataTable table = new DataTable();
            table = db.QueryDataTable(sql, ref e);
            if (table != null && table.Rows.Count > 0)
            {
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    EvaluatedCollectTable ect = new EvaluatedCollectTable();
                    ect.EctID = (Int32)table.Rows[i][0];
                    ect.EctUserID = (string)table.Rows[i][1];
                    ect.EctScore = (double)table.Rows[i][2];
                    ect.EctResult = (double)table.Rows[i][3];
                    ect.EctEvaluatorNum = (Int32)table.Rows[i][4];
                    ect.EctPs = (string)table.Rows[i][5];
                    model.Add(ect);
                }
                return true;
            }
            else
            {
                if (e != "" && e != null)
                    return false;
                e = "该考核汇总表尚未建立";
                return false;
            }
        }

        public static bool Update(EvaluatedCollectTable model, ref string e)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update tb_EvaluatedCollectTable set ");
            strSql.Append("ectUserID=@ectUserID,");
            strSql.Append("ectScore=@ectScore,");
            strSql.Append("ectResult=@ectResult,");
            strSql.Append("ectEvaluatorNum=@ectEvaluatorNum,");
            strSql.Append("ectPs=@ectPs");
            strSql.Append(" where ectID=@ectID ");
            SqlParameter[] parameters =
                 {
                     new SqlParameter("@ectUserID", SqlDbType.VarChar,10),
                     new SqlParameter("@ectScore", SqlDbType.Float),
                     new SqlParameter("@ectResult", SqlDbType.Float),
                     new SqlParameter("@ectEvaluatorNum", SqlDbType.Int,4),
                     new SqlParameter("@ectPs", SqlDbType.NVarChar,int.MaxValue),
                      new SqlParameter("@ectID", SqlDbType.Int,4)
                 };
            parameters[0].Value = model.EctUserID;
            parameters[1].Value = model.EctScore;
            parameters[2].Value = model.EctResult;
            parameters[3].Value = model.EctEvaluatorNum;
            parameters[4].Value = model.EctPs;
            parameters[5].Value = model.EctID;

            e = db.QueryExec(strSql.ToString(), parameters);
            if (e != "" && e != null)
            {
                return false;
            }
            return true;
        }

        public static bool Delete(string ectUserID, ref string e)
        {
            ectUserID = ectUserID.Trim();
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from tb_EvaluatedCollectTable ");
            strSql.Append(" where ectUserID=@ectUserID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ectUserID", SqlDbType.VarChar,10)};
            parameters[0].Value = ectUserID;

            e = db.QueryExec(strSql.ToString(), parameters);
            if (e != "" && e != null)
            {
                return false;
            }
            return true;
        }
    }
}