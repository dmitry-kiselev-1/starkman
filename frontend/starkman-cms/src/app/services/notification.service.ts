import {EventEmitter, Injectable} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {BaseService} from './base-service';
import {CategoryEditComponent} from '../components/category/category-edit/category-edit.component';

@Injectable()
export class NotificationService {

  public appLoading: boolean = false;
  public appLoadingChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public categoryChange: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  public appLoadingSet(state: boolean) {
    this.appLoading = state;
    this.appLoadingChange.emit(this.appLoading);
  }
}
