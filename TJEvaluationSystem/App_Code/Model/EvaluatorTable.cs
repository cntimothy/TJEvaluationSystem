using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
///EvaluatorTable 的摘要说明
/// </summary>
namespace Model
{
    public class EvaluatorTable
    {
        string etEvaluatedID;
        string etEvaluateID;
        int etAssessTableID;
        double etWeight;
        int etKey;
        int etResponse;
        int etAbility;
        int etAttitude;
        int etVeto;
        double etSum;

        public string EtEvaluatedID
        {
            get { return etEvaluatedID; }
            set { etEvaluatedID = value; }
        }

        public string EtEvaluateID
        {
            get { return etEvaluateID; }
            set { etEvaluateID = value; }
        }

        public int EtAssessTableID
        {
            get { return etAssessTableID; }
            set { etAssessTableID = value; }
        }

        public double EtWeight
        {
            get { return etWeight; }
            set { etWeight = value; }
        }

        public int EtKey
        {
            get { return etKey; }
            set { etKey = value; }
        }

        public int EtResponse
        {
            get { return etResponse; }
            set { etResponse = value; }
        }

        public int EtAbility
        {
            get { return etAbility; }
            set { etAbility = value; }
        }

        public int EtAttitude
        {
            get { return etAttitude; }
            set { etAttitude = value; }
        }

        public int EtVeto
        {
            get { return etVeto; }
            set { etVeto = value; }
        }

        public double EtSum
        {
            get { return etSum; }
            set { etSum = value; }
        }

    }
}