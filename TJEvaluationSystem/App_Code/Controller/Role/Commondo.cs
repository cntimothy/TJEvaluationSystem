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
    public static string login(string ID, string password, string level, ref string exception)
    {
        if (level.Substring(0, 5) == "10000" || level.Substring(0, 5) == "01000" || level.Substring(0, 5) == "00100")
        {
            List<Manager> model = new List<Manager>();
            if (ManagerBLL.Select(ID, ref model, ref exception))
            {
                string mPassword = model.ElementAt(0).MPassword.Trim();
                string mType = model.ElementAt(0).MType;
                if (password.Equals(password))
                {
                    return mType;
                }
                else
                {
                    exception = "密码错误！";
                    return "-1";
                }
            }
            return "-1";
        }
        else if (level.Substring(0, 5) == "00010")
        {
            List<User> model = new List<User>();
            if (UserBLL.Select(ID, ref model, ref exception))
            {
                string uPassword = model.ElementAt(0).UPassword;
                string uType = model.ElementAt(0).UType;
                password = password.Trim();
                if (password.Equals(uPassword))
                {
                    return uType;
                }
                else
                {
                    exception = "密码错误！";
                    return "-1";
                }
            }
            return "-1";
        }
        else return "-1";
    }


    //退出，返回退出是否成功
    public bool logout(string uID)
    {
        return true;
    }
}