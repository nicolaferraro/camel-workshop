import {Injectable} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {Payment} from "./datatypes";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(environment.apiPath + "/payments");
  }

}
