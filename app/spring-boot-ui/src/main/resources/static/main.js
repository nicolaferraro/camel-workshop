(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/api.service.ts":
/*!********************************!*\
  !*** ./src/app/api.service.ts ***!
  \********************************/
/*! exports provided: ApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiService", function() { return ApiService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ApiService = /** @class */ (function () {
    function ApiService() {
        this.apiPath = 'http://localhost:8080/api';
    }
    ApiService.prototype.getApiPath = function () {
        return this.apiPath;
    };
    ApiService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], ApiService);
    return ApiService;
}());



/***/ }),

/***/ "./src/app/app-navbar/app-navbar.component.css":
/*!*****************************************************!*\
  !*** ./src/app/app-navbar/app-navbar.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app-navbar/app-navbar.component.html":
/*!******************************************************!*\
  !*** ./src/app/app-navbar/app-navbar.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-md navbar-light bg-light fixed-top\">\n  <a class=\"navbar-brand\" href=\"#\">\n    <img src=\"/assets/camel-logo.png\" height=\"50px\" alt=\"Apache Camel\" />\n  </a>\n  <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarsExampleDefault\" aria-controls=\"navbarsExampleDefault\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n    <span class=\"navbar-toggler-icon\"></span>\n  </button>\n  <div class=\"collapse navbar-collapse\" id=\"navbarsExampleDefault\">\n    <ul class=\"navbar-nav mr-auto\">\n      <li class=\"nav-item active\">\n        <a class=\"nav-link\" href=\"#\"><strong>Apache Camel Workshop</strong></a>\n      </li>\n    </ul>\n  </div>\n</nav>\n"

/***/ }),

/***/ "./src/app/app-navbar/app-navbar.component.ts":
/*!****************************************************!*\
  !*** ./src/app/app-navbar/app-navbar.component.ts ***!
  \****************************************************/
/*! exports provided: AppNavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppNavbarComponent", function() { return AppNavbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppNavbarComponent = /** @class */ (function () {
    function AppNavbarComponent() {
    }
    AppNavbarComponent.prototype.ngOnInit = function () {
    };
    AppNavbarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(/*! ./app-navbar.component.html */ "./src/app/app-navbar/app-navbar.component.html"),
            styles: [__webpack_require__(/*! ./app-navbar.component.css */ "./src/app/app-navbar/app-navbar.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AppNavbarComponent);
    return AppNavbarComponent;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\n\n<div class=\"container\" style=\"margin-top: 100px\">\n\n  <app-items></app-items>\n\n  <app-messages></app-messages>\n\n\n  <hr />\n\n  <div class=\"row\">\n    <div class=\"col-md-6\">\n      <app-purchases></app-purchases>\n    </div>\n    <div class=\"col-md-6\">\n      <app-payments></app-payments>\n    </div>\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'Camel Workshop';
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _items_items_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./items/items.component */ "./src/app/items/items.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_navbar_app_navbar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app-navbar/app-navbar.component */ "./src/app/app-navbar/app-navbar.component.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var angular_font_awesome__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! angular-font-awesome */ "./node_modules/angular-font-awesome/dist/angular-font-awesome.es5.js");
/* harmony import */ var _purchases_purchases_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./purchases/purchases.component */ "./src/app/purchases/purchases.component.ts");
/* harmony import */ var _map_values_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./map-values.pipe */ "./src/app/map-values.pipe.ts");
/* harmony import */ var _payments_payments_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./payments/payments.component */ "./src/app/payments/payments.component.ts");
/* harmony import */ var _loading_loading_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./loading/loading.component */ "./src/app/loading/loading.component.ts");
/* harmony import */ var _messages_messages_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./messages/messages.component */ "./src/app/messages/messages.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
                _items_items_component__WEBPACK_IMPORTED_MODULE_3__["ItemsComponent"],
                _app_navbar_app_navbar_component__WEBPACK_IMPORTED_MODULE_5__["AppNavbarComponent"],
                _purchases_purchases_component__WEBPACK_IMPORTED_MODULE_8__["PurchasesComponent"],
                _map_values_pipe__WEBPACK_IMPORTED_MODULE_9__["MapValuesPipe"],
                _payments_payments_component__WEBPACK_IMPORTED_MODULE_10__["PaymentsComponent"],
                _loading_loading_component__WEBPACK_IMPORTED_MODULE_11__["LoadingComponent"],
                _messages_messages_component__WEBPACK_IMPORTED_MODULE_12__["MessagesComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModule"].forRoot(),
                angular_font_awesome__WEBPACK_IMPORTED_MODULE_7__["AngularFontAwesomeModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/data.service.ts":
/*!*********************************!*\
  !*** ./src/app/data.service.ts ***!
  \*********************************/
/*! exports provided: DataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataService", function() { return DataService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_internal_Subject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/internal/Subject */ "./node_modules/rxjs/internal/Subject.js");
/* harmony import */ var rxjs_internal_Subject__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(rxjs_internal_Subject__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DataService = /** @class */ (function () {
    function DataService() {
        this.catalogSource = new rxjs_internal_Subject__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.catalog = this.catalogSource.asObservable();
        this.modelChangesSource = new rxjs_internal_Subject__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.modelChanges = this.modelChangesSource.asObservable();
        this.messagesSource = new rxjs_internal_Subject__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.messages = this.messagesSource.asObservable();
    }
    DataService.prototype.updateCatalog = function (catalog) {
        this.catalogSource.next(catalog);
    };
    DataService.prototype.triggerModelChange = function () {
        this.modelChangesSource.next(1);
    };
    DataService.prototype.publishMessage = function (message) {
        this.messagesSource.next(message);
    };
    DataService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], DataService);
    return DataService;
}());



