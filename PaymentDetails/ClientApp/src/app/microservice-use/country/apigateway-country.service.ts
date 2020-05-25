import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../../microservice-use/Model/country.model';

@Injectable()
export class ApigatewayCountryService {

  country: Country;
  counries: Country[];

  readonly rootURL = 'http://localhost:90/'

  constructor(private http: HttpClient) { }

  //microservice example

  getCountries() {
    return this.http.get(this.rootURL + "countries");// url from iis hosting
  }
  getCountry(id: number) {
    return this.http.get(this.rootURL + "country/" + id);// url from iis hosting
  }

  saveCountry() {
    return this.http.post(this.rootURL + "save/country", this.country);// url from iis hosting
  }
  updateCountry() {
    return this.http.put(this.rootURL + "update/country", this.country);// url from iis hosting
  }
  deleteCountry(id: number) {
    return this.http.delete(this.rootURL + "delete/country/" + id);// url from iis hosting
  }
}
