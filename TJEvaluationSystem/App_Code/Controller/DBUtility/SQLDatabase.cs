using System;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Xml;

namespace DBUtility
{

    /// <summary>
    /// 数据库操作公共类。
    /// </summary>
    public class SQLDatabase
    {
        // private string serverName, dbName, userID, passWord;// encryptKey;
        private string sqlConnectionString;
        private SqlConnection conn;
        //  private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        public SQLDatabase()
        {
            // 初始化数据库连接字符串
            // this.serverName = ConfigurationManager.AppSettings["Server"].Trim();
            // this.dbName = ConfigurationManager.AppSettings["Database"].Trim();
            // this.userID = ConfigurationManager.AppSettings["UserID"].Trim();
            // this.passWord = ConfigurationManager.AppSettings["Password"].Trim();
            //this.encryptKey = ConfigurationManager.AppSettings["EncryptKey"].Trim();
            //this.userID = ClsEncrypt.Encrypt(this.userID, this.encryptKey);
            //this.passWord = ClsEncrypt.Encrypt(this.passWord, this.encryptKey);
            //			SqlConnectionString = "initial catalog=" + dbName + ";data source=" + Server + ";Integrated Security=True;Connect Timeout=30";
            // this.sqlConnectionString = @"Data Source=PENGTIAN-PC\MYSQL2008;database=TjHrEvaluation;Integrated Security=True";
            this.sqlConnectionString = @"Data Source=.\SQLEXPRESS;AttachDbFilename=E:\projects\TJEvaluationSystem\TJEvaluationSystem\App_Data\Database.mdf;Integrated Security=True;User Instance=True";
            //this.sqlConnectionString = ConfigurationManager.ConnectionStrings[1].ToString();
        }

        //public SQLDatabase(string serverName, string dbName, string userID, string passWord)
        //  {
        //this.serverName = serverName;
        // this.dbName = dbName;
        //  this.userID = userID;
        //  this.passWord = passWord;
        //this.encryptKey = ConfigurationManager.AppSettings["EncryptKey"].Trim();
        //this.userID = ClsEncrypt.Encrypt(userID, this.encryptKey);
        //this.passWord = ClsEncrypt.Encrypt(passWord, this.encryptKey);
        //  this.sqlConnectionString = "Data Source=.\\SQLEXPRESS;AttachDbFilename=|DataDirectory|\\Database.mdf;Integrated Security=True;User Instance=True";

        //log4net.Config.XmlConfigurator.Configure();
        //  }

        /// <summary>
        /// 是否使用日志
        /// </summary>
        /// <returns>是与否</returns>
        private bool UseLog()
        {
            if (ConfigurationManager.AppSettings["Log"] != null)
            {
                string use = ConfigurationManager.AppSettings["Log"].Trim();

                if (use.ToUpper() == "TRUE")
                {
                    return true;
                }
            }

            return false;
        }

        /// <summary>
        /// 打开数据库连接。
        /// </summary>
        private void Open()
        {
            if (this.conn == null)
            {
                this.conn = new SqlConnection(this.sqlConnectionString);
                this.conn.Open();
            }
        }

        /// <summary>
        /// 关闭数据库连接。
        /// </summary>
        public void Close()
        {
            if (this.conn != null)
            {
                this.conn.Close();
                this.Dispose();
            }
        }

        /// <summary>
        /// Release resources.
        /// 释放资源。
        /// </summary>
        public void Dispose()
        {
            if (this.conn != null)
            {
                this.conn.Dispose();
                this.conn = null;
            }
        }

        /// <summary>
        /// 测试连接
        /// </summary>
        /// <returns>成功与否</returns>
        public bool TestConnection()
        {
            try
            {
                this.conn = null;
                this.Open();
            }
            catch (Exception ex)
            {
                if (UseLog())
                {
                    ex.Message.ToString();
                    //log.Error(ex.Message.ToString());
                }
                return false;
            }
            finally
            {
                this.Close();
            }
            return true;
        }

