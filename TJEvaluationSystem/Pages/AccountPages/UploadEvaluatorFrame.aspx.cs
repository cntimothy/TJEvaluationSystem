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
using System.IO;

namespace TJEvaluationSystem.Pages.AccountPages
{
    public partial class UploadEvaluatorFrame : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void DownloadFile_Click(object sender, EventArgs e)
        {
            Response.ContentType = "application/x-zip-compressed";
            string filename = Server.MapPath("../../App_GlobalResources/evaluatorinfo.zip");
            //指定编码 防止中文文件名乱码 
            Response.HeaderEncoding = System.Text.Encoding.GetEncoding("utf-8");
            Response.TransmitFile(filename);
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
                filePath = System.AppDomain.CurrentDomain.BaseDirectory.ToString() + "uploadfile\\" + Path.GetFileName(FUExcel.PostedFile.FileName);
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
                //删除空白行
                foreach (DataRow dr in table.Rows)
                {
                    //if (dr["UiID"] == null)
                    if (dr.IsNull("EvId"))
                    {
                        table.Rows.Remove(dr);
                    }
                }

                //增加EvDepartment栏
                string department = "";
                string mID = (string)Session["username"];
                List<Manager> managers = new List<Manager>();
                string exception = "";
                ManagerBLL.SelectByID(mID, ref managers, ref exception);
                department = managers[0].MDepartment;
                table.Columns.Add("EvDepartment");
                foreach (DataRow dr in table.Rows)
                {
                    dr["EvDepartment"] = "department";
                }

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