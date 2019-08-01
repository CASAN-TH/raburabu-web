import { Component, OnInit } from '@angular/core';
import * as XLSX from "xlsx";
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-import-orders',
  templateUrl: './import-orders.component.html',
  styleUrls: ['./import-orders.component.scss']
})
export class ImportOrdersComponent implements OnInit {

  fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  data: any;

  constructor(public ngxSpinner: NgxSpinnerService, private snackBar: MatSnackBar) { }

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

      oReq.onload = e => {
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
          filename : file.name,
          data: json
        };
        console.log(this.data);
        // this.uploadService.loadDataSuccess.emit(json);
        this.ngxSpinner.hide();
      };
      oReq.send();
    };
  }

}
