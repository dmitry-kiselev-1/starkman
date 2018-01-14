import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {BaseService} from './base-service';
import {Photo} from '../models/page/photo.model';

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

  public post(photo: Photo): Promise<boolean> {

    //this.requestOptions.headers.append("enctype", "multipart/form-data");

    return this.http.post(
      this.apiDomain + this.apiRoutePrefix,
      photo,
      this.requestOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public rename(oldId: string, newId: string): Promise<boolean> {
    return this.http.get(
      this.apiDomain + this.apiRoutePrefix +
      'rename' +
      '?oldId:' + oldId +
      '&newId:' + newId,
      this.requestOptions)
      .toPromise()
      .then(response => {
          return response.json() as Photo;
        }
      )
      .catch(this.handleError);
  }

}
