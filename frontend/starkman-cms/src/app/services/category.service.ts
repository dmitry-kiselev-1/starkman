import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {BaseService} from './base-service';
import {Category} from '../models/page/category.model';

@Injectable()
export class CategoryService extends BaseService {

  constructor(private http: Http) {
    super();
    this.apiRoutePrefix = '/api/category/';
  }

  public list(): Promise<Category[]> {
    return this.http.get(
      this.apiDomain + this.apiRoutePrefix,
      this.requestOptions)
      .toPromise()
      .then(response => {
          return response.json() as Category[];
        }
      )
      .catch(this.handleError);
  }

}
