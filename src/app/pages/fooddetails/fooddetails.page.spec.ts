import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooddetailsPage } from './fooddetails.page';

describe('FooddetailsPage', () => {
  let component: FooddetailsPage;
  let fixture: ComponentFixture<FooddetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooddetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooddetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
