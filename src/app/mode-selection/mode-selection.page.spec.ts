import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeSelectionPage } from './mode-selection.page';

describe('ModeSelectionPage', () => {
  let component: ModeSelectionPage;
  let fixture: ComponentFixture<ModeSelectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeSelectionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
