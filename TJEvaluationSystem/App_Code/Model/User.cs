using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
///User 的摘要说明
/// </summary>
namespace Model
{
    public class User
    {
        string uID;
        string uPassword;
        string uType;

        public string UID
        {
            get { return uID; }
            set { uID = value; }
        }

        public string UPassword
        {
            get { return uPassword; }
            set { uPassword = value; }
        }

        public string UType
        {
            get { return uType; }
            set { uType = value; }
        }
    }
}