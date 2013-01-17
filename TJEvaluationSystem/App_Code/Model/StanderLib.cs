using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
///StanderLib 的摘要说明
/// </summary>
namespace Model
{
    public class StanderLib
    {
        int slID;
        //string slLibType;
        string slType;
        string slName;
        string slContentA;
        string slContentB;
        string slContentC;
        string slContentD;

        public int SlID
        {
            get { return slID; }
            set { slID = value; }
        }
       /* public string SlLibType
        {
            get { return slLibType; }
            set { slLibType = value; }
        }*/
        public string SlType
        {
            get { return slType; }
            set { slType = value; }
        }
        public string SlName
        {
            get { return slName; }
            set { slName = value; }
        }

        public string SlContentA
        {
            get { return slContentA; }
            set { slContentA = value; }
        }

        public string SlContentB
        {
            get { return slContentB; }
            set { slContentB = value; }
        }

        public string SlContentC
        {
            get { return slContentC; }
            set { slContentC = value; }
        }

        public string SlContentD
        {
            get { return slContentD; }
            set { slContentD = value; }
        }
    }
}