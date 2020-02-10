import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthCheckPage } from './health-check.page';

describe('HealthCheckPage', () => {
  let component: HealthCheckPage;
  let fixture: ComponentFixture<HealthCheckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthCheckPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthCheckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
