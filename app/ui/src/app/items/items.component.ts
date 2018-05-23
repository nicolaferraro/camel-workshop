import {Component, OnInit} from '@angular/core';
import {ItemService} from '../item.service';
import {Item} from "../datatypes";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item[];

  total: number;

  cart: Map<string, number>;

  constructor(private itemsService: ItemService) { }

  getItems(): void {
    this.itemsService.getCatalog()
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

        this.total = 0;
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

  ngOnInit() {
    this.total = 0;
    this.cart = new Map<string, number>();
    this.getItems();
  }

}
