using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Pirl.MicroCredentials.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AgencyRegister()
        {
            return View();
        }

        public ActionResult UserRegister()
        {
            return View();
        }
    }
}
