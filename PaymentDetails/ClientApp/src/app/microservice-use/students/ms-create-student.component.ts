import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../microservice-use/apiservice.service';
import { StudentsService } from '../../microservice-use/students.service';
import { ApigatewayCountryService } from '../../microservice-use/country/apigateway-country.service';
import { Country } from '../Model/country.model';

@Component({
  selector: 'app-ms-create-student',
  templateUrl: './ms-create-student.component.html',
  styleUrls: ['./ms-create-student.component.css']
})
export class MsCreateStudentComponent implements OnInit {

  countries: any;
  states: any;
  departments: any;
  private selectedStudentId: number = 0;


  constructor(private gatewayService: ApiserviceService,
    private countrygatewayservice: ApigatewayCountryService,
    private studentgatewayService: StudentsService) { }
  ngOnInit() {
    this.getCountries();
    this.getDepartments();
    this.initialiseStudent();
  }
  initialiseStudent(): void {
    //if (this.selectedStudentId === 0) {
    this.studentgatewayService.student = {
      City: '',
      Class: '',
      Country: "-1",
      Department: '-1',
      Email: "",
      Id: 0,
      Name: "",
      Phone: "",
      QualifiedId: "",
      State: '-1'
    }
    //}
    //else {
    //  this.getStudent();
    //  this.getStates(Number(this.studentService.student.Country));
    //}
  }

  getCountries() {
    this.countries = this.countrygatewayservice.getCountries().
      subscribe(res => {
        this.countries = res as Country[];
      });
  }

  getStates(countryId: number): void {
    this.states = this.countrygatewayservice.getStatesByCountry(countryId).
      subscribe(res => {
        this.states = res;
      });
  }

  getDepartments() {
    this.departments = this.gatewayService.getDepartments().
      subscribe(res => {
        this.departments = res;
      });
  }
}
