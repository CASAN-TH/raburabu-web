import { ModalConfirmsComponent } from './../../modal/modal-confirms/modal-confirms.component';
import { TeameServiceService } from 'src/app/services/teams-service/teame-service.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-manage-member',
  templateUrl: './manage-member.component.html',
  styleUrls: ['./manage-member.component.scss']
})
export class ManageMemberComponent implements OnInit {
  dataUserID: any;
  ckUser_id: any;
  team_id: any;
  memberData: Array<any> = [];
  dataTeam: any;
  user: any;
  userId: any;
  statusWaitApprove: Array<any> = [];
  statusMember: Array<any> = [];

  constructor(
    private teameServicec: TeameServiceService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  async ngOnInit() {
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
      this.userId = user.data._id
    }

  }

  async getDataMember() {
    try {
      let res: any = await this.teameServicec.getById(this.team_id);
      this.dataTeam = res.data;
      console.log(this.dataTeam);
      let resp: any = this.dataTeam.members.filter((e) => {
        if (e.member_id === this.userId) {
          this.dataUserID = e;
          console.log(this.dataUserID);
        }
      })
      this.dataTeam.members.forEach(members => {
        if (members.status === 'waitapprove') {
          this.statusWaitApprove.push(members);
        }
        if (members.status === 'staff') {
          this.statusMember.push(members);
          console.log(this.statusMember);
        }
      });
    } catch (error) {
      console.log(error)
    }
  }
  // checkUser_id() {
  //   this.statusWaitApprove.forEach(ch => {
  //     console.log(ch);
  //   })
  // }
  async  approve(item) {
    try {
      const dialogRef = this.dialog.open(ModalConfirmsComponent, {
        width: '400px',
        data: { message: "อนุมัติสมาชิกเข้าสู่ทีม?" },
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(async result => {
        // console.log(result)
        if (result) {
          let dataApprove: any = {
            member_id: item.member_id,
            status: 'staff'
          }
          let res: any = await this.teameServicec.approveMember(this.team_id, dataApprove);
          if (res) {
            this.statusWaitApprove = []
            this.dataUserID = ''
            this.statusMember = []
            this.getDataMember();
          }
          console.log(res);
        }
      });

    } catch (error) {

    }

  }
  async cancel(item) {
    try {
      const dialogRef = this.dialog.open(ModalConfirmsComponent, {
        width: '800px',
        data: { message: "ปฏิเสธสมาชิกเข้าสู่ทีม?" },
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(async result => {
        // console.log(result)
        if (result) {
          let dataApprove: any = {
            member_id: item.member_id,
            status: 'retire'
          }
          let res: any = await this.teameServicec.approveMember(this.team_id, dataApprove);
          if (res) {
            this.statusWaitApprove = []
            this.dataUserID = ''
            this.statusMember = []
            this.ngOnInit();
          }
          console.log(res);
        }
      });

    } catch (error) {

    }
  }
}
