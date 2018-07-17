import { Injectable } from '@angular/core';
import { Product } from '../models/page/product';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { concat, single, concatMap, retryWhen, delay, take, timeout } from 'rxjs/operators';
import { CategoryService } from './category.service';
import { Category } from '../models/page/category';
import * as _lodash from 'lodash';
import { Filter } from '../models/order/filter';

@Injectable()
export class ProductService extends CategoryService {

  constructor(protected httpClient: HttpClient, protected categoryService: CategoryService) {
    super(httpClient);
  }

    getProduct(category_id: string, product_id: string): Observable<Product> {
        return this.categoryService.get(category_id).pipe(
            concatMap((category: Category) => from(category.productList)),
            single(p => p.url == product_id)
        )
    }

    postProduct(category_id: string, product_id: string, product: Product): Observable<HttpResponse<any>> {
        product.photoList = _lodash.sortBy(product.photoList, (photo) => photo.sortOrder);
        product.filterList = _lodash.sortBy(product.filterList, (filter) => filter.sortOrder);
        return this.categoryService.get(category_id).pipe(
            concatMap((category: Category) => {
                if (!category.productList) { category.productList = []; }

                // delete old product:
                category.productList = category.productList.filter(p => p.id != product_id);
                // add new product:
                category.productList.push(product);

                // update category:
                return this.postPage(category_id, category);
            })
        )
    }

    deleteProduct(category_id: string, product_id: string): Observable<HttpResponse<any>> {
        return this.categoryService.get(category_id).pipe(
            concatMap((category: Category) => {
                if (!category.productList) { return; }

                // delete old product:
                category.productList = category.productList.filter(p => p.id != product_id);

                // update category:
                return this.postPage(category_id, category);
            })
        )
    }

    productExist(category_id: string, product_id: string): Observable<boolean> {
        return this.categoryService.get(category_id).pipe(
            concatMap((category: Category) => {
                if (!category || !category.productList || (category.productList.length == 0))
                    return of(false);
                else
                    return of(!!category.productList.find(p => p.id == product_id));
            })
        )
    }

}
