import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsMarkerPage } from './maps-marker.page';

describe('MapsMarkerPage', () => {
  let component: MapsMarkerPage;
  let fixture: ComponentFixture<MapsMarkerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsMarkerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsMarkerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
