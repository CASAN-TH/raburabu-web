import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
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
      this.dialogRef.close();
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
