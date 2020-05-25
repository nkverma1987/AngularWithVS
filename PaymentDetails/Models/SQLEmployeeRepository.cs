using Microsoft.Extensions.Configuration;
using PaymentDetails.Database_Access;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace PaymentDetails.Models
{
    public class SQLEmployeeRepository : IEmployeeRepository
    {
        private IConfiguration configuration;

        public SQLEmployeeRepository(IConfiguration _configuration)
        {
            configuration = _configuration;

        }
        public List<Employee> GetEmployees()
        {
            var employees = new List<Employee>();
            using (DatabaseHelper dbHelper = new DatabaseHelper(configuration))
            {
                using (SqlConnection con = new SqlConnection(dbHelper.ConnectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = con.CreateCommand())
                    {
                        cmd.CommandText = "SELECT * FROM EMPLOYEES";
                        cmd.CommandType = CommandType.Text;
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                employees.Add(new Employee
                                {
                                    Id = Convert.ToInt32(reader["Id"]),
                                    Name = Convert.ToString(reader["Name"]),
                                    Email = Convert.ToString(reader["Email"]),
                                    Gender = Convert.ToString(reader["Gender"]),
                                    PhoneNumber = Convert.ToString(reader["PhoneNumber"])
                                });
                            }
                        }
                    }
                    con.Close();
                }
            }
            return employees;
        }
    }
}
