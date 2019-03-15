import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';
import { MatDialog } from '@angular/material';
import { SelectOptionComponent } from 'src/app/modal/select-option/select-option.component';
import { OrderService } from 'src/app/services/order/order.service';
import { environment } from 'src/environments/environment.prod';

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
      address: '',
    },
    items: [

    ],
    totalamount: 0
  }
  namePayment: any;
  paymentType: Array<any> = [
    'ชำระเงินปลายทาง'
    , 'ชำระเงินผ่านธนาคาร'

  ];


  constructor(
    private route: ActivatedRoute,
    private prodService: ProductsService,
    public dialog: MatDialog,
    private orderService: OrderService,
    public router: Router
  ) { }

  prodData: any;

  ngOnInit() {
    let res: any = this.route.snapshot.paramMap.get('title');
    this.address = JSON.parse(res)
    console.log(this.address);
    this.getProd();
  }

  async getProd() {
    let res: any = await this.prodService.order();
    // console.log(res);
    this.prodData = res.data;
    console.log(this.prodData);
  }

  openmodal(i) {
    // console.log(i)
    const dialogRef = this.dialog.open(SelectOptionComponent, {
      width: '800px',
      height: '500px',
      data: i,
      disableClose: false
    });
    dialogRef.componentInstance.sendData.subscribe(res => {
      dialogRef.afterClosed().subscribe(result => {
        this.data.items.push(res);
        console.log(this.data);
        this.data.totalamount = 0
        this.data.items.forEach(sum => {
          this.data.totalamount += sum.amout
        });
        console.log(this.data.totalamount);
      });
    });
  }

  async onSave() {
    let user: any = JSON.parse(window.localStorage.getItem(environment.apiUrl + '@user'));
    this.data = {
      customer: {
        firstname: this.address.fname,
        lasname: this.address.lname,
        tel: this.address.tel,
        address: this.address.address,
      },
      items: this.data.items,
      paymenttype: {
        name: this.namePayment
      },
      totalamount: this.data.totalamount,
      user_id: user.data._id
    }
    console.log(this.data);
    let res: any = await this.orderService.saveOrder(this.data);
    console.log(res);
    this.router.navigate(['/order-list']);
  }


  selectPaymentType(item) {
    console.log(item);
    this.namePayment = item;
  }


}
