import { Component, OnInit } from '@angular/core';
import { Employee } from '../../microservice-use/Model/employee.model';
import { ApiserviceService } from '../../microservice-use/apiservice.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponentMS implements OnInit {

  employee: Employee;
  departments: any;
  employeeIdfromQueryString: number = 0;

  constructor(private gatewayService: ApiserviceService, private _router: Router, private _route: ActivatedRoute) {

    this.employeeIdfromQueryString = Number(this._route.snapshot.paramMap.get('employeeId'));

    if (this.employeeIdfromQueryString === 0)
      this.resetEmployee();
    else
      this.getEmployee(this.employeeIdfromQueryString);

    this.getDepartments();
  }

  ngOnInit() {
  }


  resetEmployee() {
    this.gatewayService.employee = {
      Id: 0,
      Name: "",
      City: "",
      Email: "",
      DepartmentId: "-1"
    }
  }
  getEmployee(id: number): void {
    this.gatewayService.getEmployee(id).
      subscribe(result => {
        this.gatewayService.employee = result as Employee;
      });
  }
  getDepartments(): void {
    this.gatewayService.getDepartments().
      subscribe(result => {
        this.departments = result;
      });
  }

  saveEmployee(): void {
    debugger;
    if (this.employeeIdfromQueryString === 0) {
      this.save();
    }
    else {
      this.update(this.employeeIdfromQueryString);
    }   
  }

  save(): void {
    this.gatewayService.saveEmployee().
      subscribe(result => {
        this.resetEmployee();
        this._router.navigate(['microservice']);
      },
        err => {
          console.log(err);
        }
      );
  }

  update(id: number): void {
    this.gatewayService.updateEmployee().
      subscribe(result => {
        this.resetEmployee();
        this._router.navigate(['microservice']);
      },
        err => {
          console.log(err);
        }
      );
  }
}
