using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using DBUtility;
using Model;
using System.Text;
using BLL;
/// <summary>
///User 的摘要说明
/// </summary>
public class Commondo
{
    public  Commondo()
    {
        //DBHelper.init();
    }

    //登陆 查询User表，验证登陆用户类型
    //-1---登陆失败，0---超级管理员，1---一级管理员，2---二级管理员，3---考评者
    public static string login(string uID, string uPassword)
    {
        List<User> model = new List<User>();
        string exception = "";
        if (UserBLL.Select(uID, ref model, ref exception))
        {
            string password = model.ElementAt(0).UPassword;
            string type = model.ElementAt(0).UType;
            password = password.Trim();
            if (password.Equals(uPassword))
            {
                return type;
            }
            else return "-1";
        }
        else return "-1";
    }


    //退出，返回退出是否成功
    public bool logout(string uID)
    {
        return true;
    }
}