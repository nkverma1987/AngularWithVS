using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PaymentDetails.Models
{
    public class NitishContext:DbContext
    {
        public NitishContext(DbContextOptions options):base (options)
        {

        }
        public DbSet<PaymentDetail> PaymentDetails { get; set; }
    }
}
