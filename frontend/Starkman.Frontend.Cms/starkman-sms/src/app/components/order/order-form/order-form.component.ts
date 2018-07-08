import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { PageType } from '../../../models/page/page-type';
import { NotificationService } from '../../../services/notification.service';
import { Order } from '../../../models/order/order';
import { finalize } from 'rxjs/operators';
import { AppError } from '../../../models/app-error';
import { OrderService } from '../../../services/order.service';
import { EnumPipe } from '../../../pipes/enum.pipe';
import { OrderStatus } from '../../../models/order/order-status';
import { SelectItem } from '../../../models/select-item';
import { Offer } from '../../../models/order/offer';
import {MatTableDataSource} from '@angular/material';
import * as _moment from 'moment';
import * as _lodash from 'lodash';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent extends BaseComponent implements OnInit {

    order_id: string;
    entity: Order = {} as Order;
    orderStatusCol: SelectItem[];
    offerColumns: string[] = ['sku', 'title', 'size', 'height', 'price', 'count', 'select'];
    selection: any;

    constructor(
        public notificationService: NotificationService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private restService: OrderService,
        protected snackBar: MatSnackBar) {
        super(snackBar);
        this.entityType = PageType.Order;
    }

  ngOnInit() {
      this.componentTitle = this.activatedRoute.snapshot.data['title'];

      this.activatedRoute.paramMap
          .subscribe(
              (params: ParamMap) => {
                  this.order_id = params.get('order_id');
                  this.reload();
              },
              error => this.handleError(error)
          );

      const initialSelection = [];
      const allowMultiSelect = true;
      this.selection = new SelectionModel<Offer>(allowMultiSelect, initialSelection);
  }

    reload(notify: boolean = true) {
        if (!this.order_id) return;
        if (notify) { this.notificationService.appLoading = true; }
        this.restService.get(this.order_id)
            .pipe(finalize(() => {
                if (notify) { this.notificationService.appLoading = false; }
            }))
            .subscribe(
                data => {
                    //debugger;
                    this.entity = (data || {} as Order);
                    this.entity.offerList = _lodash.sortBy(this.entity.offerList, (e) => (e as Offer).product.url)
                },
                error => this.handleError({
                    userMessage: 'Ошибка при запросе заказа!',
                    logMessage: `${PageType[this.entityType]}Service.get(${this.order_id})`,
                    error
                } as AppError)
            );

        (new EnumPipe()).transform(OrderStatus).subscribe(data => {
                this.orderStatusCol = data.map((v, i) =>
                    ({value: i, label: v} as SelectItem)) as SelectItem[];
            }
        );
    }

    save() {
        if (!this.entity.id) return;
        this.notificationService.appLoading = true;
        this.restService.post(this.entity.id, this.entity)
            .pipe(finalize(() => this.notificationService.appLoading = false))
            .subscribe(
                httpResponse => {
                    this.notificationService.orderChange.emit(this.entity);
                    console.log(`${this.entity.id} posted`);
                    this.router.navigateByUrl(`/order/${this.entity.id}`);
                },
                error => this.handleError({
                    userMessage: 'Ошибка при добавлении заказа!',
                    logMessage: `${PageType[this.entityType]}Service.post(${this.entity.id})`,
                    error
                } as AppError)
            );
    }

    delete() {
        if (!this.order_id) return;
        this.notificationService.appLoading = true;
        this.restService.delete(this.order_id)
            .subscribe(
                httpResponse => {
                    this.notificationService.orderChange.emit(this.entity);
                    console.log(`${this.order_id} deleted`);
                    this.router.navigateByUrl(`/`);
                },
                error => this.handleError({
                    userMessage: 'Ошибка при удалении заказа!',
                    logMessage: `${PageType[this.entityType]}Service.delete(${this.order_id})`,
                    error
                } as AppError)
            );
    }

    getTotal(): number
    {
        //debugger;
        if (!this.entity || !this.entity.offerList || (this.entity.offerList.length == 0)) return 0;
        let total: number = 0;
        this.entity.offerList.forEach(o => total = total + (o.price * o.count));
        return total;
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.entity.offerList.length;
        return numSelected == numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.entity.offerList.forEach(row => this.selection.select(row));
    }

}
