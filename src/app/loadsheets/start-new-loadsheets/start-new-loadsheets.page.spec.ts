import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartNewLoadsheetsPage } from './start-new-loadsheets.page';

describe('StartNewLoadsheetsPage', () => {
  let component: StartNewLoadsheetsPage;
  let fixture: ComponentFixture<StartNewLoadsheetsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartNewLoadsheetsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartNewLoadsheetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
