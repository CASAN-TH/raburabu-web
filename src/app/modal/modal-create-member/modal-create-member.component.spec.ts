import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateMemberComponent } from './modal-create-member.component';

describe('ModalCreateMemberComponent', () => {
  let component: ModalCreateMemberComponent;
  let fixture: ComponentFixture<ModalCreateMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCreateMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
