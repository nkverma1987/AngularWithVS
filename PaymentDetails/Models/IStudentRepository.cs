using System.Collections.Generic;

namespace PaymentDetails.Models
{
    public interface IStudentRepository
    {
        void Save(Student student);
        List<Student> GetStudents();
    }
}
