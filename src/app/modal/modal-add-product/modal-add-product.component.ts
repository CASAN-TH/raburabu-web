import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-add-product',
  templateUrl: './modal-add-product.component.html',
  styleUrls: ['./modal-add-product.component.scss']
})
export class ModalAddProductComponent implements OnInit {

  imageItem

  constructor(
    public dialogRef: MatDialogRef<ModalAddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    console.log(this.data)
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  handleFileInput(files) {
    // console.log(files)
    this.preview(files);
  }

  dropItem(ev) {
    ev.preventDefault();
    const files = ev.dataTransfer.files;
    // console.log(files);
    this.preview(files);
  }

  preview(files: Array<any>) {
    this.spinner.show();
    if (files.length === 0) {
      this.spinner.hide();
      return;
    }

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.snackBar.open("โปรดเลือกรูปภาพในการอัพโหลด", "Error", {
        duration: 2000,
      });
      this.spinner.hide();
      return;
    }

    var mimeSize = files[0].size;
    if (mimeSize > 1000000) {
      this.snackBar.open("ขนาดรูปภาพไม่ควรเกิน 1MB", "Error", {
        duration: 2000,
      });
      this.spinner.hide();
      return;
    }

    var reader = new FileReader();
    this.imageItem = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.data.image = reader.result;
      this.spinner.hide();
    }
    console.log(this.imageItem)
  }

}
