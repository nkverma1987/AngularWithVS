import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../microservice-use/Model/employee.model';
import { Student } from '../models/student.model';


@Injectable()
export class ApiserviceService {

  employee: Employee;

  readonly rootURL = 'http://localhost:90/'

  constructor(private http: HttpClient) { }


  //microservice example

  getEmployees() {
    return this.http.get(this.rootURL + "employeelist");// url from iis hosting
  }
  getEmployee(id: number) {
    return this.http.get(this.rootURL + "employee/" + id);// url from iis hosting
  }

  getDepartments() {
    return this.http.get(this.rootURL + "departments");// url from iis hosting
  }
  saveEmployee() {
    return this.http.post(this.rootURL + "save", this.employee);// url from iis hosting
  }
  updateEmployee() {
    return this.http.put(this.rootURL + "update", this.employee);// url from iis hosting
  }
  
  //updateEmployee() {
  //  return this.http.put("http://localhost:53157/api/employee/UpdateEmployee", this.employee);
  //}

  deleteEmployee(id: number) {
    return this.http.delete(this.rootURL + "employee/delete/" + id);// url from iis hosting
  }

  //deleteEmployee(id: number) {
  //  return this.http.delete("http://localhost:53157/api/employee/DeleteEmployee?id=" + id);
  //}
  //saveEmployee() {
  //  return this.http.post("http://localhost:53157/api/employee/SaveEmployee", this.employee);
  //}

  
}
