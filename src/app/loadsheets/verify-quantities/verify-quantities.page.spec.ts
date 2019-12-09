import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyQuantitiesPage } from './verify-quantities.page';

describe('VerifyQuantitiesPage', () => {
  let component: VerifyQuantitiesPage;
  let fixture: ComponentFixture<VerifyQuantitiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyQuantitiesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyQuantitiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
