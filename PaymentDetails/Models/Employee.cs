using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;

namespace PaymentDetails.Models
{
    [JsonObject(NamingStrategyType = typeof(CamelCaseNamingStrategy))]

    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string ContactPreference { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int Department { get; set; }
        public bool IsActive { get; set; }
        public string PhotoPath { get; set; }
    }
}
