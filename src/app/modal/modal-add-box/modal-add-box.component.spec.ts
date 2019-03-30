import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddBoxComponent } from './modal-add-box.component';

describe('ModalAddBoxComponent', () => {
  let component: ModalAddBoxComponent;
  let fixture: ComponentFixture<ModalAddBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
