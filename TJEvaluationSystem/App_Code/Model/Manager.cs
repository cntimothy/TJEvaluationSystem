using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
///User 的摘要说明
/// </summary>
namespace Model
{
    public class Manager
    {
        string mID;
        string mPassword;
        int mType;

        public string MID
        {
            get { return mID; }
            set { mID = value; }
        }

        public string MPassword
        {
            get { return mPassword; }
            set { mPassword = value; }
        }

        public int MType
        {
            get { return mType; }
            set { mType = value; }
        }
    }
}