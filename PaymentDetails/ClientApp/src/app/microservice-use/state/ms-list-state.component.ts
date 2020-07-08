import { Component, OnInit } from '@angular/core';
import { ApigatewayCountryService } from '../../microservice-use/country/apigateway-country.service';
import { State } from '../Model/country.model';

@Component({
  selector: 'app-ms-list-state',
  templateUrl: './ms-list-state.component.html',
  styleUrls: ['./ms-list-state.component.css']
})
export class MsListStateComponent implements OnInit {

  constructor(private apiGatewayService: ApigatewayCountryService) { }

  ngOnInit() {
    this.getStates();
  }

  getStates(): void {
    this.apiGatewayService.getStates().
      subscribe(result => {
        this.apiGatewayService.states = result as State[];
      });
  }

  //delete(id: number): void {
  //  this.apiGatewayService.deleteState(id).
  //    subscribe(result => {
  //      this.getStates();
  //    },
  //      err => {
  //        console.log(err);
  //      }
  //    );
  //}
  //deleteState(id: number): void {
  //  let del = confirm("Are you sure you want to delete this record?");
  //  if (del == true) {
  //    this.delete(id);
  //    alert("record deleted")
  //  } else {
  //    alert("Record Not Deleted")
  //  }

  //}
  deleteState(id: number): void {
    debugger;
    this.apiGatewayService.deleteState(id).                                                                                                                                                                                                                                                                                                             
      subscribe(result => {
        this.getStates();
      },                               
        err => {
          console.log(err);
        }                               
      );
  }
}
