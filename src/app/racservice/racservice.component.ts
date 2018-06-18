import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {RACServiceService} from '../service/racservice.service';
import {ServiceModel} from '../model/ServiceModel';

@Component({
  selector: 'app-racservice',
  templateUrl: './racservice.component.html',
  styleUrls: ['./racservice.component.css']
})
export class RacserviceComponent implements OnInit {
  constructor(private racService: RACServiceService) {
    this.getAllRACServices();
  }
  allServices;

  ngOnInit() {

  }

  getAllRACServices() {

    const x = this.racService.getAllServices();
    x.subscribe(
      result => {
        this.allServices = result;
      },
      err => {
        console.log('error occurred in registration');

      }
    );
  }
}
