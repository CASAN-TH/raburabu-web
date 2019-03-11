import { AuthModule } from 'ng6-md-auth';
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HeaderToolbarComponent } from "./header-toolbar.component";
import { MaterialModule } from "./../../material/material.module";
import { BrowserAnimationsModule, NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { environment } from '../../../environments/environment';

describe("HeaderToolbarComponent", () => {
  let component: HeaderToolbarComponent;
  let fixture: ComponentFixture<HeaderToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderToolbarComponent],
      imports: [MaterialModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        AuthModule.forRoot(environment),
        RouterTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(HeaderToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(true).toBeTruthy();
  });
});
