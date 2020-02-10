import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHealthCheckPage } from './create-health-check.page';

describe('CreateHealthCheckPage', () => {
  let component: CreateHealthCheckPage;
  let fixture: ComponentFixture<CreateHealthCheckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateHealthCheckPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHealthCheckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
