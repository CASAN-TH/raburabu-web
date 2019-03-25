import { ModalAddBoxComponent } from './../../modal/modal-add-box/modal-add-box.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageEvent, MatDialog } from '@angular/material';
import { MonitorService } from 'src/app/services/monitor/monitor.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalConfirmsComponent } from 'src/app/modal/modal-confirms/modal-confirms.component';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private monitorService: MonitorService,
    public ngxSpiner: NgxSpinnerService

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


  ngOnInit() {
    this.getMonitor();
  }

  async getMonitor() {
    this.ngxSpiner.show()
    this.waitwithdrawal = [];
    this.waitpack = [];
    this.waitshipping = [];
    this.complete = [];
    let res: any = await this.monitorService.getMonitorAll();
    // console.log(res);
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
    this.ngxSpiner.hide();
    console.log(this.waitwithdrawal);
    console.log(this.waitpack);
    console.log(this.waitshipping);
    console.log(this.complete);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  pageWaitPack(e, i, j) {
    // console.log(i, j);
    if (e) {
      // console.log(e);
      this.waitpack[i].orders[j].page = e.pageIndex
      console.log(this.waitpack);
    }
  }

  pageWaitShipping(e, i, j) {
    // console.log(i, j);
    if (e) {
      // console.log(e);
      this.waitshipping[i].orders[j].page = e.pageIndex
      console.log(this.waitshipping);
    }
  }

  gotoOrderReport(item) {
    // console.log(item);
    this.router.navigate(["/order-report-detail", { id: item._id }]);
  }

  addBox(itm, item) {
    // console.log(item);
    let data = {
      order_id: itm._id,
      monitor_id: item._id
    }
    // console.log(data)
    const dialogRef = this.dialog.open(ModalAddBoxComponent, {
      width: '600px',
      data: data,
      height: '400px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getMonitor();
      }
    });
  }

  async toWaitPack(item) {
    // console.log(item);
    let body = {
      status: 'waitpack'
    }
    const dialogRef = this.dialog.open(ModalConfirmsComponent, {
      width: '400px',
      data: { title: "การเบิกสินค้า", message: "คุณต้องการยืนยันการเบิกสินค้าหรือไม่" },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        let res: any = await this.monitorService.changStatus(item._id, body);
        // console.log(res);
        if (res) {
          this.getMonitor();
        }
      }
    });
  }

  async toWaitShipping(item) {
    // console.log(item);
    let body = {
      status: 'waitshipping'
    }
    const dialogRef = this.dialog.open(ModalConfirmsComponent, {
      width: '400px',
      data: { title: "การเเพ็คสินค้า", message: "คุณต้องการยืนยันการเเพ็คสินค้าหรือไม่" },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        let res: any = await this.monitorService.changStatus(item._id, body);
        // console.log(res);
        if (res) {
          this.getMonitor();
        }
      }
    });
  }

  async toComplete(item) {
    // console.log(item);
    let body = {
      status: 'complete'
    }
    const dialogRef = this.dialog.open(ModalConfirmsComponent, {
      width: '400px',
      data: { title: "การจัดส่งสินค้า", message: "คุณต้องการยืนยันการจัดส่งสินค้าหรือไม่" },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        let res: any = await this.monitorService.changStatus(item._id, body);
        // console.log(res);
        if (res) {
          this.getMonitor();
        }
      }
    });
  }




















































































}
