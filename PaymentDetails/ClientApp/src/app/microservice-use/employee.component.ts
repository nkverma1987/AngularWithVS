import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../microservice-use/apiservice.service';
import { Employee } from '../microservice-use/Model/employee.model';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[]

  //employees: any=[];

  constructor(private gatewayService: ApiserviceService) { }

  ngOnInit() {
    this.getEmployees();
  }
  getEmployees(): void {
    this.gatewayService.getEmployees().
      subscribe(result => {
        this.employees = result as Employee[];
      });
    console.log(this.employees);
  }

  deleteEmployee(id: number): void {
    this.gatewayService.deleteEmployee(id).
      subscribe(result => {
        this.getEmployees();
      },
        err => {
          console.log(err);
        }
      );
  }
}
