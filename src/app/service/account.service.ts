import {Injectable} from '@angular/core';
import {HttpClient, HttpHandler, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginModel} from '../model/LoginModel';
import {RegisterModel} from '../model/RegisterModel';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private client: HttpClient) {
  }

  loginUser(user: LoginModel) {
    let header = new HttpHeaders();
    header = header.append('Content-type', 'application/x-www-form-urlencoded');

    if (!localStorage.jwt) {
      const retVal = this.client.post('http://localhost:51680/oauth/token', 'username=' + user.username + '&password=' + user.password + '&grant_type=password', {'headers': header}) as Observable<any>;
      retVal.subscribe(
        result => {
          const jwt = result.access_token;
          const jwtData = jwt.split('.')[1];
          const decodedJwtJson = window.atob(jwtData);
          const decodedJwt = JSON.parse(decodedJwtJson);
          const role = decodedJwt.role;

          localStorage.setItem('jwt', jwt);
          localStorage.setItem('role', role);

          //console.log('token: ' + jwt);
          //console.log('role: ' + role);

          return decodedJwt;
        },
        error1 => {
          console.log('Error occurend in login');
        }
      );
    }
  }

  registerUser(user: RegisterModel) {
    alert(user.Username + ' ' + user.Password);
    let header = new HttpHeaders();
    header = header.append('Content-type', 'application/json');
    const retval = this.client.post('http://localhost:51680/api/Account/Register', user) as Observable<any>;

    retval.subscribe(
      result => {
        return result;
      },
      err => {
        console.log('error occured in registration');
        return err;
      }
    );
  }
}
