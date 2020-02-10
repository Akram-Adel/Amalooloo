import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BcHealthCheckPage } from './bc-health-check.page';

describe('BcHealthCheckPage', () => {
  let component: BcHealthCheckPage;
  let fixture: ComponentFixture<BcHealthCheckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BcHealthCheckPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BcHealthCheckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
