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
                                  + "@uiID,@EvaluatedID,@relation,@pass)";
                SqlParameter[] parameters =
                {
                    new SqlParameter("@uiID", SqlDbType.VarChar,10),
                    new SqlParameter("@EvaluatedID",SqlDbType.VarChar,10),
                    new SqlParameter("@relation", SqlDbType.VarChar,10),
                    new SqlParameter("@pass", SqlDbType.Int,4)
                   
                };
                parameters[0].Value = model[i].UiID;
                parameters[1].Value = model[i].EvaluatedID;
                parameters[2].Value = model[i].Relation;
                parameters[3].Value = model[i].Pass;

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

        //更新通过,同时要更新User Userinfo
        public static bool Update1(Evaluator model, ref string e)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update tb_Evaluator set ");
            strSql.Append("relation=@relation,");
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
            if (model.Pass == 1)
            {

                List<User> users = new List<User>();
                if (UserBLL.Select(model.UiID, ref users, ref e))
                {
                    User user = new Model.User();
                    user = users.ElementAt(0);
                    user.UType = user.UType.Remove(2, 1).Insert(2, "1");
                    //if (user.UType == 3 || user.UType == 5 || user.UType == 7 || user.UType == 9)
                    //    user.UType = user.UType;
                    //else
                    //    if (user.UType == 2 || user.UType == 6)
                    //        user.UType += 3;

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
                    user[0].UType = "00100";//考评者
                    if (!UserBLL.Insert(user, ref e))
                    {
                        return false;
                    }
                }

                List<UserInfo> userinfos = new List<UserInfo>();
                if (UserInfoBLL.Select(ref userinfos, model.UiID, ref e))
                {
                    UserInfo ui = new UserInfo();
                    ui = userinfos.ElementAt(0);
                    //if (ui.UiType == 0 || ui.UiType == 2 || ui.UiType == 4 || ui.UiType == 6)
                    if(ui.UiType.ElementAt(0) == '1')
                    {
                        //ui.UiType += 3;
                        ui.UiType = ui.UiType.Remove(2, 1).Insert(2, "1");
                        UserInfoBLL.Update(ui, ref e);
                    }

                }

                e = db.QueryExec(strSql.ToString(), parameters);
                if (e != "" && e != null)
                {
                    return false;
                }
                else return true;
            }
            return false;
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