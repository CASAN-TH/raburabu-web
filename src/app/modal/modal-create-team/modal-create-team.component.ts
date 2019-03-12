import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { TeameServiceService } from 'src/app/services/teams-service/teame-service.service';
import { environment } from 'src/environments/environment';

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
  constructor(
    public dialogRef: MatDialogRef<ModalCreateTeamComponent>,
    public teameService: TeameServiceService
  ) { }

  ngOnInit() {
  }
  async save() {
    try {
      let creteTame = {
        name: this.nameteam,
        codeteam: this.codeteamUpper,
        detail: this.detailteam
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
        console.log(update);
        window.localStorage.setItem(environment.apiUrl + '@user', JSON.stringify(update));
      }
      this.dialogRef.close('createTeam');
    } catch (error) {
      console.log(error);
    }

    // console.log(this.codeteamUpper, this.nameteam, this.detailteam);
  }
  uppercase(e) {
    let uppercase: String = e.toUpperCase();
    console.log(uppercase)
    this.codeteamUpper = uppercase;
    // uppercase = uppercase.length >= 4 ? uppercase.substring(0, 4) : uppercase;
    // this.prefixUppercase = uppercase;
  }
  cancel() {
    this.dialogRef.close();
  }
}
