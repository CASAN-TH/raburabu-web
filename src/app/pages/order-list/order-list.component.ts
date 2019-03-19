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
  dataOrderOwner: any;
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
      // console.log(this.user)

      this.getDataTeam();
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
  async getDataTeam() {
    this.ngxSpinner.show();
    try {
      let res: any = await this.teamService.getById(this.teamID);
      // console.log(res);
      res.data.members.forEach(data => {
        // console.log(data);
        let id: any = {
          userid: data.member_id
        }
        // console.log(id)
        this.idMember.push(id);
      });
      this.ngxSpinner.hide();
    } catch (error) {
      this.ngxSpinner.hide();
    }
  }
  async getOrderOwnerAndMember() {
    this.ngxSpinner.show();
    try {
      if (this.rolesUser === 'owner') {
        console.log(this.idMember)
        let resOder: any = await this.order.getOrder(this.idMember);
        this.dataOrderOwner = resOder.data;
        console.log(resOder)
        this.ngxSpinner.hide();
      }
      if (this.rolesUser === 'staff') {
        // console.log(this.user.data._id)
        let resOrderByUser: any = await this.order.getOrderByUser(this.user.data._id);
        this.dataOrderMember = resOrderByUser.data;
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
        data: { message: "ลบใบสั่งซื้อ?" },
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
  onClickEdit(item){
    try {
      console.log(item._id);
      this.router.navigate(['/order', { idOrder: JSON.stringify(item._id), si: false }]);

    } catch (error) {
      
    }
  }
}
