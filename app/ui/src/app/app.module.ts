import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import {HttpClientModule} from "@angular/common/http";
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AngularFontAwesomeModule} from "angular-font-awesome";
import { PurchasesComponent } from './purchases/purchases.component';
import { MapValuesPipe } from './map-values.pipe';
import { PaymentsComponent } from './payments/payments.component';
import { LoadingComponent } from './loading/loading.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    AppNavbarComponent,
    PurchasesComponent,
    MapValuesPipe,
    PaymentsComponent,
    LoadingComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
