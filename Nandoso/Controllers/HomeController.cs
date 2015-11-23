using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Nandoso.DAL;

namespace Nandoso.Controllers
{
    public class HomeController : Controller
    {
        NandosoDBContext context = new NandosoDBContext();

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

            return View(context.Menus.ToList());
        }

        public ActionResult Feedback()
        {
            ViewBag.Message = "Customer feedback page.";

            return View();
        }

        public ActionResult Chat()
        {
            return View();
        }
    }
}