        /// <summary>
        /// 测试连接
        /// </summary>
        /// <param name="server">服务器地址</param>
        /// <param name="database">数据库名</param>
        /// <param name="uid">用户名</param>
        /// <param name="password">密码</param>
        /// <returns>成功与否</returns>
        public bool TestConnection(string serverName, string dbName, string userID, string passWord)
        {
            try
            {
                this.conn = null;
                this.sqlConnectionString = "user id=" + userID + ";password=" + passWord + ";initial catalog=" + dbName + ";data source=" + serverName + ";Connect Timeout=30";
                this.Open();
            }
            catch (Exception ex)
            {
                if (UseLog())
                {
                    ex.Message.ToString();
                    //log.Error(ex.Message.ToString());
                }
                return false;
            }
            finally
            {
                this.Close();
            }
            return true;
        }



        /// <summary>
        /// 执行存储过程 eg:
        /// RunProc("upProcedureName");			// run the stored procedure
        /// </summary>
        /// <param name="procName">存储过程名</param>
        /// <returns>成功是否</returns>
        public bool RunProc(string procName)
        {
            try
            {
                DBHelper.ExecuteNonQuery(this.sqlConnectionString, CommandType.StoredProcedure, procName);
            }
            catch (Exception ex)
            {
                if (UseLog())
                {
                    ex.Message.ToString();
                    //log.Error(ex.Message.ToString());
                }
                return false;
            }
            finally
            {
                this.Close();
            }
            return true;
        }

        /// <summary>
        /// 执行存储过程 eg:
        /// RunProc("upProcedureName", prams);			// run the stored procedure
        /// strVlaue = (string) prams[index].Value;     // get the output param value 获得输出参数的值
        /// </summary>
        /// <param name="procName">存储过程名</param>
        /// <param name="prams">参数</param>
        /// <returns>成功是否</returns>
        public bool RunProc(string procName, SqlParameter[] prams)
        {
            try
            {
                DBHelper.ExecuteNonQuery(this.sqlConnectionString, CommandType.StoredProcedure, procName, prams);
            }
            catch (Exception ex)
            {
                if (UseLog())
                {
                    ex.Message.ToString();
                    ////log.Error(ex.Message.ToString());
                }
                return false;
            }
            finally
            {
                this.Close();
            }
            return true;
        }

        /// <summary>
        /// 通过查询指定的StoredProcedure语句来获得一个返回值，带parms
        /// </summary>
        /// <param name="procName">存储过程名</param>
        /// <param name="prams">参数</param>
        /// <returns>返回值</returns>
        public string RunProcValue(string procName, SqlParameter[] prams)
        {
            try
            {
                return DBHelper.ExecuteScalar(this.sqlConnectionString, CommandType.StoredProcedure, procName, prams).ToString();
            }
            catch (Exception ex)
            {
                if (UseLog())
                {
                    ex.Message.ToString();
                    ////log.Error(ex.Message.ToString());
                }
                return null;
            }
            finally
            {
                this.Close();
            }
        }

        /// <summary>
        /// 通过查询指定的StoredProcedure语句来获得一个返回值，不带parms
        /// </summary>
        /// <param name="procName">存储过程名</param>
        /// <returns>返回值</returns>
        public string RunProcValue(string procName)
        {
            try
            {
                return DBHelper.ExecuteScalar(this.sqlConnectionString, CommandType.StoredProcedure, procName).ToString();
            }
            catch (Exception ex)
            {
                if (UseLog())
                {
                    ex.Message.ToString();
                    ////log.Error(ex.Message.ToString());
                }
                return null;
            }
            finally
            {
                this.Close();
            }
        }
        /// <summary>
        /// 通过查询指定的StoredProcedure语句来获得一个返回表，不带parms
        /// </summary>
        /// <param name="procName">存储过程名</param>
        /// <returns>DataTable</returns>
        public DataTable RunProcDataTable(string procName)
        {

            try
            {
                return DBHelper.ExecuteDataset(this.sqlConnectionString, CommandType.StoredProcedure, procName).Tables[0];
            }
            catch (Exception ex)
            {
                if (UseLog())
                {
                    ex.Message.ToString();
                    ////log.Error(ex.Message.ToString());
                }
                return null;
            }
            finally
            {
                this.Close();
            }
        }

        /// <summary>
        /// 通过查询指定的StoredProcedure语句来获得一个返回表，带parms
        /// </summary>
        /// <param name="sql">存储过程名</param>
        /// <param name="prams">参数</param>
        /// <returns>DataTable</returns>
        public DataTable RunProcDataTable(string procName, SqlParameter[] parms)
        {

            try
            {
                return DBHelper.ExecuteDataset(this.sqlConnectionString, CommandType.StoredProcedure, procName, parms).Tables[0];
            }
            catch (Exception ex)
            {
                if (UseLog())
                {
                    ex.Message.ToString();
                    //log.Error(ex.Message.ToString());
                }
                return null;
            }
            finally
            {
                this.Close();
            }
        }

