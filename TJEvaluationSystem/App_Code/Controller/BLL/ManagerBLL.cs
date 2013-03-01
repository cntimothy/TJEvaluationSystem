using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using DBUtility;
using Model;
using System.Text;

namespace BLL
{
    public class ManagerBLL
    {
        public ManagerBLL()
        { }

        static readonly SQLDatabase db = new SQLDatabase();

        static public bool Insert(Manager[] model, ref string e)
        {

            int count = model.Length;
            for (int i = 0; i < count; i++)
            {
                string sql = "insert into tb_Manager values(@uID,@uPassword,@uType)";
                SqlParameter[] parameters =
                {
                    new SqlParameter("@uID", SqlDbType.VarChar,10),
                    new SqlParameter("@uPassword",SqlDbType.Char,6),
                    new SqlParameter("@uType", SqlDbType.Int,4)
                };
                parameters[0].Value = model[i].MID;
                //获取身份证号作密码


                parameters[1].Value = model[i].MPassword;
                parameters[2].Value = model[i].MType;

                string exception = db.InsertExec(sql, parameters);
                if (exception != "" && exception != null)
                {
                    e = exception;
                    return false;
                }
            }
            return true;
        }

        public static bool Select(Manager manager, ref string e)
        {
            string mID = manager.MID;
            string mPassword = manager.MPassword;
            int mType = manager.MType;

            string sql = "select * from tb_Manager where mID='" + mID + "' and mPassword='" + mPassword + "' and mType='" + mType + "'";
            DataTable table = new DataTable();
            table = db.QueryDataTable(sql, ref e);
            if (table != null && table.Rows.Count > 0)
            {
                return true;
            }
            else
            {
                if (e != "" && e != null)
                    return false;
                //e = "用户" + mID + "用户名或密码错误！";
                e = "用户名或密码错误!";
                return false;
            }
        }

        public static bool SelectMID(ref List<String> model, int mType, ref string e)
        {
            string sql = "select mID from tb_Manager where mType = '" + mType + "'";
            DataTable table = new DataTable();
            table = db.QueryDataTable(sql, ref e);
            if (table != null && table.Rows.Count > 0)
            {
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    model.Add((string)table.Rows[i]["mID"]);
                }
                return true;
            }
            else
            {
                if (e != "" && e != null)
                    return false;
                return false;
            }
        }

        public static bool Update(Manager model, ref string e)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update tb_Manager set ");
            strSql.Append("mPassword=@mPassword,");
            strSql.Append("mType=@mType");
            strSql.Append(" where mID=@mID ");
            SqlParameter[] parameters =
                {
                    new SqlParameter("@mID", SqlDbType.VarChar,10),
                    new SqlParameter("@mPassword",SqlDbType.Char,6),
                    new SqlParameter("@mType", SqlDbType.Int,4),
                   
                };
            parameters[0].Value = model.MID;
            parameters[1].Value = model.MPassword;
            parameters[2].Value = model.MType;


            e = db.QueryExec(strSql.ToString(), parameters);
            if (e != "" && e != null)
            {
                return false;
            }
            return true;
        }

        public static bool Delete(string mID, ref string e)
        {
            mID = mID.Trim();
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from tb_Manager ");
            strSql.Append(" where mID=@mID ");
            SqlParameter[] parameters = {
					new SqlParameter("@mID", SqlDbType.VarChar,10)};
            parameters[0].Value = mID;

            e = db.QueryExec(strSql.ToString(), parameters);
            if (e != "" && e != null)
            {
                return false;
            }
            return true;
        }
    }
}