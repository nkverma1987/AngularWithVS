using Microsoft.Extensions.Configuration;
using PaymentDetails.Database_Access;
using System.Data;
using System.Data.SqlClient;

namespace PaymentDetails.Models
{
    public class Log
    {
       
        public static void LodInfo(IConfiguration configuration,string message,string source)
        {
            using (var dbHelper = new DatabaseHelper(configuration))
            {
                using (var con = new SqlConnection(dbHelper.ConnectionString))
                {
                    con.Open();
                    using (var cmd = con.CreateCommand())
                    {
                        cmd.CommandText = "usp_Log";
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@p_ErrorMessage", SqlDbType.VarChar).Value = message;
                        cmd.Parameters.Add("@p_Source", SqlDbType.VarChar).Value = source;                     
                        cmd.ExecuteNonQuery();
                    }
                }
            }
        }
    }
}
