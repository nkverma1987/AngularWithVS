import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student.model';

@Injectable()
export class StudentsService {
  student: Student;

  readonly rootURL = 'http://localhost:90/'

  constructor(private http: HttpClient) { }

  saveStudent() {
    return this.http.post(this.rootURL + "save", this.student);// url from iis hosting
  }
}
