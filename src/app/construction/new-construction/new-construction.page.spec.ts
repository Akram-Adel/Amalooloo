import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConstructionPage } from './new-construction.page';

describe('NewConstructionPage', () => {
  let component: NewConstructionPage;
  let fixture: ComponentFixture<NewConstructionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewConstructionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewConstructionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
