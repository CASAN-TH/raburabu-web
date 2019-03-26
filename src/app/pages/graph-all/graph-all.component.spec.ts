import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphAllComponent } from './graph-all.component';

describe('GraphAllComponent', () => {
  let component: GraphAllComponent;
  let fixture: ComponentFixture<GraphAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
