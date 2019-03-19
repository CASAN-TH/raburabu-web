import { OrderService } from './../../services/order/order.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';
import { MatDialog } from '@angular/material';
import { SelectOptionComponent } from 'src/app/modal/select-option/select-option.component';
import { OrderService } from 'src/app/services/order/order.service';
import { environment } from 'src/environments/environment.prod';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  address: any;
  data: any = {
    customer: {
      firstname: '',
      lasname: '',
      tel: null,
      address: [],
    },
    items: [],
    totalamount: 0
  }
  namePayment: any = '';
  paymentType: Array<any> = [
    'ชำระเงินปลายทาง'
    , 'ชำระเงินผ่านธนาคาร'

  ];
  idOrder: any;

  constructor(
    private route: ActivatedRoute,
    private prodService: ProductsService,
    public dialog: MatDialog,
    private orderService: OrderService,
    public router: Router,
    public ngxSpinner: NgxSpinnerService,
    private order: OrderService

  ) { }

  prodData: any;

  ngOnInit() {
    let user: any = JSON.parse(window.localStorage.getItem(environment.apiUrl + '@user'));
    if (user.data.roles[0] === 'user') {
      this.router.navigate(['/home']);
      // console.log('asd');
    } else {
      this.idOrder = this.route.snapshot.paramMap.get('idOrder');
      console.log(this.idOrder);
      let res: any = this.route.snapshot.paramMap.get('title');
      this.address = JSON.parse(res)
      // console.log(this.address);
      if (this.idOrder) {
        this.getOrderById();
      }
      this.getProd();
    }
  }
  async getOrderById() {
    try {
      let res: any = await this.order.getByIdOrderList(this.idOrder);
      console.log(res);
    } catch (error) {

    }
  }

  async getProd() {
    this.ngxSpinner.show();
    try {
      let res: any = await this.prodService.order();
      // console.log(res);
      this.prodData = res.data;
      this.ngxSpinner.hide();
      // console.log(this.prodData);
    } catch (error) {
      this.ngxSpinner.hide();

    }

  }

  openmodal(i) {
    const dialogRef = this.dialog.open(SelectOptionComponent, {
      width: '800px',

      data: i,
      disableClose: false
    });
    dialogRef.componentInstance.sendData.subscribe(res => {
      dialogRef.afterClosed().subscribe(result => {
        this.data.items.push(res);
        // console.log(this.data);
        this.data.totalamount = 0
        this.data.items.forEach(sum => {
          this.data.totalamount += sum.amout
        });
        // console.log(this.data.totalamount);
      });
    });
  }

  async onSave() {
    this.ngxSpinner.show();
    try {
      let user: any = JSON.parse(window.localStorage.getItem(environment.apiUrl + '@user'));
      let body = {
        customer: {
          firstname: this.address.firstname,
          lasname: this.address.lastname,
          tel: this.address.tel,
          address: [
            {
              houseno: this.address.address.houseno,
              village: this.address.address.village,
              street: this.address.address.street,
              subdistrict: this.address.address.subdistrict,
              district: this.address.address.district,
              province: this.address.address.province,
              zipcode: this.address.address.zipcode
            }
          ]
        },
        items: this.data.items,
        paymenttype: {
          name: this.namePayment
        },
        totalamount: this.data.totalamount,
        user_id: user.data._id
      }
      console.log(body);
      console.log(this.data.items);
      let res: any = await this.orderService.saveOrder(body);
      console.log(res);
      this.ngxSpinner.hide();
      this.router.navigate(['/order-list']);
    } catch (error) {
      this.ngxSpinner.hide();

    }

  }

  selectPaymentType(item) {
    // console.log(item);
    this.namePayment = item;
  }

  deleteProd(item, i) {
    // console.log(i);
    // console.log(item);
    this.data.items.splice(i, 1);
    // console.log(this.data.items);
  }


}
