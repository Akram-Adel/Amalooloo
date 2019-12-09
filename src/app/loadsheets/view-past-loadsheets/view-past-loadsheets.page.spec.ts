import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPastLoadsheetsPage } from './view-past-loadsheets.page';

describe('ViewPastLoadsheetsPage', () => {
  let component: ViewPastLoadsheetsPage;
  let fixture: ComponentFixture<ViewPastLoadsheetsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPastLoadsheetsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPastLoadsheetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
