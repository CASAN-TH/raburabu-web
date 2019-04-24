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
      "url": "https://res.cloudinary.com/dyiuidzsc/image/upload/v1556098232/rabuProduct/22087.jpg"
    },
    {
      "url": "https://res.cloudinary.com/dyiuidzsc/image/upload/v1556098232/rabuProduct/22088.jpg"
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
      const token = window.localStorage.getItem(`token@${environment.appName}-${environment.environment}`);
      if (token) {
        let res: any = await this.teameService.me();
        window.localStorage.setItem(environment.apiUrl + '@user', JSON.stringify(res));
        if (this.userAuth.user) {
          this.router.navigate(["/home"]);
        }
      }
    });

    this.userAuth.isLoggedFail.subscribe(error => {
      this.spinner.hide();
      console.log(error);
    });
  }
  ngOnInit() {
    this.spinner.hide();
  }

}
