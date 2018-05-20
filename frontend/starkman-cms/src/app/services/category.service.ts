import {Injectable} from '@angular/core';
import { Http } from '@angular/http';

import {BaseService} from './base-service';
import {Category} from '../models/page/category';

@Injectable()
export class CategoryService extends BaseService {

  constructor(private http: Http) {
    super();
    this.apiRoutePrefix = '/api/category/';
  }

  public getList(): Promise<Category[]> {
    return this.http.get(
      this.apiDomain + this.apiRoutePrefix,
      this.requestOptions)
      .toPromise()
      .then(response => response.json() as Category[])
      .catch(error => Promise.reject(error));
  }

  public get(id: string): Promise<Category> {
    return this.http.get(
      this.apiDomain + this.apiRoutePrefix + id,
      this.requestOptions)
      .toPromise()
      .then(response => response.json() as Category)
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

  public post(period: Category): Promise<object> {
    return this.http.post(
      this.apiDomain + this.apiRoutePrefix,
      period,
      this.requestOptions)
      .toPromise()
      .then(response => response)
      .catch(error => Promise.reject(error));
  }
}
