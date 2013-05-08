using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DBUtility;
using Model;
using System.Data.SqlClient;
using System.Data;
using System.Text;

namespace BLL
{
    public class EvaluatorCommentBLL
    {
        static readonly SQLDatabase db = new SQLDatabase();

        public static bool Insert(EvaluatorComment model, ref string e)
        {
            string sql = "insert into tb_EvaluatorComment values(@ecEvaluatedID,@ecComment)";
            SqlParameter[] parameters =
                {
                    new SqlParameter("@ecEvaluatedID", SqlDbType.VarChar,10),
                    new SqlParameter("@ecComment",SqlDbType.NVarChar,50),
                };
            parameters[0].Value = model.EcEvaluatedID;
            parameters[1].Value = model.EcComment;

            string exception = db.InsertExec(sql, parameters);
            if (exception != "" && exception != null)
            {
                e = exception;
                return false;
            }
            return true;
        }

        public static bool Select(string ecEvaluatedID, ref string e)
        {
            List<EvaluatorComment> comments = new List<EvaluatorComment>();
            string strSql = "select * from tb_EvaluatorComment where ecEvaluatedID = '" + ecEvaluatedID + "'";
            return Select(ref comments, ref e, strSql);
        }

        public static bool Select(ref List<EvaluatorComment> comments, ref string e, string sql)
        {
            DataTable table = new DataTable();
            table = db.QueryDataTable(sql, ref e);
            if (table != null && table.Rows.Count > 0)
            {
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    EvaluatorComment comment = new EvaluatorComment();
                    comment.EcEvaluatedID = (string)table.Rows[i]["ecEvaluatedID"];
                    comment.EcComment = (string)table.Rows[i]["ecComment"];
                    comments.Add(comment);
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

        public static bool SelectComment(string ecEvaluatedID, ref string comment, ref string e)
        {
            string strSql = "select ecComment from tb_EvaluatorComment where ecEvaluatedID = '" + ecEvaluatedID + "'";
            comment = db.QueryValue(strSql);
            if (comment != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public static bool Update(EvaluatorComment comment, ref string e)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update tb_EvaluatorComment set ");
            strSql.Append("ecComment=@ecComment");
            strSql.Append(" where ecEvaluatedID=@ecEvaluatedID ");
            SqlParameter[] parameters =
                {
                    new SqlParameter("@ecEvaluatedID", SqlDbType.VarChar,10),
                    new SqlParameter("@ecComment",SqlDbType.NVarChar,50),                 
                };
            parameters[0].Value = comment.EcEvaluatedID;
            parameters[1].Value = comment.EcComment;


            e = db.QueryExec(strSql.ToString(), parameters);
            if (e != "" && e != null)
            {
                return false;
            }
            return true;
        }

        public static bool Delete(string ecEvaluatedID, ref string e)
        {
            ecEvaluatedID = ecEvaluatedID.Trim();
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from tb_Manager ");
            strSql.Append(" where ecEvaluatedID=@ecEvaluatedID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ecEvaluatedID", SqlDbType.VarChar,10)};
            parameters[0].Value = ecEvaluatedID;
            e = db.QueryExec(strSql.ToString(), parameters);
            if (e != "" && e != null)
            {
                return false;
            }
            return true;
        }
    }
}