import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Product } from '../models/page/product';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { single, switchMap, concatMap, retryWhen, delay, take, timeout } from 'rxjs/operators';
import { RestService } from './rest.service';
import { CategoryService } from './category.service';
import { Category } from '../models/page/category';

@Injectable()
export class ProductService extends BaseService {

  constructor(protected categoryService: CategoryService) {
    super();
    this.apiPoint = 'categories';
  }

    get(category_id: string, product_id: string): Observable<Product> {
        return this.categoryService.get(category_id).pipe(
            switchMap((category: Category) => from(category.productList)),
            single(p => p.url == product_id)
        )
    }

    post(id: string, entity: Product): Observable<HttpResponse<any>> {
        return this.categoryService.post(
            `${this.apiDomain}${this.apiPoint}/${id}`,
            entity);
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.categoryService.delete(
            `${this.apiDomain}${this.apiPoint}/${id}`);
    }

}
