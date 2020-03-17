using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using PaymentDetails.Models;
using System.Collections.Generic;

namespace PaymentDetails.Controllers
{
    [Route("api/Student")]
    public class StudentController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IStudentRepository _studentRepository;
        public StudentController(IConfiguration configuration, IStudentRepository studentRepository)
        {
            this._configuration = configuration;
            this._studentRepository = studentRepository;
        }
        [HttpGet("GetCountries")]
        public List<Country> GetCountries()
        {
            Country country = new Country(_configuration);
            var countries = country.GetCountries();
            return countries;
        }
        [HttpGet("GetStatesByCountry")]
        public IActionResult GetStatesByCountry(int countryId)
        {
            State state = new State(_configuration);
            return Json(state.GetStatesByCountry(countryId));
        }
        [HttpGet("GetDepartments")]
        public IActionResult GetDepartments()
        {
            Department department = new Department(_configuration);
            return Json(department.GetDepartments());
        }
        [HttpPost("SaveStudent")]
        public IActionResult SaveStudent([FromBody] Student student)
        {
            _studentRepository.Save(student);
            return Json("ok");
        }

        [HttpGet("GetStudents")]
        public IActionResult GetStudents()
        {
            var students = _studentRepository.GetStudents();
            return Json(students);
        }
    }
}