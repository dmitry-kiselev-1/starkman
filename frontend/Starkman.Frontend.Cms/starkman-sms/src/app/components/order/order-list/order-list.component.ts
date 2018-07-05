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
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent extends BaseComponent implements OnInit {

    constructor(
        private notificationService: NotificationService,
        private orderService: OrderService,
        protected snackBar: MatSnackBar) {
        super(snackBar);
    }

    public entityList: Order[] = [];
    public selectedEntity: Order;

  ngOnInit() {
      this.reload();
  }

  reload(entity: Order = null)
  {
      this.notificationService.appLoading = true;
      this.orderService.getListNew()
          .pipe(finalize(() => { this.notificationService.appLoading = false; }))
          .subscribe(
              data => {
                  //debugger;

                  if ((data as Order[]).length > 0) {
                      this.entityList = (data as Order[]).sort((a, b) => {
                          if (a.date > b.date) {
                              return -1;
                          }
                          if (a.date < b.date) {
                              return 1;
                          }
                          return 0;
                      });
                      this.selectedEntity = entity;
                  }
                  else
                      this.entityList = [];
              },
              error => this.handleError({
                  userMessage: 'Ошибка при запросе списка заказов!',
                  logMessage: `orderService.getList()`,
                  error
              } as AppError)
          );
  }

}
