import { ProductsService } from './../../services/products/products.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss']
})
export class SelectOptionComponent implements OnInit {
  optionProduct: Array<any> = []
  product: any;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    public servicePorduct: ProductsService
  ) { }

  ngOnInit() {
    this.getProduct();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  async getProduct() {
    try {
      let res: any = await this.servicePorduct.order();
      this.product = res.data
      this.product.forEach(product => {
        product.option.forEach(option => {
          this.optionProduct.push(option)
          console.log(this.optionProduct);
        });
      });
      console.log(this.product);
    } catch (error) {

    }
  }
}
