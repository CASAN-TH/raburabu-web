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

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  { path: "home", component: HomeComponent, canActivate: [AuthGuardService] },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "forgot", component: ForgotComponent },
  { path: "manage-member", component: ManageMemberComponent },
  { path: "order-list", component: OrderListComponent },
  { path: "order", component: OrderComponent },
  { path: "admin-manage-team", component: AdminManageTeamComponent },
  { path: "monitor", component: MonitorComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
