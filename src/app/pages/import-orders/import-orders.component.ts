import { Component, OnInit } from '@angular/core';
import * as XLSX from "xlsx";
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { OrderService } from 'src/app/services/order/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-import-orders',
  templateUrl: './import-orders.component.html',
  styleUrls: ['./import-orders.component.scss']
})
export class ImportOrdersComponent implements OnInit {

  fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  data: any;

  constructor(public ngxSpinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    private orderService: OrderService,
    public router: Router,
  ) { }

  ngOnInit() {
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drop(ev) {
    ev.preventDefault();
    const files = ev.dataTransfer.files;
    this.validateFile(files);
  }

  detectFiles(ev) {
    const files = ev.target.files;
    this.validateFile(files);
  }

  validateFile(files: Array<any>) {
    this.ngxSpinner.show();
    if (files.length === 1) {
      if (files[0].type === this.fileType) {
        this.importDataFromFile(files[0]);
      } else {
        // error file type
        this.ngxSpinner.hide();
        this.snackBar.open("invalid type of file (xls,xlsx)", "Error", {
          duration: 2000,
        });
      }
    } else {
      // error files length
      this.ngxSpinner.hide();
      this.snackBar.open("Length of files is more than 1", "Error", {
        duration: 2000,
      });
    }
  }

  importDataFromFile(file: any) {

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      const oReq = new XMLHttpRequest();
      oReq.open("GET", event.target.result, true);
      oReq.responseType = "arraybuffer";

      oReq.onload = async e => {
        const arraybuffer = oReq.response;
        /* convert data to binary string */
        const data = new Uint8Array(arraybuffer);
        const arr = new Array();
        for (let i = 0; i !== data.length; ++i) {
          arr[i] = String.fromCharCode(data[i]);
        }
        const bstr = arr.join("");
        const workbook = XLSX.read(bstr, { type: "binary" });
        const json = XLSX.utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[0]]
        );
        // console.log(file);
        this.data = {
          filename: file.name,
          data: json
        };
        this.data.data.forEach(item => {
          const mapData = item;
          // tslint:disable-next-line: forin
          for (const prop in mapData) {
            const fieldName = prop.replace(/(\r\n|\n|\r)/gm, '_').split('_(')[0].replace(' ', '').replace('.', '').replace('**','reward').toLowerCase();
            mapData[fieldName] = mapData[prop];
            delete mapData[prop];
          }
        });
       console.log(this.data);
        try {
          const res: any = await this.orderService.importOrders(this.data);
          if (res) {
            this.ngxSpinner.hide();
            this.router.navigate(['/order-list']);
          }
        } catch (error) {
          console.log(error);
          this.ngxSpinner.hide();
        }
      };
      oReq.send();
    };
  }

}
