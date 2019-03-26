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
  dataBinding: any;
  qtyInput: any;
  totalQty: any = 0;
  constructor(
    private _formBuilder: FormBuilder,
    public servicePorduct: ProductsService,
    public dialogRef: MatDialogRef<SelectOptionComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.data.option.forEach(option => {
      // console.log(option);
      option.value.forEach(value => {
        // console.log(value);
        if (value.active) {
          value.active = false;
        }
      });
    });
    this.dataBinding = this.data
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  selectProduct(i) {
    this.selectOption.push(i);
  }

  next() {
    this.selectOption
  }

  done() {
    this.totalQty = 0;
    this.data.option.forEach(element => {
      this.nameOption = element.name;
    });
    this.selectOption.forEach(res => {
      // console.log(res);
      this.totalQty = this.totalQty + parseInt(res.qty);
      // console.log(this.totalQty);
    });
    let data: any = {
      name: this.data.name,
      price: this.data.price,
      option: [{
        name: this.nameOption,
        value: this.selectOption
      }],
      amount: this.totalQty * this.data.price
    }
    console.log(data)
    this.sendData.emit(data);
    this.dialogRef.close('close');
  }

  addQty(l, e) {
    // console.log(e);
    this.selectOption[l].qty = parseInt(e);
  }

  select(itm, i, k) {
    if (!this.dataBinding.option[k].value[i].active) {
      this.dataBinding.option[k].value[i].active = true
      this.dataBinding.option[k].value[i].qty = 1
      this.selectOption.push(itm);
    } else {
      this.dataBinding.option[k].value[i].active = false;
      this.selectOption.forEach(option => {
        if (itm.name === option.name) {
          let j = this.selectOption.findIndex(function (data) { return data.name === itm.name })
          // console.log(j);
          this.selectOption.splice(j, 1);
        }
      });
    }
    // console.log(this.selectOption);
  }

  checkNumber(e, l) {
    console.log(this.selectOption[l]);
    console.log(e);
    let regEx = new RegExp(/^[0-9]+$/);
    if (!(regEx.test(e.key) || e.key === 'Backspace' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Shift' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
      this.selectOption[l].qty = this.selectOption[l].qty.substring(0, this.selectOption[l].qty.length - 1);
    }
  }







}
