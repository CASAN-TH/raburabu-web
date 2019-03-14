import { TeameServiceService } from 'src/app/services/teams-service/teame-service.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit() {
    // let team: any = JSON.parse(window.localStorage.getItem(environment.apiUrl +'@team'));
    // this.team_id = team.data._id
    // if (!team) {
    let user: any = JSON.parse(window.localStorage.getItem(environment.apiUrl + '@user'));
    if (!user.data.ref1) {
      this.router.navigate(['/home']);
      // console.log('asd');
    } else {
      // console.log('sdf');
      this.team_id = user.data.ref1;
      this.user = user.data.roles[0];
      this.getDataMember();
    }

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
