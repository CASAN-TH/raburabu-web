import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material';
import { MonitorService } from 'src/app/services/monitor/monitor.service';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {

  constructor(
    private router: Router,
    private monitorService: MonitorService

  ) { }
  datalength: any = 0;
  data: any = [
    {
      trackno: '1D1245822DA55TH',
      orderno: '1100501307564',
      name: 'พลวัฒน์ ช่างเก็บ',
      totalqty: '15',
    }, {
      trackno: '2D1245822DA55TH',
      orderno: '1100501307564',
      name: 'เพียว ช่างเก็บ',
      totalqty: '17',
    }, {
      trackno: '3D1245822DA55TH',
      orderno: '1100501307564',
      name: 'ช่างเก็บ พลวัฒน์',
      totalqty: '19',
    },
  ]
  length = 100;
  pageSize = 1;
  pageSizeOptions: number[] = [1];
  pageEvent: PageEvent;
  waitwithdrawal: any = [];
  waitpack: any = [];
  label: any = [];
  waitshipping: any = [];
  complete: any = [];


  async ngOnInit() {
    let res: any = await this.monitorService.getMonitorAll();
    console.log(res);
    res.data.forEach(data => {
      if (data.status === "waitwithdrawal") {
        this.waitwithdrawal.push(data);
      }
      if (data.status === "waitpack") {
        this.waitpack.push(data)
      }
      if (data.status === "waitshipping") {
        this.waitshipping.push(data)
      }
      if (data.status === "complete") {
        this.complete.push(data)
      }
    });
    console.log(this.waitwithdrawal);
    console.log(this.waitpack);
    console.log(this.waitshipping);
    console.log(this.complete);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  page(e) {
    if (e) {
      // console.log(e);
      this.datalength = e.pageIndex;
    }
  }

  gotoOrderReport() {
    this.router.navigate(["/order-report-detail"]);

  }
}
