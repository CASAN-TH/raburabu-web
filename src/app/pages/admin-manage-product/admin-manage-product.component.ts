import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-manage-product',
  templateUrl: './admin-manage-product.component.html',
  styleUrls: ['./admin-manage-product.component.scss']
})
export class AdminManageProductComponent implements OnInit {

  productData: any;

  constructor(
    private productService: ProductsService,
    public ngXspinner: NgxSpinnerService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.ngXspinner.show();
    this.getProductData();
  }

  async getProductData() {
    try {
      let res: any = await this.productService.order();
      this.productData = res.data
      this.ngXspinner.hide();
    } catch (error) {
      this.ngXspinner.hide();
      console.log(error);
    }
  }

  async openModalProduct(id) {
    this.ngXspinner.show();
    this.router.navigate(["/admin-product-detail", { id: id }]);
  }

}
