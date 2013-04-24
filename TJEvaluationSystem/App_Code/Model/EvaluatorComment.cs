using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Model
{
    public class EvaluatorComment
    {
        string ecEvaluatedID;
        string ecComment;

        public string EcComment
        {
            get { return ecComment; }
            set { ecComment = value; }
        }

        public string EcEvaluatedID
        {
            get { return ecEvaluatedID; }
            set { ecEvaluatedID = value; }
        }
    }
}