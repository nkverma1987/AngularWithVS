using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace PaymentDetails.Models
{
    public class Country
    {
        public int Id { get; set; }
        public string Name { get; set; }

        private string connectionString;
        public Country(IConfiguration configuration)
        {
            var dbConnection = configuration.GetSection("ConnectionStrings");
            connectionString = dbConnection.GetValue<string>("AngularDbConnection");
        }
        public Country() { }
        public List<Country> GetCountries()
        {
            var countries = new List<Country>();
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                using (SqlCommand cmd = con.CreateCommand())
                {
                    cmd.CommandText = "SELECT ID,Name FROM Country";
                    cmd.CommandType = CommandType.Text;
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Country country = new Country
                            {
                                Id = Convert.ToInt32(reader["ID"]),
                                Name = Convert.ToString(reader["Name"])
                            };
                            countries.Add(country);
                        }
                    }

                }
            }
            return countries;
        }
    }
}
