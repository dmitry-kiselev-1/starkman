import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Category } from '../models/page/category';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CategoryService extends BaseService {

    constructor(private httpClient: HttpClient) {
        super();
        this.apiPoint = 'categories';
    }

    public getList(): Promise<Category[]> {
        return this.httpClient.get(
            `${this.apiDomain}${this.apiPoint}`)
            .toPromise()
            .then(response => response as Category[])
            .catch(error => Promise.reject(error));
    }

    public get(id: string): Promise<Category> {
        return this.httpClient.get(
            `${this.apiDomain}${this.apiPoint}/${id}`)
            .toPromise()
            .then(response => response as Category)
            .catch(error => Promise.reject(error));
    }

    public delete(id: string): Promise<object> {
        return this.httpClient.delete(
            `${this.apiDomain}${this.apiPoint}/${id}`)
            .toPromise()
            .then(response => response)
            .catch(error => Promise.reject(error));
    }

    public post(period: Category): Promise<object> {
        return this.httpClient.post(
            `${this.apiDomain}${this.apiPoint}`,
            period)
            .toPromise()
            .then(response => response)
            .catch(error => Promise.reject(error));
    }
}