        /// <summary>
        /// 通过查询指定的StoredProcedure语句来获得一个返回表，带parms
        /// </summary>
        /// <param name="sql">存储过程名</param>
        /// <param name="prams">参数</param>
        /// <returns>DataTable</returns>
        public DataSet RunProcDataSet(string procName, SqlParameter[] parms)
        {

            try
            {
                return DBHelper.ExecuteDataset(this.sqlConnectionString, CommandType.StoredProcedure, procName, parms);
            }
            catch (Exception ex)
            {
                if (UseLog())
                {
                    ex.Message.ToString();
                    ////log.Error(ex.Message.ToString());
                }
                return null;
            }
            finally
            {
                this.Close();
            }
        }

        /// <summary>
        /// 通过查询指定的StoredProcedure语句来获得一个返回表，带parms
        /// </summary>
        /// <param name="sql">存储过程名</param>
        /// <param name="prams">参数</param>
        /// <returns>DataReader</returns>
        public SqlDataReader RunProcDataReader(string procName, SqlParameter[] parms)
        {

            try
            {
                return DBHelper.ExecuteReader(this.sqlConnectionString, CommandType.StoredProcedure, procName, parms);
            }
            catch (Exception ex)
            {
                if (UseLog())
                {
                    ex.Message.ToString();
                    ////log.Error(ex.Message.ToString());
                }
                return null;
            }
            finally
            {
                this.Close();
            }
        }

        /// <summary>
        /// 执行一个无返回的sql语句
        /// </summary>				
        /// <param name="sql">sql语句</param>
        /// <returns>成功是否</returns>
        public bool QueryExec(string sql)
        {
            try
            {
                DBHelper.ExecuteNonQuery(this.sqlConnectionString, CommandType.Text, sql);
            }
            catch (Exception ex)
            {
                if (UseLog())
                {
                    ex.Message.ToString();
                    // //log.Error(ex.Message.ToString());
                }
                return false;
            }
            finally
            {
                this.Close();
            }
            return true;
        }

        /// <summary>
        /// 执行一个无返回的sql语句，带parameters
        /// </summary>				
        /// <param name="sql">sql语句</param>
        /// <param name="parms">参数</param>
        /// <returns>成功是否</returns>
        public string QueryExec(string sql, SqlParameter[] parms)
        {
            string sql1 = sql;
            string e = "";
            try
            {
                DBHelper.ExecuteNonQuery(this.sqlConnectionString, CommandType.Text, sql, parms);
            }
            catch (Exception ex)
            {
                if (UseLog())
                {
                    //log.Error(ex.Message.ToString());
                }
                return ex.Message.ToString();
            }
            finally
            {
                this.Close();
            }
            return e;
        }

        /// <summary>
        /// 执行一个插入记录操作，返回primary key
        /// </summary>				
        /// <param name="sql">insert sql语句</param>
        /// <returns>返回的primary key</returns>
        public string InsertExec(string sql)
        {
            sql += ";SELECT @@identity AS [@@IDENTITY];";
            try
            {
                return DBHelper.ExecuteScalar(this.sqlConnectionString, CommandType.Text, sql).ToString();
            }
            catch (Exception ex)
            {
                if (UseLog())
                {
                    ex.Message.ToString();
                    // //log.Error(ex.Message.ToString());
                }
                return null;
            }
            finally
            {
                this.Close();
            }
        }

        /// <summary>
        /// 执行一个插入记录操作，带parameters，返回primary key
        /// </summary>				
        /// <param name="sql">insert sql语句</param>
        /// <param name="parms">参数</param>
        /// <returns>返回的primary key</returns>
        public string InsertExec(string sql, SqlParameter[] prams)
        {
            sql += ";SELECT @@identity AS [@@IDENTITY];";
            try
            {
                DBHelper.ExecuteScalar(this.sqlConnectionString, CommandType.Text, sql, prams).ToString();
                return "";
            }
            catch (Exception ex)
            {
                if (UseLog())
                {
                    ////log.Error(ex.Message.ToString());
                }
                return ex.Message.ToString();
            }
            finally
            {
                this.Close();
            }
        }

