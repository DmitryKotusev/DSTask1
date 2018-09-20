using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DSD.Models
{
    public class ToEditItem
    {
        public string oldId { set; get; }
        public string playerid { set; get; }
        public object jersey { set; get; }
        public string fname { set; get; }
        public string sname { set; get; }
        public string position { set; get; }
        public object birthday { set; get; }
        public object weight { set; get; }
        public object height { set; get; }
        public string birthcity { set; get; }
        public string birthstate { set; get; }
    }
}
