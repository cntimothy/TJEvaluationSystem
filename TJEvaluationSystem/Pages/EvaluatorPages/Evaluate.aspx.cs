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

namespace TJEvaluationSystem.Pages.EvaluatorPages
{
    public partial class Evaluate : System.Web.UI.Page
    {
        private int EvaluationID = -1;  //考评记录ID
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                //判断是否登陆
                string name = (string)Session["username"];
                if (name == null || name == "")
                    Response.Redirect("../Login.aspx");
                //判断考评是否已开始
                EvaluationID=EvaluationHistoryBLL.CheckActiveEvaluation();
                if (EvaluationID != -1)
                {
                    LoadEvaluateUserData();
                }
                else
                {
                    //考评未开始
                    ClientScript.RegisterStartupScript(this.GetType(), "", "NoActiveEvaluation();", true);
                }
            }
        }

        //获取考评名单
        protected void LoadEvaluateUserData()
        {
            string name=(string)Session["username"];
            string e = "";
            //获取全部名单
            List<Evaluator> evaluators=new List<Evaluator>();
            if (!EvaluatorBLL.Select(name, 1, ref evaluators, ref e)||e!=""||evaluators.Count<=0)
            {
                ClientScript.RegisterStartupScript(this.GetType(), "error", "f_alert('error','获取数据失败，请重试');", true);
                return;
            }
            //去掉已经考评
            List<EvaluatorTable> et=new List<EvaluatorTable>();
            for (int i = 0; i < evaluators.Count; i++)
            {
                if (EvaluatorTableBLL.Select(evaluators[i].EvaluatedID, evaluators[i].UiID, ref et, ref e))
                {
                    evaluators.RemoveAt(i);
                }
            }
            var jser = new JavaScriptSerializer();
            var json = jser.Serialize(evaluators);
            json = "{\"Rows\":" + json + ",\"Total\":" + evaluators.Count + "}";
            JsonData.Value = json;
            ScriptManager.RegisterStartupScript(BFinishEvaluate,this.GetType(), "fun", "ShowAllEavluateUsers();", true);
        }

        //获取岗位责任书和考核表数据
        protected void BGetEvaluateData_Click(object sender, EventArgs e)
        {
            //获得考评者所在部门
            string id=JsonData2.Value;
            string evaluatedId=JsonData.Value;

            if (id == null || id == "" || evaluatedId == null || evaluatedId == "")
            {
                ScriptManager.RegisterStartupScript(BGetEvaluateData, this.GetType(), "error", "f_alert('error','获取数据失败，请重试');", true);
                return;
            }

            List<UserInfo> ui = new List<UserInfo>();
            string message = "";
            if (!UserInfoBLL.Select(ref ui, id, ref message) || message != "" || ui.Count <= 0)
            {
                ScriptManager.RegisterStartupScript(BGetEvaluateData, this.GetType(), "error", "f_alert('error','获取数据失败，请重试');", true);
                return;
            }
            string dep = ui[0].UiDepartment;

            List<AssessTable> at = new List<AssessTable>();
            string sql="select * from tb_AssessTable where atDep='"+dep+"';";
            if (!AssessTableBLL.Select(sql,ref at, ref message) || message != "" || at.Count <= 0)
            {
                ScriptManager.RegisterStartupScript(BGetEvaluateData, this.GetType(), "error", "f_alert('error','获取数据失败，请重试');", true);
                return;
            }
            string sql2 = "select * from tb_StanderLib";
            List<StanderLib> sl = StanderLibBLL.Select(sql2, ref message);
            if (sl == null || sl.Count <= 0 || message != "")
            {
                ScriptManager.RegisterStartupScript(BGetEvaluateData, this.GetType(), "error", "f_alert('error','获取数据失败，请重试');", true);
                return;
            }

            var jser = new JavaScriptSerializer();
            var json = jser.Serialize(at);
            var json2 = jser.Serialize(sl);
            JsonData.Value = json;
            JsonData2.Value = json2;
            ScriptManager.RegisterStartupScript(BGetEvaluateData, this.GetType(), "fun", "StartEvaluate();", true);
        }

        //提交考评
        protected void BFinishEvaluate_Click(object sender, EventArgs e)
        {
            string data = JsonData.Value;
            if (data == null || data == "")
            {
                ScriptManager.RegisterStartupScript(BFinishEvaluate, this.GetType(), "error", "f_alert('error','提交失败，请重试');", true);
                return;
            }
            EvaluatorTable[] et= JSON.ScriptDeserialize<EvaluatorTable[]>(data);  //将Json字符串转换为对象
            if (et.Length==0)
            {
                ScriptManager.RegisterStartupScript(BFinishEvaluate, this.GetType(), "error", "f_alert('error','提交失败，请重试!');", true);
                return;
            }
            et[0].EtEvaluationID = EvaluationID;
            string message="";
            if (!EvaluatorTableBLL.SubmitEvaluateResult(et[0]))
            {
                ScriptManager.RegisterStartupScript(BFinishEvaluate, this.GetType(), "error", "f_alert('error','提交失败，请重试!');", true);
                return;
            }
            else
            {
                //提交成功
                LoadEvaluateUserData();
            }
        }
    }
}