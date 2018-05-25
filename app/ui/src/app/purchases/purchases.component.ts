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

  total: number;

  catalog: Catalog;

  loaded: boolean;

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
      this.total = 0;
      for (let p of this.purchases) {
        for (let i in p.items) {
          if (p.active) {
            this.total += p.items[i]
          }
        }
      }
      this.loaded = true;
    }, error => {
      this.data.publishMessage({
        title: "Error!",
        content: "Cannot load purchases",
        refresh: true,
        error: true
      })
    });
  }

}
