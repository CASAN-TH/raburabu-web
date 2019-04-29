import { OrderService } from './../../services/order/order.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';
import { MatDialog } from '@angular/material';
import { SelectOptionComponent } from 'src/app/modal/select-option/select-option.component';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalAddressComponent } from 'src/app/modal/modal-address/modal-address.component';
import { ModalConfirmsComponent } from 'src/app/modal/modal-confirms/modal-confirms.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  rewards: Array<any> = [];
  teamId: any;
  address: any;
  data: any = {
    customer: {
      firstname: '',
      lastname: '',
      tel: null,
      address: [],
    },
    items: [],
    totalamount: 0
  }
  namePayment: any = '';
  paymentType: Array<any> = [
    'เก็บเงินปลายทาง'
    , 'โอนแล้ว'

  ];
  idOrder: any;

  constructor(
    private route: ActivatedRoute,
    private prodService: ProductsService,
    public dialog: MatDialog,
    private orderService: OrderService,
    public router: Router,
    public ngxSpinner: NgxSpinnerService,

  ) { }

  prodData: any;

  async ngOnInit() {
    // this.ngxSpinner.hide();
    this.ngxSpinner.show();
    let user: any = JSON.parse(window.localStorage.getItem(environment.apiUrl + '@user'));
    this.teamId = user.data.ref1;
    // console.log(user)
    if (user.data.roles[0] === 'user') {
      this.router.navigate(['/home']);
      // console.log('asd');
    } else {
      this.getProd();
      let _id = await this.route.snapshot.paramMap.get('idOrder');
      this.idOrder = await JSON.parse(_id);
      // console.log(this.idOrder);
      // console.log(this.address);
      if (this.idOrder) {
        this.getOrderById();
      } else {
        let res: any = this.route.snapshot.paramMap.get('title');
        this.address = JSON.parse(res)
      }
    }
  }
  async getOrderById() {
    try {
      let res: any = await this.orderService.getByIdOrderList(this.idOrder);
      if (res) {
        this.address = await res.data.customer
        res.data.customer.address.forEach(address => {
          // console.log(address);
          this.address.address = address;
        });
        this.data.items = res.data.items;
        // console.log(this.data.items);
        let index = this.paymentType.findIndex(name => name === res.data.paymenttype.name);
        // console.log(index);
        this.namePayment = this.paymentType[index];
        this.data.totalamount = res.data.totalamount;
        // this.data.items.forEach(sum => {
        //   this.data.totalamount += sum.amount
        // });
      }
      // console.log(res);
      this.ngxSpinner.hide();
    } catch (error) {
      console.log(error);
      this.ngxSpinner.hide();
    }
  }

  async getProd() {
    try {
      let res: any = await this.prodService.order();
      // console.log(res);
      this.prodData = res.data;
      this.ngxSpinner.hide();
      // console.log(this.prodData);
    } catch (error) {
      this.ngxSpinner.hide();
      console.log(error);
    }

  }

  openmodal(i) {
    const dialogRef = this.dialog.open(SelectOptionComponent, {
      width: '800px',
      height: 'auto',
      data: i,
      disableClose: false
    });
    dialogRef.componentInstance.sendData.subscribe(res => {
      dialogRef.afterClosed().subscribe(result => {
        // console.log(res);
        // console.log(this.data);
        let i: any = this.data.items.findIndex(function (prod) {
          // console.log(prod)
          return prod.name === res.name
        });
        let j: any = this.rewards.findIndex((data) => { return data.name == res.name })
        // console.log(check);
        if (res.reward === true) {
          if (j < 0) {
            this.rewards.push(res)
            // console.log(this.rewards)
          } else {
            let sumTotal = this.rewards[j].totalqty + res.totalqty;
            this.rewards[j].totalqty = sumTotal;
            res.option[0].value.forEach(value => {
              let k: any = this.rewards[j].option[0].value.findIndex(function (value2) {
                return value.name === value2.name
              });
              if (k < 0) {
                this.rewards[j].option[0].value.push(value);
              } else {
                let sumQty = this.rewards[j].option[0].value[k].qty + value.qty
                this.rewards[j].option[0].value[k].qty = sumQty
              }
            });
          }
        } else {
          if (i < 0) {
            this.data.items.push(res);

          } else {
            let sumTotal = this.data.items[i].totalqty + res.totalqty;
            this.data.items[i].totalqty = sumTotal;
            res.option[0].value.forEach(value => {
              let j: any = this.data.items[i].option[0].value.findIndex(function (value2) {
                return value.name === value2.name
              });
              if (j < 0) {
                this.data.items[i].option[0].value.push(value);
              } else {
                let sumQty = this.data.items[i].option[0].value[j].qty + value.qty
                this.data.items[i].option[0].value[j].qty = sumQty
              }
            });
          }
        }


        this.getProd();
      });
    });
  }

  onEditAddress() {
    const dialogRef = this.dialog.open(ModalAddressComponent, {
      width: '800px',
      data: this.address,
      disableClose: false
    });
    dialogRef.componentInstance.dataCutomer.subscribe(data => {
      // console.log(data);
      this.address = data;
    });
  }

  async onSave() {
    this.ngxSpinner.show();
    try {
      let user: any = JSON.parse(window.localStorage.getItem(environment.apiUrl + '@user'));
      let body = {
        team_id: this.teamId,
        customer: {
          firstname: this.address.firstname,
          lastname: this.address.lastname,
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
        rewards: this.rewards,
        items: this.data.items,
        paymenttype: {
          name: this.namePayment
        },
        totalamount: this.data.totalamount,
        user_id: user.data._id
      }
      // console.log(body)
      if (this.idOrder) {
        let res: any = await this.orderService.editOrder(this.idOrder, body);

        this.ngxSpinner.hide();
        this.router.navigate(['/order-list']);
      } else {
        let res: any = await this.orderService.saveOrder(body);

        this.ngxSpinner.hide();
        this.router.navigate(['/order-list']);
      }
    } catch (error) {
      this.ngxSpinner.hide();
      console.log(error);
    }

  }

  selectPaymentType(item) {
    this.namePayment = item;
    // console.log(this.namePayment);
  }

  deleteProd(item, i) {
    // console.log(item);
    const dialogRef = this.dialog.open(ModalConfirmsComponent, {
      width: '400px',
      data: {
        title: 'ยืนยันการลบสินค้า',
        message: "คุณต้องการลบสินค้าในตะกร้าสินค้าหรือไม่?"
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(async result => {

      if (result) {
        if (item.reward === true) {
          this.rewards.splice(i, 1)
        } else {
          this.data.items.splice(i, 1);
        }
        // this.data.totalamount = 0
        // this.data.items.forEach(sum => {
        //   this.data.totalamount += sum.amount
        // });
        this.ngxSpinner.hide();
      }
    });
  }

  onCancel() {
    const dialogRef = this.dialog.open(ModalConfirmsComponent, {
      width: '400px',
      data: {
        title: "ยกเลิกการทำรายการ",
        message: "คุณต้องการยกเลิกการทำรายการใช่ หรือไม่?"
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(async result => {
      // console.log(result)
      if (result) {
        this.router.navigate(['/order-list']);
      }
    });
    //
  }


}
