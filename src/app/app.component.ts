import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {

  constructor() {
  }
  title = 'app';

  userLoggedIn() {
    return localStorage.jwt;
  }

  isLoggedUserAdmin() {
    return localStorage.role === 'Admin';
  }

  Logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
  }
}
