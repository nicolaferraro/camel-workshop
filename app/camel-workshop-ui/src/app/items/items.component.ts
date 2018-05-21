import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import {Item} from "../item";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item[];

  constructor(private itemsService: ItemService) { }

  getItems(): void {
    this.itemsService.getItems()
      .subscribe(items => this.items = items.items);
  }

  ngOnInit() {
    this.getItems();
  }

}
