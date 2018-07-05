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

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent extends BaseComponent implements OnInit {

    public order_id: string;
    public entity: Order = {} as Order;

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
}
