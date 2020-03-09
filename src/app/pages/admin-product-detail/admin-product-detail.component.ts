import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddProductComponent } from 'src/app/modal/modal-add-product/modal-add-product.component';

@Component({
  selector: 'app-admin-product-detail',
  templateUrl: './admin-product-detail.component.html',
  styleUrls: ['./admin-product-detail.component.scss']
})
export class AdminProductDetailComponent implements OnInit {

  filePng = "image/png";
  fileJpeg = "image/jpeg";

  titleName: any;
  productData: any;

  imageTitle: any;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private spinner: NgxSpinnerService,
    private location: Location,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
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

  handleFileInput(files) {
    // console.log(files)
    this.preview(files);
  }

  dropTitle(ev) {
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
    this.imageTitle = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.productData.image = reader.result;
      this.spinner.hide();
    }
    console.log(this.imageTitle)
  }

  setValue(event) {
    if (event.checked) {
      this.productData.reward = true;
    } else {
      this.productData.reward = false;
    }
  }

  openAddItem(data) {
    if(!data){
      data = {
        "name": "",
        "image": ""
      }
    }
    const dialogRef = this.dialog.open(ModalAddProductComponent, {
      width: '400px',
      data: data,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  onBack() {
    this.location.back();
  }

  async onSave() {
    this.spinner.show();
    if (this.imageTitle) {
      let resImage: any = await this.productsService.upload(this.imageTitle[0]);
      console.log(resImage.data.url)
      this.productData.image = resImage.data.url;
    }

    const body = {
      "name": this.productData.name,
      "image": this.productData.image,
      "price": this.productData.price,
      "option": this.productData.option,
      "reward": this.productData.reward
    }

    // console.log(body);

    if (this.productData._id) {
      const id = this.productData._id;
      const res: any = await this.productsService.saveProduct(id, body);
      console.log(res)
      if (res) {
        this.location.back();
      }
    } else {
      const res: any = await this.productsService.newProduct(body);
      console.log(res)
      if (res) {
        this.location.back();
      }
    }

  }

}
