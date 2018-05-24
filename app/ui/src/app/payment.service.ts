import {Injectable} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {Payment} from "./datatypes";
import {ApiService} from "./api.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient, private api: ApiService) { }

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.api.getApiPath() + "/payments");
  }

}
