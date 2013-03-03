﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using DBUtility;
using Model;
using System.Text;

/// <summary>
///UserBLL 的摘要说明
/// </summary>
namespace BLL
{
    //已通过验证
    public class UserBLL
    {
        public UserBLL()
        { }
         static readonly SQLDatabase db = new SQLDatabase();

         static public bool Insert(User[] model, ref string e)
         {
             int count = model.Length;
             for (int i = 0; i < count; i++)
             {
                 string sql = "insert into tb_User values(@uID,@uPassword,@uType)";
                 SqlParameter[] parameters =
                {
                    new SqlParameter("@uID", SqlDbType.VarChar,10),
                    new SqlParameter("@uPassword",SqlDbType.Char,6),
                    new SqlParameter("@uType", SqlDbType.Int,4)
                };
                 parameters[0].Value = model[i].UID;
                 //获取身份证号作密码
                 List<UserInfo> userinfo = new List<UserInfo>();
                 if (!UserInfoBLL.Select(ref userinfo, model[i].UID, ref e))
                 {
                     return false;
                 }

                 string pwd=userinfo.ElementAt(0).UiIdentityNum;

                 parameters[1].Value = pwd.Substring(11,6);
                 parameters[2].Value = model[i].UType;

                 string exception = db.InsertExec(sql, parameters);
                 if (exception != "" && exception != null)
                 {
                     e = exception;
                     return false;
                 }   
             }
             return true;
         }

         public static bool Select(string uID, ref List<User> model, ref string e)
         {
             uID = uID.Trim();
             string sql = "select * from tb_User where uID='" + uID + "'";
             DataTable table = new DataTable();
             table = db.QueryDataTable(sql,ref e);
             if (table != null && table.Rows.Count > 0)
             {
                 for (int i = 0; i < table.Rows.Count; i++)
                 {
                     User user = new User();
                     user.UID = (string)table.Rows[i][0];
                     user.UPassword = (string)table.Rows[i][1];
                     user.UType = (Int32)table.Rows[i][2];

                     model.Add(user);
                 }
                 return true;
             }
             else
             {
                 if (e != "" && e != null)
                     return false;
                 e = "用户" + uID + " 不具有登陆权限";
                 return false;
             }
         }
         
         public static bool Select(User user, ref string e)
         {
             string uID = user.UID;
             string uPassword = user.UPassword;
             int uType = user.UType;

             string sql = "select * from tb_User where uID='" + uID + "' and uPassword='" + uPassword + "' and uType='" + uType + "'";
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

         public static bool UpdatePassword(string uID, int uType, string newPassword, ref string e)
         {
             User model = new User();
             model.UID = uID;
             model.UPassword = newPassword;
             model.UType = uType;
             return Update(model, ref e);
         }

         public static bool Update(User model, ref string e)
         {
             StringBuilder strSql = new StringBuilder();
             strSql.Append("update tb_User set ");
             strSql.Append("uPassword=@uPassword,");
             strSql.Append("uType=@uType");
             strSql.Append(" where uID=@uID ");
             SqlParameter[] parameters =
                {
                    new SqlParameter("@uID", SqlDbType.VarChar,10),
                    new SqlParameter("@uPassword",SqlDbType.Char,6),
                    new SqlParameter("@uType", SqlDbType.Int,4),
                   
                };
             parameters[0].Value = model.UID;
             parameters[1].Value = model.UPassword;
             parameters[2].Value = model.UType;
            

             e = db.QueryExec(strSql.ToString(), parameters);
             if (e != "" && e != null)
             {
                 return false;
             }
             return true;
         }

         public static bool Delete(string uID, ref string e)
         {
             uID = uID.Trim();
             StringBuilder strSql = new StringBuilder();
             strSql.Append("delete from tb_User ");
             strSql.Append(" where uID=@uID ");
             SqlParameter[] parameters = {
					new SqlParameter("@uID", SqlDbType.VarChar,10)};
             parameters[0].Value = uID;

             e = db.QueryExec(strSql.ToString(), parameters);
             if (e != "" && e != null)
             {
                 return false;
             }
             return true;
         }
    }
}