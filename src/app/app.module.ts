///<reference path="register/register.component.ts"/>
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AccountService} from './service/account.service';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { RacserviceComponent } from './racservice/racservice.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';

const AppRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'services',
    component: RacserviceComponent
  },
  {
    path: 'services/:Id',
    component: ServiceDetailComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RacserviceComponent,
    ServiceDetailComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule
  ],
  providers: [AccountService, RacserviceComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
