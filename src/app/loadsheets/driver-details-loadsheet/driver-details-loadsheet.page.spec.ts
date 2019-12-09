import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverDetailsLoadsheetPage } from './driver-details-loadsheet.page';

describe('DriverDetailsLoadsheetPage', () => {
  let component: DriverDetailsLoadsheetPage;
  let fixture: ComponentFixture<DriverDetailsLoadsheetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverDetailsLoadsheetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverDetailsLoadsheetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
