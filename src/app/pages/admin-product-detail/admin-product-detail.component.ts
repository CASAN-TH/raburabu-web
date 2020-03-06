import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-product-detail',
  templateUrl: './admin-product-detail.component.html',
  styleUrls: ['./admin-product-detail.component.scss']
})
export class AdminProductDetailComponent implements OnInit {

  titleName: any;
  productData: any;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private spinner: NgxSpinnerService,
    private location: Location
  ) { }

  async ngOnInit() {
    let id = await this.route.snapshot.paramMap.get('id');
    if (id !== "new") {
      this.titleName = "แก้ไขสินค้า";
      try {
        let res: any = await this.productsService.getProductById(id);
        this.productData = res.data;
        console.log(this.productData);
        this.spinner.hide();
      } catch (error) {
        console.log(error);
        this.spinner.hide();
      }
    } else {
      this.titleName = "เพิ่มสินค้า";
      this.productData = {
        "name": "",
        "price": null,
        "image": "",
        "reward": false,
        "option": [
          {
            "name": "",
            "value": []
          }
        ]
      }
      console.log(this.productData)
      this.spinner.hide();
    }
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drop(ev) {
    ev.preventDefault();
    const files = ev.dataTransfer.files;
    // this.validateFile(files);
  }

  setValue(event) {
    if (event.checked) {
      this.productData.reward = true;
    } else {
      this.productData.reward = false;
    }
  }

  onBack() {
    this.location.back();
  }

  onSave() {
    console.log(this.productData)
  }

}
