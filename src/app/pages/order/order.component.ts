import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  address: any;

  constructor(
    private route: ActivatedRoute,
    private prodService: ProductsService
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

}
