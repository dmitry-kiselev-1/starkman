import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { concat, Observable } from 'rxjs';
import { concatMap, retryWhen, delay, take, timeout } from 'rxjs/operators';
import { Page } from '../models/page/page';
import { RestService } from './rest.service';

@Injectable()
export class PageService<T> extends RestService<T> {

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    postPage(oldUrl: string, entity: T): Observable<HttpResponse<any>> {
        return this.delete(oldUrl).pipe(
            concatMap( () =>
            this.post(entity)
            )
        );
    }
}
