import { Component, OnInit } from '@angular/core';
import {AccountService} from '../service/account.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  user: any;
  constructor(private accountService: AccountService)
  {
    this.getAccountDetails();
  }

  ngOnInit() {
  }

  getAccountDetails() {
    const username = localStorage.getItem('username');
    this.accountService.getAccountDetails(username);
    this.user = this.accountService.user;
  }
}
