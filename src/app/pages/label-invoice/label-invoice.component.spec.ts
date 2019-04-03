import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelInvoiceComponent } from './label-invoice.component';

describe('LabelInvoiceComponent', () => {
  let component: LabelInvoiceComponent;
  let fixture: ComponentFixture<LabelInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
