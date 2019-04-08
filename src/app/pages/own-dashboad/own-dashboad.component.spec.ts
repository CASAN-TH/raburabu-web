import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnDashboadComponent } from './own-dashboad.component';

describe('OwnDashboadComponent', () => {
  let component: OwnDashboadComponent;
  let fixture: ComponentFixture<OwnDashboadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnDashboadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnDashboadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
