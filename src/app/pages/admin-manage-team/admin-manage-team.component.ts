import { Component, OnInit } from '@angular/core';
import { TeameServiceService } from 'src/app/services/teams-service/teame-service.service';

@Component({
  selector: 'app-admin-manage-team',
  templateUrl: './admin-manage-team.component.html',
  styleUrls: ['./admin-manage-team.component.scss']
})
export class AdminManageTeamComponent implements OnInit {
  waitApprove: Array<any> = [];
  approve: Array<any> = [];
  dataTeam: any;

  constructor(
    public teameService: TeameServiceService,
  ) { }

  ngOnInit() {
    this.getTeam();
  }

  async getTeam() {
    try {
      let res: any = await this.teameService.getTeam();
      this.dataTeam = res.data;
      this.dataTeam.forEach(data => {
        // console.log(waitApprove)
        if (data.status === 'waitapprove') {
          this.waitApprove.push(data);
          console.log(this.waitApprove);

        } else if (data.status === 'approve') {
          this.approve.push(data);
          console.log(this.approve);
        }
      });
      console.log(res);
    } catch (error) {

    }
  }

}
