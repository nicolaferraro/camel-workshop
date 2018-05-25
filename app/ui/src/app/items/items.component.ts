import {Component, OnInit} from '@angular/core';
import {ItemService} from '../item.service';
import {Item} from "../datatypes";
import {DataService} from "../data.service";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item[];

  total: number;

  cart: Map<string, number>;

  message: string;

  loaded: boolean;

  constructor(private itemsService: ItemService, private data: DataService) { }

  getItems(): void {

    this.itemsService.getCatalog().subscribe(catalog => this.data.updateCatalog(catalog), error => {
      this.data.publishMessage({
        title: "Error!",
        content: "Cannot load catalog",
        refresh: true,
        error: true
      })
    });

    this.data.catalog
      .subscribe(catalog => {

        let arr = [];
        for (let key in catalog.items) {
          arr.push(catalog.items[key]);
        }
        this.items = arr;

        this.items.forEach(item => {
          if (!this.cart.get(item.id)) {
            this.cart.set(item.id, 0);
          }
        });

        this.loaded = true;
      });
  }

  more(item: Item): void {
    let currentVal = this.cart.get(item.id) || 0;
    let newVal = currentVal < item.stockUnits ? currentVal + 1 : currentVal;
    this.total+=newVal-currentVal;
    this.cart.set(item.id, newVal);
  }

  less(item: Item): void {
    let currentVal = this.cart.get(item.id) || 0;
    let newVal = currentVal > 0 ? currentVal - 1 : 0;
    this.total+=newVal-currentVal;
    this.cart.set(item.id, newVal);
  }

  reset(): void {
    this.total = 0;
    this.cart.forEach((n,k) => this.cart.set(k, 0));
  }

  checkout(): void {
    this.itemsService.makeOrder(this.cart)
      .subscribe(next => {
        this.message = "Order sent correctly!";
        this.reset();
        this.data.triggerModelChange();
        this.data.publishMessage({
          title: "Done!",
          content: "Order submitted successfully",
          refresh: false,
          error: false
        })
      }, error => {
        this.message = "There were problems while sending the order!";
        this.data.triggerModelChange();
        this.data.publishMessage({
          title: "Error!",
          content: "Errors while submitting the order",
          refresh: true,
          error: true
        })
      });

  }

  ngOnInit() {
    this.total = 0;
    this.cart = new Map<string, number>();
    this.getItems();

    this.data.modelChanges.subscribe(change => {
      this.getItems();
    });
  }

}
