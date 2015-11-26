using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Nandoso.DAL;
using System.Web.SessionState;
using Nandoso.Models;

namespace Nandoso.Controllers
{
    public class HomeController : Controller
    {
        NandosoDBContext context = new NandosoDBContext();
        List<Feedback> objTemp_original, messages_Constructed;
        int order= 0;
        bool flag = false;

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Menu()
        {
            ViewBag.Message = "Menu page.";
            List<menu> lstMenu = context.Menus.ToList();
            List<menu> lstFilteredMenu = new List<menu>();
            foreach (menu tmpMenu in lstMenu)
            {
                if (tmpMenu.IsTodaySpecial.CompareTo(0) == 0)
                    lstFilteredMenu.Add(tmpMenu);
            }
            return View(lstFilteredMenu);
        }

        public ActionResult Feedback()
        {
            ViewBag.Message = "Customer feedback page.";

            
            objTemp_original = messages_Constructed = new List<Models.Feedback>();

            objTemp_original = context.messages.ToList();
            System.Web.HttpContext.Current.Session["MessageList"] = objTemp_original;
            messages_Constructed = objTemp_original.FindAll(msg => msg.ParentId.Equals("0"));

            foreach (Feedback tmp in messages_Constructed)
            {
                order = 0;
                flag = false;
                tmp.messageReplies = AddMessageReplies(tmp, order);
            }

            return View(messages_Constructed);
        }

        public List<Feedback> AddMessageReplies(Feedback msg, int order)
        {
            msg.messageReplies = objTemp_original.FindAll(obj => obj.ParentId.Equals(msg.Id));
            if (flag) --order;
            msg.order = order;

            foreach (Feedback tmp in msg.messageReplies)
            {
                AddMessageReplies(tmp, ++order);
            }
            flag = true;

            return msg.messageReplies;
        }

        //public void SaveReply(string messageText, string parentId, string Name)
        //{
        //    objTemp_original = (List<Feedback>)System.Web.HttpContext.Current.Session["MessageList"];
        //    int newId = Convert.ToInt32(objTemp_original.OrderByDescending(o => o.Id).ToList()[0].Id);

        //    Feedback newComment = new Feedback();
        //    newComment.Id = Convert.ToString(++newId);
        //    newComment.MessageText = messageText;
        //    newComment.ParentId = parentId;
        //    newComment.Name = Name;

        //    context.messages.Add(newComment);
        //    context.SaveChanges();

        //}

        public void SaveReply(string messageText, string parentId, string Name)
        {
            Feedback newComment = new Feedback();
            newComment.Id = DateTime.Now.ToString("ddMMyyyyhhmmss");
            newComment.MessageText = messageText;
            newComment.ParentId = parentId;
            newComment.Name = Name;

            context.messages.Add(newComment);
            context.SaveChanges();

        }

        public ActionResult Chat()
        {
            return View();
        }

        public ActionResult SpecialPage()
        {
            
            string val = (string)System.Web.HttpContext.Current.Session["UserLoginDetails"];
            if (String.IsNullOrEmpty(val))
            {
                //System.Web.HttpContext.Current.Session["UserLoginDetails"] = "Exists";
                ViewBag.LoginExists = false;
            }
            else
            {
                ViewBag.LoginExists = true;
            }

            List<menu> lstMenu = context.Menus.ToList();
            List<menu> lstFilteredMenu = new List<menu>();
            foreach (menu tmpMenu in lstMenu)
            {
                if (tmpMenu.IsTodaySpecial.CompareTo(0) != 0)
                    lstFilteredMenu.Add(tmpMenu);
            }
            return View(lstFilteredMenu);
           
        }

        [HttpPost]
        public void SetLoginDetails(string dealerID)
        {
            System.Web.HttpContext.Current.Session["UserLoginDetails"] = "Exists";
        }
    }
}