import { Component, OnInit } from '@angular/core';
import { ApigatewayCountryService } from '../../../microservice-use/country/apigateway-country.service';
import { Country } from '../../Model/country.model';

@Component({
  selector: 'app-ms-country',
  templateUrl: './ms-country.component.html',
  styleUrls: ['./ms-country.component.css']
})
export class MsCountryComponent implements OnInit {

  constructor(private apiGatewayService: ApigatewayCountryService) { }

  ngOnInit() {
    this.getCountries();
    this.resetCountry();
  }
  reset(): void {
    this.getCountries();
    this.resetCountry();
  }
  saveCountry(): void {
    if (this.apiGatewayService.country.Id === 0) {
      this.save();
    }
    else {
      this.update();
    }  
  }
  save(): void {
    this.apiGatewayService.saveCountry().
      subscribe(result => {
        this.getCountries();
        this.resetCountry();
      },
        err => {
          console.log(err);
        }
      );
  }
  update(): void {
    this.apiGatewayService.updateCountry().
      subscribe(result => {
        this.getCountries();
        this.resetCountry();
      },
        err => {
          console.log(err);
        }
      );
  }
  delete(id: number): void {
    this.apiGatewayService.deleteCountry(id).
      subscribe(result => {
        this.getCountries();
        this.resetCountry();
      },
        err => {
          console.log(err);
        }
      );
  }
  deleteCountry(id: number): void {
    let del = confirm("Are you sure you want to delete this record?");
    if (del == true) {
      this.delete(id);
      alert("record deleted")
    } else {
      alert("Record Not Deleted")
    }

  }

  getCountries(): void {
    this.apiGatewayService.getCountries().
      subscribe(result => {
        this.apiGatewayService.counries = result as Country[];
      });
  }
  getCountry(id: number) {
    this.apiGatewayService.getCountry(id).
      subscribe(result => {
        this.apiGatewayService.country = result as Country;
      });
  }

  resetCountry() {
    this.apiGatewayService.country = {
      Id: 0,
      Name: ""
    }
  }
}
