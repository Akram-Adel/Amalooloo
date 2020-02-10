import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConstructionsPage } from './user-constructions.page';

describe('UserConstructionsPage', () => {
  let component: UserConstructionsPage;
  let fixture: ComponentFixture<UserConstructionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserConstructionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserConstructionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
