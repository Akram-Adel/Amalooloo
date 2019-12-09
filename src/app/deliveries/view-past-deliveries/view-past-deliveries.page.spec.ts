import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPastDeliveriesPage } from './view-past-deliveries.page';

describe('ViewPastDeliveriesPage', () => {
  let component: ViewPastDeliveriesPage;
  let fixture: ComponentFixture<ViewPastDeliveriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPastDeliveriesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPastDeliveriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
