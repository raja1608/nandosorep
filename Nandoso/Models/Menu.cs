using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Nandoso.Models
{
    public class menu
    {

        public int MenuId {get; set;}

        public string Name {get; set;}

        public string Description{get; set;}

        public float Price{ get; set; }

        public char Variation_Small{get; set;}

        public char Variation_Regular{get; set;}

        public char Variation_Large{get; set; }

        public int IsTodaySpecial{ get; set; }

        public char IsDiscountAvailable { get; set; }

        public int DiscountPercenage{ get; set; }
    }
}