import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EmployeeService {

  private readonly rootURL = "http://localhost:50619/api/employee/";

  constructor(private httpClient: HttpClient) {
  }


  private listEmployees: Employee[];


  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.rootURL + "getemployees");
  }

  //constructor() { }
  save(employee: Employee) {
    this.listEmployees.push(employee);
  }
  getEmployee(id: number): Employee {
    return this.listEmployees.find(e => e.id === id);
  }

}
