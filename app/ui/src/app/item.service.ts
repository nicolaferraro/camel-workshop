import {Injectable} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {Catalog} from "./datatypes";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient, private api: ApiService) { }

  getCatalog(): Observable<Catalog> {
    return this.http.get<Catalog>(this.api.getApiPath() + "/items");
  }

}
