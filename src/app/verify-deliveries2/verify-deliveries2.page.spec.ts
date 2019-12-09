import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyDeliveries2Page } from './verify-deliveries2.page';

describe('VerifyDeliveries2Page', () => {
  let component: VerifyDeliveries2Page;
  let fixture: ComponentFixture<VerifyDeliveries2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyDeliveries2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyDeliveries2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
