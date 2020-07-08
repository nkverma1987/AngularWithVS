import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country, State } from '../../microservice-use/Model/country.model';

@Injectable()
export class ApigatewayCountryService {

  country: Country;
  counries: Country[];

  state: State;
  states: State[];

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


  getStatesByCountry(countryId: number) {
    return this.http.get(this.rootURL + "country/" + countryId);// url from iis hosting
  }

  saveState() {
    return this.http.post(this.rootURL + "save/state", this.state);// url from iis hosting
  }
  getStates() {
    return this.http.get(this.rootURL + "states");// url from iis hosting
  }
  getState(id: number) {
    return this.http.get(this.rootURL + "state/" + id);// url from iis hosting
  }
  
  updateState() {
    return this.http.put(this.rootURL + "update/state", this.state);// url from iis hosting
  }
  deleteState(id: number) {
    return this.http.delete(this.rootURL + "delete/state/" + id);// url from iis hosting 
  }

  //deleteState(id: number) {
  //  return this.http.delete("http://localhost:53157/api/state/deletestate?id=" + id);// url from iis hosting 
  //}
}
