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
        int etEvaluationID;
        string etRelation;
        float etKey;
        float etResponse;
        float etAbility;
        float etAttitude;
        float etVeto;
        float etSum;

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

        public int EtEvaluationID
        {
            get { return etEvaluationID; }
            set { etEvaluationID = value; }
        }

        public string EtRelation
        {
            get { return etRelation; }
            set { etRelation = value; }
        }

        public float EtKey
        {
            get { return etKey; }
            set { etKey = value; }
        }

        public float EtResponse
        {
            get { return etResponse; }
            set { etResponse = value; }
        }

        public float EtAbility
        {
            get { return etAbility; }
            set { etAbility = value; }
        }

        public float EtAttitude
        {
            get { return etAttitude; }
            set { etAttitude = value; }
        }

        public float EtVeto
        {
            get { return etVeto; }
            set { etVeto = value; }
        }

        public float EtSum
        {
            get { return etSum; }
            set { etSum = value; }
        }

    }
}