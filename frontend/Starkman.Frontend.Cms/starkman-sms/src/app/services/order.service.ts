import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Product } from '../models/page/product';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { concatMap, retryWhen, delay, take, timeout } from 'rxjs/operators';
import { RestService } from './rest.service';
import { Order } from '../models/page/order';

@Injectable()
export class OrderService extends RestService<Order> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.apiPoint = 'orders';
  }
}
