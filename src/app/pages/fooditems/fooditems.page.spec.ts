import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooditemsPage } from './fooditems.page';

describe('FooditemsPage', () => {
  let component: FooditemsPage;
  let fixture: ComponentFixture<FooditemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooditemsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooditemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
