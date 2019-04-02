import { ModalProfileComponent } from './../../modal/modal-profile/modal-profile.component';
import { ModalConfirmsComponent } from './../../modal/modal-confirms/modal-confirms.component';
import { TeameServiceService } from 'src/app/services/teams-service/teame-service.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';

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
  typeChart: any;
  dataChart: any;
  optionsChart: any;
  colorChart: any = [
    "#ff0000",
    "#ffff00",
    "#ff007f",
    "#007fff",
    "#00ff00"
  ]
  bgChart: any = "rgba(0,0,0,0)"

  constructor(
    private teameServicec: TeameServiceService,
    private router: Router,
    public dialog: MatDialog,
    public ngxSpinner: NgxSpinnerService
  ) { }

  async ngOnInit() {
    // let team: any = JSON.parse(window.localStorage.getItem(environment.apiUrl +'@team'));
    // this.team_id = team.data._id
    // if (!team) {
    // let user: any = JSON.parse(window.localStorage.getItem(environment.apiUrl + '@user'));
    // console.log(user)
    this.getMe();
    // if (!user.data.ref1) {
    //   this.router.navigate(['/home']);
    // } else {
    //   this.team_id = user.data.ref1;
    //   this.user = user.data.roles[0];
    //   this.getDataMember();
    //   this.userId = user.data._id
    //   this.chartData();
    //   this.getMe();
    // }

  }

  chartData() {
    this.typeChart = 'line';   ////// สามารถกำหนดเป็น 'line','bar','radar','pie','doughnut','polarArea','bubble','scatter'
    this.dataChart = {
      labels: ["8.00", "9.00", "10.00", "11.00", "12.00", "13.00", "14.00", "15.00", "16.00", "17.00"],
      datasets: [
        {
          label: "แสงตะวัน",
          data: [20, 15, 14, 11, 20, 15, 14, 18, 23, 23],
          // backgroundColor: "rgba(0,0,0,0)",
          // borderColor: "#ff0000"
        },
        {
          label: "จันทร์ฉาย",
          data: [31, 26, 14, 12, 31, 33, 18, 18, 40, 36],
          // backgroundColor: "rgba(0,0,0,0)",
          // borderColor: "#ffff00"
        },
        {
          label: "สายรุ้ง",
          data: [30, 19, 10, 35, 28, 25, 25, 25, 35, 35],
          // backgroundColor: "rgba(0,0,0,0)",
          // borderColor: "#ff007f"
        },
        {
          label: "ป.1",
          data: [39, 39, 39, 50, 50, 59, 64, 64, 64, 64, 64],
          // backgroundColor: "rgba(0,0,0,0)",
          // borderColor: "#007fff"
        },
        {
          label: "ป.5",
          data: [34, 34, 38, 33, 33, 57, 58, 54, 54, 54, 54],
          // backgroundColor: "rgba(0,0,0,0)",
          // borderColor: "#00ff00"
        }
      ]
    };
    let i = 0;
    this.dataChart.datasets.forEach(data => {
      this.dataChart.datasets[i].borderColor = this.colorChart[i];
      this.dataChart.datasets[i].backgroundColor = this.bgChart;
      console.log(data);
      i++;
    });
    this.optionsChart = {
      responsive: true,
      maintainAspectRatio: false
    };
  }

  async getDataMember() {
    // this.ngxSpinner.show();
    try {
      let res: any = await this.teameServicec.getById(this.team_id);
      console.log(res);
      this.dataTeam = res.data;
      this.ngxSpinner.hide();
      console.log(this.dataTeam);
      let resp: any = this.dataTeam.members.filter((e) => {
        if (e.member_id === this.userId) {
          this.dataUserID = e;
          // console.log(this.dataUserID);
        }
      })
      this.dataTeam.members.forEach(members => {
        if (members.status === 'waitapprove') {
          this.statusWaitApprove.push(members);
        }
        if (members.status === 'staff') {
          this.statusMember.push(members);
          // console.log(this.statusMember);
        }
      });
    } catch (error) {
      this.ngxSpinner.hide();
      console.log(error)
    }
  }

  async  approve(item) {
    try {
      const dialogRef = this.dialog.open(ModalConfirmsComponent, {
        width: '400px',
        data: {
          title: "ยืนยันการเข้าร่วมทีม",
          message: "คุณต้องการอนุมัติผู้ใช้ท่านนี้เข้าสู่ทีมหรือไม่?"
        },
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(async result => {
        // console.log(result)
        if (result) {
          let dataApprove: any = {
            member_id: item.member_id,
            status: 'staff',
            statusmember: 'approve'
          }
          let res: any = await this.teameServicec.approveMember(this.team_id, dataApprove);
          if (res) {
            this.statusWaitApprove = []
            this.dataUserID = ''
            this.statusMember = []
            this.getDataMember();
          }
          // console.log(res);
        }
      });

    } catch (error) {

    }

  }
  async cancel(item) {
    try {
      const dialogRef = this.dialog.open(ModalConfirmsComponent, {
        width: '400px',
        data: {
          title: "ปฏิเสธเข้าร่วมทีม",
          message: "ปฏิเสธสมาชิกเข้าสู่ทีม?"
        },
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(async result => {
        // console.log(result)
        if (result) {
          let dataApprove: any = {
            member_id: item.member_id,
            status: 'retire',
            statusmember: 'retire'

          }
          let res: any = await this.teameServicec.approveMember(this.team_id, dataApprove);
          console.log(res)
          if (res) {
            this.statusWaitApprove = []
            this.dataUserID = ''
            this.statusMember = []
            this.ngOnInit();
          }
          // console.log(res);
        }
      });

    } catch (error) {

    }
  }
  onSeeDetailMember(item) {
    if (this.user !== 'user') {
      let _id = item.member_id;
      const dialogRef = this.dialog.open(ModalProfileComponent, {
        width: '800px',
        height: '500px',
        data: _id,
        disableClose: false
      });
      // dialogRef.componentInstance.dataCutomer.subscribe(data => {
      // console.log(data);
      // this.address = data;
      // });
    }
  }
  async getMe() {
    try {
      let user: any = await this.teameServicec.me()
      console.log(user)
      if (!user.data.ref1) {
        this.router.navigate(['/home']);
        console.log('asd');
      } else {
        // console.log('sdf');
        this.team_id = user.data.ref1;
        this.user = user.data.roles[0];
        this.getDataMember();
        this.userId = user.data._id
        this.chartData();
      }
    } catch (error) {

    }
  }

}
