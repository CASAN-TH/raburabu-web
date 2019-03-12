import { Component, OnInit } from '@angular/core';
import { AuthService } from 'ng6-md-auth';
import { Router } from '@angular/router';
import { SideBarService } from './side-bar.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  userAuth: any;

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
    // console.log(this.userAuth);
  }

  ngOnInit() {
  }

  onLogout() {
    this.userAuthSrv.logout();
    this.router.navigate(["/login"]);
  }


}
