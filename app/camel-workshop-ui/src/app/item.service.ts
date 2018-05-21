import {Injectable} from '@angular/core';
import {Items} from "./item";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private itemsUrl = 'http://localhost:8080/api/items';

  constructor(private http: HttpClient) { }


  getItems(): Observable<Items> {
    return this.http.get<Items>(this.itemsUrl)
  }

}
