import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student.model';

@Injectable()
export class StudentServiceService {
  readonly rootURL = 'http://localhost:50619/api/Student/'

  student: Student;
  students: Student[];

  constructor(private http: HttpClient) { }


  getCountries() {
    return this.http.get(this.rootURL + 'GetCountries');
  }
  getStates(countryId: Number) {
    return this.http.get(this.rootURL + 'GetStatesByCountry?countryId=' + countryId);
  }
  getDepartments() {
    return this.http.get(this.rootURL + 'GetDepartments');
  }

  saveStudent() {
    return this.http.post(this.rootURL + 'SaveStudent', this.student);
  }

  getStudents() {
    return this.http.get(this.rootURL + 'GetStudents');
  }
}
