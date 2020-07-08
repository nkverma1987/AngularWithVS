import { Component, OnInit } from '@angular/core';
import { ApigatewayCountryService } from '../../microservice-use/country/apigateway-country.service';
import { Country, State } from '../Model/country.model';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-ms-create-state',
  templateUrl: './ms-create-state.component.html',
  styleUrls: ['./ms-create-state.component.css']
})
export class MsCreateStateComponent implements OnInit {

  private selectedStateId: number = 0;


  constructor(private apiGatewayService: ApigatewayCountryService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.selectedStateId = Number(this._route.snapshot.paramMap.get('stateId'));
    this.reset();
  }

  reset(): void {
    this.getCountries();
    this.resetState();
  }

  getCountries(): void {
    this.apiGatewayService.getCountries().
      subscribe(result => {
        this.apiGatewayService.counries = result as Country[];
      });
  }

  
  resetState() {
    debugger;
    if (this.selectedStateId == 0) {
      this.apiGatewayService.state = {
        Id: 0,
        Name: "",
        CountryId: -1
      }
    }
    else
      this.getState(this.selectedStateId);
  }

  getState(id: number) {
    this.apiGatewayService.getState(id).
      subscribe(result => {
        this.apiGatewayService.state = result as State;
      });
  }
  saveState(): void {
    debugger;
    if (this.apiGatewayService.state.Id === 0) {
      this.save();
    }
    else {
      this.update();
    }
  }
  save(): void {
    this.apiGatewayService.saveState().
      subscribe(result => {
        this.resetState();
        this._router.navigate(['liststatems']);
      },
        err => {
          console.log(err);
        }
      );
  }
  update(): void {
    this.apiGatewayService.updateState().
      subscribe(result => {
        this.resetState();
        this._router.navigate(['liststatems']);
      },
        err => {
          console.log(err);
        }
      );
  }
}
