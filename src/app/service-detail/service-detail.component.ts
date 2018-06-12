import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RACServiceService} from '../service/racservice.service';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {

  Service : any;
  Id: number;
  constructor(private racService: RACServiceService, private router: Router, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => {this.Id = params['Id']; });
    this.getService(this.Id);
  }

  ngOnInit() {
  }

  getService(id: number) {
    const x = this.racService.getService(id);
    x.subscribe(
      result => {
        this.Service = result;
      },
      err => {
        console.log('Error getting service');
      }
    );
  }
}
