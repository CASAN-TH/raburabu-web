import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-address',
  templateUrl: './modal-address.component.html',
  styleUrls: ['./modal-address.component.scss']
})
export class ModalAddressComponent implements OnInit {
  isLinear = false;
  @Output() dataCutomer: EventEmitter<any> = new EventEmitter();
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  data: any = {
    tel: '',
    firstname: '',
    lastname: '',
    address:
    {
      houseno: '',
      village: '',
      street: '',
      subdistrict: '',
      district: '',
      province: '',
      zipcode: ''
    }

  }

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public dataAddress: any = {}

  ) { }

  ngOnInit() {
    console.log(this.dataAddress);
    if (this.dataAddress) {
      this.data.firstname = this.dataAddress.firstname
      this.data.lastname = this.dataAddress.lastname
      console.log(this.data);
    }
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  next() {
    this.dataCutomer.emit(this.data);
    this.dialogRef.close('clse');

  }
  exit() {
    this.dialogRef.close();

  }



}
