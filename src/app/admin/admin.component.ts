import { Component, OnInit } from '@angular/core';
import {RACServiceService} from '../service/racservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  currentJustify = 'start';
  unapprovedServices;
  managersList;
  allUnapprovedUsersList;
  constructor(private racService: RACServiceService) {
    this.loadUnapprovedServices();
    this.loadManagers();
    this.loadAllUsers();
  }

  ngOnInit() {
  }

  loadUnapprovedServices() {
    const x = this.racService.getUnapprovedServices();
    x.subscribe(
      result => {
        this.unapprovedServices = result;
      },
      err => {
        console.log('Erro durin getting unapproved services');
      }
    );
  }

  loadManagers() {
    // TODO load Managers
  }

  loadAllUsers() {
    const x = this.racService.getAllUnapprovedUsers();
    x.subscribe(
      result => {
        this.allUnapprovedUsersList = result;
      },
      err => {
        console.log('Problem loading unnaproved users');
      }
    );
  }

  ApproveService(service) {
    this.racService.approveService(service);
  }

  ApproveUser(user) {
    this.racService.approveUser(user);
  }
}
