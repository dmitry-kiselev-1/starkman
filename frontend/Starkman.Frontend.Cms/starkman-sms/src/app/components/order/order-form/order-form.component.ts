import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { PageType } from '../../../models/page/page-type';
import { NotificationService } from '../../../services/notification.service';
import { Order } from '../../../models/order/order';
import { finalize } from 'rxjs/operators';
import { AppError } from '../../../models/app-error';
import { Category } from '../../../models/page/category';
import { OrderService } from '../../../services/order.service';
import { EnumPipe } from '../../../pipes/enum.pipe';
import { OrderStatus } from '../../../models/order/order-status';
import { SelectItem } from '../../../models/select-item';
import * as _moment from 'moment';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent extends BaseComponent implements OnInit {

    order_id: string;
    entity: Order = {} as Order;
    orderStatusCol: SelectItem[];
    offerColumns: string[] = ['sku', 'title', 'size', 'height', 'price', 'count'];

    constructor(
        public notificationService: NotificationService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private restService: OrderService,
        protected snackBar: MatSnackBar) {
        super(snackBar);
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
                },
                error => this.handleError({
                    userMessage: 'Ошибка при запросе заказа!',
                    logMessage: `categoryService.get(${this.order_id})`,
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
        /*
        if (!this.entity.url) return;
        this.notificationService.appLoading = true;
        this.entity.id = this.entity.url;
        this.restService.post(this.entity.url, this.entity)
            .pipe(finalize(() => this.notificationService.appLoading = false))
            .subscribe(
                httpResponse => {
                    this.notificationService.categoryChange.emit({url: this.entity.url} as Category);
                    console.log(`${this.entity.url} posted`);
                    this.router.navigateByUrl(`/category/${this.entity.id}`);
                },
                error => this.handleError({
                    userMessage: 'Ошибка при добавлении категории!',
                    logMessage: `categoryService.post(${this.entity.url})`,
                    error
                } as AppError)
            );
        */
    }

    delete() {
        /*
        if (!this.category_id) return;
        this.notificationService.appLoading = true;
        this.restService.delete(this.category_id)
            .subscribe(
                httpResponse => {
                    this.notificationService.categoryChange.emit({url: this.category_id} as Category);
                    console.log(`${this.category_id} deleted`);
                    this.router.navigateByUrl(`/category`);
                },
                error => this.handleError({
                    userMessage: 'Ошибка при удалении категории!',
                    logMessage: `${PageType[this.entityType]}Service.delete(${this.category_id})`,
                    error
                } as AppError)
            );
        */
    }

    getTotal(): number
    {
        //debugger;
        if (!this.entity || !this.entity.offerList || (this.entity.offerList.length == 0)) return 0;
        let total: number = 0;
        this.entity.offerList.forEach(o => total = total + (o.price * o.count));
        return total;
    }
}
