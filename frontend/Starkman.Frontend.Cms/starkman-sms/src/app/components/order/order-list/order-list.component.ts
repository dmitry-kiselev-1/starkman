import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { MatSnackBar } from '@angular/material';
import { NotificationService } from '../../../services/notification.service';
import { OrderService } from '../../../services/order.service';
import { finalize } from 'rxjs/operators';
import { AppError } from '../../../models/app-error';
import { Order } from '../../../models/order/order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent extends BaseComponent implements OnInit {

    constructor(
        public notificationService: NotificationService,
        private orderService: OrderService,
        protected snackBar: MatSnackBar) {
        super(snackBar);
    }

    public entityList: Order[] = [];
    public entityListFilter: Order[] = [];
    public selectedEntity: Order;

  ngOnInit() {
      this.reload();
      this.notificationService.orderChange.subscribe((order) => { this.reload(order) });
  }

  reload(entity: Order = null)
  {
      this.notificationService.appLoading = true;
      this.orderService.getListNew()
          .pipe(finalize(() => { this.notificationService.appLoading = false; }))
          .subscribe(
              data => {
                      this.entityList = (data || []);
                      this.selectedEntity = entity;
              },
              error => this.handleError({
                  userMessage: 'Ошибка при запросе списка новых заказов!',
                  logMessage: `orderService.getListNew()`,
                  error
              } as AppError)
          );
  }

  filter()
  {
      this.notificationService.appLoading = true;
      this.orderService.getListNew()
          .pipe(finalize(() => { this.notificationService.appLoading = false; }))
          .subscribe(
              data => {
                  this.entityListFilter = (data || []);
              },
              error => this.handleError({
                  userMessage: 'Ошибка при запросе списка фильтрованных заказов!',
                  logMessage: `orderService.getListFilter()`,
                  error
              } as AppError)
          );
  }

}
