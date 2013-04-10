using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using DBUtility;
using Model;
using System.Text;
/// <summary>
///RelationBLL 的摘要说明
/// </summary>
namespace BLL
{
    public class RelationBLL
    {
        //Get weight by relation between evaluator and evaluated. 
        static public int GetWeightByRelation(string r, bool type)
        {
            if (r=="")
            {
                return 0;
            }
            int returnvalue = 0;
            if (type==true)
            {
                //
                switch (r)
                {
                    case "领导":
                        returnvalue = 65;
                        break;
                    case "同事":
                        returnvalue = 15;
                        break;
                    case "客户":
                        returnvalue = 20;
                        break;
                    default:
                        //
                        break;
                }
            }
            else
            {
                switch (r)
                {
                    case "领导":
                        returnvalue = 60;
                        break;
                    case "同事":
                        returnvalue = 10;
                        break;
                    case "客户":
                        returnvalue = 25;
                        break;
                    case "下属":
                        returnvalue = 15;
                        break;
                    default:
                        //
                        break;
                }
            }
            return returnvalue;
        }
    }
}