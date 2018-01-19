import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {BaseService} from './base-service';
import {Product} from '../models/page/product.model';
import { Category } from "../models/page/category.model";

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
      .then(response => {
          return response.json() as Product[];
        }
      )
      .catch(this.handleError);
  }

  public get(id: string): Promise<Product> {
    return this.http.get(
      this.apiDomain + this.apiRoutePrefix + id,
      this.requestOptions)
      .toPromise()
      .then(response => {
          return response.json() as Product;
        }
      )
      .catch(this.handleError);
  }

  public delete(id: string): Promise<boolean> {
    return this.http.delete(
      this.apiDomain + this.apiRoutePrefix + id,
      this.requestOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public post(period: Product): Promise<boolean> {
    return this.http.post(
      this.apiDomain + this.apiRoutePrefix,
      period,
      this.requestOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }
}
