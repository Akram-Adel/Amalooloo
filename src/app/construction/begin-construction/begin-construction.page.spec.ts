import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginConstructionPage } from './begin-construction.page';

describe('BeginConstructionPage', () => {
  let component: BeginConstructionPage;
  let fixture: ComponentFixture<BeginConstructionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeginConstructionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeginConstructionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
