import { Component, OnInit, Type } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalAddressComponent } from 'src/app/modal/modal-address/modal-address.component';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  dataorder: any;
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
    public order: OrderService

  ) { }

  ngOnInit() {
    let user: any = JSON.parse(window.localStorage.getItem(environment.apiUrl + '@user'));
    if (!user.data.ref1) {
      this.router.navigate(['/home']);
      // console.log('asd');
    } else {
      this.getOrderList();
    }
  }

  async getOrderList() {

    try {
      let res: any = await this.order.orderList();
      this.dataorder = res.data;
      console.log(this.dataorder)
    } catch (error) {
      console.log(error)
    }
  }

  openmodal() {
    const dialogRef = this.dialog.open(ModalAddressComponent, {
      width: '800px',
      height: '400px',
      disableClose: false
    });
    dialogRef.componentInstance.dataCutomer.subscribe(gogo => {
      dialogRef.afterClosed().subscribe(result => {

        if (result) {
          this.router.navigate(['/order', { title: JSON.stringify(gogo), si: true }]);
          console.log(gogo);
        }
      });



    });
  }
}
