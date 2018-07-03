import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Product } from '../models/page/product';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { concatMap, retryWhen, delay, take, timeout } from 'rxjs/operators';
import { RestService } from './rest.service';
import { Photo } from '../models/page/photo';

@Injectable()
export class PhotoService extends RestService<Photo> {

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
        this.apiPoint = 'photos';
    }
}
