﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
///Evaluator 的摘要说明
/// </summary>
namespace Model
{
    public class Evaluator
    {
        string uiID;
        string evaluatedID;
        string relation;
        int status; //考核状态 ；0未考核，1已考核；
       
        int pass;

        public string UiID
        {
            get { return uiID; }
            set { uiID = value; }
        }

        public string EvaluatedID
        {
            get { return evaluatedID; }
            set { evaluatedID = value; }
        }

        public string Relation
        {
            get { return relation; }
            set { relation = value; }
        }

        public int Pass
        {
            get { return pass; }
            set { pass = value; }
        }

        public int Status
        {
            get { return status; }
            set { status = value; }
        }
    }
}