using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
///message 的摘要说明
/// </summary>
namespace Model
{
    public class Message
    {
        int mID;
        string mSenderID;
        string mReceiveID;
        string mMessage;
        int mRead;
        DateTime mSendTime;

        public DateTime MSendTime
        {
            get { return mSendTime; }
            set { mSendTime = value; }
        }

        public int MID
        {
            get { return mID; }
            set { mID = value; }
        }

        public string MSenderID
        {
            get { return mSenderID; }
            set { mSenderID = value; }
        }

        public string MReceiveID
        {
            get { return mReceiveID; }
            set { mReceiveID = value; }
        }

        public string MMessage
        {
            get { return mMessage; }
            set { mMessage = value; }
        }

        public int MRead
        {
            get { return mRead; }
            set { mRead = value; }
        }
    }
}