import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Category } from '../models/page/category';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CategoryService extends BaseService {

    constructor(private httpClient: HttpClient) {
        super();
        this.apiPoint = 'categories';
    }

    getList(): Observable<Category[]> {
        return this.httpClient.get<Category[]>(
            `${this.apiDomain}${this.apiPoint}`,
            {
                headers: this.httpOptions.headers
            });
    }

    get(id: string): Observable<Category> {
        return this.httpClient.get<Category>(
            `${this.apiDomain}${this.apiPoint}/${id}`,
            {
                headers: this.httpOptions.headers
            });
    }

    post(entity: Category): Observable<HttpResponse<any>> {
        return this.httpClient.post<Category>(
            `${this.apiDomain}${this.apiPoint}/${entity.id}`,
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
