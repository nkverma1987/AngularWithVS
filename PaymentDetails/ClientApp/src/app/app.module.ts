import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule,Routes } from '@angular/router';

//for date picker control
//import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { PaymentDetailComponent } from './payment-details/payment-detail/payment-detail.component';
import { PaymentDetailListComponent } from './payment-details/payment-detail-list/payment-detail-list.component';
import { PaymentDetailService } from './shared/payment-detail-service';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee.component';


import { SelectRequiredValidatorDirective } from './shared/selectrequiredvalidator.directive';
import { ConfirmEqualValidatorDirective } from './shared/confirmequalvalidatordirective ';

//service
import { EmployeeService } from './employees/employee.service';
import { DisplayEmployeeComponent } from './employees/display-employee.component';

//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { ToastrModule } from 'ngx-toastr';

//import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

//route guard
import { CreateEmployeeCanDeactivateGuardService } from './employees/create-employee-can-deactivate-gaurd.service';

import { EmployeeDetailsComponent } from './employees/employee-details.component';
import { CreatestudentComponent } from './students/createstudent.component';
import { ListStudentsComponent } from './students/list-students.component';

import { StudentServiceService } from './shared/student-service.service';

import { AgGridModule } from 'ag-grid-angular';




const appRoutes: Routes = [
  { path: 'list', component: ListEmployeesComponent },

  //{ path: 'create', component: CreateEmployeeComponent }, //earlier without route guard

  { path: 'create', component: CreateEmployeeComponent, canDeactivate: [CreateEmployeeCanDeactivateGuardService] },
  { path: 'employees/:id', component: EmployeeDetailsComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'paymentDetail', component: PaymentDetailsComponent },
  { path: 'createStudent', component: CreatestudentComponent },
  { path: 'StudentList', component: ListStudentsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    PaymentDetailsComponent,
    PaymentDetailComponent,
    PaymentDetailListComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    SelectRequiredValidatorDirective,
    ConfirmEqualValidatorDirective,
    DisplayEmployeeComponent,
    EmployeeDetailsComponent,
    CreatestudentComponent,
    ListStudentsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
   // BrowserAnimationsModule, ToastrModule.forRoot(),
    //RouterModule.forRoot([
    //  { path: '', component: HomeComponent, pathMatch: 'full' },
    //  { path: 'counter', component: CounterComponent },
    //  { path: 'fetch-data', component: FetchDataComponent },
    //])
    RouterModule.forRoot(appRoutes)
    //BsDatepickerModule.forRoot()
    , AgGridModule.withComponents([])
  ],
  providers: [PaymentDetailService, EmployeeService, CreateEmployeeCanDeactivateGuardService, StudentServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
