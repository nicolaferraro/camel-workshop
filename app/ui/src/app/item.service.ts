import {Injectable} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";
import {Catalog, Order, OrderItem} from "./datatypes";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getCatalog(): Observable<Catalog> {
    return this.http.get<Catalog>(environment.apiPath + "/items");
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

    return this.http.post(environment.apiPath + "/orders", order);
  }

}
