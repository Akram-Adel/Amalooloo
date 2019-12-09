import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDeliveriesPage } from './detail-deliveries.page';

describe('DetailDeliveriesPage', () => {
  let component: DetailDeliveriesPage;
  let fixture: ComponentFixture<DetailDeliveriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailDeliveriesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDeliveriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
