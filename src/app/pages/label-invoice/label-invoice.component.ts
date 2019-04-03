import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-label-invoice',
  templateUrl: './label-invoice.component.html',
  styleUrls: ['./label-invoice.component.scss']
})
export class LabelInvoiceComponent implements OnInit {
  invoiceIds: any;
  invoiceDetails: Promise<any>[];
  constructor(route: ActivatedRoute) {
    this.invoiceIds = route.snapshot.params['invoiceIds']
      .split(',');
  }

  ngOnInit() {
    this.invoiceDetails = this.invoiceIds
      .map(id => this.getInvoiceDetails(id));
    Promise.all(this.invoiceDetails)
      .then(() => setTimeout(window.print));
  }
  getInvoiceDetails(invoiceId) {
    const amount = Math.floor((Math.random() * 100));
    return new Promise(resolve =>
      setTimeout(() => resolve({amount}), 1000)
    );
  }
}
