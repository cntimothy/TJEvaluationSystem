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
///UserTypeBLL 的摘要说明
/// </summary>
namespace BLL
{
    public class UserTypeBLL
    {
        public UserTypeBLL()
        { }
        static readonly SQLDatabase db = new SQLDatabase();
        static public bool Insert(UserType[] model, ref string e)
        {
            int count = model.Length;
            for (int i = 0; i < count; i++)
            {
                string sql = "insert into tb_UserType values("
                                  + "@utID,@utType)";
                SqlParameter[] parameters =
                {
                    new SqlParameter("@utID", SqlDbType.VarChar, 10),
                    new SqlParameter("@utType",SqlDbType.NVarChar,20)
                };
                parameters[0].Value = model[i].UtID;
                parameters[1].Value = model[i].UtType;
                
                string exception = db.InsertExec(sql, parameters);
                if (exception != "" && exception != null)
                {
                    e = exception;
                    return false;
                }
            }
            return true;
        }
        //选择全部
        public static bool Select(ref List<UserType> model, ref string e)
        {
            string sql = "select * from tb_UserType ";
            return Select(ref model, ref e, sql);
        }
        //根据utID选择
        public static bool Select(string utID, ref List<UserType> model, ref string e)
        {
            string sql = "select * from tb_UserType where utID=" + utID;
            return Select(ref model, ref e, sql);
        }
        
        public static bool Select(ref List<UserType> ut, ref string e, string sql)
        {
            DataTable table = new DataTable();
            table = db.QueryDataTable(sql, ref e);
            if (table != null && table.Rows.Count > 0)
            {
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    UserType usertype = new UserType();
                    usertype.UtID = (string)table.Rows[i][0];
                    usertype.UtType = (string)table.Rows[i][1];
                  
                    ut.Add(usertype);
                }
                return true;
            }
            else
            {
                if (e != "" && e != null)
                    return false;
                e = "该用户类型不存在";
                return false;
            }

        }

        public static bool Update(UserType model, ref string e)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update tb_UserType set ");
            strSql.Append("utType=@utType");
            strSql.Append(" where utID=@utID ");
            SqlParameter[] parameters =
                {
                    new SqlParameter("@utID", SqlDbType.VarChar, 10),
                    new SqlParameter("@utType",SqlDbType.NVarChar,20)
                    
                };
            parameters[0].Value = model.UtID;
            parameters[1].Value = model.UtType;
           
            e = db.QueryExec(strSql.ToString(), parameters);
            if (e != "" && e != null)
            {
                return false;
            }
            return true;
        }

        public static bool Delete(int utID, ref string e)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from tb_UserType ");
            strSql.Append(" where utID=@utID ");
            SqlParameter[] parameters = {
					new SqlParameter("@utID", SqlDbType.VarChar, 10)};
            parameters[0].Value = utID;

            e = db.QueryExec(strSql.ToString(), parameters);
            if (e != "" && e != null)
            {
                return false;
            }
            return true;
        }

    }
}