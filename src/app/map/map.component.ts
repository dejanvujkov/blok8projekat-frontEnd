import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MapInfo} from '../model/MapInfo';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() offices: any;

  @Output() takeChangedEvent = new EventEmitter<number>();
  @Output() returnChangedEvent = new EventEmitter<number>();

  @Input() take: number; //-1
  @Input() return: number;
  constructor() {
    
  }

  ngOnInit() {
  }

  placeMarker($event){
    //console.log($event.coords.lat);
    //console.log($event.coords.lng);
    
    console.log(this.offices);
  }

  markerClick(office, marker){
    console.log(office.title);
  }

  isTakeVisible(){
    if(this.take != -1){
      return false;
    }
    return true;
  }

  isReturnVisible(){
    if(this.return != -1){
      return false;
    }
    return true;
  }

  onTakeClick(id){
    console.log("take: clicked on " + id);
    this.take = id;
    this.takeChangedEvent.emit(this.take);
  }

  onReturnClick(id){
    console.log("ret: clicked on " + id);
    this.return = id;
    this.returnChangedEvent.emit(this.return);
  }

}
