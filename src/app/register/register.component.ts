import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import {AccountService} from '../service/account.service';
import {RegisterModel} from '../model/RegisterModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AccountService]
})
export class RegisterComponent implements OnInit {
  registerForm: RegisterModel[];
  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

  onSubmitRegistration(value: RegisterModel, form: NgForm) {
    this.accountService.registerUser(value);
  }

}
