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
      // console.log(res);
      if (res.data.ref1) {
        this.router.navigate(["/manage-member"]);

      } else if (this.userAuth.user) {
        this.router.navigate(["/home"]);

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
