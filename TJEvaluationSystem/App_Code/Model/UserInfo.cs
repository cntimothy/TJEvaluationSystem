using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
///UserInfo 的摘要说明
/// </summary>
namespace Model
{
    public class UserInfo
    {
        string uiID;
        string uiName;
        string uiSex;
        string uiIdentityNum;
        string uiDepartment;
        string uiTelephone;
        string uiEmail;
        string uiMobPhone;
        string uiAddress;
        string uiZipCode;
        string uiType;

        public string UiType
        {
            get { return uiType; }
            set { uiType = value; }
        }
        public string UiID
        {
            get { return uiID; }
            set { uiID = value; }
        }

        public string UiName
        {
            get { return uiName; }
            set { uiName = value; }
        }

        public string UiSex
        {
            get { return uiSex; }
            set { uiSex = value; }
        }

        public string UiIdentityNum
        {
            get { return uiIdentityNum; }
            set { uiIdentityNum = value; }
        }

        public string UiDepartment
        {
            get { return uiDepartment; }
            set { uiDepartment = value; }
        }

        public string UiTelephone
        {
            get { return uiTelephone; }
            set { uiTelephone = value; }
        }

        public string UiEmail
        {
            get { return uiEmail; }
            set { uiEmail = value; }
        }

        public string UiMobPhone
        {
            get { return uiMobPhone; }
            set { uiMobPhone = value; }
        }

        public string UiAddress
        {
            get { return uiAddress; }
            set { uiAddress = value; }
        }

        public string UiZipCode
        {
            get { return uiZipCode; }
            set { uiZipCode = value; }
        }
    }
}