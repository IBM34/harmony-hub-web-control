import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HubDeviceComponent } from './hub-device.component';

describe('HubDeviceComponent', () => {
  let component: HubDeviceComponent;
  let fixture: ComponentFixture<HubDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HubDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HubDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
