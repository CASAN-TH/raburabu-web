import { ModalConfirmsComponent } from './../../modal/modal-confirms/modal-confirms.component';
import { TeameServiceService } from './../../services/teams-service/teame-service.service';
import { Component, OnInit, Type } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalAddressComponent } from 'src/app/modal/modal-address/modal-address.component';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

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
    public teamService: TeameServiceService

  ) { }

  async ngOnInit() {
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
      console.log(id);
      this.idMember.push(id);
      this.rolesUser = user.data.roles[0];
      this.teamID = user.data.ref1;
      console.log(this.teamID)
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
      console.log(res);
    } catch (error) {

    }
  }
  async getOrderOwnerAndMember() {
    this.ngxSpinner.show();
    try {
      if (this.rolesUser === 'owner') {
        console.log(this.idMember)
        let resOder: any = await this.order.getOrder(this.teamID);
        this.dataOrderAll = resOder.data;
        console.log(this.dataOrderAll)
        this.ngxSpinner.hide();
      }
      if (this.rolesUser === 'staff') {
        // console.log(this.user.data._id)
        let resOrderByUser: any = await this.order.getOrderByUser(this.user.data._id);
        this.dataOrderAll = resOrderByUser.data;
        console.log(this.dataOrderMember);
        this.ngxSpinner.hide();
      }
    } catch (error) {
      this.ngxSpinner.hide();
    }
  }
  async onDelete(item) {
    // console.log(item);
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
        // console.log(result)
        if (result) {
          let res: any = await this.order.deleteOrder(item._id);
          // console.log(res);
          // console.log(item);
          this.ngOnInit();
        }
      });

    } catch (error) {

    }
  }
  onClickEdit(item) {
    try {
      console.log(item._id);
      this.router.navigate(['/order', { idOrder: JSON.stringify(item._id), si: false }]);

    } catch (error) {

    }
  }

  async sendOrder() {
    if (this.dataOrderAll.length > 0) {
      try {
        const dialogRef = this.dialog.open(ModalConfirmsComponent, {
          width: '400px',
          data: { message: "ต้องการส่งใบสั่งซื้อหรือไม่?" },
          disableClose: true
        });
        let tot = 0
        dialogRef.afterClosed().subscribe(async result => {
          this.dataOrderAll.forEach(total => {
            console.log(total)
            tot += total.totalamount;
            console.log(tot);

          });
          if (result) {
            let sendOrder: any = {
              team: {
                team_id: this.teamID,
                teamname: this.dataTeam.name
              },
              orders: this.dataOrderAll,
              status: 'waitwithdrawal',
              totalorderamount: tot
            }
            console.log(sendOrder);

            // let res: any = await this.order.sendOrderAll(this.teamID);
            // this.getOrderOwnerAndMember();
            // console.log(res);
          }
        })


      } catch (error) {

      }
    }

  }
}
