import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { from, Observable, of, pipe } from 'rxjs';
import { concatMap, retryWhen, delay, take, timeout, single, map, max, switchMap } from 'rxjs/operators';
import { RestService } from './rest.service';
import { Order } from '../models/order/order';
import { Category } from '../models/page/category';
import { OrderFilter } from '../models/order/order-filter';
import { DateService } from './date.service';
import * as _lodash from 'lodash';
import { Offer } from '../models/order/offer';

@Injectable()
export class OrderService extends RestService<Order> {

    private queryTakeCount = 10;

    constructor(protected httpClient: HttpClient, private dateService: DateService) {
        super(httpClient);
        this.apiPoint = 'orders';
    }

    getListNew(): Observable<Order[]> {
        return this.httpClient.get<Order[]>(
            `${this.apiDomain}${this.apiPoint}?status=0`,
            {
                headers: this.httpOptions.headers
            })
            .pipe(
                map(o =>
                    _lodash.sortBy(o, item => -(item as Order).id)
                ),
                take(this.queryTakeCount));
    }

    getListFiltered(filter: OrderFilter): Observable<Order[]> {
        //debugger;
        let filterString = `?`;

        if (filter.orderId)
            filterString += `id=^${filter.orderId}&`;
        if (filter.status != -1)
            filterString += `status=${filter.status}&`;
        if (filter.orderDate)
            filterString += `filterOrderDate=${this.dateService.toString(filter.orderDate, true)}&`;
        if (filter.customerPhone)
            filterString += `filterCustomerPhone=^${filter.customerPhone}&`;

        return this.httpClient.get<Order[]>(
            `${this.apiDomain}${this.apiPoint}${filterString}`,
            {
                headers: this.httpOptions.headers
            })
            .pipe(
                map(o =>
                    _lodash.sortBy(o, item => -(item as Order).id)
                ),
                take(this.queryTakeCount));
    }

    getListOffer(): Observable<Offer[]> {
        return this.httpClient.get<Order[]>(
            `${this.apiDomain}${this.apiPoint}`,
            {
                headers: this.httpOptions.headers
            })
            .pipe(
                map(o =>
                    _lodash.flatMap(o, item => (item as Order).offerList)
                ),
                take(20));
    }

    getNewId(): Observable<string> {
        return this.httpClient.get<Order[]>(
            `${this.apiDomain}${this.apiPoint}`,
            {
                headers: this.httpOptions.headers
            })
            .pipe(
                switchMap(o => {
                    //debugger;
                    let lastOrder = _lodash.maxBy(o, (item) => (item as Order).id);
                    return of((lastOrder as Order).id);
                })
            );
    }

}
