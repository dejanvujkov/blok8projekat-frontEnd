import {Component, EventEmitter, Output, Input} from '@angular/core';

@Component({
  selector: 'ngbd-rating-events',
  templateUrl: './rating.component.html'
})

export class NgbdRatingEvents {
  @Input() selected = 0;
  @Input() hovered = 0;
  readonly = false;

  @Output() clickEvent = new EventEmitter<number>();

  rateClick(){
    this.clickEvent.emit(this.hovered);
  }

}

