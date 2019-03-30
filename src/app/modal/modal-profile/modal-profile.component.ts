import { environment } from './../../../environments/environment';
import { TeameServiceService } from './../../services/teams-service/teame-service.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { HistoryServiceService } from 'src/app/services/history-service/history-service.service';

@Component({
  selector: 'app-modal-profile',
  templateUrl: './modal-profile.component.html',
  styleUrls: ['./modal-profile.component.scss']
})
export class ModalProfileComponent implements OnInit {
  typeChart: any;
  dataChart: any;
  optionsChart: any;
  typeChartPie: any;
  dataChartPie: any;
  optionsChartPie: any;
  dataUser: any;
  user: any;
  constructor(
    private teamService: TeameServiceService,
    private thisDialogRef: MatDialogRef<ModalProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public spinner: NgxSpinnerService,
    private historyService: HistoryServiceService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.spinner.show();
    }, 1);
    let user: any = JSON.parse(window.localStorage.getItem(environment.apiUrl + '@user'));
    // this.user = user.data;
    console.log(this.data);
    if (this.data) {
      this.getUser();
    } else {
      this.getMe();
    }
  }

  async getMe() {
    try {
      let res: any = await this.teamService.me();
      this.dataUser = res.data;
      // console.log(res);
      this.getHistory(res.data._id)
      this.chartData();
    } catch (error) {
      console.log(error);
      this.spinner.hide();
    }
  }
  async getUser() {
    try {
      let res: any = await this.teamService.getUserById(this.data);
      this.dataUser = res.data;
      // console.log(res);
      this.getHistory(res.data._id)
      this.chartData();
    } catch (error) {
      console.log(error);
      this.spinner.hide();
    }
  }
  async getHistory(_id) {
    let res: any = await this.historyService.getHistory(_id);
    console.log(res);
  }

  chartData() {
    this.typeChart = 'line';   ////// สามารถกำหนดเป็น 'line','bar','radar','pie','doughnut','polarArea','bubble','scatter'
    this.dataChart = {
      labels: ["8.00", "9.00", "10.00", "11.00", "12.00", "13.00", "14.00", "15.00", "16.00", "17.00"],
      datasets: [
        {
          label: "แสงตะวัน",
          data: [20, 15, 14, 11, 20, 15, 14, 18, 23, 23],
          backgroundColor: "rgba(0,0,0,0)",
          borderColor: "#ff0000"
        },
        {
          label: "จันทร์ฉาย",
          data: [31, 26, 14, 12, 31, 33, 18, 18, 40, 36],
          backgroundColor: "rgba(0,0,0,0)",
          borderColor: "#ffff00"
        },
        {
          label: "สายรุ้ง",
          data: [30, 19, 10, 35, 28, 25, 25, 25, 35, 35],
          backgroundColor: "rgba(0,0,0,0)",
          borderColor: "#ff007f"
        },
        {
          label: "ป.1",
          data: [39, 39, 39, 50, 50, 59, 64, 64, 64, 64, 64],
          backgroundColor: "rgba(0,0,0,0)",
          borderColor: "#007fff"
        },
        {
          label: "ป.5",
          data: [34, 34, 38, 33, 33, 57, 58, 54, 54, 54, 54],
          backgroundColor: "rgba(0,0,0,0)",
          borderColor: "#00ff00"
        }
      ]
    };
    this.optionsChart = {
      responsive: true,
      maintainAspectRatio: false
    };
    this.chartPieData();
  }
  chartPieData() {
    this.typeChartPie = 'pie';   ////// สามารถกำหนดเป็น 'line','bar','radar','pie','doughnut','polarArea','bubble','scatter'
    this.dataChartPie = {
      labels: ["แป้งทาหน้า", "ลิปสติก", "น้ำหอม", "ครีม"],
      datasets: [
        {
          label: "My Stats Chart",
          data: [10, 30, 50, 40],
          backgroundColor: ['#1abc9c', '#3498db', '#9b59b6', '#bdc3c7']
        }
      ]
    };
    this.optionsChartPie = {
      responsive: true,
      maintainAspectRatio: false
    };
    this.spinner.hide();
  }
}
