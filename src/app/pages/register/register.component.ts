import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "ng6-md-auth";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  constructor(
    private userAuth: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
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
      console.log(error);
    });
  }
  ngOnInit() {
  }

}
