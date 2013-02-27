using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BLL;
using Model;

namespace TJEvaluationSystem.Pages.MessagePages
{
    public partial class New : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Send_Click(object sender, EventArgs e)
        {
            string exception = "";
            string mSenderID = (string)Session["username"];
            string mMessage = Message.Text;
            int mRead = 0;
            DateTime mSendTime = DateTime.Now;
            string mTitle = Title.Text;
            List<Message> msgList = new List<Message>();
            if (Receive.Text == "0")
            {
                
                List<string> names = new List<string>();
                ManagerBLL.SelectMID(ref names, 2, ref exception);
                foreach (string mReceiveID in names)
                {
                    Message msg = new Message();
                    msg.MSenderID = mSenderID;
                    msg.MReceiveID = mReceiveID;
                    msg.MMessage = mMessage;
                    msg.MRead = mRead;
                    msg.MSendTime = mSendTime;
                    msg.MTitle = mTitle;
                    msgList.Add(msg);
                }
            }
            else
            {
                string mReceiveID = Receive.Text;
                Message msg = new Message();
                msg.MSenderID = mSenderID;
                msg.MReceiveID = mReceiveID;
                msg.MMessage = mMessage;
                msg.MRead = mRead;
                msg.MSendTime = mSendTime;
                msg.MTitle = mTitle;
                msgList.Add(msg);                
            }
            if (MessageBLL.Insert(msgList, ref exception))
            {
                Response.Write("<script>alert('发送成功！')</script>");
            }
            else
            {
                Response.Write("<script>alert('发送失败！')</script>");
            }
        }

        protected void Cancel_Click(object sender, EventArgs e)
        {
            Response.Redirect("New.aspx");
        }
    }
}