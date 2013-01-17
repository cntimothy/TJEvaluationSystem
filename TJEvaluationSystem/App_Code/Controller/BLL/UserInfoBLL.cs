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
///UserInfoBLL 的摘要说明
/// </summary>
namespace BLL
{
    //已通过验证
    public class UserInfoBLL
    {
        public UserInfoBLL()
        { }
        static readonly SQLDatabase db = new SQLDatabase();

        
         static public bool Insert(UserInfo[] model, ref string e)
         {
             int count = model.Length;
             for (int i = 0; i < count; i++)
             {
                 string sql = "insert into tb_UserInfo values("
                                   + "@uiID,@uiName,@uiSex,@uiIdentityNum,@uiDepartment,@uiTelephone,@uiEmail,@uiMobPhone,@uiAddress,@uiZipCode,@uiType)";
                 SqlParameter[] parameters =
                {
                    new SqlParameter("@uiID", SqlDbType.VarChar,10),
                    new SqlParameter("@uiName",SqlDbType.NVarChar,20),
                    new SqlParameter("@uiSex", SqlDbType.NVarChar,10),
                    new SqlParameter("@uiIdentityNum", SqlDbType.VarChar,19),
                    new SqlParameter("@uiDepartment",SqlDbType.NVarChar,50),
                    new SqlParameter("@uiTelephone", SqlDbType.VarChar,20),
                    new SqlParameter("@uiEmail", SqlDbType.NVarChar,50),
                    new SqlParameter("@uiMobPhone", SqlDbType.VarChar,20),
                    new SqlParameter("@uiAddress",SqlDbType.NVarChar,50),
                    new SqlParameter("@uiZipCode", SqlDbType.VarChar,50),
                    new SqlParameter("@uiType", SqlDbType.Int,4)

                };
                 parameters[0].Value = model[i].UiID;
                 parameters[1].Value = model[i].UiName;
                 parameters[2].Value = model[i].UiSex;
                 parameters[3].Value = model[i].UiIdentityNum;
                 parameters[4].Value = model[i].UiDepartment;
                 parameters[5].Value = model[i].UiTelephone;
                 parameters[6].Value = model[i].UiEmail;
                 parameters[7].Value = model[i].UiMobPhone;
                 parameters[8].Value = model[i].UiAddress;
                 parameters[9].Value = model[i].UiZipCode;
                 parameters[10].Value = model[i].UiType;

                 string uiID = db.InsertExec(sql, parameters);
                 if (uiID != "" && uiID != null)
                 {
                     e = uiID;
                     return false;
                 } 
             }
             return true;
         }
        //选择全部用户数据
         public static bool Select(ref List<UserInfo> ui, ref string e)
         {
             string sql = "select * from tb_UserInfo";
             return Select(ref ui, ref e, sql);
         }
        //根据部门选择
         public static bool Select(string uiDepartment, ref List<UserInfo> ui, ref string e)
         {
             string sql = "select * from tb_UserInfo where uiDepartment='" + uiDepartment + "'";
             return Select(ref ui, ref e, sql);
         }
         //根据类型选择
         public static bool Select(int uiType, ref List<UserInfo> ui, ref string e)
         {
             string sql = "select * from tb_UserInfo where uiType=" + uiType;
             return Select(ref ui, ref e, sql);
         }
        //根据部门和类型选择
         public static bool Select(string uiDepartment,int uiType,ref List<UserInfo> ui, ref string e)
         {
             string sql = "select * from tb_UserInfo where uiDepartment='" + uiDepartment + "' and uiType='" + uiType+"'";
             return Select(ref ui, ref e, sql);
         }
        //根据用户id选择
         public static bool Select(ref List<UserInfo> ui, string uiID, ref string e)
         {
             string sql = "select * from tb_UserInfo where uiID='" + uiID + "'";
             return Select(ref ui, ref e, sql);
         }
         public static bool Select(ref List<UserInfo> ui, ref string e,string sql)
         {
             DataTable table = new DataTable();
             table = db.QueryDataTable(sql, ref e);
             if (table != null && table.Rows.Count > 0)
             {
                 for (int i = 0; i < table.Rows.Count; i++)
                 {
                     UserInfo userinfo = new UserInfo();
                     userinfo.UiID = (string)table.Rows[i][0];
                     userinfo.UiName = (string)table.Rows[i][1];
                     userinfo.UiSex = (string)table.Rows[i][2];
                     userinfo.UiIdentityNum = (string)table.Rows[i][3];
                     userinfo.UiDepartment = (string)table.Rows[i][4];
                     userinfo.UiTelephone = (string)table.Rows[i][5];
                     userinfo.UiEmail = (string)table.Rows[i][6];
                     userinfo.UiMobPhone = (string)table.Rows[i][7];
                     userinfo.UiAddress = (string)table.Rows[i][8];
                     userinfo.UiZipCode = (string)table.Rows[i][9];
                     if (!table.Rows[i][10].Equals(DBNull.Value))
                     {
                         userinfo.UiType = (int)table.Rows[i][10];
                     }
                     ui.Add(userinfo);
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

         public static bool Update(UserInfo model,ref string e)
         {
             StringBuilder strSql = new StringBuilder();
             strSql.Append("update tb_UserInfo set ");
             strSql.Append("uiName=@uiName,");
             strSql.Append("uiSex=@uiSex,");
             strSql.Append("uiIdentityNum=@uiIdentityNum,");
             strSql.Append("uiDepartment=@uiDepartment,");
             strSql.Append("uiTelephone=@uiTelephone,");
             strSql.Append("uiEmail=@uiEmail,");
             strSql.Append("uiMobPhone=@uiMobPhone,");
             strSql.Append("uiAddress=@uiAddress,");
             strSql.Append("uiZipCode=@uiZipCode,");
             strSql.Append("uiType=@uiType");
             strSql.Append(" where uiID=@uiID ");
             SqlParameter[] parameters =
                {
                    new SqlParameter("@uiID", SqlDbType.VarChar,10),
                    new SqlParameter("@uiName",SqlDbType.NVarChar,20),
                    new SqlParameter("@uiSex", SqlDbType.NVarChar,10),
                    new SqlParameter("@uiIdentityNum", SqlDbType.VarChar,19),
                    new SqlParameter("@uiDepartment",SqlDbType.NVarChar,50),
                    new SqlParameter("@uiTelephone", SqlDbType.VarChar,20),
                    new SqlParameter("@uiEmail", SqlDbType.NVarChar,50),
                    new SqlParameter("@uiMobPhone", SqlDbType.VarChar,20),
                    new SqlParameter("@uiAddress",SqlDbType.NVarChar,50),
                    new SqlParameter("@uiZipCode", SqlDbType.VarChar,50),
                    new SqlParameter("@uiType", SqlDbType.Int,4)
                };
             parameters[0].Value = model.UiID;
             parameters[1].Value = model.UiName;
             parameters[2].Value = model.UiSex;
             parameters[3].Value = model.UiIdentityNum;
             parameters[4].Value = model.UiDepartment;
             parameters[5].Value = model.UiTelephone;
             parameters[6].Value = model.UiEmail;
             parameters[7].Value = model.UiMobPhone;
             parameters[8].Value = model.UiAddress;
             parameters[9].Value = model.UiZipCode;
             parameters[10].Value = model.UiType;

             e=db.QueryExec(strSql.ToString(), parameters);
             if (e != "" && e != null)
             {
                 return false;
             }
           /*  if (model.UiType != 4&&model.UiType!=5)
             {
                 User[] user=new User[1];
                 user[0] = new User();
                 user[0].UID=model.UiID;
                 user[0].UType=model.UiType;
                 UserBLL.Insert(user, ref e);
             }*/
             return true;
         }

         public static bool Delete(string uiID,ref string e)
         {
             uiID = uiID.Trim();
             StringBuilder strSql = new StringBuilder();
             strSql.Append("delete from tb_UserInfo ");
             strSql.Append(" where uiID=@uiID ");
             SqlParameter[] parameters = {
					new SqlParameter("@uiID", SqlDbType.VarChar,10)};
             parameters[0].Value = uiID;

             e = db.QueryExec(strSql.ToString(), parameters);
             if (e != "" && e != null)
             {
                 return false;
             }
             return true;
         }
    }
}