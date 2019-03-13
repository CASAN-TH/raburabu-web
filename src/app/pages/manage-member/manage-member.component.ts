import { TeameServiceService } from 'src/app/services/teams-service/teame-service.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-member',
  templateUrl: './manage-member.component.html',
  styleUrls: ['./manage-member.component.scss']
})
export class ManageMemberComponent implements OnInit {
  team_id: any;
  dataTeam: any;
  user: any;
  statusWaitApprove: Array<any> = [];
  statusMember: Array<any> = [];

  constructor(
    private teameServicec: TeameServiceService,
  ) { }

  ngOnInit() {
    // let team: any = JSON.parse(window.localStorage.getItem(environment.apiUrl +'@team'));
    // this.team_id = team.data._id
    // if (!team) {
    let user: any = JSON.parse(window.localStorage.getItem(environment.apiUrl + '@user'));
    this.team_id = user.data.ref1;
    this.user = user.data.roles[0];
    console.log(user);
    // }
    console.log(this.team_id);
    this.getDataMember();
  }

  async getDataMember() {
    try {
      let res: any = await this.teameServicec.getById(this.team_id);
      this.dataTeam = res.data;
      this.dataTeam.members.forEach(members => {
        if (members.status === 'waitapprove') {
          this.statusWaitApprove.push(members);
        } else if (members.status === 'member') {
          this.statusMember.push(members);
        }
      });
      console.log(this.dataTeam)

    } catch (error) {
      console.log(error)
    }
  }
  approve() {

  }
}
