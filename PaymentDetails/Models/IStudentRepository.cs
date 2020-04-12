using System.Collections.Generic;

namespace PaymentDetails.Models
{
    public interface IStudentRepository
    {
        void Save(Student student);
        List<Student> GetStudents();
        Student GetStudent(int id);
        void Edit(Student student,int id);
        void Delete(int id);
    }
}
