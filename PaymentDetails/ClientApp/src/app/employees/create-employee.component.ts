import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/department.model';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  @ViewChild('employeeForm') public createEmployeeForm: NgForm;

  previewPhoto = false;

  employee: Employee = {
    id: null,
    name: null,
    gender: null,
    contactPreference: null,
    phoneNumber: null,
    email: '',
    dateOfBirth: null,
    department: "-1",
    isActive: null,
    photoPath: null

  };


  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' }
  ];
  constructor(private _employeeService: EmployeeService,
    private _router: Router) {

  }

  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }


  ngOnInit() {
  }
  // 2 ways to reset form in ts file first as passing form template variable a s below
  //saveEmployee(empForm: NgForm): void { 
  //  this._employeeService.save(this.employee);
  //  empForm.reset();
  //  this._router.navigate(['list']);
  //}
  // second method
  saveEmployee(): void {
    const newEmployee: Employee = Object.assign({}, this.employee);
    this._employeeService.save(newEmployee);
    this.createEmployeeForm.resetForm();
    this._router.navigate(['list']);
  }
}
