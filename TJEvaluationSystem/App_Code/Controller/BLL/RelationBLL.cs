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
            if (type==true)
            {
                //
                switch (r)
                {
                    case "领导":
                        return 65;
                        break;
                    case "同事":
                        return 15;
                        break;
                    case "客户":
                        return 20;
                        break;
                    default:
                        return 0;
                        break;
                }

            }
            else
            {
                switch (r)
                {
                    case "领导":
                        return 60;
                        break;
                    case "同事":
                        return 10;
                        break;
                    case "客户":
                        return 25;
                        break;
                    case "下属":
                        return 15;
                        break;
                    default:
                        return 0;
                        break;
                }
            }
        }
    }
}