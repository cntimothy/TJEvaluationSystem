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
///MessageBLL 的摘要说明
/// </summary>
namespace BLL
{
    public class MessageBLL
    {
        public MessageBLL()
        { }
        static readonly SQLDatabase db = new SQLDatabase();
        static public bool Insert(Message[] message, ref string e)
         {
             int count = message.Length;
             for (int i = 0; i < count; i++)
             {
                 string sql = "insert into tb_Message("
                                  + "mSenderID,mReceiveID,mMessage,mRead,mSendTime,mTitle)"
                                  + "values("
                                  + "@mSenderID,@mReceiveID,@mMessage,@mRead,@mSendTime,@mTitle)";
                 SqlParameter[] parameters =
                 {
                     new SqlParameter("@mSenderID", SqlDbType.VarChar,10),
                     new SqlParameter("@mReceiveID", SqlDbType.VarChar,10),
                     new SqlParameter("@mMessage", SqlDbType.NVarChar,int.MaxValue),
                     new SqlParameter("@mRead", SqlDbType.Int,4),
                     new SqlParameter("@mSendTime", SqlDbType.DateTime),
                     new SqlParameter("@mTitle", SqlDbType.NVarChar, 20),
                 };
                 parameters[0].Value = message[i].MSenderID;
                 parameters[1].Value = message[i].MReceiveID;
                 parameters[2].Value = message[i].MMessage;
                 parameters[3].Value = message[i].MRead;
                 parameters[4].Value = message[i].MSendTime;
                 parameters[5].Value = message[i].MTitle;
                 string exception = db.InsertExec(sql, parameters);
                 if (exception != "" && exception != null)
                 {
                     e = exception;
                     return false;
                 }
             }
             return true;
         }
        static public bool Insert(List<Message> msgs, ref string e)
        {
            for (int i = 0; i < msgs.Count; i++)
            {
                string sql = "insert into tb_Message("
                                 + "mSenderID,mReceiveID,mMessage,mRead,mSendTime,mTitle)"
                                 + "values("
                                 + "@mSenderID,@mReceiveID,@mMessage,@mRead,@mSendTime,@mTitle)";
                SqlParameter[] parameters =
                 {
                     new SqlParameter("@mSenderID", SqlDbType.VarChar,10),
                     new SqlParameter("@mReceiveID", SqlDbType.VarChar,10),
                     new SqlParameter("@mMessage", SqlDbType.NVarChar,int.MaxValue),
                     new SqlParameter("@mRead", SqlDbType.Int,4),
                     new SqlParameter("@mSendTime", SqlDbType.DateTime),
                     new SqlParameter("@mTitle", SqlDbType.NVarChar, 20),
                 };
                parameters[0].Value = msgs[i].MSenderID;
                parameters[1].Value = msgs[i].MReceiveID;
                parameters[2].Value = msgs[i].MMessage;
                parameters[3].Value = msgs[i].MRead;
                parameters[4].Value = msgs[i].MSendTime;
                parameters[5].Value = msgs[i].MTitle;
                string exception = db.InsertExec(sql, parameters);
                if (exception != "" && exception != null)
                {
                    e = exception;
                    return false;
                }
            }
            return true;
        }
        static public bool Select(ref List<Message> model, ref string e)
         {
             string sql = "select * from tb_Message ";
             return Select(ref model, ref e, sql);
         }
        static public bool Select(string mSenderID,ref List<Message> model, ref string e)
         {
             string sql = "select * from tb_Message where mSenderID='"+mSenderID+"'";
             return Select(ref model, ref e, sql);
         }
        static public bool SelectReceive(string mReceiveID, int mRead,ref List<Message> model, ref string e)
         {
             string sql = "select * from tb_Message where mReceiveID='" + mReceiveID + "' and mRead='" + mRead+"'";
             return Select(ref model, ref e, sql);
         }
        static public bool SelectReceive(string mReceiveID, ref List<Message> model, ref string e)
         {
             string sql = "select * from tb_Message where mReceiveID='" + mReceiveID + "'";
             return Select(ref model, ref e, sql);
         }
        static public bool Select(ref List<Message> model, ref string e, string sql)
         {
             sql += "order by mSendTime";
             DataTable table = new DataTable();
             table = db.QueryDataTable(sql, ref e);
             if (table != null && table.Rows.Count > 0)
             {
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    Message message= new Message();
                    message.MID = (int)table.Rows[i]["mID"];
                    message.MSenderID = (string)table.Rows[i]["mSenderID"];
                    message.MReceiveID = (string)table.Rows[i]["mReceiveID"];
                    message.MMessage = (string)table.Rows[i]["mMessage"];
                    message.MRead = (int)table.Rows[i]["mRead"];
                    message.MSendTime = (DateTime)table.Rows[i]["mSendTime"];
                    message.MTitle = (string)table.Rows[i]["mTitle"];
                    model.Add(message);
                }
                return true;
            }
            else
            {
                if (e != "" && e != null)
                    return false;
                e = "无信息";
                return false;
            }
         }
        static public bool Update(Message model, ref string e)
         {
             StringBuilder strSql = new StringBuilder();
             strSql.Append("update tb_Message set ");
             strSql.Append("mRead=@mRead");
             strSql.Append(" where mID=@mID ");
             SqlParameter[] parameters =
                {
                     new SqlParameter("@mRead", SqlDbType.Int,4),
                     new SqlParameter("@mID", SqlDbType.Int,4)
                };
             parameters[0].Value = model.MRead;
             parameters[1].Value = model.MID;
             
             e = db.QueryExec(strSql.ToString(), parameters);
             if (e != "" && e != null)
             {
                 return false;
             }
             return true;
         }
        static public bool Delete(int mID, ref string e)
         {
             StringBuilder strSql = new StringBuilder();
             strSql.Append("delete from tb_Message ");
             strSql.Append(" where mID=@mID ");
             SqlParameter[] parameters = {
					new SqlParameter("@mID", SqlDbType.Int,4)};
             parameters[0].Value = mID;

             e = db.QueryExec(strSql.ToString(), parameters);
             if (e != "" && e != null)
             {
                 return false;
             }
             return true;

         }
        static public bool SelectUnReadCount(ref int count, string colname, string receiveID, ref string e)
        {
            string sql = "select count(" + colname + ")from tb_Message where mReceiveID = '" + receiveID + "'and mRead = '0'";
            count = Convert.ToInt32(db.QueryValue(sql));
            if (count != 0)
                return true;
            else
                return false;
        }

        internal static void Insert()
        {
            throw new NotImplementedException();
        }
    }
}