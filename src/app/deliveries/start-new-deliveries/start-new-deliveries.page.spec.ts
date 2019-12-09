import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartNewDeliveriesPage } from './start-new-deliveries.page';

describe('StartNewDeliveriesPage', () => {
  let component: StartNewDeliveriesPage;
  let fixture: ComponentFixture<StartNewDeliveriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartNewDeliveriesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartNewDeliveriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
