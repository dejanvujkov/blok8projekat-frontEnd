import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RacserviceComponent } from './racservice.component';

describe('RacserviceComponent', () => {
  let component: RacserviceComponent;
  let fixture: ComponentFixture<RacserviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RacserviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RacserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
