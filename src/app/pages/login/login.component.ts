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
      "url": "https://scontent.fbkk6-2.fna.fbcdn.net/v/t1.0-9/52480822_299030194146477_8270205720268374016_n.jpg?_nc_cat=104&_nc_oc=AQn0i9RPmFkv474C5c4zlGkrXcRLSgIZGpvlXwByDpfAfIG7L0XDpFPW_1kpS3Dn9dU&_nc_ht=scontent.fbkk6-2.fna&oh=9bc5cae21ac34c20511ca7cf761d0df8&oe=5D40F1E0"
    },
    {
      "url": "https://scontent.fbkk6-1.fna.fbcdn.net/v/t1.0-9/53001544_299945844054912_2322368497180475392_n.jpg?_nc_cat=110&_nc_oc=AQnoCcci9-EQITpp13q3QzI_A22reylq3biSDbfMcO27BFsgu9i551RiYoC7vLUZUM0&_nc_ht=scontent.fbkk6-1.fna&oh=be612f5918805b3bf8490b7f770813d7&oe=5D4EC98D"
    },
    {
      "url": "https://scontent.fbkk6-1.fna.fbcdn.net/v/t1.0-9/50924294_288806775168819_3114814092418744320_n.jpg?_nc_cat=105&_nc_oc=AQk1i8oXJIuaqMfAJ9xkxeyLaMqrXU-HjCdkYSrhQplYZViHH78CaoXE9T7zWcU9US4&_nc_ht=scontent.fbkk6-1.fna&oh=a8f7acdc410c962859bdef77a672c9bd&oe=5D457819"
    },
    {
      "url": "https://scontent.fbkk6-2.fna.fbcdn.net/v/t1.0-9/52532776_294061217976708_1335635997563551744_n.jpg?_nc_cat=104&_nc_oc=AQnmJb9CLbS60FfQjREkgKA4IiP_2CptvKJvTHOzshPky1ocITXarI3ttoM1wPlA1Xo&_nc_ht=scontent.fbkk6-2.fna&oh=95f1bce438b73f6d076d570d4640d65e&oe=5D058580"
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
      console.log(res);
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
      // if (res.data.roles[0] === 'user' && res.data.ref1 && res.data.ref1 != '') {
      //   this.router.navigate(["/manage-member"]);
      // }
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
