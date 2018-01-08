import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {BaseService} from './base-service';
import {Photo} from '../models/page/photo.model';

@Injectable()
export class PhotoService extends BaseService {

  constructor(private http: Http) {
    super();
    this.apiRoutePrefix = '/api/photo/';
  }

  public get(id: string): Promise<Photo> {
    return this.http.get(
      this.apiDomain + this.apiRoutePrefix + id,
      this.requestOptions)
      .toPromise()
      .then(response => {
          return response.json() as Photo;
        }
      )
      .catch(this.handleError);
  }

  public delete(id: string): Promise<boolean> {
    return this.http.delete(
      this.apiDomain + this.apiRoutePrefix + id,
      this.requestOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public post(period: Photo): Promise<boolean> {
    return this.http.post(
      this.apiDomain + this.apiRoutePrefix,
      period,
      this.requestOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }
}
