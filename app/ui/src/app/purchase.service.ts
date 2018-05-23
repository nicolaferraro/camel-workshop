import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";
import {Purchase} from "./datatypes";

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient, private api: ApiService) { }

  getPurchases(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(this.api.getApiPath() + "/purchases");
  }
}
