using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.OleDb;
using System.Data;
using BLL;
using Model;
using DBUtility;

namespace TJEvaluationSystem.Pages.SuperManagerPages
{
    public partial class FileUploadPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void BLoadFile_Click(object sender, EventArgs e)
        {
            string filePath;
            if (!FUExcel.HasFile)
            {
                LLoadInfo.Text = "请选择Excel文件！";
                JsonData.Value = "";
                return;
            }
             
            //判断文件类型
            string fileExtension = System.IO.Path.GetExtension(FUExcel.FileName).ToLower(); //文件扩展名
            if (fileExtension != ".xls")
            {
                LLoadInfo.Text = "文件类型错误，请选择请选择Excel文件!";
                JsonData.Value = "";
                return;
            }

            //处理Excel文件
            try
            {
                filePath = System.AppDomain.CurrentDomain.BaseDirectory.ToString() + "uploadfile\\" + FUExcel.PostedFile.FileName;
                //  保存文件
                FUExcel.SaveAs(filePath);
                //数据源
                string strConn = "Provider=Microsoft.Jet.OLEDB.4.0;" + "Data Source=" + filePath + ";" + "Extended Properties=Excel 8.0;";
                OleDbConnection conn = new OleDbConnection(strConn);
                conn.Open();
                DataTable schemaTable = conn.GetOleDbSchemaTable(System.Data.OleDb.OleDbSchemaGuid.Tables, null);
                string tableName = schemaTable.Rows[0][2].ToString().Trim();

                DataSet ds = new DataSet();
                string strExcel = "select * from [" + tableName + "]";
                OleDbDataAdapter myCommand = new OleDbDataAdapter(strExcel, strConn);
                myCommand.Fill(ds, "table1");
                conn.Close();

                DataTable table = new DataTable();
                table = ds.Tables["table1"];

                string json = JSON.DataTableToJson(table);

                LLoadInfo.Text = "上传成功！";
                JsonData.Value = json;
                ClientScript.RegisterStartupScript(this.GetType(), "showdata", "ShowData();", true);
            }
            catch (Exception ex)
            {
                LLoadInfo.Text = ex.Message;
                JsonData.Value = "";
            }
        }
    }
}