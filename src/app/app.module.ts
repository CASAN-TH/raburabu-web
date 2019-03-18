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
import {MatSelectModule} from '@angular/material/select';
import { AdminManageTeamComponent } from './pages/admin-manage-team/admin-manage-team.component';
import {MatTabsModule} from '@angular/material/tabs';

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
    AdminManageTeamComponent
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
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    HttpClientModule,
    NgxSpinnerModule,
    HttpClientModule,
    MatTabsModule,
    AuthModule.forRoot(apiSrvCfg)
  ],
  entryComponents: [
    ModalCreateTeamComponent,
    ModalCreateMemberComponent,
    ModalAddressComponent,
    SelectOptionComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
