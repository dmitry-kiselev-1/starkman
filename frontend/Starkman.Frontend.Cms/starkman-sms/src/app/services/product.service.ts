import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Product } from '../models/page/product';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { concat, single, concatMap, retryWhen, delay, take, timeout } from 'rxjs/operators';
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
            concatMap((category: Category) => from(category.productList)),
            single(p => p.url == product_id)
        )
    }

    post(category_id: string, product_id: string, product: Product): Observable<HttpResponse<any>> {
        return this.categoryService.get(category_id).pipe(
            concatMap((category: Category) => {
                if (!category.productList) { category.productList = []; }

                // delete old product:
                category.productList = category.productList.filter(p => p.id != product_id);
                // add new product:
                category.productList.push(product);

                // delete old category:
                this.categoryService.delete(category_id);
                // add new category:
                return this.categoryService.post(category_id, category);
            })
        )
    }

    delete(category_id: string, product_id: string): Observable<HttpResponse<any>> {
        return this.categoryService.get(category_id).pipe(
            concatMap((category: Category) => {
                if (!category.productList) { return; }

                // delete old product:
                category.productList = category.productList.filter(p => p.id != product_id);

                // delete old category:
                this.categoryService.delete(category_id);
                // add new category:
                return this.categoryService.post(category_id, category);
            })
        )
    }

}
