import {Injectable} from '@angular/core';
import { Http } from '@angular/http';

import {BaseService} from './base-service';
import {Product} from '../models/page/product';

@Injectable()
export class ProductService extends BaseService {

  constructor(private http: Http) {
    super();
    this.apiRoutePrefix = '/api/product/';
  }

  public getList(): Promise<Product[]> {
    return this.http.get(
      this.apiDomain + this.apiRoutePrefix,
      this.requestOptions)
      .toPromise()
      .then(response => response.json() as Product[])
      .catch(error => Promise.reject(error));
  }

  public get(id: string): Promise<Product> {
    return this.http.get(
      this.apiDomain + this.apiRoutePrefix + id,
      this.requestOptions)
      .toPromise()
      .then(response => response.json() as Product)
      .catch(error => Promise.reject(error));
  }

  public delete(id: string): Promise<object> {
    return this.http.delete(
      this.apiDomain + this.apiRoutePrefix + id,
      this.requestOptions)
      .toPromise()
      .then(response => response)
      .catch(error => Promise.reject(error));
  }

  public post(period: Product): Promise<object> {
    return this.http.post(
      this.apiDomain + this.apiRoutePrefix,
      period,
      this.requestOptions)
      .toPromise()
      .then(response => response)
      .catch(error => Promise.reject(error));
  }
}
