import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ModalCreateTeamComponent } from '../modal-create-team/modal-create-team.component';
import { TeameServiceService } from 'src/app/services/teams-service/teame-service.service';

@Component({
  selector: 'app-modal-create-member',
  templateUrl: './modal-create-member.component.html',
  styleUrls: ['./modal-create-member.component.scss']
})
export class ModalCreateMemberComponent implements OnInit {
  dataTeam: any;
  selected: any;
  constructor(
    public dialogRef: MatDialogRef<ModalCreateTeamComponent>,
    public teameService: TeameServiceService,
  ) { }

  ngOnInit() {
    this.getTeam();
  }
  cancel() {
    this.dialogRef.close();
  }
  async getTeam() {
    try {
      let res: any = await this.teameService.getTeam();
      this.dataTeam = res.data;
      console.log(res);
    } catch (error) {

    }
  }
  selectItem(i) {
    console.log(i);
    this.selected = i;
    // console.log(this.selected);
  }
  async save() {
    try {
      let res: any = await this.teameService.joinTeam(this.selected._id);
      console.log(res);
      this.dialogRef.close();

    } catch (error) {
      console.log(error);
    }
  }
}
