import {Injectable} from '@angular/core';
import { Http } from '@angular/http';

import {BaseService} from './base.service';
import {Photo} from '../models/page/photo';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PhotoService extends BaseService {

  public apiDomainPhotoPath: string = "/assets/img/";

  constructor(private httpClient: HttpClient) {
    super();
    this.apiPoint = 'photos';
  }

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

}
