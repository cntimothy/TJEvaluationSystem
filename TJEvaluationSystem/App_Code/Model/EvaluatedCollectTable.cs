using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
///EvaluatedCollectTable 的摘要说明
/// </summary>
namespace Model
{
    public class EvaluatedCollectTable
    {
        int ectID;
        string ectUserID;
        double ectScore;
        double ectResult;
        int ectEvaluatorNum;
        string ectPs;

        public int EctID
        {
            get { return ectID; }
            set { ectID = value; }
        }

        public string EctUserID
        {
            get { return ectUserID; }
            set { ectUserID = value; }
        }

        public double EctScore
        {
            get { return ectScore; }
            set { ectScore = value; }
        }

        public double EctResult
        {
            get { return ectResult; }
            set { ectResult = value; }
        }

        public int EctEvaluatorNum
        {
            get { return ectEvaluatorNum; }
            set { ectEvaluatorNum = value; }
        }

        public string EctPs
        {
            get { return ectPs; }
            set { ectPs = value; }
        }
    }
}