import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PaymentDetailService {
  formData: PaymentDetail;
  readonly rootURL = 'http://localhost:50619/api/'
  list: PaymentDetail[];

  constructor(private http: HttpClient) { }

  postPayment() {
    return this.http.post(this.rootURL + '/PaymentDetail', this.formData);
  }
  putPayment() {
    return this.http.put(this.rootURL + '/PaymentDetail/' + this.formData.PMId, this.formData);
  }

  refreshList() {
    this.http.get(this.rootURL + '/PaymentDetail')
      .toPromise()
      .then(
        res => this.list = res as PaymentDetail[]);
  }
}
