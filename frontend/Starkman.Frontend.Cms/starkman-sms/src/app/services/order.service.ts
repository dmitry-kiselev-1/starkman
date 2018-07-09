import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { from, Observable, pipe } from 'rxjs';
import { concatMap, retryWhen, delay, take, timeout, single, map } from 'rxjs/operators';
import { RestService } from './rest.service';
import { Order } from '../models/order/order';
import { Category } from '../models/page/category';
import { OrderFilter } from '../models/order/order-filter';

@Injectable()
export class OrderService extends RestService<Order> {

    private queryTakeCount = 10;

    constructor(protected httpClient: HttpClient) {
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
                map(o => (o as Order[]).sort((a, b) => {
                        if (a.date > b.date) {
                            return -1;
                        }
                        if (a.date < b.date) {
                            return 1;
                        }
                        return 0;
                    })
                ),
                take(this.queryTakeCount));
    }

    getListFiltered(filter: OrderFilter): Observable<Order[]> {

        let filterString = "?status=1";

        return this.httpClient.get<Order[]>(
            `${this.apiDomain}${this.apiPoint}${filterString}`,
            {
                headers: this.httpOptions.headers
            })
            .pipe(
                map(o => (o as Order[]).sort((a, b) => {
                        if (a.date > b.date) {
                            return -1;
                        }
                        if (a.date < b.date) {
                            return 1;
                        }
                        return 0;
                    })
                ),
                take(this.queryTakeCount));
    }

}
