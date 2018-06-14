import { Component, OnInit } from '@angular/core';
import {LoginModel} from '../model/LoginModel';
import {NgForm} from '@angular/forms';
import {AccountService} from '../service/account.service';
// import {AppUserMethodResult} from '../model/AppUserMethodResult';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // loginForm: LoginModel[];
  // private retVal: AppUserMethodResult;
  constructor(private accService: AccountService) { }

  ngOnInit() {
  }

  onSubmit(value: LoginModel, form: NgForm) {
    this.accService.loginUser(value);
  }
}
