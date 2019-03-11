import { AuthModule } from 'ng6-md-auth';
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginComponent } from "./login.component";
import {
  BrowserAnimationsModule,
  NoopAnimationsModule
} from "@angular/platform-browser/animations";
import { environment } from "./../../../environments/environment";
import { RouterTestingModule } from "@angular/router/testing";
import { HomeComponent } from "../home/home.component";
import { MaterialModule } from '../../material/material.module';

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, HomeComponent],
      imports: [
        BrowserAnimationsModule,
        AuthModule.forRoot(environment),
        RouterTestingModule,
        MaterialModule
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  }));

  it("ผู้ใช้เปิดหน้าจอเพื่อ ลงชื่อเข้าใช้งานระบบ", () => {
    /**
     * 1. ตรวจสอบสิ่งที่ต้องมีใน Component นี้ (properties และ event)
     */
    expect(component).toBeTruthy();
   
  });

  
});
