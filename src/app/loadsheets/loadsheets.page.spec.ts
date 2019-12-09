import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadsheetsPage } from './loadsheets.page';

describe('LoadsheetsPage', () => {
  let component: LoadsheetsPage;
  let fixture: ComponentFixture<LoadsheetsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadsheetsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadsheetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
