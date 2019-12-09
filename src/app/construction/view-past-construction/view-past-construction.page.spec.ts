import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPastConstructionPage } from './view-past-construction.page';

describe('ViewPastConstructionPage', () => {
  let component: ViewPastConstructionPage;
  let fixture: ComponentFixture<ViewPastConstructionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPastConstructionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPastConstructionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
