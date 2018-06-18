import { Component, OnInit } from '@angular/core';
import {RACServiceService} from '../service/racservice.service';
import {ServiceModel} from '../model/ServiceModel';

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

  }

  ngOnInit() {
    this.loadUnapprovedServices();
    this.loadManagers();
    this.loadAllUsers();
  }

  loadUnapprovedServices() {
    const x = this.racService.getUnapprovedServices();
    x.subscribe(
      result => {
        this.unapprovedServices = result;
      },
      err => {
        console.log('Error during getting unapproved services');
      }
    );
  }

  loadManagers() {
    const retVal =  this.racService.getManagers();
    retVal.subscribe(
      result => {
        this.managersList = result;
      },
      err => {
        console.log('error - managers');
      }
    );
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

  // TODO refresh prikaza kako se stisne dugme
  ApproveService(service, i) {
    this.racService.approveService(service);
    this.unapprovedServices.removeAt(i);
  }

  ApproveUser(user) {
    this.racService.approveUser(user);
  }

  BlockManager(manager) {
    this.racService.blockManager(manager.AppUser);
  }
}
