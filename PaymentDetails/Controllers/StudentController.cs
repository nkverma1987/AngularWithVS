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
            var countries = new List<Country>();
            try
            {
                var country = new Country(_configuration);
                countries = country.GetCountries();
            }
            catch (System.Exception ex)
            {
                Log.LodInfo(_configuration, ex.Message, "GetCountries");
            }
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
            try
            {
                _studentRepository.Save(student);
                return Json("ok");
            }
            catch (System.Exception ex)
            {
                Log.LodInfo(_configuration, ex.Message, JsonConvert.SerializeObject(student));
                return Json(ex.Message);
            }
        }
        [HttpPut("EditStudent")]
        public IActionResult EditStudent(int id, [FromBody] Student student)
        {
            _studentRepository.Edit(student, id);
            return Json("ok");
        }

        [HttpDelete("DeleteStudent")]
        public IActionResult DeleteStudent(int id)
        {
            _studentRepository.Delete(id);
            var students = _studentRepository.GetStudents();
            return Json(students);
        }

        [HttpGet("GetStudents")]
        public IActionResult GetStudents()
        {
            var students = _studentRepository.GetStudents();
            return Json(students);
        }
        [HttpGet("GetStudent")]
        public IActionResult GetStudent(int id)
        {
            var student = _studentRepository.GetStudent(id);
            return Json(student);
        }
    }
}