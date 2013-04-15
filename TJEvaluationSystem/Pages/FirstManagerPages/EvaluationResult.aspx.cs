using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BLL;
using Model;
using DBUtility;
using System.Data;
using System.IO;

namespace TJEvaluationSystem.Pages.FirstManagerPages
{
    public partial class EvaluationResult : System.Web.UI.Page
    {
        private string exception = "";
        private string fname = "";
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected DataTable searchSql()
        {
            exception = "";
            string department = Department.SelectedValue;
            List<UserInfo> userinfo = new List<UserInfo>();
            string type = "____1%";
            if (department == "0")
            {
                UserInfoBLL.SelectByType(type, ref userinfo, ref exception);
            }
            else
            {
                UserInfoBLL.Select(department, type, ref userinfo, ref exception);
            }

            DataTable table = new DataTable();
            table = userinfo.ListToDataTable();
            return table;
        }
        protected void BGetEvaluatedList_Click(object sender, EventArgs e)
        {
            DataTable table = new DataTable();
            table = searchSql();
            if (table.Rows.Count <= 0)
            {
                ScriptManager.RegisterStartupScript(BGetEvaluatedList,this.GetType(), "", "alert('该部门不存在被考评者')", true);
                return;
            }
            string json = JSON.DataTableToJson(table);
            JsonData.Value = json;

            ScriptManager.RegisterStartupScript(BGetEvaluatedList, this.GetType(), "", "load_userinfo()", true);
            return;

        }

        //获取详细考评结果
        protected void BGetDetailResult_Click(object sender, EventArgs e)
        {
            string evaluatedID = JsonData.Value;
            if (evaluatedID == null || evaluatedID == "")
                return;
            List<EvaluatorTable> ets = new List<EvaluatorTable>();
            if (!EvaluatorTableBLL.Select(evaluatedID, ref ets, ref exception))
            {
                ScriptManager.RegisterStartupScript(BGetDetailResult, this.GetType(), "", "alert('获取数据失败，请重试！')", true);
                return;
            }
            
            //生成Json结构字符串
            string json = "{ \"Rows\":[";
            for (int i = 0; i < ets.Count; i++)
            {
                string id = ets[i].EtEvaluateID;
                //获取考评人信息
                List<UserInfo> uis = new List<UserInfo>();
                if (!UserInfoBLL.Select(ref uis, id, ref exception) || uis.Count==0)
                {
                    ScriptManager.RegisterStartupScript(BGetDetailResult, this.GetType(), "", "alert('获取数据失败，请重试！')", true);
                    return;
                }
                //考评者基本信息
                json += "{";
                json += "\"UiID\":" + "\"" + uis[0].UiID + "\",";
                json += "\"UiName\":" + "\"" + uis[0].UiName + "\",";
                json += "\"UiSex\":" + "\"" + uis[0].UiSex + "\",";
                json += "\"UiIdentityNum\":" + "\"" + uis[0].UiIdentityNum + "\",";
                json += "\"UiDepartment\":" + "\"" + uis[0].UiDepartment + "\",";
                json += "\"UiTelephone\":" + "\"" + uis[0].UiTelephone + "\",";
                json += "\"UiMobPhone\":" + "\"" + uis[0].UiMobPhone + "\",";
                json += "\"UiAddress\":" + "\"" + uis[0].UiAddress + "\",";
                json += "\"UiEmail\":" + "\"" + uis[0].UiEmail + "\",";
                //考评结果
                json += "\"EtRelation\":" + "\"" + ets[i].EtRelation + "\",";
                json += "\"EtKey\":" + "\"" + ets[i].EtKey + "\",";
                json += "\"EtResponse\":" + "\"" + ets[i].EtResponse + "\",";
                json += "\"EtAbility\":" + "\"" + ets[i].EtAbility + "\",";
                json += "\"EtAttitude\":" + "\"" + ets[i].EtAttitude + "\",";
                json += "\"EtVeto\":" + "\"" + ets[i].EtVeto + "\",";
                json += "\"EtSum\":" + "\"" + ets[i].EtSum + "\"";

                if (i == ets.Count - 1)
                {
                    json += "} ";
                }
                else
                {
                    json += "}, ";
                }
            }
            json += "],\"Total\":" + "\"" + ets.Count + "\"" + "}";

            //显示结果
            JsonData.Value = json;
            ScriptManager.RegisterStartupScript(BGetDetailResult, this.GetType(), "", "ShowDetailResult();", true);
        }

        //获取综合结果
        protected void BGetResult_Click(object sender, EventArgs e)
        {
            string evaluatedID = JsonData.Value;
            if (evaluatedID == null || evaluatedID == "")
                return;
        }
    }
}