import { AuthService } from 'ng6-md-auth';
import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';

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
    private snackBar: MatSnackBar
  ) {
    this.userAuth.isLoggingIn.subscribe(()=>{
      this.spinner.show();
    });
    this.userAuth.isLoggedIn.subscribe(value => {
      this.spinner.hide();
      if(this.userAuth.user){
        this.router.navigate(["/home"]);
      }
    });
    this.userAuth.isLoggedFail.subscribe(error=>{
      this.spinner.hide();
      if(error.error){
        this.snackBar.open(error.error.message, "Error", {
          duration: 2000,
        });
      }else{
        error.error.message = "Connection error, please try again";
        this.snackBar.open(error.error.message, "Error", {
          duration: 2000,
        });
      }
      
    });
  }

  ngOnInit() {}

}
