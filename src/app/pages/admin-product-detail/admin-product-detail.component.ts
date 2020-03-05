import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin-product-detail',
  templateUrl: './admin-product-detail.component.html',
  styleUrls: ['./admin-product-detail.component.scss']
})
export class AdminProductDetailComponent implements OnInit {

  productData: any;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private spinner: NgxSpinnerService
  ) { }

  async ngOnInit() {
    let id = await this.route.snapshot.paramMap.get('id');
    if (id) {
      try {
        let res: any = await this.productsService.getProductById(id);
        this.productData = res.data;
        console.log(this.productData);
        this.spinner.hide();
      } catch (error) {
        console.log(error)
        this.spinner.hide();
      }
    }
  }

  

}
