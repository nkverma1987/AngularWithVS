import { Component, OnInit } from '@angular/core';
import { StudentServiceService } from '../shared/student-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-createstudent',
  templateUrl: './createstudent.component.html',
  styleUrls: ['./createstudent.component.css']
})
export class CreatestudentComponent implements OnInit {
  htmlVariable: any;
  childbame: string;

  countries: any;
  states: any;
  departments: any;

  constructor(private studentService: StudentServiceService,
    private _router: Router) {

  }

  ngOnInit() {
    this.htmlVariable = false;
    this.childbame = "lst";
    this.getCountries();
    this.getDepartments();
    this.initialiseStudent();

    console.log(this.studentService.student);
  }

  getCountries() {
    this.countries = this.studentService.getCountries().
      subscribe(res => {
        this.countries = res;
      });
  }

  getDepartments() {
    this.departments = this.studentService.getDepartments().
      subscribe(res => {
        this.departments = res;
      });
  }

  onChangeCountry(ev) {
    console.log(ev.target.value);
    this.states = this.studentService.getStates(ev.target.value).
      subscribe(res => {
        this.states = res;
      });
  }
  initialiseStudent(): void {
    this.studentService.student = {
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
  }
  saveStudent(): void {
    this.studentService.saveStudent().subscribe(
      res => {
        this.initialiseStudent();       
      },
      err => {
        console.log(err);
      }
    );
    this._router.navigate(['StudentList']);
  }
}
