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
///StanderLibBLL 的摘要说明
/// </summary>
namespace BLL
{
    //已验证
    public class StanderLibBLL
    {
        public StanderLibBLL()
        {
        }
        static readonly SQLDatabase db = new SQLDatabase();
        static public bool Insert(StanderLib[] sl, ref string e)
        {
            int count = sl.Length;
            for (int i = 0; i < count; i++)
            {
                List<StanderLib> model=new List<StanderLib>();
                if (Select(sl[i].SlType, sl[i].SlName, ref model, ref e))
                {
                    e = "该指标已存在";
                    return false;
                }
                string sql = "insert into tb_StanderLib("
                                  +"slType,slName,slContentA,slContentB,slContentC,slContentD)"
                                  +"values("
                                  +"@slType,@slName,@slContentA,@slContentB,"
                                  + "@slContentC,@slContentD)";

                SqlParameter[] parameters =
                {
               // new SqlParameter("@slLibType", SqlDbType.NVarChar,50),
                new SqlParameter("@slType",SqlDbType.NVarChar,50),
                new SqlParameter("@slName", SqlDbType.NVarChar,50),
                new SqlParameter("@slContentA", SqlDbType.NVarChar,int.MaxValue),  
                new SqlParameter("@slContentB", SqlDbType.NVarChar,int.MaxValue),
                new SqlParameter("@slContentC", SqlDbType.NVarChar,int.MaxValue),
                new SqlParameter("@slContentD", SqlDbType.NVarChar,int.MaxValue)
                };
               // parameters[0].Value = sl[i].SlLibType;
                parameters[0].Value = sl[i].SlType;
                parameters[1].Value = sl[i].SlName;
                parameters[2].Value = sl[i].SlContentA;
                parameters[3].Value = sl[i].SlContentB;
                parameters[4].Value = sl[i].SlContentC;
                parameters[5].Value = sl[i].SlContentD;

                string exception = db.InsertExec(sql, parameters);
                if (exception != "" && exception != null)
                {
                    e = exception;
                    return false;
                }  
            }
            return true;
        }
        public static bool Select(int slID, ref List<StanderLib> model, ref string e)
        {
            string sql = "select * from tb_StanderLib where slID=" + slID;
            model = Select(sql, ref e);
            if (e != "" && e != null)
            {
                return false;
            }
            if (model == null)
            {
                e = "该指标不存在";
                return false;
            }
           
            return true;
        }
        /*public static bool Select(string slLibType,ref List<StanderLib> model, ref string e)
        {
            string sql = "select * from tb_StanderLib where slLibType='" + slLibType+"'";
            model=Select(sql,ref e);
            if (e != "" && e != null)
            {
                return false;
            }
            if (model == null)
            {
                e = "该类型指标库不存在";
                return false;
            }
           
            return true;
        }*/
        public static bool Select(string slType, ref List<StanderLib> model, ref string e)
        {
             string sql = "select * from tb_StanderLib where  slType='"+slType+"'";
             model=Select(sql,ref e);
             if (e != "" && e != null)
             {
                 return false;
             }
             if (model.Count == 0)
             {
                 e = "该类型指标不存在";
                 return false;
             }
            
             return true;
        }
        public static bool Select(string slType,string slName, ref List<StanderLib> model, ref string e)
        {
            string sql = "select * from tb_StanderLib where  slType='" + slType + "' and slName='"+slName+"'";
            model = Select(sql, ref e);
            if (e != "" && e != null)
            {
                return false;
            }
            if (model.Count ==0)
            {
                e = "该指标不存在";
                return false;
            }
            
            return true;
        }
        public static List<StanderLib> Select(string sql, ref string e)
        {
            List<StanderLib> model=new List<StanderLib>();
            DataTable table = new DataTable();
            table = db.QueryDataTable(sql, ref e);
            if (table != null && table.Rows.Count > 0)
            {
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    StanderLib standerlib = new StanderLib();
                    standerlib.SlID = (Int32)table.Rows[i][0];
                   // standerlib.SlLibType = (string)table.Rows[i][1];
                    standerlib.SlType= (string)table.Rows[i][1];
                    standerlib.SlName = (string)table.Rows[i][2];
                    standerlib.SlContentA = (string)table.Rows[i][3];
                    standerlib.SlContentB = (string)table.Rows[i][4];
                    standerlib.SlContentC = (string)table.Rows[i][5];
                    standerlib.SlContentD = (string)table.Rows[i][6];

                    model.Add(standerlib);
                }
                
            }
            return model;
        }

        public static bool Update(StanderLib model, ref string e)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update tb_StanderLib set ");
           // strSql.Append("slLibType=@slLibType,");
            strSql.Append("slType=@slType,");
            strSql.Append("slName=@slName,");
            strSql.Append("slContentA=@slContentA,");
            strSql.Append("slContentB=@slContentB,");
            strSql.Append("slContentC=@slContentC,");
            strSql.Append("slContentD=@slContentD");
            strSql.Append(" where slID=@slID ");
            SqlParameter[] parameters =
                {
                    new SqlParameter("@slID", SqlDbType.Int,4),
                   // new SqlParameter("@slLibType",SqlDbType.NVarChar,50),
                    new SqlParameter("@slType", SqlDbType.NVarChar,50),
                    new SqlParameter("@slName", SqlDbType.NVarChar,50),
                    new SqlParameter("@slContentA",SqlDbType.NVarChar,int.MaxValue),
                    new SqlParameter("@slContentB",SqlDbType.NVarChar,int.MaxValue),
                    new SqlParameter("@slContentC",SqlDbType.NVarChar,int.MaxValue),
                    new SqlParameter("@slContentD",SqlDbType.NVarChar,int.MaxValue)
                };
            parameters[0].Value = model.SlID;
           // parameters[1].Value = model.SlLibType;
            parameters[1].Value = model.SlType;
            parameters[2].Value = model.SlName;
            parameters[3].Value = model.SlContentA;
            parameters[4].Value = model.SlContentB;
            parameters[5].Value = model.SlContentC;
            parameters[6].Value = model.SlContentD;

            e = db.QueryExec(strSql.ToString(), parameters);
            if (e != "" && e != null)
            {
                return false;
            }
            return true;
        }

        public static bool Delete(int slID, ref string e)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from tb_StanderLib ");
            strSql.Append(" where slID=@slID ");
            SqlParameter[] parameters = {
					new SqlParameter("@slID", SqlDbType.Int,4)};
            parameters[0].Value = slID;

            e = db.QueryExec(strSql.ToString(), parameters);
            if (e != "" && e != null)
            {
                return false;
            }
            return true;
        }

    }
}