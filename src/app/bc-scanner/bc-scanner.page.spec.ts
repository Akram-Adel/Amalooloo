import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BcScannerPage } from './bc-scanner.page';

describe('BcScannerPage', () => {
  let component: BcScannerPage;
  let fixture: ComponentFixture<BcScannerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BcScannerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BcScannerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
