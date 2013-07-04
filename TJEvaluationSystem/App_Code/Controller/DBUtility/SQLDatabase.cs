using System;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Xml;

namespace DBUtility
{

    /// <summary>
    /// ���ݿ���������ࡣ
    /// </summary>
    public class SQLDatabase
    {
        // private string serverName, dbName, userID, passWord;// encryptKey;
        private string sqlConnectionString;
        private SqlConnection conn;
        //  private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        public SQLDatabase()
        {
            // ��ʼ�����ݿ������ַ���
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
        /// �Ƿ�ʹ����־
        /// </summary>
        /// <returns>�����</returns>
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
        /// �����ݿ����ӡ�
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
        /// �ر����ݿ����ӡ�
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
        /// �ͷ���Դ��
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
        /// ��������
        /// </summary>
        /// <returns>�ɹ����</returns>
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
        /// ��������
        /// </summary>
        /// <param name="server">��������ַ</param>
        /// <param name="database">���ݿ���</param>
        /// <param name="uid">�û���</param>
        /// <param name="password">����</param>
        /// <returns>�ɹ����</returns>
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
        /// ִ�д洢���� eg:
        /// RunProc("upProcedureName");			// run the stored procedure
        /// </summary>
        /// <param name="procName">�洢������</param>
        /// <returns>�ɹ��Ƿ�</returns>
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
        /// ִ�д洢���� eg:
        /// RunProc("upProcedureName", prams);			// run the stored procedure
        /// strVlaue = (string) prams[index].Value;     // get the output param value ������������ֵ
        /// </summary>
        /// <param name="procName">�洢������</param>
        /// <param name="prams">����</param>
        /// <returns>�ɹ��Ƿ�</returns>
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
        /// ͨ����ѯָ����StoredProcedure��������һ������ֵ����parms
        /// </summary>
        /// <param name="procName">�洢������</param>
        /// <param name="prams">����</param>
        /// <returns>����ֵ</returns>
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
        /// ͨ����ѯָ����StoredProcedure��������һ������ֵ������parms
        /// </summary>
        /// <param name="procName">�洢������</param>
        /// <returns>����ֵ</returns>
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
        /// ͨ����ѯָ����StoredProcedure��������һ�����ر�����parms
        /// </summary>
        /// <param name="procName">�洢������</param>
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
        /// ͨ����ѯָ����StoredProcedure��������һ�����ر���parms
        /// </summary>
        /// <param name="sql">�洢������</param>
        /// <param name="prams">����</param>
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
        /// ͨ����ѯָ����StoredProcedure��������һ�����ر���parms
        /// </summary>
        /// <param name="sql">�洢������</param>
        /// <param name="prams">����</param>
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
        /// ͨ����ѯָ����StoredProcedure��������һ�����ر���parms
        /// </summary>
        /// <param name="sql">�洢������</param>
        /// <param name="prams">����</param>
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
        /// ִ��һ���޷��ص�sql���
        /// </summary>				
        /// <param name="sql">sql���</param>
        /// <returns>�ɹ��Ƿ�</returns>
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
        /// ִ��һ���޷��ص�sql��䣬��parameters
        /// </summary>				
        /// <param name="sql">sql���</param>
        /// <param name="parms">����</param>
        /// <returns>�ɹ��Ƿ�</returns>
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
        /// ִ��һ�������¼����������primary key
        /// </summary>				
        /// <param name="sql">insert sql���</param>
        /// <returns>���ص�primary key</returns>
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
        /// ִ��һ�������¼��������parameters������primary key
        /// </summary>				
        /// <param name="sql">insert sql���</param>
        /// <param name="parms">����</param>
        /// <returns>���ص�primary key</returns>
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
        /// ͨ����ѯָ����SQL��������һ������ֵ
        /// </summary>
        /// <param name="sql">SQL���</param>
        /// <returns>����ֵ</returns>
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
        /// ͨ����ѯָ����SQL��������һ������ֵ����parms
        /// </summary>
        /// <param name="sql">SQL���</param>
        /// <param name="parms">����</param>
        /// <returns>����ֵ</returns>
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
        /// ͨ����ѯָ����SQL��������һ�����ر�
        /// </summary>
        /// <param name="sql">sql���</param>
        /// <returns>��</returns>
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
        /// ͨ����ѯָ����SQL��������һ�����ر���parms
        /// </summary>
        /// <param name="sql">sql���</param>
        /// <param name="parms">����</param>
        /// <returns>��</returns>
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
        /// ��ѯ����DATAREADER
        /// </summary>
        /// <param name="sql">sql���</param>
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
        /// ��ѯ����DATAREADER����parms
        /// </summary>
        /// <param name="sql">sql���</param>
        /// <param name="parms">����</param>
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
        /// ��ѯ����DATASET
        /// </summary>
        /// <param name="sql">sql���</param>
        /// <returns>DataSet����</returns>
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
        /// ��ѯ����DATASET����parms
        /// </summary>
        /// <param name="sql">sql���</param>
        /// <param name="parms">����</param>
        /// <returns>DataSet����</returns>
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
        /// ��ѯ����Xml
        /// </summary>
        /// <param name="sql">sql���</param>
        /// <returns>XmlReader����</returns>
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
        /// ��ѯ����Xml����parms
        /// </summary>
        /// <param name="sql">sql���</param>
        /// <param name="parms">����</param>
        /// <returns>XmlReader����</returns>
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
        /// ����Dataset��
        /// </summary>
        /// <param name="insertCommand">����Command</param>
        /// <param name="deleteCommand">ɾ��Command</param>
        /// <param name="updateCommand">����Command</param>
        /// <param name="ds">Dataset</param>
        /// <param name="tableName">����</param>
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
        /// ���DataSet
        /// </summary>
        /// <param name="sql">sql���</param>
        /// <param name="ds">Dataset</param>
        /// <param name="tableNames">����</param>
        /// <returns>�ɹ��Ƿ�</returns>
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
        /// ���DataSet����parms
        /// </summary>
        /// <param name="sql">sql���</param>
        /// <param name="ds">Dataset</param>
        /// <param name="tableNames">����</param>
        /// <param name="parms">����</param>
        /// <returns>�ɹ��Ƿ�</returns>
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
        /// ��װ���������
        /// </summary>
        /// <param name="ParamName">������</param>
        /// <param name="DbType">��������</param>
        /// <param name="Size">��������</param>
        /// <param name="Value">����ֵ</param>
        /// <returns>�µ�Sql����</returns>
        public SqlParameter MakeInParam(string ParamName, SqlDbType DbType, int Size, object Value)
        {
            return MakeParam(ParamName, DbType, Size, ParameterDirection.Input, Value);
        }

        /// <summary>
        /// Make input param.
        /// ��װ���������
        /// </summary>
        /// <param name="ParamName">������</param>
        /// <param name="DbType">��������</param>
        /// <param name="Size">��������</param>
        /// <param name="Value">����ֵ</param>
        /// <returns>�µ�Sql����</returns>
        public SqlParameter MakeInParam(string ParamName, SqlDbType DbType, object Value)
        {
            return MakeParam(ParamName, DbType, 0, ParameterDirection.Input, Value);
        }

        /// <summary>
        /// Make output param.
        /// ��װ���������
        /// </summary>
        /// <param name="ParamName">������</param>
        /// <param name="DbType">��������</param>
        /// <param name="Size">��������</param>
        /// <returns>�µ�Sql����</returns>
        public SqlParameter MakeOutParam(string ParamName, SqlDbType DbType, int Size)
        {
            return MakeParam(ParamName, DbType, Size, ParameterDirection.Output, null);
        }

        /// <summary>
        /// Make output param.
        /// ��װ���������
        /// </summary>
        /// <param name="ParamName">������</param>
        /// <param name="DbType">��������</param>
        /// <returns>�µ�Sql����</returns>
        public SqlParameter MakeOutParam(string ParamName, SqlDbType DbType)
        {
            return MakeParam(ParamName, DbType, 0, ParameterDirection.Output, null);
        }

        /// <summary>
        /// Make output param.
        /// ��װ���������
        /// </summary>
        /// <param name="ParamName">������</param>
        /// <param name="DbType">��������</param>
        /// <param name="Size">��������</param>
        /// <param name="Value">����ֵ</param>
        /// <returns>�µ�Sql����</returns>
        public SqlParameter MakeOutParam(string ParamName, SqlDbType DbType, int Size, object Value)
        {
            return MakeParam(ParamName, DbType, Size, ParameterDirection.Output, Value);
        }

        /// <summary>
        /// Make output param.
        /// ��װ���������
        /// </summary>
        /// <param name="ParamName">������</param>
        /// <param name="DbType">��������</param>
        /// <param name="Size">��������</param>
        /// <param name="Value">����ֵ</param>
        /// <returns>�µ�Sql����</returns>
        public SqlParameter MakeOutParam(string ParamName, SqlDbType DbType, object Value)
        {
            return MakeParam(ParamName, DbType, 0, ParameterDirection.Output, Value);
        }

        /// <summary>
        /// Make stored procedure param.
        /// ��װCommand������
        /// </summary>
        /// <param name="ParamName">������</param>
        /// <param name="DbType">��������</param>
        /// <param name="Size">��������</param>
        /// <param name="Direction">��������</param>
        /// <param name="Value">����ֵ</param>
        /// <returns>�µ�Sql����</returns>
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
        /// ����command�����Ա�ִ��sql��䡣
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