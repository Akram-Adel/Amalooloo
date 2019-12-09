import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadsheetCompletedPage } from './loadsheet-completed.page';

describe('LoadsheetCompletedPage', () => {
  let component: LoadsheetCompletedPage;
  let fixture: ComponentFixture<LoadsheetCompletedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadsheetCompletedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadsheetCompletedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
