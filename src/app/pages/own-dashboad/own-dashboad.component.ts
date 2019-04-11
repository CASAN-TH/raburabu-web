import { ModalConfirmsComponent } from './../../modal/modal-confirms/modal-confirms.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from './../../../environments/environment';
import { TeameServiceService } from './../../services/teams-service/teame-service.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-own-dashboad',
  templateUrl: './own-dashboad.component.html',
  styleUrls: ['./own-dashboad.component.scss']
})
export class OwnDashboadComponent implements OnInit {
  team_id: any;
  statusWaitApprove: Array<any> = [];
  statusMember: Array<any> = [];
  dataUserID: any;
  userId: any;
  dataTeam: any;
  dataChart: any;
  optionsChart: any;
  colorChart: any = [
    "pink",
    "orange",
    "green"
  ]
  bgChart: any = "rgba(0,0,0,0)"
  typeChart: string;
  constructor(
    private teameServicec: TeameServiceService,
    public ngxSpinner: NgxSpinnerService,
    public dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.ngxSpinner.show();
    this.chartData();
    let user = JSON.parse(window.localStorage.getItem(environment.apiUrl + '@user'));
    this.userId = user.data._id
    this.team_id = user.data.ref1;
    console.log(user);
    this.getDataMember();
  }

  chartData() {
    this.typeChart = 'line';   ////// สามารถกำหนดเป็น 'line','bar','radar','pie','doughnut','polarArea','bubble','scatter'
    this.dataChart = {
      labels: ["1", "2", "3", "4", "5", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
      datasets: [
        {
          label: "ลิปแมท มินิ",
          data: [100, 120, 140, 150, 140, 150, 180, 200, 220, 220, 240, 250, 300, 300, 320, 330, 320, 340, 360, 350, 360, 360, 360, 360, 360, 360, 360, 400, 450, 500, 500],
          // backgroundColor: "rgba(0,0,0,0)",
          // borderColor: "#ff0000"
        },
        {
          label: "ลิปแมท",
          data: [50, 120, 170, 180, 180, 190, 230, 200, 220, 210, 250, 260, 350, 300, 360, 380, 390, 390, 390, 450, 460, 460, 460, 460, 460, 460, 460, 450, 450, 450, 450],
          // backgroundColor: "rgba(0,0,0,0)",
          // borderColor: "#ff0000"
        },
        {
          label: "แป้งพัฟ",
          data: [0, 30, 70, 80, 80, 90, 130, 100, 120, 110, 150, 160, 150, 200, 260, 280, 290, 290, 290, 250, 260, 260, 260, 260, 260, 260, 260, 250, 250, 250, 300],
          // backgroundColor: "rgba(0,0,0,0)",
          // borderColor: "#ff0000"
        }
      ]
    };
    let i = 0;
    this.dataChart.datasets.forEach(data => {
      this.dataChart.datasets[i].borderColor = this.colorChart[i];
      this.dataChart.datasets[i].backgroundColor = this.bgChart;
      // console.log(data);
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
      // console.log(res);
      this.dataTeam = res.data;
      // console.log(this.dataTeam);
      let resp: any = this.dataTeam.members.filter((e) => {
        if (e.member_id === this.userId) {
          this.dataUserID = e;
        }
      })
      console.log(this.dataUserID);
      this.dataTeam.members.forEach(members => {
        if (members.status === 'waitapprove') {
          this.statusWaitApprove.push(members);
          console.log(this.statusWaitApprove)
        }
        if (members.status === 'staff') {
          this.statusMember.push(members);
          console.log(this.statusMember);
        }
      });
      this.ngxSpinner.hide();
    } catch (error) {
      this.ngxSpinner.hide();
      console.log(error)
    }
  }
  async cancel(item) {
    try {
      const dialogRef = this.dialog.open(ModalConfirmsComponent, {
        width: '400px',
        data: {
          title: "ปฏิเสธเข้าร่วมทีม",
          message: "ปฏิเสธสมาชิกเข้าสู่ทีม ใช่ หรือ ไม่ใช่?"
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
}
