using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
///UserType 的摘要说明
/// </summary>
namespace Model
{
    public class UserType
    {
        string utID;
        string utType;

        public string UtID
        {
            get { return utID; }
            set { utID = value; }
        }

        public string UtType
        {
            get { return utType; }
            set { utType = value; }
        }
    }
}