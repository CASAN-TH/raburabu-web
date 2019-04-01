import { environment } from './../../../environments/environment';
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
  user_id: any;
  dataTeam: any;
  selected: any;
  waitApprove: Array<any> = [];
  approve: Array<any> = [];
  constructor(
    public dialogRef: MatDialogRef<ModalCreateTeamComponent>,
    public teameService: TeameServiceService,
  ) { }

  ngOnInit() {
    this.getTeam();
    let res: any = JSON.parse(window.localStorage.getItem(environment.apiUrl + '@user'))
    console.log(res)
    this.user_id = res.data._id;
  }
  cancel() {
    this.dialogRef.close();
  }
  async getTeam() {
    try {
      let res: any = await this.teameService.getTeam();
      this.dataTeam = res.data;
      this.dataTeam.forEach(waitApprove => {
        // console.log(waitApprove)
        if (waitApprove.status === 'waitapprove') {
          this.waitApprove.push(waitApprove);
          // console.log(this.waitApprove);

        } else if (waitApprove.status === 'approve') {
          this.approve.push(waitApprove);
          // console.log(this.approve);

        }
      });
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  selectItem(i) {
    // console.log(i);
    this.selected = i;
    // console.log(this.selected);
  }
  async save() {
    try {
      let use_id = {
        member_id: this.user_id
      }
      let res: any = await this.teameService.joinTeam(this.selected._id, use_id);
      // console.log(res);
      let resMe: any = await this.teameService.me();
      if (resMe) {
        let dataMe = {
          ref1: res.data._id
        }
        let update: any = await this.teameService.updateMe(dataMe);
        // console.log(update);
        window.localStorage.setItem(environment.apiUrl + '@user', JSON.stringify(update));
      }
      this.dialogRef.close('createMember');

    } catch (error) {
      console.log(error);
    }
  }
}
