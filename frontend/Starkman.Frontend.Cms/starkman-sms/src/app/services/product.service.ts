import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Product } from '../models/page/product';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { concatMap, retryWhen, delay, take, timeout } from 'rxjs/operators';
import { PageService } from './page.service';

@Injectable()
export class ProductService extends PageService<Product> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.apiPoint = 'products';
  }
}
