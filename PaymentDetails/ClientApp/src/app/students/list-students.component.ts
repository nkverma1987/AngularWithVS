import { Component, OnInit, Input } from '@angular/core';
import { StudentServiceService } from '../shared/student-service.service';
import { Student } from '../models/student.model';
import {
  MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule
} from "angular-material";



@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {
  @Input() childName: string;
  students: Student[];

  private getRowNodeId;
  rowDataClicked1 = {};

  columnDefs = [
    { headerName: 'Student Code', field: 'QualifiedId', sortable: true, filter: true },
    { headerName: 'Name', field: 'Name', sortable: true, filter: true },
    { headerName: 'Department', field: 'Department', sortable: true, filter: true },
    { headerName: 'Email', field: 'Email', sortable: true, filter: true },
    { headerName: 'Class', field: 'Class', sortable: true, filter: true },
    { headerName: 'Phone', field: 'Phone', sortable: true, filter: true },
    { headerName: 'City', field: 'City', sortable: true, filter: true },
    { headerName: 'Country', field: 'Country', sortable: true, filter: true },
    { headerName: 'State', field: 'State', sortable: true, filter: true }
  ];


  constructor(private studentService: StudentServiceService) {

  }

  ngOnInit() {
    this.getStudents();
    console.log(this.students);
  }
  getStudents(): void {
    this.studentService.getStudents()
      .toPromise()
      .then(
        res => this.students = res as Student[]
      );
  }
}
