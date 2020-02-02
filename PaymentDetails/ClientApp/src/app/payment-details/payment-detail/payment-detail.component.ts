import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from '../../shared/payment-detail-service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html'
  //styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent implements OnInit {
  months=['Jan','Feb','March','Apr','May'];
  constructor(private service: PaymentDetailService) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      PMId:0,
      CardNumber: '',
      CardOwnerName: '',
      CVV: '',
      ExpirationDate:''
    }
  }
  onSubmit(form: NgForm) {
    if (this.service.formData.PMId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }
  insertRecord(form: NgForm) {
    this.service.postPayment().subscribe(
      res => {
        this.resetForm(form);
      },
      err => {
        console.log(err);
      }
    );
  }
  updateRecord(form: NgForm) {
    this.service.putPayment().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }
  getMonth(month: string) {
    console.log(month);
  }
}
