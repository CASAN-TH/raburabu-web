import { Component, OnInit } from '@angular/core';
import { AuthService } from 'ng6-md-auth';
import { Router } from '@angular/router';
import { SideBarService } from './side-bar.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  userAuth: any;
  userData: any;


  constructor(
    private userAuthSrv: AuthService,
    private router: Router,
    public sidenavService: SideBarService,
    private spinner: NgxSpinnerService
  ) {
    this.userAuthSrv.isLoggedIn.subscribe(value => {
      this.userAuth = this.userAuthSrv.user;
      // console.log(this.userAuth);
    });
    this.userAuth = this.userAuthSrv.user;
  }

  ngOnInit() { }

  onManageMember() {
    this.router.navigate(["/manage-member"]);
  }

  onLogout() {
    this.userAuthSrv.logout();
    this.router.navigate(["/login"]);
    window.localStorage.clear();
  }

  onOrderList() {
    this.router.navigate(["/order-list"]);
  }

  onMonitoring() {
    this.router.navigate(["/order-list"]);
  }

  onManageTeam() {
    this.router.navigate(["/admin-manage-team"]);
  }

  onMonitor() {
    this.router.navigate(["/monitor"]);
  }
  onGraph() {
    this.router.navigate(["/graph-all"]);

  }

}
