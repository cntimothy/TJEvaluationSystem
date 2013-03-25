using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Model
{
    public class EvaluationHistory
    {
        int ehID;
        bool ehStatus;
        DateTime ehStartDate;
        DateTime ehEndTime;

        public int EhID
        {
            get { return ehID; }
            set { ehID = value; }
        }
        public bool EhStatus
        {
            get { return ehStatus; }
            set { ehStatus = value; }
        }
        public DateTime EhStartDate
        {
            get { return ehStartDate; }
            set { ehStartDate = value; }
        }
        public DateTime EhEndDate
        {
            get { return ehEndTime; }
            set { ehEndTime = value; }
        }
    }
}