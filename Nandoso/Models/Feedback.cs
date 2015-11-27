using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Nandoso.Models
{
    public class Feedback
    {
        public string Id { get; set; }

        public string MessageText { get; set; }

        public string ParentId { get; set; }

        public string Name { get; set; }

        [NotMapped]
        public List<Feedback> messageReplies { get; set; }

        [NotMapped]
        public int order { get; set; }

    }
}