        /// <summary>
        /// 通过查询指定的SQL语句来获得一个返回值
        /// </summary>
        /// <param name="sql">SQL语句</param>
        /// <returns>返回值</returns>
        public string QueryValue(string sql)
        {
            try
            {
                return DBHelper.ExecuteScalar(this.sqlConnectionString, CommandType.Text, sql).ToString();
            }
            catch (Exception ex)
            {
                if (UseLog())
                {
                    ex.Message.ToString();
                    // //log.Error(ex.Message.ToString());
                }
                return null;
            }
            finally
            {
                this.Close();
            }
        }

        /// <summary>
        /// 通过查询指定的SQL语句来获得一个返回值，带parms
        /// </summary>
        /// <param name="sql">SQL语句</param>
        /// <param name="parms">参数</param>
        /// <returns>返回值</returns>
        public string QueryValue(string sql, SqlParameter[] prams)
        {
            try
            {
                return DBHelper.ExecuteScalar(this.sqlConnectionString, CommandType.Text, sql, prams).ToString();
            }
            catch (Exception ex)
            {
                if (UseLog())
                {
                    ex.Message.ToString();
                    // //log.Error(ex.Message.ToString());
                }
                return null;
            }
            finally
            {
                this.Close();
            }
        }

        /// <summary>
        /// 通过查询指定的SQL语句来获得一个返回表
        /// </summary>
        /// <param name="sql">sql语句</param>
        /// <returns>表</returns>
        public DataTable QueryDataTable(string sql, ref string e)
        {
            try
            {
                return DBHelper.ExecuteDataset(this.sqlConnectionString, CommandType.Text, sql).Tables[0];
            }
            catch (Exception ex)
            {
                if (UseLog())
                {
                    //log.Error(ex.Message.ToString());
                }
                e = ex.Message.ToString();
                return null;
            }
            finally
            {
                this.Close();
            }
        }

        /// <summary>
        /// 通过查询指定的SQL语句来获得一个返回表，带parms
        /// </summary>
        /// <param name="sql">sql语句</param>
        /// <param name="parms">参数</param>
        /// <returns>表</returns>
        public DataTable QueryDataTable(string sql, SqlParameter[] parms)
        {
            try
            {
                return DBHelper.ExecuteDataset(this.sqlConnectionString, CommandType.Text, sql, parms).Tables[0];
            }
            catch (Exception ex)
            {
                if (UseLog())
                {
                    ex.Message.ToString();
                    //log.Error(ex.Message.ToString());
                }
                return null;
            }
            finally
            {
                this.Close();
            }
        }

        /// <summary>
        /// 查询返回DATAREADER
        /// </summary>
        /// <param name="sql">sql语句</param>
        /// <returns>DATAREADER</returns>
        public SqlDataReader QueryDataReader(string sql)
        {
            try
            {
                return DBHelper.ExecuteReader(this.sqlConnectionString, CommandType.Text, sql);
            }
            catch (Exception ex)
            {
                if (UseLog())
                {
                    ex.Message.ToString();
                    //log.Error(ex.Message.ToString());
                }
                return null;
            }
            finally
            {
                this.Close();
            }
        }

        /// <summary>
        /// 查询返回DATAREADER，带parms
        /// </summary>
        /// <param name="sql">sql语句</param>
        /// <param name="parms">参数</param>
        /// <returns>DATAREADER</returns>
        public SqlDataReader QueryDataReader(string sql, SqlParameter[] parms)
        {
            try
            {
                return DBHelper.ExecuteReader(this.sqlConnectionString, CommandType.Text, sql, parms);
            }
            catch (Exception ex)
            {
                if (UseLog())
                {
                    ex.Message.ToString();
                    //log.Error(ex.Message.ToString());
                }
                return null;
            }
            finally
            {
                this.Close();
            }
        }

        /// <summary>
        /// 查询返回DATASET
        /// </summary>
        /// <param name="sql">sql语句</param>
        /// <returns>DataSet对象</returns>
        public DataSet QueryDataSet(string sql)
        {
            try
            {
                return DBHelper.ExecuteDataset(this.sqlConnectionString, CommandType.Text, sql);
            }
            catch (Exception ex)
            {
                if (UseLog())
                {
                    ex.Message.ToString();
                    //log.Error(ex.Message.ToString());
                }
                return null;
            }
            finally
            {
                this.Close();
            }
        }


