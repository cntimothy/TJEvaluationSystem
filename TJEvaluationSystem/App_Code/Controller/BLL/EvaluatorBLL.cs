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
///EvaluatorBLL 的摘要说明
/// </summary>
namespace BLL
{
    public class EvaluatorBLL
    {
        public EvaluatorBLL()
        { }

        static readonly SQLDatabase db = new SQLDatabase();

        static public bool Insert(Evaluator[] model, ref string e)
        {
            int count = model.Length;
            for (int i = 0; i < count; i++)
            {
                string sql = "insert into tb_Evaluator values("
                                  + "@uiID,@EvaluatedID,@relation,@pass,@status)";
                SqlParameter[] parameters =
                {
                    new SqlParameter("@uiID", SqlDbType.VarChar,10),
                    new SqlParameter("@EvaluatedID",SqlDbType.VarChar,10),
                    new SqlParameter("@relation", SqlDbType.VarChar,10),
                    new SqlParameter("@pass", SqlDbType.Int,4),
                    new SqlParameter("@status", SqlDbType.Int,4)
                   
                };
                parameters[0].Value = model[i].UiID;
                parameters[1].Value = model[i].EvaluatedID;
                parameters[2].Value = model[i].Relation;
                parameters[3].Value = model[i].Pass;
                parameters[4].Value = model[i].Status;

                string exception = db.InsertExec(sql, parameters);
                if (exception != "" && exception != null)
                {
                    e = exception;
                    return false;
                }
            }
            return true;
        }

        public static bool Select(ref List<Evaluator> model, ref string e)
        {
            string sql = "select * from tb_Evaluator ";
            return Select(ref model, ref e, sql);
        }

        //根据ID选择
        public static bool SelectByID(List<Evaluator> model, string evaluatedID, ref string e)
        {
            string sql = "select * from tb_Evaluator where EvaluatedID='" + evaluatedID + "'";
            return Select(ref model, ref e, sql);
        }

        //根据考评人和被考评人的ID选择
        public static bool SelectByIDs(List<Evaluator> model, string evaluatedID, string evaluatorID, ref string e)
        {
            string sql = "select * from tb_Evaluator where evaluatedID='" + evaluatedID + "' and uiID='"+ evaluatorID +"'";
            return Select(ref model, ref e, sql);
        }

        public static bool Select(string uiID, int pass, ref List<Evaluator> model, ref string e)
        {
            string sql = "select * from tb_Evaluator where uiID='" + uiID + "' and pass=" + pass;
            return Select(ref model, ref e, sql);
        }

        public static bool Select(ref List<Evaluator> model, string EvaluatedID, int pass, ref string e)
        {
            string sql = "select * from tb_Evaluator where EvaluatedID='" + EvaluatedID + "' and pass=" + pass;
            return Select(ref model, ref e, sql);
        }

        //获取考评情况汇总
        public static bool SelectSummary(ref DataTable dt, ref string e)
        {
            string strSql = "select   EvaluatedID as ID, sum(status) as Done, count(*) as Sum from tb_Evaluator group by EvaluatedID";
            dt = db.QueryDataTable(strSql, ref e);
            if (dt != null && dt.Rows.Count > 0)
            {
                return true;
            }
            else
            {
                if (e != "" && e != null)
                    return false;
                e = "考评人名单尚未制定";
                return false;
            }
        }

        public static bool Select(ref List<Evaluator> model, ref string e, string sql)
        {
            DataTable table = new DataTable();
            table = db.QueryDataTable(sql, ref e);
            if (table != null && table.Rows.Count > 0)
            {
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    Evaluator evaluator = new Evaluator();
                    evaluator.UiID = (string)table.Rows[i][0];
                    evaluator.EvaluatedID = (string)table.Rows[i][1];
                    evaluator.Relation = (string)table.Rows[i][2];
                    evaluator.Pass = (int)table.Rows[i][3];
                    evaluator.Status = (int)table.Rows[i][4];
                    model.Add(evaluator);
                }
                return true;
            }
            else
            {
                if (e != "" && e != null)
                    return false;
                e = "考评人名单尚未制定";
                return false;
            }

        }

        public static bool Select1(ref List<Evaluator> model, string uiID, int pass, ref string e)
        {
            string sql = "select * from tb_Evaluator where uiID='" + uiID + "' and pass=" + pass;
            return Select1(ref model, ref e, sql);
        }
        
        public static bool Select1(ref List<Evaluator> model, ref string e, string sql)
        {
            DataTable table = new DataTable();
            table = db.QueryDataTable(sql, ref e);
            if (table.Rows.Count == 1)
            {
                return true;
            }
            else return false;
        }

