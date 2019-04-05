import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material/material.module";
import { LoginComponent } from "./pages/login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./pages/home/home.component";
import { RegisterComponent } from "./pages/register/register.component";
import { ForgotComponent } from "./pages/forgot/forgot.component";
import { HttpClientModule } from "@angular/common/http";
import { NgxSpinnerModule } from "ngx-spinner";
import { HeaderToolbarComponent } from "./components/header-toolbar/header-toolbar.component";
import { environment } from "src/environments/environment";
import { AuthModule } from "ng6-md-auth";
import { ModalCreateTeamComponent } from './modal/modal-create-team/modal-create-team.component';
import { MatDialogModule } from "@angular/material";
import { ModalCreateMemberComponent } from './modal/modal-create-member/modal-create-member.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ManageMemberComponent } from './pages/manage-member/manage-member.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { ModalAddressComponent } from './modal/modal-address/modal-address.component';
import { OrderComponent } from './pages/order/order.component';
import { SelectOptionComponent } from './modal/select-option/select-option.component';
import { MatSelectModule } from '@angular/material/select';
import { AdminManageTeamComponent } from './pages/admin-manage-team/admin-manage-team.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ModalConfirmsComponent } from './modal/modal-confirms/modal-confirms.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OrderReportDetailComponent } from './pages/order-report-detail/order-report-detail.component';
import { MonitorComponent } from './pages/monitor/monitor.component';
import { ModalAddBoxComponent } from './modal/modal-add-box/modal-add-box.component';
import { ModalRemarkComponent } from './modal/modal-remark/modal-remark.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ChartModule } from 'angular2-chartjs';
import { GraphAllComponent } from './pages/graph-all/graph-all.component';
import { ModalProfileComponent } from './modal/modal-profile/modal-profile.component';
import { ModalMaxBoxComponent } from './modal/modal-max-box/modal-max-box.component';
import { SlideshowModule } from 'ng-simple-slideshow';
import { BlankComponent } from './pages/blank/blank.component';


const apiSrvCfg = environment;
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ForgotComponent,
    HeaderToolbarComponent,
    ModalCreateTeamComponent,
    ModalCreateMemberComponent,
    SideBarComponent,
    ManageMemberComponent,
    OrderListComponent,
    ModalAddressComponent,
    OrderComponent,
    SelectOptionComponent,
    AdminManageTeamComponent,
    ModalConfirmsComponent,
    OrderReportDetailComponent,
    MonitorComponent,
    ModalAddBoxComponent,
    ModalRemarkComponent,
    GraphAllComponent,
    ModalProfileComponent,
    ModalMaxBoxComponent,
    BlankComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatDialogModule,
    MatListModule,
    MatSidenavModule,
    MatSelectModule,
    FormsModule,
    MatToolbarModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    HttpClientModule,
    NgxSpinnerModule,
    HttpClientModule,
    MatTabsModule,
    MatPaginatorModule,
    ChartModule,
    AuthModule.forRoot(apiSrvCfg),
    SlideshowModule
  ],
  entryComponents: [
    ModalCreateTeamComponent,
    ModalCreateMemberComponent,
    ModalAddressComponent,
    SelectOptionComponent,
    ModalConfirmsComponent,
    ModalAddBoxComponent,
    ModalRemarkComponent,
    ModalProfileComponent,
    ModalMaxBoxComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
