import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HubHueComponent } from './hub-hue.component';

describe('HubHueComponent', () => {
  let component: HubHueComponent;
  let fixture: ComponentFixture<HubHueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HubHueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HubHueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
