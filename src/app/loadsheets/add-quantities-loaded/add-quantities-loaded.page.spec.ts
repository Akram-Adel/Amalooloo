import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuantitiesLoadedPage } from './add-quantities-loaded.page';

describe('AddQuantitiesLoadedPage', () => {
  let component: AddQuantitiesLoadedPage;
  let fixture: ComponentFixture<AddQuantitiesLoadedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQuantitiesLoadedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuantitiesLoadedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
