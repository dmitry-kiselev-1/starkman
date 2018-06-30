import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { concatMap, retryWhen, delay, take, timeout } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { Page } from '../models/page/page';

@Injectable()
export class ExampleService extends BaseService {

    private api = 'bids';

    constructor(private configService: ConfigService, private httpClient: HttpClient) {
        super();
    }

    getList(): Observable<Page[]> {
        return this.httpClient.get<Page[]>(
            `${this.apiDomain}${this.api}`,
            {
                headers: this.httpOptions.headers
            });
    }

    get(id: string): Observable<Page> {
        return this.httpClient.get<Page>(
            `${this.apiDomain}${this.api}/${id}`,
            {
                headers: this.httpOptions.headers
            });
    }

    post(entity: Page): Observable<HttpResponse<any>> {
        return this.httpClient.post<Page>(
            `${this.apiDomain}${this.api}/${entity.url}`,
            entity,
            {
                headers: this.httpOptions.headers,
                observe: 'response'
            });
    }
}
