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
  memberData: Array<any> = [];
  dataTeam: any;
  user: any;
  userId: any;
  statusWaitApprove: Array<any> = [];
  statusMember: Array<any> = [];

  constructor(
    private teameServicec: TeameServiceService,
  ) { }

 async ngOnInit() {
    // let team: any = JSON.parse(window.localStorage.getItem(environment.apiUrl +'@team'));
    // this.team_id = team.data._id
    // if (!team) {
    let user: any = await JSON.parse(window.localStorage.getItem(environment.apiUrl + '@user'));
    this.team_id = user.data.ref1;
    this.user = user.data.roles[0];
    this.userId = user.data._id
    console.log(this.userId );
    console.log(user);
    // }
    // console.log(this.team_id);
    this.getDataMember();
  }

  async getDataMember() {
    try {
      let res: any = await this.teameServicec.getById(this.team_id);
      this.dataTeam = res.data;
      this.dataTeam.members.forEach(members => {
        // this.memberData.push(members)
        console.log(members)
        // if (this.user ==='owner' || members.member_id === this.userId) {
          if (members.status === 'waitapprove') {
            this.statusWaitApprove.push(members);
            console.log(this.statusWaitApprove);
          // }
        } else if (members.status === 'approve') {
          this.statusMember.push(members);
        }

      });

    } catch (error) {
      console.log(error)
    }
  }
  approve() {

  }
}
