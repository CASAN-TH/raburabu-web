import { GraphAllComponent } from "./pages/graph-all/graph-all.component";
import { OrderReportDetailComponent } from "./pages/order-report-detail/order-report-detail.component";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegisterComponent } from "./pages/register/register.component";
import { ForgotComponent } from "./pages/forgot/forgot.component";
import { AuthGuardService } from "ng6-md-auth";
import { ManageMemberComponent } from "./pages/manage-member/manage-member.component";
import { OrderListComponent } from "./pages/order-list/order-list.component";
import { OrderComponent } from "./pages/order/order.component";
import { AdminManageTeamComponent } from "./pages/admin-manage-team/admin-manage-team.component";
import { MonitorComponent } from "./pages/monitor/monitor.component";
import { environment } from "src/environments/environment";
import { PrintLayoutComponent } from "./pages/print-layout/print-layout.component";
import { OrderinvoiceComponent } from "./pages/orderinvoice/orderinvoice.component";
let user = JSON.parse(window.localStorage.getItem(environment.apiUrl + "@user"));
const routes: Routes = [
  {
    path: "",
    redirectTo: !user ? "login" : user.data.roles[0] === "admin" ? "admin-manage-team" : user.data.roles[0] === "owner" ? "manage-member" : user.data.roles[0] === "staff" ? "manage-member" : user.data.roles[0] === "stockstaff" ? "monitor" : user.data.roles[0] === "packstaff" ? "monitor" : user.data.roles[0] === "user" ? "home" : "",
    pathMatch: "full"
  },
  {
    path: "home", component: HomeComponent, canActivate: [AuthGuardService]
  },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "forgot", component: ForgotComponent },
  {
    path: "manage-member", component: ManageMemberComponent, canActivate: [AuthGuardService]
  },
  { path: "order-list", component: OrderListComponent, canActivate: [AuthGuardService] },
  { path: "order", component: OrderComponent, canActivate: [AuthGuardService] },
  { path: "admin-manage-team", component: AdminManageTeamComponent, canActivate: [AuthGuardService] },
  { path: "order-report-detail", component: OrderReportDetailComponent, canActivate: [AuthGuardService] },
  { path: "monitor", component: MonitorComponent, canActivate: [AuthGuardService] },
  { path: "graph-all", component: GraphAllComponent, canActivate: [AuthGuardService] },
  
  { path: 'print',
    outlet: 'print',
    component: PrintLayoutComponent,
    children: [
      { path: 'invoice/:invoiceIds', component: OrderinvoiceComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
