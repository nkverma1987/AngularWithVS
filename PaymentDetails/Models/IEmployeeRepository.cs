using System.Collections.Generic;

namespace PaymentDetails.Models
{
    public interface IEmployeeRepository
    {
        List<Employee> GetEmployees();
    }
}
