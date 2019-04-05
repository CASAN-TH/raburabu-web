import { environment } from './../../../environments/environment';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "ng6-md-auth";
import { NgxSpinnerService } from "ngx-spinner";
import { TeameServiceService } from "src/app/services/teams-service/teame-service.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
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
  constructor(
    private userAuth: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private teameService: TeameServiceService,

  ) {
    this.userAuth.isLoggingIn.subscribe(() => {
      this.spinner.show();
    });
    this.userAuth.isLoggedIn.subscribe(async value => {
      this.spinner.hide();
      let res: any = await this.teameService.me();
      window.localStorage.setItem(environment.apiUrl + '@user', JSON.stringify(res));
      if (this.userAuth.user) {
        this.router.navigate(["/home"]);
      }
    });

    this.userAuth.isLoggedFail.subscribe(error => {
      this.spinner.hide();
      console.log(error);
    });
  }
  ngOnInit() {
  }

}
