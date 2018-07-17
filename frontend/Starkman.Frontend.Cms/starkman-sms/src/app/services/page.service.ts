import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { concat, Observable, of } from 'rxjs';
import { concatMap, retryWhen, delay, take, timeout } from 'rxjs/operators';
import { Page } from '../models/page/page';
import { RestService } from './rest.service';

@Injectable()
export class PageService<Page> extends RestService<Page> {

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    postPage(oldUrl: string, entity: Page): Observable<HttpResponse<any>> {
        return this.delete(oldUrl).pipe(
            concatMap(() =>
                this.post(entity)
            )
        );
    }

    pageExist(id: string): Observable<boolean> {
        return this.httpClient.get(
            `${this.apiDomain}${this.apiPoint}/?id=${id}`,
            {
                headers: this.httpOptions.headers
            }).pipe(
            concatMap((data) =>
                of(((data as Array<Page>).length > 0) ? true : false)
            )
        );
    }

}
