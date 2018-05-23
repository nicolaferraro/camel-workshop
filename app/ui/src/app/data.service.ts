import {Injectable} from '@angular/core';
import {Catalog} from "./datatypes";
import {Subject} from "rxjs/internal/Subject";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private catalogSource = new Subject<Catalog>();
  catalog = this.catalogSource.asObservable();

  constructor() { }

  updateCatalog(catalog: Catalog) {
    this.catalogSource.next(catalog);
  }

}
