using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Model
{
    public class EvaluatorInfo
    {
        private string evID;
        private string evName;
        private string evSex;
        private string evDepartment;
        private string evMobPhone;
        private string evTelephone;
        private string evEmail;
        private string evAddress;
        private string evZipCode;
        private string evUnit;

        public string EvID
        {
            get { return evID; }
            set { evID = value; }
        }

        public string EvName
        {
            get { return evName; }
            set { evName = value; }
        }

        public string EvSex
        {
            get { return evSex; }
            set { evSex = value; }
        }

        public string EvDepartment
        {
            get { return evDepartment; }
            set { evDepartment = value; }
        }

        public string EvMobPhone
        {
            get { return evMobPhone; }
            set { evMobPhone = value; }
        }

        public string EvTelephone
        {
            get { return evTelephone; }
            set { evTelephone = value; }
        }

        public string EvEmail
        {
            get { return evEmail; }
            set { evEmail = value; }
        }

        public string EvAddress
        {
            get { return evAddress; }
            set { evAddress = value; }
        }

        public string EvZipCode
        {
            get { return evZipCode; }
            set { evZipCode = value; }
        }

        public string EvUnit
        {
            get { return evUnit; }
            set { evUnit = value; }
        }

        public bool Equals(EvaluatorInfo anotherEvaluatorInfo)
        {
            return this.EvID == anotherEvaluatorInfo.EvID
                && this.EvName == anotherEvaluatorInfo.EvName
                && this.EvSex == anotherEvaluatorInfo.EvSex
                && this.EvDepartment == anotherEvaluatorInfo.EvDepartment
                && this.EvMobPhone == anotherEvaluatorInfo.EvMobPhone
                && this.EvTelephone == anotherEvaluatorInfo.EvTelephone
                && this.EvEmail == anotherEvaluatorInfo.EvEmail
                && this.EvAddress == anotherEvaluatorInfo.EvAddress
                && this.EvZipCode == anotherEvaluatorInfo.EvZipCode;
        }
    }
}