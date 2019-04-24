import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, PageEvent } from '@angular/material';
import { MonitorService } from 'src/app/services/monitor/monitor.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { ModalMaxBoxComponent } from 'src/app/modal/modal-max-box/modal-max-box.component';
import { ModalAddBoxComponent } from 'src/app/modal/modal-add-box/modal-add-box.component';
import { ModalConfirmsComponent } from 'src/app/modal/modal-confirms/modal-confirms.component';

@Component({
  selector: 'app-stockpack',
  templateUrl: './stockpack.component.html',
  styleUrls: ['./stockpack.component.scss']
})
export class StockpackComponent implements OnInit {
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
    // this.ngxSpiner.hide()
    this.ngxSpiner.show()
    let user: any = JSON.parse(window.localStorage.getItem(environment.apiUrl + "@user"));
    this.user = user.data;
    // console.log(user);
    if (this.user.roles[0] === 'owner') {
      this.getMonitorTeam();
    } else {
      this.getMonitor();
    }
  }

  async getMonitorTeam() {
    // this.ngxSpiner.show()
    try {
      this.waitwithdrawal = [];
      this.waitpack = [];
      this.waitshipping = [];
      this.complete = [];
      this.allMonitor = [];
      let res: any = await this.monitorService.getMonitorTeam(this.user.ref1);
      this.allMonitor = res.data;
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
      console.log(error);
      this.ngxSpiner.hide();
    }
  }

  async getMonitor() {
    // this.ngxSpiner.show()
    try {
      this.waitwithdrawal = [];
      this.waitpack = [];
      this.waitshipping = [];
      this.complete = [];
      this.allMonitor = [];
      let res: any = await this.monitorService.getMonitorAll();
      // console.log(res);
      this.allMonitor = res.data;
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
    } catch (error) {
      console.log(error);
      this.ngxSpiner.hide();
    }
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
    if (this.user.roles[0] === 'owner') {
      this.getMonitorTeam();
    } else {
      this.getMonitor();
    }
  }

  printLabel(item, item2, label) {
    console.log(item2)
    console.log(label)
    let label_id: any;
    item.labels.forEach(labels => {
      console.log(labels)
    });
    window.open(environment.apiUrl + '/api/monitor/reportbylable/' + label._id)
    if (this.user.roles[0] === 'owner') {
      this.getMonitorTeam();
    } else {
      this.getMonitor();
    }
  }

  printLabelAll(item) {
    console.log(item);
    window.open(environment.apiUrl + '/api/monitor/reportlableall/' + item._id)
    if (this.user.roles[0] === 'owner') {
      this.getMonitorTeam();
    } else {
      this.getMonitor();
    }
  }

  gotoSearch() {
    this.router.navigate(['/search-monitor'])
  }

  async addBox(itm, item, label2) {
    let sumQty = 0;
    let res: any = await this.monitorService.getLabel(itm._id);
    res.data.productall.forEach(dataQty => {
      if (dataQty.qtyAll) {
        sumQty += dataQty.qtyAll === null ? 0 : dataQty.qtyAll
      }
    });
    // if (sumQty === 0 && itm.labels.length > 0) {
    //   let data = {
    //     order_id: itm._id,
    //     monitor_id: item._id
    //   }
    //   const dialogRef = this.dialog.open(ModalMaxBoxComponent, {
    //     width: '600px',
    //     data: data,
    //     height: '450px',
    //     disableClose: false
    //   });

    //   dialogRef.afterClosed().subscribe(result => {
    //     if (result) {
    //       this.getMonitor();
    //     }
    //   });
    // } else {
    let data = {
      order_id: itm._id,
      monitor_id: item._id,
      label_id: label2._id
    }
    // console.log(data)
    const dialogRef = this.dialog.open(ModalAddBoxComponent, {
      width: '600px',
      data: data,
      height: '500px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getMonitor();
      }
    });

    // }



  }

  async deleteLabel(item) {
    console.log(item);
    const dialogRef = this.dialog.open(ModalConfirmsComponent, {
      width: '400px',
      data: { title: "การลบใบปะหน้ากล่อง", message: "คุณต้องการยืนยันการลบใบปะหน้ากล่องหรือไม่" },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        let res = await this.monitorService.deleteLabel(item._id);
        this.ngxSpiner.show()
        if (res) {
          if (this.user.roles[0] === 'owner') {
            this.getMonitorTeam();
          } else {
            this.getMonitor();
          }
        }
      }
    });
  }
}
