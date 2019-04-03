import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderinvoiceComponent } from './orderinvoice.component';

describe('OrderinvoiceComponent', () => {
  let component: OrderinvoiceComponent;
  let fixture: ComponentFixture<OrderinvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderinvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
