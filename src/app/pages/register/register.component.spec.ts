import { AuthModule } from 'ng6-md-auth';
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RegisterComponent } from "./register.component";
import { MaterialModule } from "src/app/material/material.module";
import {
  BrowserAnimationsModule,
  NoopAnimationsModule
} from "@angular/platform-browser/animations";

import { environment } from "./../../../environments/environment";
import { RouterTestingModule } from "@angular/router/testing";
import { Routes } from "@angular/router";
import { HomeComponent } from "../home/home.component";

describe("RegisterComponent", () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  const routes: Routes = [
    {
      path: "",
      redirectTo: "login",
      pathMatch: "full"
    },
    { path: "register", component: RegisterComponent },
    { path: "home", component: HomeComponent }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent, HomeComponent],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        AuthModule.forRoot(environment),
        RouterTestingModule.withRoutes(routes)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  }));

  it("ผู้ใช้เปิดหน้าจอเพื่อ ลงทะเบียนผู้ใช้ใหม่", () => {
    expect(component).toBeTruthy();
  });

  
});