        /// <summary>
        /// 查询返回DATASET，带parms
        /// </summary>
        /// <param name="sql">sql语句</param>
        /// <param name="parms">参数</param>
        /// <returns>DataSet对象</returns>
        public DataSet QueryDataSet(string sql, SqlParameter[] parms)
        {
            try
            {
                return DBHelper.ExecuteDataset(this.sqlConnectionString, CommandType.Text, sql, parms);
            }
            catch (Exception ex)
            {
                if (UseLog())
                {
                    ex.Message.ToString();
                    //log.Error(ex.Message.ToString());
                }
                return null;
            }
            finally
            {
                this.Close();
            }
        }


        /// <summary>
        /// 查询返回Xml
        /// </summary>
        /// <param name="sql">sql语句</param>
        /// <returns>XmlReader对象</returns>
        public XmlReader QueryXml(string sql)
        {
            try
            {
                return DBHelper.ExecuteXmlReader(this.sqlConnectionString, CommandType.Text, sql);
            }
            catch (Exception ex)
            {
                if (UseLog())
                {
                    ex.Message.ToString();
                    //log.Error(ex.Message.ToString());
                }
                return null;
            }
            finally
            {
                this.Close();
            }
        }


        /// <summary>
        /// 查询返回Xml，带parms
        /// </summary>
        /// <param name="sql">sql语句</param>
        /// <param name="parms">参数</param>
        /// <returns>XmlReader对象</returns>
        public XmlReader QueryXml(string sql, SqlParameter[] parms)
        {
            try
            {
                return DBHelper.ExecuteXmlReader(this.sqlConnectionString, CommandType.Text, sql, parms);
            }
            catch (Exception ex)
            {
                if (UseLog())
                {
                    ex.Message.ToString();
                    //log.Error(ex.Message.ToString());
                }
                return null;
            }
            finally
            {
                this.Close();
            }
        }



        /// <summary>
        /// 更新Dataset。
        /// </summary>
        /// <param name="insertCommand">插入Command</param>
        /// <param name="deleteCommand">删除Command</param>
        /// <param name="updateCommand">更新Command</param>
        /// <param name="ds">Dataset</param>
        /// <param name="tableName">表名</param>
        public void UpdateDataset(SqlCommand insertCommand, SqlCommand deleteCommand, SqlCommand updateCommand, DataSet ds, string tableName)
        {
            try
            {
                DBHelper.UpdateDataset(insertCommand, deleteCommand, updateCommand, ds, tableName);
            }
            catch (Exception ex)
            {
                if (UseLog())
                {
                    ex.Message.ToString();
                    //log.Error(ex.Message.ToString());
                }
            }
        }

        /// <summary>
        /// 填充DataSet
        /// </summary>
        /// <param name="sql">sql语句</param>
        /// <param name="ds">Dataset</param>
        /// <param name="tableNames">表名</param>
        /// <returns>成功是否</returns>
        public bool FillDataSet(string sql, DataSet ds, string[] tableNames)
        {
            try
            {
                DBHelper.FillDataset(this.sqlConnectionString, CommandType.Text, sql, ds, tableNames);
            }
            catch (Exception ex)
            {
                if (UseLog())
                {
                    ex.Message.ToString();
                    //log.Error(ex.Message.ToString());
                }
                return false;
            }
            finally
            {
                this.Close();
            }
            return true;
        }

        /// <summary>
        /// 填充DataSet，带parms
        /// </summary>
        /// <param name="sql">sql语句</param>
        /// <param name="ds">Dataset</param>
        /// <param name="tableNames">表名</param>
        /// <param name="parms">参数</param>
        /// <returns>成功是否</returns>
        public bool FillDataSet(string sql, DataSet ds, string[] tableNames, SqlParameter[] parms)
        {
            try
            {
                DBHelper.FillDataset(this.sqlConnectionString, CommandType.Text, sql, ds, tableNames, parms);
            }
            catch (Exception ex)
            {
                if (UseLog())
                {
                    ex.Message.ToString();
                    //log.Error(ex.Message.ToString());
                }
                return false;
            }
            finally
            {
                this.Close();
            }
            return true;
        }

