import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { concatMap, retryWhen, delay, take, timeout } from 'rxjs/operators';
import { Page } from '../models/page/page';

@Injectable()
export class PageService<T> extends BaseService {

  constructor(protected httpClient: HttpClient) {
    super();
  }

    getList(): Observable<T[]> {
        return this.httpClient.get<T[]>(
            `${this.apiDomain}${this.apiPoint}`,
            {
                headers: this.httpOptions.headers
            });
    }

    get(id: string): Observable<T> {
        return this.httpClient.get<T>(
            `${this.apiDomain}${this.apiPoint}/${id}`,
            {
                headers: this.httpOptions.headers
            });
    }

    post(id: string, entity: T): Observable<HttpResponse<any>> {
        return this.httpClient.post(
            `${this.apiDomain}${this.apiPoint}/${id}`,
            entity,
            {
                headers: this.httpOptions.headers,
                observe: 'response'
            });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.httpClient.delete(
            `${this.apiDomain}${this.apiPoint}/${id}`,
            {
                headers: this.httpOptions.headers,
                observe: 'response'
            });
    }

}
