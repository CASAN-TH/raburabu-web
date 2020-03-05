import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageProductComponent } from './admin-manage-product.component';

describe('AdminManageProductComponent', () => {
  let component: AdminManageProductComponent;
  let fixture: ComponentFixture<AdminManageProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManageProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