/***/ }),

/***/ "./src/app/datatypes.ts":
/*!******************************!*\
  !*** ./src/app/datatypes.ts ***!
  \******************************/
/*! exports provided: Catalog, Item, Purchase, Entry, Order, OrderItem, Payment, Message */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Catalog", function() { return Catalog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Item", function() { return Item; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Purchase", function() { return Purchase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Entry", function() { return Entry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Order", function() { return Order; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderItem", function() { return OrderItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Payment", function() { return Payment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Message", function() { return Message; });
var Catalog = /** @class */ (function () {
    function Catalog() {
    }
    return Catalog;
}());

var Item = /** @class */ (function () {
    function Item() {
    }
    return Item;
}());

var Purchase = /** @class */ (function () {
    function Purchase() {
    }
    return Purchase;
}());

var Entry = /** @class */ (function () {
    function Entry() {
    }
    return Entry;
}());

var Order = /** @class */ (function () {
    function Order() {
    }
    return Order;
}());

var OrderItem = /** @class */ (function () {
    function OrderItem() {
    }
    return OrderItem;
}());

var Payment = /** @class */ (function () {
    function Payment() {
    }
    return Payment;
}());

var Message = /** @class */ (function () {
    function Message() {
    }
    return Message;
}());



/***/ }),

/***/ "./src/app/item.service.ts":
/*!*********************************!*\
  !*** ./src/app/item.service.ts ***!
  \*********************************/
/*! exports provided: ItemService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemService", function() { return ItemService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api.service */ "./src/app/api.service.ts");
/* harmony import */ var _datatypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./datatypes */ "./src/app/datatypes.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ItemService = /** @class */ (function () {
    function ItemService(http, api) {
        this.http = http;
        this.api = api;
    }
    ItemService.prototype.getCatalog = function () {
        return this.http.get(this.api.getApiPath() + "/items");
    };
    ItemService.prototype.makeOrder = function (items) {
        var order = new _datatypes__WEBPACK_IMPORTED_MODULE_3__["Order"]();
        order.reference = Date.now() + "-" + 1000 + Math.floor(Math.random() * 1000);
        order.user = "theuser";
        order.items = [];
        order.price = 0;
        items.forEach(function (v, k) {
            if (v > 0) {
                order.items.push({
                    id: k,
                    amount: v
                });
                order.price += v; // TODO handle different prices
            }
        });
        return this.http.post(this.api.getApiPath() + "/orders", order);
    };
    ItemService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"]])
    ], ItemService);
    return ItemService;
}());



/***/ }),

/***/ "./src/app/items/items.component.css":
/*!*******************************************!*\
  !*** ./src/app/items/items.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n\n.item img {\n  width: 100px;\n}\n"

/***/ }),

