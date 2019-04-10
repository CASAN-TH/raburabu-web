import { ModalConfirmsComponent } from './../../modal/modal-confirms/modal-confirms.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, PageEvent } from '@angular/material';
import { MonitorService } from 'src/app/services/monitor/monitor.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-monitor-all',
  templateUrl: './search-monitor-all.component.html',
  styleUrls: ['./search-monitor-all.component.scss']
})
export class SearchMonitorAllComponent implements OnInit {
  user: any;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private monitorService: MonitorService,
    public ngxSpiner: NgxSpinnerService
  ) { }
  datalength: any = 0;
  // data: any = [

  // ]
  length = 100;
  pageSize = 1;
  pageSizeOptions: number[] = [1];
  pageEvent: PageEvent;
  waitwithdrawal: any = [];
  waitpack: any = [];
  label: any = [];
  waitshipping: any = [];
  complete: any = [];
  keyword: string;
  allMonitor: any = [];
  ngOnInit() {
    let user: any = JSON.parse(window.localStorage.getItem(environment.apiUrl + "@user"));
    console.log(user);
    this.user = user.data;
    this.ngxSpiner.hide();

    // console.log(user);

    this.getMonitorTeam();

    this.getMonitor();

  }

  async getMonitorTeam() {
    try {
      // this.ngxSpiner.show()
      this.waitwithdrawal = [];
      this.waitpack = [];
      this.waitshipping = [];
      this.complete = [];
      this.allMonitor = [];
      let res: any = await this.monitorService.getMonitorTeam(this.user.ref1);
      this.allMonitor = res.data;
      console.log(this.allMonitor);
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
    } catch (error) {

    }
  }

  async getMonitor() {
    // this.ngxSpiner.show()
    this.waitwithdrawal = [];
    this.waitpack = [];
    this.waitshipping = [];
    this.complete = [];
    this.allMonitor = [];
    let res: any = await this.monitorService.getMonitorAll();
    this.allMonitor = res.data;
    console.log(this.allMonitor)
    res.data.forEach(data => {
      // console.log(data)
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
    // console.log(this.waitshipping);
    // console.log(this.complete);
  }

  async toWaitPack(item) {
    // console.log(item);
    item.orders.forEach(order => {
      // console.log(order);
      order.labels.push({
        address: order.customer.address,
        customer: order.customer,
        productlist: order.items
      })
    });
    let body = {
      status: 'waitpack',
      orders: item.orders
    }
    // console.log(body);
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

  print(moniter_id) {
    window.open(environment.apiUrl + '/api/monitor/reportdetail/' + moniter_id)
  }

  printLabel(item) {
    console.log(item)
    window.open(environment.apiUrl + '/api/monitor/reportlable/' + item._id)
  }
}
