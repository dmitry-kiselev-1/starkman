import {EventEmitter, Injectable} from '@angular/core';
import { Http } from '@angular/http';

import {BaseService} from './base.service';
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

//import { HttpClient } from '@angular/common/http';
//import { Injectable } from '@angular/core';
//import { BehaviorSubject, Observable } from 'rxjs';

//@Injectable()
//export class NotificationService {

  /*
  lang$: BehaviorSubject<Language> = new BehaviorSubject<Language>(DEFAULT_LANG);
  setLang(lang: Language) {
    this.lang$.next(lang);
  }
  */

  /*
  private subscriptions: Subscription[] = [];
  ngOnInit() {
    const langSub = this.configService.lang$
      .subscribe(() => {
        // ...
      });
    this.subscriptions.push(langSub);
  }
  ngOnDestroy() {
    this.subscriptions
      .forEach(s => s.unsubscribe());
  }
  */
//}
