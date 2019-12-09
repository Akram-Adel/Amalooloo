import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionBeneficiaryDetailsPage } from './construction-beneficiary-details.page';

describe('ConstructionBeneficiaryDetailsPage', () => {
  let component: ConstructionBeneficiaryDetailsPage;
  let fixture: ComponentFixture<ConstructionBeneficiaryDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstructionBeneficiaryDetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructionBeneficiaryDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
