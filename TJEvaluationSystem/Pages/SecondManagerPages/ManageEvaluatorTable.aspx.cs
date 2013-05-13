using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BLL;
using Model;
using DBUtility;
using System.Web.Script.Serialization;
using System.Data;

namespace TJEvaluationSystem.Pages.SecondManagerPages
{
    public partial class ManageEvaluatorTable : System.Web.UI.Page
    {
        private string exception = "";
        private string userID = "";
        private string standerLib = null;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                //LoadEvaluatorTable();
            }

        }

        protected void Search(object sender, EventArgs e)
        {
            string username = (string)Session["username"];
            //string username = "admin2";
            string uiDepart = "";
            List<Manager> manager = new List<Manager>();
            exception = "";
            if (ManagerBLL.SelectByID(username, ref manager, ref exception))
            {
                uiDepart = manager.ElementAt(0).MDepartment;
                Title.Text = uiDepart + "被考评人名单：";
                List<UserInfo> Evaluated = new List<UserInfo>();
                string type = "____1%";
                bool b = UserInfoBLL.Select(uiDepart, type, ref Evaluated, ref exception);
                if (b)
                {
                    DataTable table = new DataTable();
                    table = Evaluated.ListToDataTable();

                    //给table添加prbComment栏
                    adjustTable(table, ref exception);
                    int sumCount = 0, unPassCount = 0, passCount = 0, savedCount = 0, unMakeCount = 0;

                    countNumber(table, ref sumCount, ref unPassCount, ref passCount, ref unMakeCount);//做汇总
                    Title.Text += "( 未制作：" + unMakeCount + "\\已提交：" + unPassCount + "\\已审核：" + passCount + "\\总人数：" + sumCount + " )";

                    table.DefaultView.Sort = "Passed asc"; //给table按状态排序
                    table = table.DefaultView.ToTable();

                    string json = JSON.DataTableToJson(table);
                    JsonData.Value = json;
                    ClientScript.RegisterStartupScript(this.GetType(), "", "load_userinfo()", true);
                    return;

                }

                else
                {
                    Errors.Value = "本部门尚无被考评人！";
                    ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);
                    return;
                }
            }
            else
            {
                Errors.Value = "您无此操作权限！";
                ClientScript.RegisterStartupScript(this.GetType(), "", "tanchuang()", true);
                return;
            }
        }

        //导入被考核人员名单
        //protected void LoadUserList(object sender, EventArgs e)
        //{
        //    exception = "";
        //    string username = (string)Session["username"];
        //    string uiDepart = "";
        //    List<Manager> managers = new List<Manager>();

        //    //查询当前用户
        //    if (ManagerBLL.SelectByID(username, ref managers, ref exception))
        //    {
        //        //获得部门
        //        uiDepart = managers.ElementAt(0).MDepartment;
        //        Title.Text = uiDepart + "被考评人名单：";
        //        List<UserInfo> Evaluated = new List<UserInfo>();
        //        string type = "____1%";
        //        //查询被考评名单
        //        bool b = UserInfoBLL.Select(uiDepart, type, ref Evaluated, ref exception);
        //        if (b)
        //        {
        //            //获取名单，在前台显示
        //            DataTable table = new DataTable();
        //            table = Evaluated.ListToDataTable();

        //            //给table增加Passed栏
        //            adjustTable(table, ref exception);
        //            int sumCount = 0, unPassCount = 0, passCount = 0, savedCount = 0, unMakeCount = 0;

        //            countNumber(table, ref sumCount, ref unPassCount, ref passCount, ref savedCount, ref unMakeCount);//做汇总
        //            Title.Text += "（总人数：" + sumCount + " \\未制作：" + unMakeCount + " \\已保存：" + savedCount + " \\已提交：" + unPassCount + " \\已审核：" + passCount + "）";

        //            table.DefaultView.Sort = "Passed desc"; //给table按状态排序
        //            table = table.DefaultView.ToTable();

        //            string json = JSON.DataTableToJson(table);
        //            JsonData.Value = json;
        //            ClientScript.RegisterStartupScript(this.GetType(), "", "ShowUserList()", true);
        //            return;
                   

        //        }

        //        else
        //        {
        //            //不存在名单
        //            ClientScript.RegisterStartupScript(this.GetType(), "", "f_alert('warn','本部门不存在被考评人员!')", true);
        //            return;
        //        }
        //    }
        //    else
        //    {
        //        //获取数据失败
        //        ClientScript.RegisterStartupScript(this.GetType(), "", "f_alert('error','获取数据失败!')", true);
        //        return;
        //    }

        //}

        private void adjustTable(DataTable dt, ref string exception)
        {
            //给table添加prbComment栏
            dt.Columns.Add("Comment");
            dt.Columns.Add("Passed");
            AssessTable assessTable = new AssessTable();
            foreach (DataRow dr in dt.Rows)
            {
                //0：已提交 1：已审核 2：已保存 
                if (AssessTableBLL.Select((string)dr["UiID"], ref assessTable, ref exception))
                {
                    dr["Comment"] = assessTable.AtComment;
                    if (assessTable.AtPass.ToString() == "0")
                    {
                        dr["Passed"] = "已提交";
                    }
                    else if (assessTable.AtPass.ToString() == "1")
                    {
                        dr["Passed"] = "已审核";
                    }
                    else
                    {
                        dr["Passed"] = "已保存";
                    }
                }
                else
                {
                    dr["Comment"] = "";
                    dr["Passed"] = "未制作";
                }
            }
        }

        private void countNumber(DataTable dt, ref int sumCount, ref int unPassCount, ref int passCount, ref int unMakeCount)
        {
            foreach (DataRow dr in dt.Rows)
            {
                switch (dr["Passed"].ToString())
                {
                    case "已提交":
                        unPassCount++;
                        break;
                    case "已审核":
                        passCount++;
                        break;
                    default:
                        unMakeCount++;
                        break;
                }
                sumCount++;
            }
        }

        //导入考核表
        public void LoadEvaluatorTable(string id)
        {
            //查询考核表
            string sqlcmd = "select * from tb_AssessTable where atUserID='" + id + "'";
            List<AssessTable> ats = new List<AssessTable>();
            string e = "";


            if (!LoadStanderLib())
            {
                ScriptManager.RegisterStartupScript(BGetEvaluateTable, this.GetType(), "fun", "f_alert('error','获取指标库数据失败，请重试！');", true);
                return;
            }
            if (!LoadResponseStander(id))
            {
                ScriptManager.RegisterStartupScript(BGetEvaluateTable, this.GetType(), "fun", "f_alert('error','获取岗位责任书数据失败，请重试！');", true);
                return;
            }
            if (!AssessTableBLL.Select(sqlcmd, ref ats, ref e) || ats.Count == 0)
            {
                JsonData3.Value = "";
            }
            else
            {
                JsonData3.Value = JSON.ScriptSerialize<AssessTable>(ats[0]);
            }
            ScriptManager.RegisterStartupScript(BGetEvaluateTable, this.GetType(), "fun", "ShowTable();", true);
        }

        //获取指标库
        public bool LoadStanderLib()
        {
            string sqlCmd = "select * from tb_StanderLib  where slType<>'否决指标'";
            string exception = "";

            List<StanderLib> ui = StanderLibBLL.Select(sqlCmd, ref exception);
            if (exception.Length > 0)
            {
                return false;
            }
            else
            {
                if (ui.Count <= 0)
                {
                    return false;
                }
                else
                {
                    var jser = new JavaScriptSerializer();
                    var json = jser.Serialize(ui);
                    json = "{\"Rows\":" + json + ",\"Total\":" + ui.Count + "}";
                    standerLib = json;
                    return true;
                }
            }
        }

        //导入工作内容
        public bool LoadResponseStander(string id)
        {
            exception = "";
            List<PostResponseBook> postBook = new List<PostResponseBook>();
            //查找岗位责任书
            if (PostResponseBookBLL.Select(id, ref postBook, ref exception))
            {
                if (postBook.Count <= 0)
                    return false;
                else
                {
                    //获取工作内容与工作要求
                    PostResponseBook book = postBook[0];
                    string content = book.PrbWorkContntRequest;
                    if (content == "")
                        return false;
                    else
                    {
                        //转换成json字符串
                        JsonData2.Value = ToJsonTest(content.Replace("\n", " ").Replace("\r", " "));
                        return true;
                    }

                }
            }
            else
                return false;
        }

        //将工作内容工作要求转转成JSON格式
        public string ToJsonTest(string s)
        {
            string json = "";
            json += "{ \"Rows\":[";
            string[] test = s.Split(new Char[] { '&' });
            string[] key = { "Title", "Content", "Request", "Point" };
            for (int i = 0; i < test.Length; i++)
            {
                json += "{";
                string[] test2 = test[i].Split(new Char[] { '$' });
                for (int j = 0; j < test2.Length; j++)
                {
                    string[] test3 = test2[j].Split(new Char[] { '*' });

                    if (j < test2.Length - 1)
                    {
                        json += "\"" + key[j] + "\":" + "\"" + test3[1] + "\",";
                    }
                    else
                    {
                        json += "\"" + key[j] + "\":" + "\"" + test3[1] + "\"";
                    }
                }
                if (i == test.Length - 1)
                {
                    json += "} ";
                }
                else
                {
                    json += "}, ";
                }
            }
            json += "],\"Total\":" + "\"" + (test.Length).ToString() + "\"" + "}";
            return json;
        }

        //获取指标库
        protected void BGetStanderLib_Click(object sender, EventArgs e)
        {
            if (LoadStanderLib() && LoadResponseStander(userID))
            {
                ScriptManager.RegisterStartupScript(BGetStanderLib, this.GetType(), "showdata", "ShowStander();", true);
                ScriptManager.RegisterStartupScript(BGetStanderLib, this.GetType(), "showdata", "ShowVetoStander();", true);
                ScriptManager.RegisterStartupScript(BGetStanderLib, this.GetType(), "showdata", "ShowResponseStander();", true);
            }
            else
            {
                ScriptManager.RegisterStartupScript(BGetStanderLib, this.GetType(), "error", "f_alert('error','获取数据失败，请重试!');", true);
            }
        }

        //制作考核表完成
        protected void BFinishMakeTable_Click(object sender, EventArgs e)
        {
            //转换数据
            string data = JsonData.Value;
            string userID = JsonData2.Value;
            if (data == "" || data == null || userID == "" || userID == null)
            {
                ScriptManager.RegisterStartupScript(BFinishMakeTable, this.GetType(), "error", "f_alert('error','保存失败，请重试!');", true);
                return;
            }
            AssessTable[] s = JSON.ScriptDeserialize<AssessTable[]>(data);  //将Json字符串转换为UserInfo对象
            if (s.Length == 0)
            {
                ScriptManager.RegisterStartupScript(BFinishMakeTable, this.GetType(), "error", "f_alert('error','保存失败，请重试!');", true);
                return;
            }
            string message = "";
            AssessTable assess = s[0];
            //查询用户信息
            List<UserInfo> ui = new List<UserInfo>();
            if (!UserInfoBLL.Select(ref ui, userID, ref message) || ui.Count == 0)
            {
                // 失败
                ScriptManager.RegisterStartupScript(BFinishMakeTable, this.GetType(), "error", "f_alert('error','保存失败，请重试!');", true);
                return;
            }
            else
            {
                assess.AtUserID = userID;
                assess.AtDep = ui[0].UiDepartment;
            }
            assess.AtDate = DateTime.Now.Date;
            assess.AtPass = 0;
            //更新数据库
            if (!AssessTableBLL.Insert(s, ref message))
            {
                // 失败
                ScriptManager.RegisterStartupScript(BFinishMakeTable, this.GetType(), "error", "f_alert('error','保存失败，请重试!');", true);
            }
            else
            {
                //成功
                JsonData.Value = data;
                ScriptManager.RegisterStartupScript(BFinishMakeTable, this.GetType(), "success", "SaveMakeTableDone();", true);
            }
        }
        
        //编辑考核表完成
        protected void BFinishEditTable_Click(object sender, EventArgs e)
        {
            //转换数据
            string data = JsonData.Value;
            string userID = JsonData2.Value;
            if (data == "" || data == null || userID == "" || userID == null)
            {
                ScriptManager.RegisterStartupScript(BFinishEditTable, this.GetType(), "error", "f_alert('error','保存失败，请重试!');", true);
                return;
            }
            AssessTable[] s = JSON.ScriptDeserialize<AssessTable[]>(data);  //将Json字符串转换为UserInfo对象
            if (s.Length == 0)
            {
                ScriptManager.RegisterStartupScript(BFinishEditTable, this.GetType(), "error", "f_alert('error','保存失败，请重试!');", true);
                return;
            }
            string message = "";
            AssessTable assess = s[0];
            //查询用户信息
            List<UserInfo> ui = new List<UserInfo>();
            if (!UserInfoBLL.Select(ref ui, userID, ref message) || ui.Count == 0)
            {
                // 失败
                ScriptManager.RegisterStartupScript(BFinishEditTable, this.GetType(), "error", "f_alert('error','保存失败，请重试!');", true);
                return;
            }
            else
            {
                assess.AtUserID = userID;
                assess.AtDep = ui[0].UiDepartment;
            }
            assess.AtDate = DateTime.Now.Date;
            assess.AtPass = 0;
            //更新数据库
            if (!AssessTableBLL.UpdateStander(assess, ref message))
            {
                // 失败
                ScriptManager.RegisterStartupScript(BFinishEditTable, this.GetType(), "error", "f_alert('error','保存失败，请重试!');", true);
            }
            else
            {
                //成功
                JsonData.Value = data;
                ScriptManager.RegisterStartupScript(BFinishEditTable, this.GetType(), "success", "SaveEditTableDone();", true);
            }
        }

        //根据ID获取考核表
        protected void BGetEvaluateTable_Click(object sender, EventArgs e)
        {
            //转换数据
            string data = JsonData.Value;
            if (data == null || data == "")
            {
                ScriptManager.RegisterStartupScript(BGetEvaluateTable, this.GetType(), "", "f_alert('error','获取数据失败!');", true);
                return;
            }
            userID = data;
            //
            if (standerLib == null)
            {
                //获取指标库
                if (!LoadStanderLib())
                {
                    ScriptManager.RegisterStartupScript(BGetEvaluateTable, this.GetType(), "fun", "f_alert('error','获取指标库数据失败，请重试！');", true);
                    return;
                }
            }
            //获取考核表

            //-1:未制作 0：未通过 1：已通过审核 2：已保存
            int status = AssessTableBLL.GetAssessTableStatus(userID);
            if (status == -1)
            {
                //获取岗位职责
                if (!LoadResponseStander(userID))
                {
                    ScriptManager.RegisterStartupScript(BGetEvaluateTable, this.GetType(), "fun", "f_alert('error','岗位责任书尚未制定，不能制定考核表！');", true);
                    return;
                }
                JsonData.Value = standerLib;
                //制作考核表
                ScriptManager.RegisterStartupScript(BGetEvaluateTable, this.GetType(), "", "MakeAssessTable();", true);
            }
            else if (status == 0)
            {
                //获取岗位职责
                if (!LoadResponseStander(userID))
                {
                    ScriptManager.RegisterStartupScript(BGetEvaluateTable, this.GetType(), "fun", "f_alert('error','岗位责任书尚未制定，不能制定考核表！');", true);
                    return;
                }
                //获取考核表
                AssessTable at = new AssessTable();
                if (!AssessTableBLL.Select(userID, ref at, ref exception))
                {
                    ScriptManager.RegisterStartupScript(BGetEvaluateTable, this.GetType(), "fun", "f_alert('error','获取考核表数据失败，请重试！');", true);
                    return;
                }
                //填写pass和Comment
                if (at.AtPass == 1)
                {
                    pass.Text = "已审核";
                }
                else
                {
                    pass.Text = "未审核";
                }
                if (at.AtComment != "")
                {
                    Comment.Text = "审核意见：" + at.AtComment;
                }
                else
                {
                    Comment.Text = "";
                }
                JsonData3.Value = JSON.ScriptSerialize<AssessTable>(at);
                JsonData.Value = standerLib;
                //制作考核表
                ScriptManager.RegisterStartupScript(BGetEvaluateTable, this.GetType(), "", "EditAssessTable();", true);
            }
            else if (status == 1)
            {
                //获取考核表
                AssessTable at = new AssessTable();
                if (!AssessTableBLL.Select(userID, ref at, ref exception))
                {
                    ScriptManager.RegisterStartupScript(BGetEvaluateTable, this.GetType(), "fun", "f_alert('error','获取考核表数据失败，请重试！');", true);
                    return;
                }
                //填写表头以上的pass和Comment
                if (at.AtPass == 1)
                {
                    pass.Text = "已审核";
                }
                else
                {
                    pass.Text = "未审核";
                }
                Comment.Text = "";
                JsonData3.Value = JSON.ScriptSerialize<AssessTable>(at);
                JsonData.Value = standerLib;
                //制作考核表
                ScriptManager.RegisterStartupScript(BGetEvaluateTable, this.GetType(), "", "ViewAssessTable();", true);
            }
            else
            {
                ScriptManager.RegisterStartupScript(BGetEvaluateTable, this.GetType(), "fun", "f_alert('error','获取数据失败，请重试！');", true);
            }

        }

        //刷新
        protected void BRefresh_Click(object sender, EventArgs e)
        {
        }
    }
}