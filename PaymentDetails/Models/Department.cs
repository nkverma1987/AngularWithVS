using Microsoft.Extensions.Configuration;
using PaymentDetails.Database_Access;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace PaymentDetails.Models
{
    public class Department
    {
        public int Id { get; set; }
        public string Name { get; set; }
        private IConfiguration configuration;

        public Department()
        {

        }

        public Department(IConfiguration _configuration)
        {
            configuration = _configuration;
        }

        public List<Department> GetDepartments()
        {
            var departments = new List<Department>();
            using (DatabaseHelper dbHelper = new DatabaseHelper(configuration))
            {
                using (SqlConnection con = new SqlConnection(dbHelper.ConnectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = con.CreateCommand())
                    {
                        cmd.CommandText = "SELECT ID,Name FROM Department ORDER BY NAME";
                        cmd.CommandType = CommandType.Text;
                        using (var reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                Department department = new Department
                                {
                                    Id = Convert.ToInt32(reader["ID"]),
                                    Name = Convert.ToString(reader["Name"])
                                };
                                departments.Add(department);
                            }
                        }

                    }
                }
            }
            return departments;
        }
    }
}
