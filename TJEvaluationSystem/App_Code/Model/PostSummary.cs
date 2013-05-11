using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Model
{
    public class Summary
    {
        string department;
        int passed;

        public string Department
        {
            get { return department; }
            set { department = value; }
        }

        public int Passed
        {
            get { return passed; }
            set { passed = value; }
        }
    }
}