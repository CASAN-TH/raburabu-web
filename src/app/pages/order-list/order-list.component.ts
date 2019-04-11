import { MonitorService } from './../../services/monitor/monitor.service';
import { ModalConfirmsComponent } from './../../modal/modal-confirms/modal-confirms.component';
import { TeameServiceService } from './../../services/teams-service/teame-service.service';
import { Component, OnInit, Type } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalAddressComponent } from 'src/app/modal/modal-address/modal-address.component';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  dataTeam: any;
  dataOrderAll: Array<any> = [];
  dataOrderMember: any;
  idMember: Array<String> = [];
  user: any;
  rolesUser: any;
  dataorder: any;
  teamID: any;
  data: any = [
    {
      orderno: '190313001',
      firstname: 'ponlawath',
      lastname: 'changkeb',
      tel: '0853271652',
      totalamount: 2000
    },
    {
      orderno: '190313002',
      firstname: 'ponlawath',
      lastname: 'changkeb',
      tel: '0853271652',
      totalamount: 2000
    },
    {
      orderno: '190313003',
      firstname: 'ponlawath',
      lastname: 'changkeb',
      tel: '0853271652',
      totalamount: 2000
    }
  ]

  constructor(
    public dialog: MatDialog,
    public router: Router,
    public ngxSpinner: NgxSpinnerService,
    public order: OrderService,
    public teamService: TeameServiceService,
    private monitorService: MonitorService

  ) { }

  async ngOnInit() {
    // this.ngxSpinner.hide();
    this.ngxSpinner.show();
    // this.order.onNewMessage().subscribe(msg => {
    //   console.log('got a msg: ' + msg);
    // });
    let user: any = JSON.parse(window.localStorage.getItem(environment.apiUrl + '@user'));
    // console.log(user.data.roles[0]);
    if (user.data.roles[0] === 'user') {
      this.router.navigate(['/home']);
      // console.log('asd');
    } else {
      this.user = user;
      let id: any = {
        userid: this.user.data._id
      }
      // console.log(id);
      this.idMember.push(id);
      this.rolesUser = user.data.roles[0];
      this.teamID = user.data.ref1;
      // console.log(this.teamID)
      this.getTeam();
      this.getOrderOwnerAndMember();
      // console.log(this.rolesUser);
      if (!user.data.ref1) {
        this.router.navigate(['/home']);
        // console.log('asd');
      } else {
        this.getOrderList();
      }
    }
  }

  async getOrderList() {
    try {
      let res: any = await this.order.orderList();
      this.dataorder = res.data;
      this.ngxSpinner.hide();
      // console.log(this.dataorder)
    } catch (error) {
      // console.log(error)
    }
  }

  openmodal() {
    const dialogRef = this.dialog.open(ModalAddressComponent, {
      width: '800px',
      // height: '500px',
      disableClose: false
    });
    dialogRef.componentInstance.dataCutomer.subscribe(gogo => {
      dialogRef.afterClosed().subscribe(result => {

        if (result) {
          this.router.navigate(['/order', { title: JSON.stringify(gogo), si: false }]);
          // console.log(gogo);
        }
      });
    });
  }
  async getTeam() {
    try {
      let res: any = await this.teamService.getById(this.teamID);
      this.dataTeam = res.data;
      // console.log(res);
      this.ngxSpinner.hide();
    } catch (error) {
      console.log(error);
    }
  }
  async getOrderOwnerAndMember() {
    try {
      if (this.rolesUser === 'owner') {
        // console.log(this.idMember)
        let resOder: any = await this.order.getOrder(this.teamID);
        this.dataOrderAll = resOder.data;
        // console.log(this.dataOrderAll)
        this.ngxSpinner.hide();
      }
      if (this.rolesUser === 'staff') {
        // console.log(this.user.data._id)
        let resOrderByUser: any = await this.order.getOrderByUser(this.user.data._id);
        this.dataOrderAll = resOrderByUser.data;
        // console.log(this.dataOrderMember);
        this.ngxSpinner.hide();
      }
    } catch (error) {
      this.ngxSpinner.hide();
    }
  }
  async onDelete(item) {
    try {
      const dialogRef = this.dialog.open(ModalConfirmsComponent, {
        width: '400px',
        data: {
          title: 'ยืนยันการลบใบสั่งซื้อ',
          message: "คุณต้องการลบใบสั่งซื้อสินค้าหรือไม่?"
        },
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(async result => {

        if (result) {
          let res: any = await this.order.deleteOrder(item._id);

          this.ngOnInit();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  onClickEdit(item) {
    try {
      // console.log(item._id);
      this.router.navigate(['/order', { idOrder: JSON.stringify(item._id), si: false }]);

    } catch (error) {

    }
  }

  async sendOrder() {
    if (this.dataOrderAll.length > 0) {
      try {
        const dialogRef = this.dialog.open(ModalConfirmsComponent, {
          width: '400px',
          data: {
            title: 'ยืนยันการส่งใบสั่งซื้อ',
            message: "ต้องการส่งใบสั่งซื้อหรือไม่?"
          },
          disableClose: true
        });
        let tot = 0
        let dataOrder = [];

        dialogRef.afterClosed().subscribe(async result => {
          this.dataOrderAll.forEach(total => {
            // console.log(total);
            tot += total.totalamount;
            dataOrder.push({
              customer: {
                firstname: total.customer.firstname,
                lastname: total.customer.lastname,
                tel: total.customer.tel,
                address: total.customer.address[0]
              },
              orderno: total.orderno,
              items: total.items,
              totalamount: total.totalamount,
              user_id: total.user_id,
              paymenttype: total.paymenttype,
            })
          });
          if (result) {
            let sendOrder: any = {
              team: {
                team_id: this.teamID,
                teamname: this.dataTeam.name,
                codeteam: this.dataTeam.codeteam
              },
              orders: dataOrder,
              status: 'waitwithdrawal',
              totalorderamount: tot
            }
            // console.log(sendOrder);
            let resMonitor: any = await this.monitorService.sendOrderToMonitor(sendOrder);
            // console.log(resMonitor);
            if (resMonitor) {
              let res: any = await this.order.sendOrderAll(this.teamID);
              // console.log(res);
            }
            this.getOrderOwnerAndMember();
          }
        })
      } catch (error) {
        console.log(error);
      }
    }

  }
}


// onDelete(item) {
  //   console.log(item)
  //   Swal.fire({
  //     title: 'ต้องการลบใบสั่งซื้อใช่หรือไม่?',
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#ff4081',
  //     cancelButtonColor: '#d33',
  //     cancelButtonText: 'ไม่ใช่',
  //     confirmButtonText: 'ใช่!'
  //   }).then((result) => {
  //     if (result.value) {
  //       Swal.fire(
  //         'Deleted!',
  //         'Your file has been deleted.',
  //         'success'
  //       )
  //     }
  //   })
  // }