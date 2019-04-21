import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastOrdersPage } from './past-orders.page';

describe('PastOrdersPage', () => {
  let component: PastOrdersPage;
  let fixture: ComponentFixture<PastOrdersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastOrdersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
