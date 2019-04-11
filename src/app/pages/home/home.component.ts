import { TeameServiceService } from 'src/app/services/teams-service/teame-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ModalCreateTeamComponent } from './../../modal/modal-create-team/modal-create-team.component';
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ModalCreateMemberComponent } from 'src/app/modal/modal-create-member/modal-create-member.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  remark: any;
  teamId: any;
  nameTeam: any;

  constructor(
    public dialog: MatDialog,
    public router: Router,
    public ngxSpinner: NgxSpinnerService,
    public teameService: TeameServiceService,

  ) {
    this.getMe();
    let user: any = JSON.parse(window.localStorage.getItem(environment.apiUrl + '@user'));
  }

  ngOnInit() {
    // this.ngxSpinner.hide();
    this.ngxSpinner.show();
    let res: any = JSON.parse(window.localStorage.getItem(environment.apiUrl + '@user'));
    if (res && res.data) {
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
      if (res.data.roles[0] === 'stockstaff') {
        this.router.navigate(["/monitor"]);
      }
      if (res.data.roles[0] === 'packstaff') {
        this.router.navigate(["/monitor"]);
      }
      if (res.data.roles[0] === 'admin') {
        this.router.navigate(["/admin-manage-team"]);
      }
      if (res.data.roles[0] === 'owner') {
        this.router.navigate(["/manage-member"]);
      }
      if (res.data.roles[0] === 'staff') {
        this.router.navigate(["/manage-member"]);
      }
    } else {
      this.router.navigate(["/login"]);
    }
    this.ngxSpinner.hide();
  }


  openDialog(): void {

    const dialogRef = this.dialog.open(ModalCreateTeamComponent, {
      width: '800px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['manage-member']);
      }
    });
  }

  createmember() {
    const dialogRef = this.dialog.open(ModalCreateMemberComponent, {
      width: '800px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['manage-member']);
      }
    });
  }
  // async getTeam() {
  //   try {
  //     let res: any = await this.teameService.getById(this.teamId);
  //     this.nameTeam = res.data.name;
  //   } catch (error) {

  //   }
  // }
  async getMe() {
    try {
      let user: any = await this.teameService.me()
      // let i: any;

      // console.log(user.data);
      this.teamId = user.data.ref1
      // if (user.data.ref1) {
      //   if (user.data.ref1 != '') {
      //     this.router.navigate(['/manage-member']);
      //   }
      // }
      if (user.data.remarkrejectteam.length > 0) {
        this.remark = user.data.remarkrejectteam[user.data.remarkrejectteam.length - 1];
        // console.log(this.remark);
      }
      if (user.data.statusmember === 'retire') {
        for (let i = 0; i < user.data.historyaboutteam.length; i++) {
          const historyaboutteam = user.data.historyaboutteam[i];
          this.nameTeam = historyaboutteam
        }
        // console.log(this.nameTeam)
      }




    } catch (error) {
      console.log(error);
    }
  }
}
