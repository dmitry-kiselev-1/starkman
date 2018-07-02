import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Photo } from '../models/page/photo';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { concatMap, retryWhen, delay, take, timeout } from 'rxjs/operators';
import { PageService } from './page.service';
import { Product } from '../models/page/product';

@Injectable()
export class PhotoService extends PageService<Product> {

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
        this.apiPoint = 'photos';
    }
}

/*
  public get(id: string): Promise<Photo> {
    return this.httpClient.get(
      this.apiDomain + this.apiPoint + id)
      .toPromise()
      .then(response => response as Photo)
      .catch(error => Promise.reject(error));
  }

  public delete(id: string): Promise<object> {
    return this.httpClient.delete(
      this.apiDomain + this.apiPoint + id)
      .toPromise()
      .then(response => response)
      .catch(error => Promise.reject(error));
  }

  public post(photo: Photo): Promise<object> {

    //this.requestOptions.headers.append("enctype", "multipart/form-data");

    return this.httpClient.post(
      this.apiDomain + this.apiPoint,
      photo)
      .toPromise()
      .then(response => response)
      .catch(error => Promise.reject(error));
  }

  public rename(oldUrl: string, oldUrlType: string, newUrl: string): Promise<object> {
    return this.httpClient.get(
      this.apiDomain + this.apiPoint +
      'rename' +
      '?oldUrl=' + oldUrl +
      '&oldUrlType=' + oldUrlType +
      '&newUrl=' + newUrl)
      .toPromise()
      .then(response => response as Photo)
      .catch(error => Promise.reject(error));
  }
*/