        /// <summary>
        /// Make input param.
        /// 包装输入参数。
        /// </summary>
        /// <param name="ParamName">参数名</param>
        /// <param name="DbType">参数类型</param>
        /// <param name="Size">参数容量</param>
        /// <param name="Value">参数值</param>
        /// <returns>新的Sql参数</returns>
        public SqlParameter MakeInParam(string ParamName, SqlDbType DbType, int Size, object Value)
        {
            return MakeParam(ParamName, DbType, Size, ParameterDirection.Input, Value);
        }

        /// <summary>
        /// Make input param.
        /// 包装输入参数。
        /// </summary>
        /// <param name="ParamName">参数名</param>
        /// <param name="DbType">参数类型</param>
        /// <param name="Size">参数容量</param>
        /// <param name="Value">参数值</param>
        /// <returns>新的Sql参数</returns>
        public SqlParameter MakeInParam(string ParamName, SqlDbType DbType, object Value)
        {
            return MakeParam(ParamName, DbType, 0, ParameterDirection.Input, Value);
        }

        /// <summary>
        /// Make output param.
        /// 包装输出参数。
        /// </summary>
        /// <param name="ParamName">参数名</param>
        /// <param name="DbType">参数类型</param>
        /// <param name="Size">参数容量</param>
        /// <returns>新的Sql参数</returns>
        public SqlParameter MakeOutParam(string ParamName, SqlDbType DbType, int Size)
        {
            return MakeParam(ParamName, DbType, Size, ParameterDirection.Output, null);
        }

        /// <summary>
        /// Make output param.
        /// 包装输出参数。
        /// </summary>
        /// <param name="ParamName">参数名</param>
        /// <param name="DbType">参数类型</param>
        /// <returns>新的Sql参数</returns>
        public SqlParameter MakeOutParam(string ParamName, SqlDbType DbType)
        {
            return MakeParam(ParamName, DbType, 0, ParameterDirection.Output, null);
        }

        /// <summary>
        /// Make output param.
        /// 包装输出参数。
        /// </summary>
        /// <param name="ParamName">参数名</param>
        /// <param name="DbType">参数类型</param>
        /// <param name="Size">参数容量</param>
        /// <param name="Value">参数值</param>
        /// <returns>新的Sql参数</returns>
        public SqlParameter MakeOutParam(string ParamName, SqlDbType DbType, int Size, object Value)
        {
            return MakeParam(ParamName, DbType, Size, ParameterDirection.Output, Value);
        }

        /// <summary>
        /// Make output param.
        /// 包装输出参数。
        /// </summary>
        /// <param name="ParamName">参数名</param>
        /// <param name="DbType">参数类型</param>
        /// <param name="Size">参数容量</param>
        /// <param name="Value">参数值</param>
        /// <returns>新的Sql参数</returns>
        public SqlParameter MakeOutParam(string ParamName, SqlDbType DbType, object Value)
        {
            return MakeParam(ParamName, DbType, 0, ParameterDirection.Output, Value);
        }

        /// <summary>
        /// Make stored procedure param.
        /// 包装Command参数。
        /// </summary>
        /// <param name="ParamName">参数名</param>
        /// <param name="DbType">参数类型</param>
        /// <param name="Size">参数容量</param>
        /// <param name="Direction">参数方向</param>
        /// <param name="Value">参数值</param>
        /// <returns>新的Sql参数</returns>
        public SqlParameter MakeParam(string ParamName, SqlDbType DbType, Int32 Size, ParameterDirection Direction, object Value)
        {
            SqlParameter param;

            if (Size > 0)
                param = new SqlParameter(ParamName, DbType, Size);
            else
                param = new SqlParameter(ParamName, DbType);

            param.Direction = Direction;
            if (!(Direction == ParameterDirection.Output && Value == null))
                param.Value = Value;
            else Value = param.Value;
            return param;
        }

        /// <summary>
        /// 创建command对象以便执行sql语句。
        /// </summary>
        /// <param name="sql">Sql Text.</param>		
        /// <returns>Command object.</returns>
        public SqlCommand CreateCommand(string sql, params string[] sourceColumns)
        {
            try
            {
                return DBHelper.CreateCommand(this.sqlConnectionString, sql, sourceColumns);
            }
            catch (Exception ex)
            {
                if (UseLog())
                {
                    ex.Message.ToString();
                    //log.Error(ex.Message.ToString());
                }
                return null;
            }
        }

    }
}