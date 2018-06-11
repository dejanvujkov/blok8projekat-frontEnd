import { Component, OnInit } from '@angular/core';
import {LoginModel} from '../model/LoginModel';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: LoginModel[]
  constructor() { }

  ngOnInit() {
  }

  OnSubmit(value: LoginModel, form: NgForm ){

    form.reset();
  }
}
