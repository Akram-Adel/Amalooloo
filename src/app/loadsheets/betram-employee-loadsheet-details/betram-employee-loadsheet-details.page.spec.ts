import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetramEmployeeLoadsheetDetailsPage } from './betram-employee-loadsheet-details.page';

describe('BetramEmployeeLoadsheetDetailsPage', () => {
  let component: BetramEmployeeLoadsheetDetailsPage;
  let fixture: ComponentFixture<BetramEmployeeLoadsheetDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetramEmployeeLoadsheetDetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetramEmployeeLoadsheetDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
