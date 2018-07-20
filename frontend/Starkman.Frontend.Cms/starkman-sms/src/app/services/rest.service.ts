import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { concat, Observable, of } from 'rxjs';
import { concatMap, retryWhen, delay, take, timeout } from 'rxjs/operators';
import { Page } from '../models/page/page';
import * as _lodash from 'lodash';
import { Storageable } from '../models/storageable';

@Injectable()
export class RestService<T> extends BaseService {

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

    post(entity: T): Observable<HttpResponse<any>> {
        return this.httpClient.post(
            `${this.apiDomain}${this.apiPoint}`,
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

    clear(): Observable<boolean> {
        return this.getList().pipe(
            concatMap((entityList) => {
                    //debugger;
                    entityList.forEach((entity) => {
                        //debugger;
                        this.delete((entity as any).id).subscribe();
                    });
                    return of(true);
                }
            )
        );
    }

    replace(entityList: T[]): Observable<boolean> {
        //debugger;
        return this.clear().pipe(
            concatMap(() => {
                    //debugger;
                    entityList.forEach((entity) => {
                        //debugger;
                        this.post(entity).subscribe();
                    });
                    return of(true);
                }
            )
        );
    }

}
