using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace PaymentDetails.Models
{
    public class State
    {
        public int Id { get; set; }
        public string Name { get; set; }

        private string connectionString;
        public State(IConfiguration configuration)
        {
            var dbConnection = configuration.GetSection("ConnectionStrings");
            connectionString = dbConnection.GetValue<string>("AngularDbConnection");
        }
        public State() { }
        public List<State> GetStatesByCountry(int countryId)
        {
            var states = new List<State>();
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                using (SqlCommand cmd = con.CreateCommand())
                {
                    cmd.CommandText = "SELECT ID,Name FROM STATE WHERE CountryId=@cntryId;";
                    cmd.CommandType = CommandType.Text;
                    cmd.Parameters.Add("@cntryId", SqlDbType.Int).Value = countryId;
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            State state = new State
                            {
                                Id = Convert.ToInt32(reader["ID"]),
                                Name = Convert.ToString(reader["Name"])
                            };
                            states.Add(state);
                        }
                    }

                }
            }
            return states;
        }
    }
}
