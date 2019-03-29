import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMaxBoxComponent } from './modal-max-box.component';

describe('ModalMaxBoxComponent', () => {
  let component: ModalMaxBoxComponent;
  let fixture: ComponentFixture<ModalMaxBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMaxBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMaxBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
