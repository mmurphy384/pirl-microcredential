﻿using System;
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

        public ActionResult AgencyDashboard()
        {
            return View();
        }

        public ActionResult UserRegister()
        {
            return View();
        }

        public ActionResult UserDashboard()
        {
            return View();
        }

        public ActionResult UserSubmission()
        {
            return View();
        }

        public ActionResult UserSubmissionFiles()
        {
            return View();
        }

        public ActionResult UserDashboardMock()
        {
            return View();
        }

        public ActionResult AgencyPicker()
        {
            return View("AgencyPicker");
        }

        public ActionResult CredentialPicker()
        {
            return View("CredentialPicker");
        }

    }
}