/***/ "./src/app/items/items.component.html":
/*!********************************************!*\
  !*** ./src/app/items/items.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"row\" style=\"margin-bottom: 20px\">\n  <div class=\"col-md-12\">\n    <h1>Plush Toys Shop</h1>\n  </div>\n</div>\n\n<div class=\"row\" *ngIf=\"loaded\">\n  <div *ngFor=\"let item of items\" class=\"col-md-3\">\n    <div class=\"card mb-3 box-shadow\">\n      <div style=\"height: 125px; width: 100%; display: block; overflow: hidden\">\n        <img class=\"card-img-top\" alt=\"Item {{item.id}}\" style=\"width: 60%; margin-left: 20%\" src=\"{{item.image}}\" data-holder-rendered=\"true\">\n      </div>\n      <div class=\"card-body\">\n        <h5 class=\"card-title\">{{item.name}}</h5>\n        <p class=\"card-text\">{{item.price | currency}} <br /> {{item.stockUnits}} items in stock</p>\n\n        <div class=\"d-flex justify-content-between align-items-center\">\n          <div class=\"btn-group\">\n            <button type=\"button\" class=\"btn btn-sm btn-outline-secondary\" (click)=\"less(item)\">-</button>\n            <button type=\"button\" class=\"btn btn-sm btn-outline-secondary\" style=\"width: 50px\">{{cart.get(item.id)}}</button>\n            <button type=\"button\" class=\"btn btn-sm btn-outline-secondary\" (click)=\"more(item)\">+</button>\n          </div>\n          <small *ngIf=\"item.recommended\" class=\"text-muted\">\n            <fa *ngFor=\"let number of [1,2,3,4,5]\" style=\"color: #FF0000\" name=\"star\" animation=\"spin\"></fa>\n          </small>\n        </div>\n      </div>\n    </div>\n  </div>\n\n</div>\n\n<app-loading *ngIf=\"!loaded\"></app-loading>\n\n<div class=\"row\" style=\"margin-bottom: 20px\">\n  <div class=\"col-md-12\">\n    <div class=\"pull-right\">\n      <strong>{{total}} Items Selected</strong>\n    </div>\n  </div>\n</div>\n\n<div class=\"row\">\n  <div class=\"col-md-10\">\n    <button [disabled]=\"total == 0\" type=\"button\" class=\"btn btn-lg btn-outline-secondary pull-right\" (click)=\"reset()\"><fa name=\"undo\"></fa> Reset</button>\n\n  </div>\n  <div class=\"col-md-2\">\n    <button [disabled]=\"total == 0\" type=\"button\" class=\"btn btn-lg btn-primary pull-right\" (click)=\"checkout()\"><fa name=\"shopping-cart\"></fa> Checkout</button>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/items/items.component.ts":
/*!******************************************!*\
  !*** ./src/app/items/items.component.ts ***!
  \******************************************/
/*! exports provided: ItemsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemsComponent", function() { return ItemsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _item_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../item.service */ "./src/app/item.service.ts");
/* harmony import */ var _data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../data.service */ "./src/app/data.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ItemsComponent = /** @class */ (function () {
    function ItemsComponent(itemsService, data) {
        this.itemsService = itemsService;
        this.data = data;
    }
    ItemsComponent.prototype.getItems = function () {
        var _this = this;
        this.itemsService.getCatalog().subscribe(function (catalog) { return _this.data.updateCatalog(catalog); }, function (error) {
            _this.data.publishMessage({
                title: "Error!",
                content: "Cannot load catalog",
                refresh: true,
                error: true
            });
        });
        this.data.catalog
            .subscribe(function (catalog) {
            var arr = [];
            for (var key in catalog.items) {
                arr.push(catalog.items[key]);
            }
            _this.items = arr;
            _this.items.forEach(function (item) {
                if (!_this.cart.get(item.id)) {
                    _this.cart.set(item.id, 0);
                }
            });
            _this.loaded = true;
        });
    };
    ItemsComponent.prototype.more = function (item) {
        var currentVal = this.cart.get(item.id) || 0;
        var newVal = currentVal < item.stockUnits ? currentVal + 1 : currentVal;
        this.total += newVal - currentVal;
        this.cart.set(item.id, newVal);
    };
    ItemsComponent.prototype.less = function (item) {
        var currentVal = this.cart.get(item.id) || 0;
        var newVal = currentVal > 0 ? currentVal - 1 : 0;
        this.total += newVal - currentVal;
        this.cart.set(item.id, newVal);
    };
    ItemsComponent.prototype.reset = function () {
        var _this = this;
        this.total = 0;
        this.cart.forEach(function (n, k) { return _this.cart.set(k, 0); });
    };
    ItemsComponent.prototype.checkout = function () {
        var _this = this;
        this.itemsService.makeOrder(this.cart)
            .subscribe(function (next) {
            _this.message = "Order sent correctly!";
            _this.reset();
            _this.data.triggerModelChange();
            _this.data.publishMessage({
                title: "Done!",
                content: "Order submitted successfully",
                refresh: false,
                error: false
            });
        }, function (error) {
            _this.message = "There were problems while sending the order!";
            _this.data.triggerModelChange();
            _this.data.publishMessage({
                title: "Error!",
                content: "Errors while submitting the order",
                refresh: true,
                error: true
            });
        });
    };
    ItemsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.total = 0;
        this.cart = new Map();
        this.getItems();
        this.data.modelChanges.subscribe(function (change) {
            _this.getItems();
        });
    };
    ItemsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-items',
            template: __webpack_require__(/*! ./items.component.html */ "./src/app/items/items.component.html"),
            styles: [__webpack_require__(/*! ./items.component.css */ "./src/app/items/items.component.css")]
        }),
        __metadata("design:paramtypes", [_item_service__WEBPACK_IMPORTED_MODULE_1__["ItemService"], _data_service__WEBPACK_IMPORTED_MODULE_2__["DataService"]])
    ], ItemsComponent);
    return ItemsComponent;
}());



