using Microsoft.AspNetCore.Mvc;

namespace ChainImpactAPI.Controllers
{
    public class AuthenticationController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
