import { Component, OnInit } from '@angular/core';
import {VehicleModel} from '../model/VehicleModel';
import {ActivatedRoute} from '@angular/router';
import {RACServiceService} from '../service/racservice.service';

@Component({
  selector: 'app-new-vehicle',
  templateUrl: './new-vehicle.component.html',
  styleUrls: ['./new-vehicle.component.css']
})
export class NewVehicleComponent implements OnInit {
  fileToUpload: File;
  imageUrl: string;
  serviceId: number;
  constructor(private activatedRoute: ActivatedRoute, private rac: RACServiceService) {
    this.serviceId = activatedRoute.url.value[1].path;
  }

  ngOnInit() {
  }

  AddNewVehicle(vehicle: VehicleModel, form) {
    vehicle.ServiceId = this.serviceId;
    this.rac.addNewVehicle(vehicle, this.fileToUpload);
    form.reset();
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

}