/***/ }),

/***/ "./src/app/loading/loading.component.css":
/*!***********************************************!*\
  !*** ./src/app/loading/loading.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".spinner {\n  font-size: 36px;\n  text-align: center;\n  margin: 50px;\n}\n"

/***/ }),

/***/ "./src/app/loading/loading.component.html":
/*!************************************************!*\
  !*** ./src/app/loading/loading.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"spinner\">\n  <fa name=\"spinner\" animation=\"spin\"></fa>\n</div>\n"

/***/ }),

/***/ "./src/app/loading/loading.component.ts":
/*!**********************************************!*\
  !*** ./src/app/loading/loading.component.ts ***!
  \**********************************************/
/*! exports provided: LoadingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadingComponent", function() { return LoadingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LoadingComponent = /** @class */ (function () {
    function LoadingComponent() {
    }
    LoadingComponent.prototype.ngOnInit = function () {
    };
    LoadingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-loading',
            template: __webpack_require__(/*! ./loading.component.html */ "./src/app/loading/loading.component.html"),
            styles: [__webpack_require__(/*! ./loading.component.css */ "./src/app/loading/loading.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], LoadingComponent);
    return LoadingComponent;
}());



/***/ }),

/***/ "./src/app/map-values.pipe.ts":
/*!************************************!*\
  !*** ./src/app/map-values.pipe.ts ***!
  \************************************/
/*! exports provided: MapValuesPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapValuesPipe", function() { return MapValuesPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var MapValuesPipe = /** @class */ (function () {
    function MapValuesPipe() {
    }
    MapValuesPipe.prototype.transform = function (theMap, args) {
        var res = [];
        for (var key in theMap) {
            res.push({
                key: key,
                value: theMap[key]
            });
        }
        return res;
    };
    MapValuesPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'mapValues'
        })
    ], MapValuesPipe);
    return MapValuesPipe;
}());



/***/ }),

/***/ "./src/app/messages/messages.component.css":
/*!*************************************************!*\
  !*** ./src/app/messages/messages.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".row.message {\n  margin-top: 20px;\n}\n"

/***/ }),

/***/ "./src/app/messages/messages.component.html":
/*!**************************************************!*\
  !*** ./src/app/messages/messages.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"message\" class=\"row message\">\n  <div class=\"col-md-12\">\n    <div [ngClass]=\"{'alert-danger': message.error, 'alert-success': !message.error}\" class=\"alert alert-dismissible fade show\" role=\"alert\">\n      <strong>{{message.title}}</strong> {{message.content}}.\n      <a *ngIf=\"message.refresh\" href=\"javascript:void(0)\" (click)=\"refresh()\">Refresh data</a>\n      <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\" (click)=\"dismiss()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/messages/messages.component.ts":
/*!************************************************!*\
  !*** ./src/app/messages/messages.component.ts ***!
  \************************************************/
/*! exports provided: MessagesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessagesComponent", function() { return MessagesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data.service */ "./src/app/data.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MessagesComponent = /** @class */ (function () {
    function MessagesComponent(data) {
        this.data = data;
    }
    MessagesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.data.messages.subscribe(function (message) { return _this.message = message; });
    };
    MessagesComponent.prototype.refresh = function () {
        this.dismiss();
        this.data.triggerModelChange();
    };
    MessagesComponent.prototype.dismiss = function () {
        this.message = null;
    };
    MessagesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-messages',
            template: __webpack_require__(/*! ./messages.component.html */ "./src/app/messages/messages.component.html"),
            styles: [__webpack_require__(/*! ./messages.component.css */ "./src/app/messages/messages.component.css")]
        }),
        __metadata("design:paramtypes", [_data_service__WEBPACK_IMPORTED_MODULE_1__["DataService"]])
    ], MessagesComponent);
    return MessagesComponent;
}());



