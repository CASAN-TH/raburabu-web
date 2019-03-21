import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {

  constructor(
    private router: Router,

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

  // MatPaginator Output
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  page(e) {
    if (e) {
      // console.log(e);
      this.datalength = e.pageIndex;
    }
  }

  ngOnInit() {
  }
  gotoOrderReport() {
    this.router.navigate(["/order-report-detail"]);

  }
}
