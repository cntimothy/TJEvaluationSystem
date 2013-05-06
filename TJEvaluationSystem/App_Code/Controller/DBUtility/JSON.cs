using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Text;
using System.Data;
using System.Web.Script.Serialization;
using System.Reflection;
using System.Runtime.Serialization.Json;
using System.Runtime.Serialization;
using Model;

namespace DBUtility
{
    public class JSON
    {
        public static string DataTableToJson(DataTable dt)
        {

            string json = "";
            //Exception Handling           
            if (dt != null && dt.Rows.Count > 0)
            {
                json += "{ \"Rows\":[";
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    json += "{";
                    for (int j = 0; j < dt.Columns.Count; j++)
                    {
                        if (j < dt.Columns.Count - 1)
                        {
                            json += "\"" + dt.Columns[j].ColumnName.ToString() + "\":" + "\"" + dt.Rows[i][j].ToString() + "\",";
                        }
                        else if (j == dt.Columns.Count - 1)
                        {
                            json += "\"" + dt.Columns[j].ColumnName.ToString() + "\":" + "\"" + dt.Rows[i][j].ToString() + "\"";
                        }
                    }
                    /**/
                    /*end Of String*/
                    if (i == dt.Rows.Count - 1)
                    {
                        json += "} ";
                    }
                    else
                    {
                        json += "}, ";
                    }
                }
                json += "],\"Total\":" + "\"" + dt.Rows.Count.ToString() + "\"" + "}";
                return json;
            }
            else
            {
                return null;
            }
        }

        public static string ObjectToJson(object obj)
        {
            DataContractJsonSerializer serializer = new DataContractJsonSerializer(obj.GetType());
            MemoryStream stream = new MemoryStream();
            serializer.WriteObject(stream, obj);
            byte[] dataBytes = new byte[stream.Length];
            stream.Position = 0;
            stream.Read(dataBytes, 0, (int)stream.Length);
            return Encoding.UTF8.GetString(dataBytes);
        }

        public static string ObjectListToJson(List<Object> objects)
        {
            StringBuilder JsonString = new StringBuilder();
            return JsonString.ToString();
        }

        public static string ScriptSerialize<T>(T t)
        {

            JavaScriptSerializer js = new JavaScriptSerializer();

            return js.Serialize(t);

        }



        public static T ScriptDeserialize<T>(string strJson)
        {

            JavaScriptSerializer js = new JavaScriptSerializer();

            return js.Deserialize<T>(strJson);

        }

        public static void dataTableToCsv(DataTable table, string file)
        {
            string title = "";

            FileStream fs = new FileStream(file, FileMode.Create);
            //FileStream fs1 = File.Open(file, FileMode.Open, FileAccess.Read);
            StreamWriter sw = new StreamWriter(new BufferedStream(fs), System.Text.Encoding.Default);

            for (int i = 0; i < table.Columns.Count; i++)
            {
                title += table.Columns[i].ColumnName + "\t"; //栏位：自动跳到下一单元格
            }

            title = title.Substring(0, title.Length - 1) + "\n";
            sw.Write(title);
            foreach (DataRow row in table.Rows)
            {
                string line = "";
                for (int i = 0; i < table.Columns.Count; i++)
                {
                    line += row[i]+ "\t"; //内容：自动跳到下一单元格
                }

                line = line.Substring(0, line.Length - 1) + "\n";
                sw.Write(line);
            }
            sw.Close();
            fs.Close();
        }


        //Json字符串转List<UserInfo>
        public static  List<UserInfo> isEfect(string json)
        {
            MemoryStream stream2 = new MemoryStream();
            DataContractJsonSerializer ser2 = new DataContractJsonSerializer(typeof(List<UserInfo>));
            StreamWriter wr = new StreamWriter(stream2);
            wr.Write(json);
            wr.Flush();
            stream2.Position = 0;
            Object obj = ser2.ReadObject(stream2);
            List<UserInfo> list = (List<UserInfo>)obj;
            return list;
        }

        //Json字符串转List<EvaluatorInfo>
        public static List<EvaluatorInfo> isEfect1(string json)
        {
            MemoryStream stream2 = new MemoryStream();
            DataContractJsonSerializer ser2 = new DataContractJsonSerializer(typeof(List<EvaluatorInfo>));
            StreamWriter wr = new StreamWriter(stream2);
            wr.Write(json);
            wr.Flush();
            stream2.Position = 0;
            Object obj = ser2.ReadObject(stream2);
            List<EvaluatorInfo> list = (List<EvaluatorInfo>)obj;
            return list;
        }

        
        

    }

    public static class Kuozhan
    {
        public static DataTable ListToDataTable<T>(this IEnumerable<T> list)
        {
            //创建属性的集合

            List<PropertyInfo> pList = new List<PropertyInfo>();

            //获得反射的入口

            Type type = typeof(T);

            DataTable dt = new DataTable();

            //把所有的public属性加入到集合 并添加DataTable的列

            Array.ForEach<PropertyInfo>(type.GetProperties(), p => { pList.Add(p); dt.Columns.Add(p.Name, p.PropertyType); });

            foreach (var item in list)
            {

                //创建一个DataRow实例

                DataRow row = dt.NewRow();

                //给row 赋值
                foreach (var p in pList)
                {
                    row[p.Name] = p.GetValue(item, null);
                }
                //pList.ForEach(p => row[p.Name] = p.GetValue(item, null));

                //加入到DataTable

                dt.Rows.Add(row);

            }

            return dt;

        }  
    }
}