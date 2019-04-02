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
  images = [
    {
      "url": "https://cf.shopee.co.th/file/cdd3c2dd0d211f363e26cec1fbc49f30"
    },
    {
      "url": "https://scontent-sea1-1.cdninstagram.com/vp/03b43515979558f42fd19f97c7d34b64/5D0200E7/t51.2885-15/e35/51166430_641847046247176_727256863808490633_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com&se=8&ig_cache_key=MTk4NTAxNTI5MTgzNDc3Mjc2NQ%3D%3D.2"
    }
  ]
  hide = true;
  constructor(
    private userAuth: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    private teameService: TeameServiceService,




  ) {
    this.userAuth.isLoggingIn.subscribe(() => {
      this.spinner.show();
    });
    this.userAuth.isLoggedIn.subscribe(async value => {
      this.spinner.hide();
      let res: any = await this.teameService.me();
      window.localStorage.setItem(environment.apiUrl + '@user', JSON.stringify(res));
      // // console.log(res.data.roles[0]);
      if (res.data.roles[0] === 'stockstaff') {
        this.router.navigate(["/monitor"]);
      }
      if (res.data.roles[0] === 'packstaff') {
        this.router.navigate(["/monitor"]);
      }
      if (res.data.roles[0] === 'admin') {
        this.router.navigate(["/admin-manage-team"]);
      }
      if (res.data.ref1) {
        this.router.navigate(["/manage-member"]);
      }
      if (res.data.roles[0] === 'user') {
        this.router.navigate(["/home"]);
      }
      if (res.data.roles[0] === 'owner') {
        this.router.navigate(["/manage-member"]);
      }
      if (res.data.roles[0] === 'staff') {
        this.router.navigate(["/manage-member"]);
      }
    });
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
