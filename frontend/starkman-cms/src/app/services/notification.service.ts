import {EventEmitter, Injectable} from '@angular/core';
import { Http } from '@angular/http';

import {BaseService} from './base-service';
import { Category } from "../models/page/category";

@Injectable()
export class NotificationService {

  public appLoadingChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  public categoryChange: EventEmitter<Category> = new EventEmitter<Category>();

  public get appLoading(): boolean {
    return this._appLoading;
  }

  public set appLoading(value: boolean) {
    this._appLoading = value;
    this.appLoadingChange.emit(this._appLoading);
  }

  private _appLoading: boolean = true;
}
