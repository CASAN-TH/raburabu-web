import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-own-dashboad',
  templateUrl: './own-dashboad.component.html',
  styleUrls: ['./own-dashboad.component.scss']
})
export class OwnDashboadComponent implements OnInit {
  dataChart: any;
  optionsChart: any;
  colorChart: any = [
    "pink",
    "orange",
    "green"
  ]
  bgChart: any = "rgba(0,0,0,0)"
  typeChart: string;
  constructor() { }

  ngOnInit() {
    this.chartData();
  }

  chartData() {
    this.typeChart = 'line';   ////// สามารถกำหนดเป็น 'line','bar','radar','pie','doughnut','polarArea','bubble','scatter'
    this.dataChart = {
      labels: ["1", "2", "3", "4", "5", "5", "6", "7", "8", "9", "10", "11", "12","13", "14", "15","16", "17","18","19","20","21","22","23","24","25","26","27","28","29","30"],
      datasets: [
        {
          label: "ลิปแมท มินิ",
          data: [100,120,140,150,140,150,180,200,220,220,240,250,300,300,320,330,320,340,360,350,360,360,360,360,360,360,360,400,450,500,500],
          // backgroundColor: "rgba(0,0,0,0)",
          // borderColor: "#ff0000"
        },
        {
          label: "ลิปแมท",
          data: [50,120,170,180,180,190,230,200,220,210,250,260,350,300,360,380,390,390,390,450,460,460,460,460,460,460,460,450,450,450,450],
          // backgroundColor: "rgba(0,0,0,0)",
          // borderColor: "#ff0000"
        },
        {
          label: "แป้งพัฟ",
          data: [0,30,70,80,80,90,130,100,120,110,150,160,150,200,260,280,290,290,290,250,260,260,260,260,260,260,260,250,250,250,300],
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

}
