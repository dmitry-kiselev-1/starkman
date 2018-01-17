import {EventEmitter, Injectable} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {BaseService} from './base-service';
import { Category } from "../models/page/category.model";

@Injectable()
export class NotificationService {

  public appLoading: boolean = false;
  public appLoadingChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public categoryChange: EventEmitter<Category> = new EventEmitter<Category>();

  constructor() {}

  public appLoadingSet(state: boolean) {
    this.appLoading = state;
    this.appLoadingChange.emit(this.appLoading);
  }
}
