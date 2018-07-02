import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Category } from '../models/page/category';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { concatMap, retryWhen, delay, take, timeout } from 'rxjs/operators';
import { PageService } from './page.service';

@Injectable()
export class CategoryService extends PageService<Category> {

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
        this.apiPoint = 'categories';
    }
}
