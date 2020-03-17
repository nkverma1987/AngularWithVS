using Microsoft.Extensions.Configuration;
using System;

namespace PaymentDetails.Database_Access
{
    public class DatabaseHelper : IDisposable
    {
        public DatabaseHelper(IConfiguration configuration)
        {
            var dbConnection = configuration.GetSection("ConnectionStrings");
            ConnectionString = dbConnection.GetValue<string>("AngularDbConnection");
        }

        public string ConnectionString { get; set; }

        public void Dispose()
        {
            ConnectionString = null;
        }
    }
}
