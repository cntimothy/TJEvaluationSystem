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
                string sql = "insert into tb_Manager values(@mID,@mPassword,@mType,@mDepartment)";
                SqlParameter[] parameters =
                {
                    new SqlParameter("@mID", SqlDbType.VarChar,10),
                    new SqlParameter("@mPassword",SqlDbType.Char,6),
                    new SqlParameter("@mType", SqlDbType.VarChar,10),
                    new SqlParameter("@mDepartment", SqlDbType.NVarChar,50)
                };
                parameters[0].Value = model[i].MID;
                parameters[1].Value = model[i].MPassword;
                parameters[2].Value = model[i].MType;
                parameters[3].Value = model[i].MDepartment;

                string exception = db.InsertExec(sql, parameters);
                if (exception != "" && exception != null)
                {
                    e = exception;
                    return false;
                }
            }
            return true;
        }

        public static bool SelectMType(string mID, string mPassword, ref string mType, ref string e)
        { 
            string sql = "select mType from tb_Manager where mID='" + mID + "' and mPassword='" + mPassword + "'";
            mType = db.QueryValue(sql);
            if (mType != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public static bool Select(Manager manager, ref string e)
        {
            string mID = manager.MID;
            string mPassword = manager.MPassword;
            string mType = manager.MType;

            string sql = "select * from tb_Manager where mID='" + mID + "' and mPassword='" + mPassword + "' and mType like'" + mType + "'";
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
                e = "用户名或密码错误!";
                return false;
            }
        }

        public static bool SelectByType(string mType, ref List<Manager> managers, ref string e)
        {
            string sql = "select * from tb_Manager where mType like '" + mType + "'";
            return Select(ref managers, ref e, sql);
        }

        public static bool Select(string mDepartment, string mType, ref List<Manager> managers, ref string e)
        {
            string sql = "select * from tb_Manager where mDepartment = '" + mDepartment + "' and mTYpe like '" + mType + "'";
            return Select(ref managers, ref e, sql);
        }
        public static bool Select(ref List<Manager> managers, ref string e,string sql)
        {
            DataTable table = new DataTable();
            table = db.QueryDataTable(sql, ref e);
            if (table != null && table.Rows.Count > 0)
            {
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    Manager manager = new Manager();
                    manager.MID = (string)table.Rows[i]["mID"];
                    manager.MPassword = (string)table.Rows[i]["mPassword"];
                    manager.MDepartment = (string)table.Rows[i]["mDepartment"];
                    manager.MType = (string)table.Rows[i]["mType"];
                    managers.Add(manager);
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
        public static bool Select(string mID, ref List<Manager> model, ref string e)
        {
            mID = mID.Trim();
            string sql = "select * from tb_Manager where mID='" + mID + "'";
            DataTable table = new DataTable();
            table = db.QueryDataTable(sql, ref e);
            if (table != null && table.Rows.Count > 0)
            {
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    Manager manager = new Manager();
                    manager.MID = (string)table.Rows[i]["mID"];
                    manager.MPassword = (string)table.Rows[i]["mPassword"];
                    manager.MType = (string)table.Rows[i]["mType"];
                    manager.MDepartment = (string)table.Rows[i]["mDepartment"];
                    model.Add(manager);
                }
                return true;
            }
            else
            {
                if (e != "" && e != null)
                    return false;
                e = "无此用户！";
                return false;
            }
        }


        public static bool SelectMID(ref List<String> model, string mType, ref string e)
        {
            string sql = "select mID from tb_Manager where mType like '" + mType + "'";
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

        public static bool UpdatePassword(string mID, string mType, string mDepartment, string newPassword, ref string e)
        {
            Manager manager = new Manager();
            manager.MID = mID;
            manager.MType = mType;
            manager.MDepartment = mDepartment;
            manager.MPassword = newPassword;
            return Update(manager, ref e);
        }
        
        public static bool Update(Manager model, ref string e)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update tb_Manager set ");
            strSql.Append("mPassword=@mPassword,");
            strSql.Append("mType=@mType,");
            strSql.Append("mDepartment=@mDepartment");
            strSql.Append(" where mID=@mID ");
            SqlParameter[] parameters =
                {
                    new SqlParameter("@mID", SqlDbType.VarChar,10),
                    new SqlParameter("@mPassword",SqlDbType.Char,6),
                    new SqlParameter("@mType", SqlDbType.VarChar, 10),
                    new SqlParameter("@mDepartment", SqlDbType.NVarChar,50)
                   
                };
            parameters[0].Value = model.MID;
            parameters[1].Value = model.MPassword;
            parameters[2].Value = model.MType;
            parameters[3].Value = model.MDepartment;


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