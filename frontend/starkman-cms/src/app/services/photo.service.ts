import {Injectable} from '@angular/core';
import { Http } from '@angular/http';

import {BaseService} from './base-service';
import {Photo} from '../models/page/photo';

@Injectable()
export class PhotoService extends BaseService {

  public apiDomainPhotoPath: string = "/assets/img/";

  constructor(private http: Http) {
    super();
    this.apiRoutePrefix = '/api/photo/';
  }

  public get(id: string): Promise<Photo> {
    return this.http.get(
      this.apiDomain + this.apiRoutePrefix + id,
      this.requestOptions)
      .toPromise()
      .then(response => response.json() as Photo)
      .catch(error => Promise.reject(error));
  }

  public delete(id: string): Promise<object> {
    return this.http.delete(
      this.apiDomain + this.apiRoutePrefix + id,
      this.requestOptions)
      .toPromise()
      .then(response => response)
      .catch(error => Promise.reject(error));
  }

  public post(photo: Photo): Promise<object> {

    //this.requestOptions.headers.append("enctype", "multipart/form-data");

    return this.http.post(
      this.apiDomain + this.apiRoutePrefix,
      photo,
      this.requestOptions)
      .toPromise()
      .then(response => response)
      .catch(error => Promise.reject(error));
  }

  public rename(oldUrl: string, oldUrlType: string, newUrl: string): Promise<object> {
    return this.http.get(
      this.apiDomain + this.apiRoutePrefix +
      'rename' +
      '?oldUrl=' + oldUrl +
      '&oldUrlType=' + oldUrlType +
      '&newUrl=' + newUrl,
      this.requestOptions)
      .toPromise()
      .then(response => response.json() as Photo)
      .catch(error => Promise.reject(error));
  }

}
