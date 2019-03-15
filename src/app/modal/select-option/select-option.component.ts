import { ProductsService } from './../../services/products/products.service';
import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OrderComponent } from 'src/app/pages/order/order.component';

@Component({
  selector: 'app-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss']
})
export class SelectOptionComponent implements OnInit {
  @Output() sendData: EventEmitter<any> = new EventEmitter();
  checkIcon: any;
  nameOption: any;
  qty: any;
  selectOption: Array<any> = [];
  optionProduct: Array<any> = []
  product: any;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    public servicePorduct: ProductsService,
    public dialogRef: MatDialogRef<SelectOptionComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log(this.data);
    // this.getProduct();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  selectProduct(i) {
    this.selectOption.push(i);
    this.selectOption.forEach(e => {
      this.checkIcon = e
    })
    console.log(this.selectOption);
  }
  next() {
    this.selectOption
  }
  done() {
    this.data.option.forEach(element => {
      this.nameOption = element.name;
    });
    let data: any = {
      name: this.data.name,
      price: this.data.price,
      option: [{
        name: this.nameOption,
        value: this.selectOption
      }],
      qty: this.qty,
      amout: this.qty * this.data.price
    }
    console.log(data)
    this.sendData.emit(data);
    this.dialogRef.close('close');
  }
}
