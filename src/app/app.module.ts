///<reference path="register/register.component.ts"/>
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AccountService} from './service/account.service';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { RacserviceComponent } from './racservice/racservice.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { AdminComponent } from './admin/admin.component';
import { ReservationService } from './service/reservation.service';
import { UserPageComponent } from './user-page/user-page.component';
import {Global} from './global';
import {DomSanitizer} from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map/map.component';
import { ManagerComponent } from './manager/manager.component';
import { MyServicesComponent } from './my-services/my-services.component';
import { NewVehicleComponent } from './new-vehicle/new-vehicle.component';
import { NewOfficeComponent } from './new-office/new-office.component';
import { TokenInterceptor } from './interseptor/httpInterceptor.interceptor';

const AppRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'account',
    component: UserPageComponent
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
  },
  {
    path: 'adminPage',
    component: AdminComponent
  },
  {
    path: 'newService',
    component: ManagerComponent
  },
  {
    path: 'myServices',
    component: MyServicesComponent
  },
  {
    path: 'myServices/:id/newVehicle',
    component: NewVehicleComponent
  },
  {
    path: 'myServices/:id/newOffice',
    component: NewOfficeComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RacserviceComponent,
    ServiceDetailComponent,
    AdminComponent,
    UserPageComponent,
    MapComponent,
    ManagerComponent,
    MyServicesComponent,
    NewVehicleComponent,
    NewOfficeComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDnihJyw_34z5S1KZXp90pfTGAqhFszNJk'})
  ],
  providers: [
    ReservationService,
    AccountService,
    RacserviceComponent,
    Global,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