/***/ }),

/***/ "./src/app/payment.service.ts":
/*!************************************!*\
  !*** ./src/app/payment.service.ts ***!
  \************************************/
/*! exports provided: PaymentService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentService", function() { return PaymentService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.service */ "./src/app/api.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PaymentService = /** @class */ (function () {
    function PaymentService(http, api) {
        this.http = http;
        this.api = api;
    }
    PaymentService.prototype.getPayments = function () {
        return this.http.get(this.api.getApiPath() + "/payments");
    };
    PaymentService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"]])
    ], PaymentService);
    return PaymentService;
}());



/***/ }),

/***/ "./src/app/payments/payments.component.css":
/*!*************************************************!*\
  !*** ./src/app/payments/payments.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h1 {\n  margin-top: 20px;\n}\n\n.card.payment {\n  height: 200px;\n  margin-bottom: 10px;\n}\n\n.card.payment .card-body {\n  text-align: center;\n  vertical-align: middle;\n  font-size: 36px;\n  font-weight: bold;\n}\n\n.inactive {\n  text-decoration: line-through;\n}\n\n.total {\n  color: #AAAAAA;\n  font-size: smaller;\n}\n\n.canceled-bg {\n  background-color: #EEEEEE;\n}\n"

/***/ }),

/***/ "./src/app/payments/payments.component.html":
/*!**************************************************!*\
  !*** ./src/app/payments/payments.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1><fa name=\"money\"></fa> Payments <span   *ngIf=\"total > 0\">({{total | currency}})</span></h1>\n\n<div *ngIf=\"loaded\">\n  <div *ngIf=\"payments.length > 0\">\n    <div class=\"card payment\" *ngFor=\"let payment of payments\">\n      <div class=\"card-header\">\n        Payment #{{payment.reference}}\n      </div>\n      <div class=\"card-body\" [ngClass]=\"{'canceled-bg': !payment.active}\">\n        <span [ngClass]=\"{'inactive': !payment.active}\">{{payment.amount | currency }}</span>\n      </div>\n    </div>\n  </div>\n  <div *ngIf=\"payments.length == 0\">\n    <div class=\"alert-secondary alert fade show\" role=\"alert\">\n      No payments\n    </div>\n  </div>\n</div>\n\n<app-loading *ngIf=\"!loaded\"></app-loading>\n"

/***/ }),

/***/ "./src/app/payments/payments.component.ts":
/*!************************************************!*\
  !*** ./src/app/payments/payments.component.ts ***!
  \************************************************/
/*! exports provided: PaymentsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentsComponent", function() { return PaymentsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _payment_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../payment.service */ "./src/app/payment.service.ts");
/* harmony import */ var _data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../data.service */ "./src/app/data.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PaymentsComponent = /** @class */ (function () {
    function PaymentsComponent(payment, data) {
        this.payment = payment;
        this.data = data;
    }
    PaymentsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.refresh();
        this.data.modelChanges.subscribe(function (change) {
            _this.refresh();
        });
    };
    PaymentsComponent.prototype.refresh = function () {
        var _this = this;
        this.payment.getPayments().subscribe(function (p) {
            _this.payments = p.reverse();
            _this.total = 0;
            for (var _i = 0, _a = _this.payments; _i < _a.length; _i++) {
                var p_1 = _a[_i];
                if (p_1.active) {
                    _this.total += p_1.amount;
                }
            }
            _this.loaded = true;
        }, function (error) {
            _this.data.publishMessage({
                title: "Error!",
                content: "Cannot load payments",
                refresh: true,
                error: true
            });
        });
    };
    PaymentsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-payments',
            template: __webpack_require__(/*! ./payments.component.html */ "./src/app/payments/payments.component.html"),
            styles: [__webpack_require__(/*! ./payments.component.css */ "./src/app/payments/payments.component.css")]
        }),
        __metadata("design:paramtypes", [_payment_service__WEBPACK_IMPORTED_MODULE_1__["PaymentService"], _data_service__WEBPACK_IMPORTED_MODULE_2__["DataService"]])
    ], PaymentsComponent);
    return PaymentsComponent;
}());



/***/ }),

/***/ "./src/app/purchase.service.ts":
/*!*************************************!*\
  !*** ./src/app/purchase.service.ts ***!
  \*************************************/
