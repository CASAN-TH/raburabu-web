import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-graph-all',
  templateUrl: './graph-all.component.html',
  styleUrls: ['./graph-all.component.scss']
})
export class GraphAllComponent implements OnInit {
  typeChart: any;
  dataChart: any;
  optionsChart: any;
  constructor(
    public ngXspinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.ngXspinner.show();
    this.chartData()
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
    this.ngXspinner.hide();
  }
}
