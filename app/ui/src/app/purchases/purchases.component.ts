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
    this.data.catalog.subscribe(catalog => this.catalog = catalog);
    this.refresh();

    this.data.modelChanges.subscribe(change => {
      this.refresh();
    });
  }

  refresh(): void {
    this.purchaseService.getPurchases().subscribe(purchases  => {
      this.purchases = purchases.sort((a, b) => b.id.localeCompare(a.id));
    });
  }

}
