import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthService } from '../../app/_services/index';
import { Orders } from './orders.model';
// import {HttpClient,/* HttpHeaders, HttpInterceptor,HttpRequest,HttpHandler,HttpEvent*/} from "@angular/common/http";
import {Http,Headers, RequestOptions, Response} from "@angular/http";

// "use strict";

@Injectable()
export class OrdersService{
    // private order: any;
    constructor(
     // private https: HttpClient,
        private http: Http,
        private authService: AuthService) {}
        private items: Element[] =[];

    getOrder(idorders: string): any {
        let options = new RequestOptions({headers: new Headers({'x-token': this.authService.token})});
        return this.http.get('http://208.104.17.253:6776/api/v1/order/' + idorders, options)
            .map((response: Response) => response.json());
    }

    getReport(itemno: number) {
        let options = new RequestOptions({headers: new Headers({'x-token': this.authService.token})});
        return this.http.get('http://208.104.17.253:6776/api/v1/orders/report/' + itemno, options)
            .map((response: Response) => response.json());
    }

    getOrderByOrderNo(idorders: string): any {
        let options = new RequestOptions({headers: new Headers({'x-token': this.authService.token})});
        return this.http.get('http://208.104.17.253:6776/api/v1/order/' + idorders, options)
            .map((response: Response) => response.json());
    }

    getOrders() {
        let options = new RequestOptions({headers: new Headers({'x-token': this.authService.token})});
        return this.http.get('http://208.104.17.253:6776/api/v1/orders', options)
            .map((response: Response) => response.json());
    }

    createOrder(order: object): Observable<object> {
        let options = new RequestOptions({headers: new Headers({'x-token': this.authService.token})});
        return this.http.get('http://208.104.17.253:6776/api/v1/orders', options)
            .map((response: Response) => response.json());
    }

    getReportByitemNo(itemNo: string): any {
        let options = new RequestOptions({headers: new Headers({'x-token': this.authService.token})});
        return this.http.get('http://208.104.17.253:6776/api/v1/orders/reports'+ itemNo, options)
            .map((response: Response) => response.json());
    }
    getItemByItemNo(itemNo: string): any {
        let options = new RequestOptions({headers: new Headers({'x-token': this.authService.token})});
        return this.http.get('http://208.104.17.253:6776/api/v1/order/' + itemNo, options)
            .map((response: Response) => response.json());
    }
    getCustomerByCustomerNo(customerNo: string): any {
        let options = new RequestOptions({headers: new Headers({'x-token': this.authService.token})});
        return this.http.get('http://208.104.17.253:6776/api/v1/order/' + customerNo, options)
            .map((response: Response) => response.json());
    }
    getItemswithCouponCode(){
      let options = new RequestOptions({headers: new Headers({'x-token':this.authService.token})});
     return this.http.get('http://208.104.17.253:6776/api/v1/reports/couponcode', options).
     map((response:Response)=>response.json());
    }


}