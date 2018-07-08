import {EventEmitter, Injectable} from '@angular/core';
import { Category } from "../models/page/category";
import { Order } from '../models/order/order';

@Injectable()
export class NotificationService {

    public appLoadingChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    public categoryChange: EventEmitter<Category> = new EventEmitter<Category>();
    public orderChange: EventEmitter<Order> = new EventEmitter<Order>();

    public get appLoading(): boolean {
        return this._appLoading;
    }

    public set appLoading(value: boolean) {
        this._appLoading = value;
        this.appLoadingChange.emit(this._appLoading);
    }

    private _appLoading: boolean = true;
}
