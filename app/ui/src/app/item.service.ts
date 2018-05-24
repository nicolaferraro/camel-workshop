import {Injectable} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {Catalog, Order, OrderItem} from "./datatypes";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient, private api: ApiService) { }

  getCatalog(): Observable<Catalog> {
    return this.http.get<Catalog>(this.api.getApiPath() + "/items");
  }

  makeOrder(items: Map<string, number>): Observable<Object> {
    let order = new Order();
    order.reference = Date.now() + "-" + 1000 + Math.floor(Math.random() * 1000);
    order.user = "theuser";
    order.items = [];
    order.price = 0;
    items.forEach((v,k) => {
      if (v > 0) {
        order.items.push({
          id: k,
          amount: v
        });
        order.price += v; // TODO handle different prices
      }
    });

    return this.http.post(this.api.getApiPath() + "/orders", order);
  }

}
