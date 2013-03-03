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
        string mType;

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

        public string MType
        {
            get { return mType; }
            set { mType = value; }
        }
    }
}