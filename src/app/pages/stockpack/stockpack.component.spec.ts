import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockpackComponent } from './stockpack.component';

describe('StockpackComponent', () => {
  let component: StockpackComponent;
  let fixture: ComponentFixture<StockpackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockpackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockpackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
