//import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {
  //private _employeeId: number;
  //@Input()
  //set employeeId(val: number) {
  //  console.log('employee id changed from ' + this._employeeId + ' to' + val);
  //  this._employeeId = val;
  //}
  //get employeeId(): number { return this._employeeId; }

  //private _employee: Employee;
  //@Input()
  //set employee(val: Employee) {
  //  this._employee = val;
  //}
  //get employee(): Employee {
  //  return this._employee;
  //}

  @Input()
  employee: Employee;

  constructor() { }

  ngOnInit() {
  }
  getNameAndGender(): string {
    return this.employee.name + ' ' + this.employee.gender;
  }
}
