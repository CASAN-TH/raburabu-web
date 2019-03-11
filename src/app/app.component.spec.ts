import { AuthModule } from 'ng6-md-auth';
import { HeaderToolbarComponent } from "./components/header-toolbar/header-toolbar.component";
import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { MaterialModule } from "./material/material.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { environment } from '../environments/environment';
describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialModule, NgxSpinnerModule, AuthModule.forRoot(environment)],
      declarations: [AppComponent, HeaderToolbarComponent]
    }).compileComponents();
  }));
  it("should create the app", async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
