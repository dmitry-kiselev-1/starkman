import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { concatMap, retryWhen, delay, take, timeout } from 'rxjs/operators';
import { PageService } from './page.service';
import { Filter } from '../models/page/filter';

@Injectable()
export class FilterService extends PageService<Filter> {

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
        this.apiPoint = 'filters';
    }
}
