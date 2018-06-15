import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AccountService} from './service/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {

  constructor(private acc: AccountService) {
  }
  title = 'app';

  userLoggedIn() {
    return localStorage.jwt;
  }

  isLoggedUserAdmin() {
    return localStorage.role === 'Admin';
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    this.acc.user = null;
    this.acc.Logout();
  }
}
