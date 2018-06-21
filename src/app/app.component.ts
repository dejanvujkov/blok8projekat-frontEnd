import { Component } from '@angular/core';
import {AccountService} from './service/account.service';
import {Global} from "../app/global";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {

  constructor(private acc: AccountService, private global : Global) {
    let username = localStorage.getItem('username');
    if(username){
      global.user = acc.getAccountDetails(username);
    }
  }
  title = 'app';

  userLoggedIn() {
    return localStorage.jwt;
  }

  isLoggedUserAdmin() {
    return localStorage.role === 'Admin';
  }
  isLoggedUserManager() {
    return localStorage.role === 'Manager';
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    this.acc.Logout(this.global.user);
    this.global.user = null;
  }
}
