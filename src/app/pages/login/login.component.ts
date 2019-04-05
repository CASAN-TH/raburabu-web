import { SelectOptionComponent } from './../../modal/select-option/select-option.component';
import { TeameServiceService } from './../../services/teams-service/teame-service.service';
import { AuthService } from 'ng6-md-auth';
import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  credential: any = {
    username: "",
    password: ""
  };
  userAl: any;
  images = [
    {
      "url": "https://scontent.fbkk6-2.fna.fbcdn.net/v/t1.0-9/52480822_299030194146477_8270205720268374016_n.jpg?_nc_cat=104&_nc_oc=AQn0i9RPmFkv474C5c4zlGkrXcRLSgIZGpvlXwByDpfAfIG7L0XDpFPW_1kpS3Dn9dU&_nc_ht=scontent.fbkk6-2.fna&oh=9bc5cae21ac34c20511ca7cf761d0df8&oe=5D40F1E0"
    },
    {
      "url": "https://scontent.fbkk6-1.fna.fbcdn.net/v/t1.0-9/45694378_707555726291993_3720922226577375232_n.jpg?_nc_cat=110&_nc_oc=AQnjtrpAuO04QoXGyaO8NDS9Yc0htUAKz9ots_Lo6Ag0UYeVyFsdbFcmpb7s6IeFdA4&_nc_ht=scontent.fbkk6-1.fna&oh=a6080cc64871d549458c1ca78cb2a88e&oe=5D35BD52"
    },
    {
      "url": "https://scontent.fbkk6-1.fna.fbcdn.net/v/t1.0-9/46188555_709547979426101_842997605125324800_n.jpg?_nc_cat=110&_nc_oc=AQlkEKn1rpT7qVeKbkHdFlUSC60F_kpZFcHoyq-8iA1U5dwPa6hmkOAnOzUBQWJXw2c&_nc_ht=scontent.fbkk6-1.fna&oh=b5978f1ee6de8876d7c7120c40b4a74d&oe=5D3855F9"
    },
    {
      "url": "https://scontent.fbkk6-1.fna.fbcdn.net/v/t1.0-9/45410438_704292896618276_383800936155316224_n.jpg?_nc_cat=100&_nc_oc=AQlcAV2weYHzczayvanNeMjEsIxaEHpSreP8bmAmGbF30XfN-mlyYDkl03uqHq7ZzK8&_nc_ht=scontent.fbkk6-1.fna&oh=13e9d174e0e07ec9d8aa3e305e1ee009&oe=5D3ECC6C"
    }
  ]
  hide = true;
  user: any = null;
  constructor(
    private userAuth: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    private teameService: TeameServiceService,
  ) {
    this.userAl = this.userAuth.user;

    // this.userAuth.isLoggingIn.observers = []
    this.userAuth.isLoggingIn.subscribe(() => {
      this.spinner.show();
    });
    // this.userAuth.isLoggingIn.observers = []
    this.userAuth.isLoggedIn.subscribe(async value => {
      this.spinner.hide();
      const token = window.localStorage.getItem(`token@${environment.appName}-${environment.environment}`);
      // console.log(token);
      if (token && this.user === null) {
        // console.log('1');
        this.user = this.userAuth.user;
        let res: any = await this.teameService.me();
        window.localStorage.setItem(environment.apiUrl + '@user', JSON.stringify(res));
        // console.log(res);

        if (res.data.roles[0] === 'stockstaff') {
          this.router.navigate(["/monitor"]);
        }
        if (res.data.roles[0] === 'packstaff') {
          this.router.navigate(["/monitor"]);
        }
        if (res.data.roles[0] === 'admin') {
          this.router.navigate(["/admin-manage-team"]);
        }
        if (res.data.roles[0] === 'user') {
          if (res.data.ref1) {
            if (res.data.ref1 === '') {
              this.router.navigate(["/home"]);
            } else {
              this.router.navigate(["/manage-member"]);
            }
          } else {
            this.router.navigate(["/home"]);
          }
        }
        if (res.data.roles[0] === 'owner') {
          this.router.navigate(["/manage-member"]);
        }
        if (res.data.roles[0] === 'staff') {
          this.router.navigate(["/manage-member"]);
        }
      }

    });
    this.userAuth.isLoggedFail.observers = []
    this.userAuth.isLoggedFail.subscribe(error => {
      this.spinner.hide();
      if (error.error) {
        this.snackBar.open(error.error.message, "Error", {
          duration: 2000,
        });
      } else {
        error.error.message = "Connection error, please try again";
        this.snackBar.open(error.error.message, "Error", {
          duration: 2000,
        });
      }

    });
  }

  ngOnInit() { }

}
