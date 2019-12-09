import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionViewCompletedPage } from './construction-view-completed.page';

describe('ConstructionViewCompletedPage', () => {
  let component: ConstructionViewCompletedPage;
  let fixture: ComponentFixture<ConstructionViewCompletedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstructionViewCompletedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructionViewCompletedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
