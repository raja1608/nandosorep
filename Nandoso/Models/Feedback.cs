using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Nandoso.Models
{
    public class Feedback
    {
        public string Name { get; set; }

        public string Comment { get; set; }

        public Feedback Reply { get; set; }
    }
}