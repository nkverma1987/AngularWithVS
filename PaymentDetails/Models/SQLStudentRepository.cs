using Microsoft.Extensions.Configuration;
using PaymentDetails.Database_Access;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace PaymentDetails.Models
{
    public class SQLStudentRepository : IStudentRepository
    {
        private IConfiguration configuration;

        public SQLStudentRepository(IConfiguration _configuration)
        {
            configuration = _configuration;

        }

        public List<Student> GetStudents()
        {
            var students = new List<Student>();
            using (DatabaseHelper dbHelper = new DatabaseHelper(configuration))
            {
                using (SqlConnection con = new SqlConnection(dbHelper.ConnectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = con.CreateCommand())
                    {
                        cmd.CommandText = "USP_Student_CRUD";
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@p_OpMode", SqlDbType.VarChar).Value = "SELECT";
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                students.Add(new Student
                                {
                                    City = Convert.ToString(reader["City"]),
                                    Class = Convert.ToString(reader["Class"]),
                                    Name = Convert.ToString(reader["Name"]),
                                    Email = Convert.ToString(reader["Email"]),
                                    Phone = Convert.ToString(reader["Phone"]),
                                    QualifiedId = Convert.ToString(reader["Student Id"]),
                                    Country = Convert.ToString(reader["Country Name"]),
                                    Department = Convert.ToString(reader["Department"]),
                                    State = Convert.ToString(reader["State"])
                                });
                            }
                        }
                    }
                    con.Close();
                }
            }
            return students;
        }

        public void Save(Student student)
        {
            using (DatabaseHelper dbHelper = new DatabaseHelper(configuration))
            {
                using (SqlConnection con = new SqlConnection(dbHelper.ConnectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = con.CreateCommand())
                    {
                        cmd.CommandText = "USP_Student_CRUD";
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@p_OpMode", SqlDbType.VarChar).Value = "SAVE";
                        cmd.Parameters.Add("@p_Name", SqlDbType.VarChar).Value = student.Name;
                        cmd.Parameters.Add("@p_Email", SqlDbType.VarChar).Value = student.Email;
                        cmd.Parameters.Add("@p_Class", SqlDbType.VarChar).Value = student.Class;
                        cmd.Parameters.Add("@p_Phone", SqlDbType.VarChar).Value = student.Phone;
                        cmd.Parameters.Add("@p_Country", SqlDbType.Int).Value = student.Country;
                        cmd.Parameters.Add("@p_DeptID", SqlDbType.VarChar).Value = student.Department;
                        cmd.Parameters.Add("@p_StateID", SqlDbType.VarChar).Value = student.State;
                        cmd.Parameters.Add("@p_City", SqlDbType.VarChar).Value = student.City;
                        cmd.ExecuteNonQuery();
                    }
                }
            }
        }
    }
}
