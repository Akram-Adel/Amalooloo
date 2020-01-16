import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedsplashPage } from './animatedsplash.page';

describe('AnimatedsplashPage', () => {
  let component: AnimatedsplashPage;
  let fixture: ComponentFixture<AnimatedsplashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimatedsplashPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedsplashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
