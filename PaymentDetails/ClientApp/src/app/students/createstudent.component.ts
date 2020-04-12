import { Component, OnInit } from '@angular/core';
import { StudentServiceService } from '../shared/student-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from '../models/student.model';


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

  private selectedStudentId: number = 0;

  constructor(private studentService: StudentServiceService,
    private _router: Router, private _route: ActivatedRoute) {

  }

  ngOnInit() {
    this.htmlVariable = false;
    this.childbame = "lst";
    this.getCountries();
    this.getDepartments();
    this.selectedStudentId = Number(this._route.snapshot.paramMap.get('studentId'));

    this.initialiseStudent();


    console.log(this.selectedStudentId);
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
    this.getStates(ev.target.value);
  }

  getStates(countryId: number): void {
    this.states = this.studentService.getStates(countryId).
      subscribe(res => {
        this.states = res;
      });
  }

  initialiseStudent(): void {
    if (this.selectedStudentId === 0) {
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
    else {
      this.getStudent();
      this.getStates(Number(this.studentService.student.Country));
    }
  }

  createStudent(): void {
    if (this.selectedStudentId === 0) {
      this.saveStudent();
    }
    else {
      this.updateStudent();
    }
    this._router.navigate(['StudentList']);
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
  }

  updateStudent(): void {
    this.studentService.editStudent().subscribe(
      res => {
        this.initialiseStudent();
      },
      err => {
        console.log(err);
      }
    );
  }

  getStudent(): void {
    this.studentService.getStudent(this.selectedStudentId)
      .toPromise()
      .then(
        res => this.studentService.student = res as Student
      )
  }
}