/*! exports provided: PurchaseService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PurchaseService", function() { return PurchaseService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.service */ "./src/app/api.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PurchaseService = /** @class */ (function () {
    function PurchaseService(http, api) {
        this.http = http;
        this.api = api;
    }
    PurchaseService.prototype.getPurchases = function () {
        return this.http.get(this.api.getApiPath() + "/purchases");
    };
    PurchaseService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"]])
    ], PurchaseService);
    return PurchaseService;
}());



/***/ }),

/***/ "./src/app/purchases/purchases.component.css":
/*!***************************************************!*\
  !*** ./src/app/purchases/purchases.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h1 {\n  margin-top: 20px;\n}\n\n.card.purchase {\n  height: 200px;\n  margin-bottom: 10px;\n}\n\n.inactive {\n  text-decoration: line-through;\n  color: red;\n}\n\n.total {\n  color: #AAAAAA;\n  font-size: smaller;\n}\n\n.canceled-bg {\n  background-color: #EEEEEE;\n}\n"

/***/ }),

/***/ "./src/app/purchases/purchases.component.html":
/*!****************************************************!*\
  !*** ./src/app/purchases/purchases.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1><fa name=\"truck\"></fa> Purchases <span class=\"total\" *ngIf=\"total > 0\">({{total}})</span></h1>\n\n<div *ngIf=\"loaded\">\n  <div *ngIf=\"purchases.length > 0\">\n\n    <div class=\"card purchase\" *ngFor=\"let purchase of purchases\">\n      <div class=\"card-header\">\n        Purchase #{{purchase.id}}\n      </div>\n      <div class=\"card-body\" [ngClass]=\"{'canceled-bg': !purchase.active}\">\n        <div>\n          <span [ngClass]=\"{'inactive': !purchase.active}\" *ngFor=\"let itemEntry of purchase.items | mapValues\"> {{itemEntry.value}}x<img src=\"{{catalog.items[itemEntry.key].image}}\" style=\"width: 50px\" class=\"img-thumbnail\">\n          </span> &nbsp;&nbsp;\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div *ngIf=\"purchases.length == 0\">\n    <div class=\"alert-secondary alert fade show\" role=\"alert\">\n      No purchases\n    </div>\n  </div>\n</div>\n\n<app-loading *ngIf=\"!loaded\"></app-loading>\n"

/***/ }),

/***/ "./src/app/purchases/purchases.component.ts":
/*!**************************************************!*\
  !*** ./src/app/purchases/purchases.component.ts ***!
  \**************************************************/
/*! exports provided: PurchasesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PurchasesComponent", function() { return PurchasesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _purchase_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../purchase.service */ "./src/app/purchase.service.ts");
/* harmony import */ var _data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../data.service */ "./src/app/data.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PurchasesComponent = /** @class */ (function () {
    function PurchasesComponent(purchaseService, data) {
        this.purchaseService = purchaseService;
        this.data = data;
    }
    PurchasesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.data.catalog.subscribe(function (catalog) { return _this.catalog = catalog; });
        this.refresh();
        this.data.modelChanges.subscribe(function (change) {
            _this.refresh();
        });
    };
    PurchasesComponent.prototype.refresh = function () {
        var _this = this;
        this.purchaseService.getPurchases().subscribe(function (purchases) {
            _this.purchases = purchases.sort(function (a, b) { return b.id.localeCompare(a.id); });
            _this.total = 0;
            for (var _i = 0, _a = _this.purchases; _i < _a.length; _i++) {
                var p = _a[_i];
                for (var i in p.items) {
                    if (p.active) {
                        _this.total += p.items[i];
                    }
                }
            }
            _this.loaded = true;
        }, function (error) {
            _this.data.publishMessage({
                title: "Error!",
                content: "Cannot load purchases",
                refresh: true,
                error: true
            });
        });
    };
    PurchasesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-purchases',
            template: __webpack_require__(/*! ./purchases.component.html */ "./src/app/purchases/purchases.component.html"),
            styles: [__webpack_require__(/*! ./purchases.component.css */ "./src/app/purchases/purchases.component.css")]
        }),
        __metadata("design:paramtypes", [_purchase_service__WEBPACK_IMPORTED_MODULE_1__["PurchaseService"], _data_service__WEBPACK_IMPORTED_MODULE_2__["DataService"]])
    ], PurchasesComponent);
    return PurchasesComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/nferraro/git/nicolaferraro/camel-workshop/app/ui/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map