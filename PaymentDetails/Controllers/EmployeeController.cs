using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using PaymentDetails.Models;
using System.Collections.Generic;

namespace PaymentDetails.Controllers
{
    [Route("api/Employee")]
    public class EmployeeController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IEmployeeRepository _employeeRepository;
        public EmployeeController(IConfiguration configuration, IEmployeeRepository employeeRepository)
        {
            this._configuration = configuration;
            this._employeeRepository = employeeRepository;
        }

        [HttpGet("GetEmployees")]
        public IActionResult GetEmployees()
        {
            var employees = _employeeRepository.GetEmployees();
            return Json(employees);

        }

        [HttpGet("GetTest")]
        public IActionResult GetTest()
        {
            List<TestJson> l = new List<TestJson>();
            l.Add(new TestJson
            {
                ErrorType = "Driver",
                ErrorMesage = new List<string>()
                {
                    "invalid license number format","missing required parameter","driver not found"
                }
            });
            l.Add(new TestJson
            {
                ErrorType = "AccountOrServer",
                ErrorMesage = new List<string>()
                {
                    "MAINFRAME UNAVAILABLE DUE TO SCHEDULED MAINTENANCE","invalid username or password"
                }
            });
            TestJson obj = new TestJson
            {
                ErrorType = "Driver",
                ErrorMesage = new List<string>()
                {
                    "invalid license number format","missing required parameter","driver not found"
                }
            };
            string json = JsonConvert.SerializeObject(l);

            //string str = "[{'ErrorType':'Driver','ErrorMesage':['invalid license number format',"missing required parameter","driver not found"]}";
            var jsonString = JsonConvert.DeserializeObject<List<TestJson>>(json);
            return Json(l);
        }
    }
    public class TestJson
    {
        public string ErrorType { get; set; }
        public IList<string> ErrorMesage { get; set; }
    }
}