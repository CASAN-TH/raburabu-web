import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMonitorAllComponent } from './search-monitor-all.component';

describe('SearchMonitorAllComponent', () => {
  let component: SearchMonitorAllComponent;
  let fixture: ComponentFixture<SearchMonitorAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMonitorAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMonitorAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
