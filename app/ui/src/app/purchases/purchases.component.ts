import {Component, OnInit} from '@angular/core';
import {PurchaseService} from "../purchase.service";
import {Catalog, Purchase} from "../datatypes";
import {DataService} from "../data.service";

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  purchases: Purchase[];

  catalog: Catalog;

  constructor(private purchaseService: PurchaseService, private data: DataService) { }

  ngOnInit() {
    this.purchaseService.getPurchases().subscribe(purchases  => {
      this.purchases = purchases;
    });

    this.data.catalog.subscribe(catalog => this.catalog = catalog);
  }

}
