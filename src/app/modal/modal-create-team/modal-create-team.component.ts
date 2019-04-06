import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { TeameServiceService } from 'src/app/services/teams-service/teame-service.service';

@Component({
  selector: 'app-modal-create-team',
  templateUrl: './modal-create-team.component.html',
  styleUrls: ['./modal-create-team.component.scss']
})
export class ModalCreateTeamComponent implements OnInit {
  codeteam: any;
  nameteam: any;
  detailteam: any;
  codeteamUpper: any;
  user_id: any;
  constructor(
    public dialogRef: MatDialogRef<ModalCreateTeamComponent>,
    private snackBar: MatSnackBar,
    public teameService: TeameServiceService
  ) { }

  ngOnInit() {
    let resUser: any = JSON.parse(window.localStorage.getItem(environment.apiUrl + '@user'));
    // console.log(resUser);
    this.user_id = resUser.data._id
  }
  async save() {
    try {
      let creteTame = {
        name: this.nameteam,
        codeteam: this.codeteamUpper,
        detail: this.detailteam,
        user_id: this.user_id
      }
      let res: any = await this.teameService.createTeam(creteTame);
      console.log(res);
      // window.localStorage.setItem(environment.apiUrl + '@team', JSON.stringify(res));
      let resMe: any = await this.teameService.me()
      if (resMe) {
        let dataMe = {
          ref1: res.data._id
        }
        let update: any = await this.teameService.updateMe(dataMe);
        // console.log(update);
        window.localStorage.setItem(environment.apiUrl + '@user', JSON.stringify(update));
      }
      this.dialogRef.close('createTeam');
    } catch (error) {
      // console.log(error);
      this.snackBar.open(error.error ? error.error.message : "foubd unknow error", "Error", {
        duration: 2000,
      });
    }

    // console.log(this.codeteamUpper, this.nameteam, this.detailteam);
  }
  uppercase(e) {
    let uppercase: String = e.toUpperCase();
    // console.log(uppercase)
    this.codeteamUpper = uppercase;
    // uppercase = uppercase.length >= 4 ? uppercase.substring(0, 4) : uppercase;
    // this.prefixUppercase = uppercase;
  }
  cancel() {
    this.dialogRef.close();
  }
}
