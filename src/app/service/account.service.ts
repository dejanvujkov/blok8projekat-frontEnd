import {Injectable} from '@angular/core';
import {HttpClient, HttpHandler, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginModel} from '../model/LoginModel';
import {RegisterModel} from '../model/RegisterModel';
import {Global} from '../global';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private client: HttpClient, private global: Global) {
  }

  loginUser(user: LoginModel) {
    let header = new HttpHeaders();
    header = header.append('Content-type', 'application/x-www-form-urlencoded');

    if (!localStorage.jwt) {
      const retVal = this.client.post(this.global.address + 'oauth/token', 'username=' + user.username + '&password=' + user.password + '&grant_type=password', {'headers': header}) as Observable<any>;
      retVal.subscribe(
        result => {
          const jwt = result.access_token;
          const jwtData = jwt.split('.')[1];
          const decodedJwtJson = window.atob(jwtData);
          const decodedJwt = JSON.parse(decodedJwtJson);
          const role = decodedJwt.role;
          const username = decodedJwt.nameid;
          localStorage.setItem('jwt', jwt);
          localStorage.setItem('role', role);
          localStorage.setItem('username', username);
          this.getAccountDetails(username);
          return decodedJwt;
        },
        error1 => {
          alert('The username or password is incorrect');
        }
      );
    }
  }

  registerUser(user: RegisterModel) {
    let header = new HttpHeaders();
    header = header.append('Content-type', 'application/json');
    const retval = this.client.post(this.global.address + 'api/Account/Register', user) as Observable<any>;

    retval.subscribe(
      result => {
        alert('Whoho! Registration complete, go ahead and login!');
        return result;
      },
      err => {
        alert('Error during reservation. Please check if all fields are filled correctly');
        return err;
      }
    );
  }

  getAccountDetails(username: string) {
    const retVal = this.client.get(this.global.address + 'user/getUserDetails?username=' + username) as Observable<any>;
    retVal.subscribe(
      result => {
        this.global.user = result;
        //alert(this.global.user);
      },
      err => {
        alert('Error getting user');
      }
    );
  }

  Logout(user) {
    let header = new HttpHeaders();
    header = header.append('Content-type', 'application/json');
    // TODO sta se ovde prosledjuje kao parametar?
    const retVal = this.client.post(this.global.address + 'api/Account/Logout', user);
    retVal.subscribe(
      result => {
        return result;
      },
      err => {
        alert('Error during logging out');
      }
    );
  }
}
