import { Component, OnInit, Input } from '@angular/core';
import { MapInfo} from '../model/MapInfo';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() branchOffices: any[];

  constructor() {
    
  }

  ngOnInit() {
  }

  placeMarker($event){
    console.log($event.coords.lat);
    console.log($event.coords.lng);
    
    console.log("axasdsad: " + this.branchOffices);
  }

  markerClick(branchId){
    console.log(branchId);
  }
}
