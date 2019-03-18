import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmsComponent } from './modal-confirms.component';

describe('ModalConfirmsComponent', () => {
  let component: ModalConfirmsComponent;
  let fixture: ComponentFixture<ModalConfirmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalConfirmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
