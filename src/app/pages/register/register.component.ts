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
      "url": "https://res.cloudinary.com/dyiuidzsc/image/upload/v1557195850/rabuProduct/%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%9B%E0%B8%81_190507_0002.jpg"
    },
    {
      "url": "https://res.cloudinary.com/dyiuidzsc/image/upload/v1557195850/rabuProduct/%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%9B%E0%B8%81_190507_0001.jpg"
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
