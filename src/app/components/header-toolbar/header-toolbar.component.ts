import { Component, OnInit, HostListener } from "@angular/core";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { AuthService } from "ng6-md-auth";
import { SideBarService } from './../side-bar/side-bar.service';

@Component({
  selector: "app-header-toolbar",
  templateUrl: "./header-toolbar.component.html",
  styleUrls: ["./header-toolbar.component.scss"]
})
export class HeaderToolbarComponent implements OnInit {
  appName = `${environment.appName}`;
  userAuth: any;
  isMenuIcon = true;
  @HostListener('window:resize') onResize() {
    this.onResizeDisplay();
  }

  constructor(
    private userAuthSrv: AuthService,
    private router: Router,
    public sidenavService: SideBarService) {
    this.userAuthSrv.isLoggedIn.subscribe(value => {
      this.userAuth = this.userAuthSrv.user;
    });
    this.userAuth = this.userAuthSrv.user;
  }

  onResizeDisplay() {
    if (this.isMenuIcon) {
      this.isMenuIcon = false;
    } else {
      this.isMenuIcon = true;
    }
  }

  onLogout() {
    this.userAuthSrv.logout();
    this.router.navigate(["/login"]);
  }

  onLogin() {
    this.router.navigate(["/login"]);
  }


  onRegister() {
    this.router.navigate(["/register"]);
  }

  ngOnInit() { }
}
