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
    public class EvaluationHistoryBLL
    {
        //实现对数据库中表tb_EvaluationHistory的数据操作
        //封装操作
        static readonly SQLDatabase db = new SQLDatabase();

        //检查是否存在正在进行的考评
        //若存在，返回ID,否则返回-1
        static public int CheckActiveEvaluation()
        {
            List<EvaluationHistory> ehs = new List<EvaluationHistory>();
            string e = "";
            string sql = "select * from tb_EvaluationHistory where ehStatus='True'";
            if (Select(ref ehs, ref e, sql))
                return -1;
            if (ehs.Count == 0)
                return -1;
            else
                return ehs[0].EhID;
        }

        //开始新考评
        //成功返回true，失败返回false;
        static public bool StartNewEvaluation()
        {
            EvaluationHistory eh = new EvaluationHistory();
            eh.EhStatus = true;
            eh.EhStartDate = DateTime.Now.Date;  //获取当前日期
            eh.EhEndDate = DateTime.Now.Date;  //获取当前日期
            string e="";
            return Insert(eh,ref e);
        }

        //统计考评结果
        //成功返回true，失败返回false;
        static public bool CountEvaluationResult()
        {
            //获取被考评名单
            List<UserInfo> uis = new List<UserInfo>();
            string e = "";
            if (!UserInfoBLL.GetEvaluatedUser(ref uis, ref e, ""))
                return false;
            if (uis.Count == 0)
                return false;

            for (int i = 0; i < uis.Count; i++)
            {
                //统计每个被考评人结果
            }
            return true;
        }


        public static bool Select(ref List<EvaluationHistory> ehs, ref string e, string sql)
        {
            DataTable table = new DataTable();
            table = db.QueryDataTable(sql, ref e);
            if (table != null && table.Rows.Count > 0)
            {
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    EvaluationHistory eh = new EvaluationHistory();
                    eh.EhID = (Int32)table.Rows[i]["ehID"];
                    eh.EhStatus=(bool)table.Rows[i]["ehStatus"];
                    eh.EhStartDate = (DateTime)table.Rows[i]["ehStartDate"];
                    eh.EhEndDate = (DateTime)table.Rows[i]["ehEndDate"];
                    ehs.Add(eh);
                }
                return true;
            }
            else
            {
                if (e != "" && e != null)
                    return false;
                e = "查询不存在";
                return false;
            }

        }

        static public bool Insert(EvaluationHistory eh, ref string e)
        {
            string sql = "insert into tb_EvaluationHistory values(@ehStatus,@ehStartDate,@ehEndDate)";

            SqlParameter[] parameters =
            {
            new SqlParameter("@ehStatus", SqlDbType.Bit),
            new SqlParameter("@ehStartDate", SqlDbType.DateTime),
            new SqlParameter("@ehEndDate", SqlDbType.DateTime)
            };
            parameters[0].Value = eh.EhStatus;
            parameters[1].Value = eh.EhStartDate;
            parameters[2].Value = eh.EhEndDate;
               

            string exception = db.InsertExec(sql, parameters);
            if (exception != "" && exception != null)
            {
                e = exception;
                return false;
            }
            return true;
        }
    }
}