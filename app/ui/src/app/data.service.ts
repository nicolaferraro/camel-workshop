import {Injectable} from '@angular/core';
import {Catalog, Message} from "./datatypes";
import {Subject} from "rxjs/internal/Subject";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private catalogSource = new Subject<Catalog>();
  catalog = this.catalogSource.asObservable();

  private modelChangesSource = new Subject<number>();
  modelChanges = this.modelChangesSource.asObservable();

  private messagesSource = new Subject<Message>();
  messages = this.messagesSource.asObservable();

  constructor() { }

  updateCatalog(catalog: Catalog) {
    this.catalogSource.next(catalog);
  }

  triggerModelChange() {
    this.modelChangesSource.next(1);
  }

  publishMessage(message: Message) {
    this.messagesSource.next(message);
  }

}
