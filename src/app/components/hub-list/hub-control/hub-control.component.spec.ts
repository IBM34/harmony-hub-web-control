import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HubControlComponent } from './hub-control.component';

describe('HubControlComponent', () => {
  let component: HubControlComponent;
  let fixture: ComponentFixture<HubControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HubControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HubControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
