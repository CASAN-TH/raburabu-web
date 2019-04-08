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
import { BlankComponent } from "./pages/blank/blank.component";
import { OwnDashboadComponent } from "./pages/own-dashboad/own-dashboad.component";
import { StockpackComponent } from "./pages/stockpack/stockpack.component";


const routes: Routes = [
  {
    path: "",
    redirectTo: "blank",
    pathMatch: "full"
  },
  { path: "blank", component: BlankComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthGuardService] },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "forgot", component: ForgotComponent },
  { path: "own-dashboard", component: OwnDashboadComponent, canActivate: [AuthGuardService] },
  { path: "stock-dashboard", component: StockpackComponent, canActivate: [AuthGuardService] },
  { path: "manage-member", component: ManageMemberComponent, canActivate: [AuthGuardService] },
  { path: "order-list", component: OrderListComponent, canActivate: [AuthGuardService] },
  { path: "order", component: OrderComponent, canActivate: [AuthGuardService] },
  { path: "admin-manage-team", component: AdminManageTeamComponent, canActivate: [AuthGuardService] },
  { path: "order-report-detail", component: OrderReportDetailComponent, canActivate: [AuthGuardService] },
  { path: "monitor", component: MonitorComponent, canActivate: [AuthGuardService] },
  { path: "graph-all", component: GraphAllComponent, canActivate: [AuthGuardService] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