        //统计汇总情况
        public static bool SelectSummary(List<Summary> summarys, ref string e)
        {
            string strSql = "select distinct tb_UserInfo.uiID as ID, tb_UserInfo.uiDepartment as department, tb_Evaluator.pass as passed " + 
                "from tb_UserInfo left outer join tb_Evaluator "+
                "on tb_UserInfo.uiID = tb_Evaluator.EvaluatedID " + 
                "order by passed desc";
            DataTable table = new DataTable();
            table = db.QueryDataTable(strSql, ref e);
            table.Columns.Remove("ID");
            if (table != null && table.Rows.Count > 0)
            {
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    Summary s = new Summary();
                    s.Department = (string)table.Rows[i]["department"];
                    if (!(table.Rows[i]["passed"] is DBNull))
                    {
                        s.Passed = Convert.ToInt32(table.Rows[i]["passed"]);
                    }
                    else
                        s.Passed = -1;

                    summarys.Add(s);
                }
                return true;
            }
            else
            {
                return false;
            }
        }

        //更新通过,同时要更新User
        public static bool Update1(Evaluator model, ref string e)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update tb_Evaluator set ");
            strSql.Append("pass=@pass");
            strSql.Append(" where uiID=@uiID and  EvaluatedID=@EvaluatedID");
            SqlParameter[] parameters =
                {
                    new SqlParameter("@pass", SqlDbType.Int,4),
                    new SqlParameter("@uiID", SqlDbType.VarChar,10),
                    new SqlParameter("@EvaluatedID",SqlDbType.VarChar,10)
                };
            parameters[0].Value = model.Pass;
            parameters[1].Value = model.UiID;
            parameters[2].Value = model.EvaluatedID;
            
            //更新Evaluator表
            e = db.QueryExec(strSql.ToString(), parameters);

            if (e != "" && e != null)
            {
                return false;
            }

            //更新User表
            if (model.Pass == 1)
            {
                List<User> users = new List<User>();
                if (UserBLL.Select(model.UiID, ref users, ref e))
                {
                    User user = new Model.User();
                    user = users.ElementAt(0);
                    user.UType = user.UType.Remove(3, 1).Insert(3, "1");

                    if (!UserBLL.Update(user, ref e))
                    {
                        return false;
                    }
                }
                else
                {
                    User[] user = new User[1];
                    user[0] = new User();
                    user[0].UID = model.UiID;
                    user[0].UType = "00010";//考评者
                    if (!UserBLL.Insert(user, ref e))
                    {
                        return false;
                    }
                }


                if (e != "" && e != null)
                {
                    return false;
                }
            }
            return true;
        }

        //退回,同时要更新User Userinfo
        public static bool Update3(Evaluator model, ref string e)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update tb_Evaluator set ");
            strSql.Append("pass=@pass");
            strSql.Append(" where uiID=@uiID and  EvaluatedID=@EvaluatedID");
            SqlParameter[] parameters =
                {
                    new SqlParameter("@uiID", SqlDbType.VarChar,10),
                    new SqlParameter("@EvaluatedID",SqlDbType.VarChar,10),
                    new SqlParameter("@relation", SqlDbType.VarChar,10),
                    new SqlParameter("@pass", SqlDbType.Int,4)
                };
            parameters[0].Value = model.UiID;
            parameters[1].Value = model.EvaluatedID;
            parameters[2].Value = model.Relation;
            parameters[3].Value = model.Pass;

            //查找Evaluator表，如果考评人姓名等于UiID只有一人，就更新user表
            List<Evaluator> evaluators = new List<Evaluator>();
            if (EvaluatorBLL.Select1(ref evaluators, model.UiID, 1, ref e))
            {
                //更新User表，
                if (model.Pass == 0)
                {
                    string UID = model.UiID;
                    UserBLL.Delete(UID, ref e);
                }
            }
            //更新Evaluator表
            e = db.QueryExec(strSql.ToString(), parameters);
            if (e != "" && e != null)
            {
                return false;
            }
            return true;
        }

        //更新考评人名单
        public static bool Update2(Evaluator model, ref string e)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update tb_Evaluator set ");
            strSql.Append("relation=@relation,");
            strSql.Append("uiID=@uiID");
            strSql.Append(" where EvaluatedID=@EvaluatedID and  pass=@pass");
            SqlParameter[] parameters =
                {
                    new SqlParameter("@uiID", SqlDbType.VarChar,10),
                    new SqlParameter("@EvaluatedID",SqlDbType.VarChar,10),
                    new SqlParameter("@relation", SqlDbType.VarChar,10),
                    new SqlParameter("@pass", SqlDbType.Int,4),
                   
                };
            parameters[0].Value = model.UiID;
            parameters[1].Value = model.EvaluatedID;
            parameters[2].Value = model.Relation;
            parameters[3].Value = model.Pass;

            e = db.QueryExec(strSql.ToString(), parameters);
            if (e != "" && e != null)
            {
                return false;
            }
            return true;
        }

        public static bool Delete(string uiID, string EvaluatedID, ref string e)
        {
            uiID = uiID.Trim();
            EvaluatedID = EvaluatedID.Trim();
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from tb_Evaluator ");
            strSql.Append(" where uiID=@uiID and  EvaluatedID=@EvaluatedID");

            SqlParameter[] parameters = 
            {
                new SqlParameter("@uiID", SqlDbType.VarChar,10),
                new SqlParameter("@EvaluatedID",SqlDbType.VarChar,10)
             };
            parameters[0].Value = uiID;
            parameters[1].Value = EvaluatedID;

            e = db.QueryExec(strSql.ToString(), parameters);
            if (e != "" && e != null)
            {
                return false;
            }
            return true;
        }
    }
}