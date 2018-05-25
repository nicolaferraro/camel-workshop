import { Component, OnInit } from '@angular/core';
import {PaymentService} from "../payment.service";
import {Payment} from "../datatypes";
import {DataService} from "../data.service";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  payments: Payment[];

  total: number;

  loaded: boolean;

  constructor(private payment: PaymentService, private data: DataService) { }

  ngOnInit() {
    this.refresh();

    this.data.modelChanges.subscribe(change => {
      this.refresh();
    });
  }

  refresh(): void {
    this.payment.getPayments().subscribe(p => {
      this.payments = p.reverse();
      this.total = 0;
      for (let p of this.payments) {
        if (p.active) {
          this.total += p.amount;
        }
      }
      this.loaded = true;
    }, error => {
      this.data.publishMessage({
        title: "Error!",
        content: "Cannot load payments",
        refresh: true,
        error: true
      })
    });
  }

}
