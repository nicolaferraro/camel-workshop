import {Component, OnInit} from '@angular/core';
import {PurchaseService} from "../purchase.service";
import {Purchase} from "../datatypes";

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  purchases: Purchase[];

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit() {
    this.purchaseService.getPurchases().subscribe(purchases  => {
      this.purchases = purchases;
    });
  }

}
