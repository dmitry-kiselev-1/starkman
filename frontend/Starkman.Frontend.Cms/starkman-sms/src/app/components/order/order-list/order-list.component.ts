import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { MatDatepickerInputEvent, MatDialog, MatSnackBar } from '@angular/material';
import { NotificationService } from '../../../services/notification.service';
import { OrderService } from '../../../services/order.service';
import { finalize } from 'rxjs/operators';
import { AppError } from '../../../models/app-error';
import { Order } from '../../../models/order/order';
import { OrderFilter } from '../../../models/order/order-filter';
import { SelectItem } from '../../../models/select-item';
import { EnumPipe } from '../../../pipes/enum.pipe';
import { OrderStatus } from '../../../models/order/order-status';
import * as _lodash from "lodash";

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent extends BaseComponent implements OnInit {

    constructor(
        public notificationService: NotificationService,
        private orderService: OrderService,
        protected snackBar: MatSnackBar,
        public dialog: MatDialog) {
        super(snackBar, dialog);
    }

    entityList: Order[] = [];
    entityListFiltered: Order[] = [];
    selectedEntity: Order;
    orderStatusCol: SelectItem[];
    orderFilter: OrderFilter = {status: -1} as OrderFilter;

    ngOnInit() {
        this.reload();
        this.notificationService.orderChange.subscribe((order) => {
            this.reload(order);
        });
    }

    reload(entity: Order = null) {
        this.notificationService.appLoading = true;
        this.orderService.getListNew()
            .pipe(finalize(() => {
                this.notificationService.appLoading = false;
            }))
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

        (new EnumPipe()).transform(OrderStatus).subscribe(data => {
                this.orderStatusCol = data.map((v, i) =>
                    ({value: i, label: v} as SelectItem)) as SelectItem[];

                this.orderStatusCol.push({value: -1, label: " "} as SelectItem);
                this.orderStatusCol = _lodash.sortBy(this.orderStatusCol, (s => s.value));
            }
        );
    }

    filter() {
        this.notificationService.appLoading = true;
        this.orderService.getListFiltered(this.orderFilter)
            .pipe(finalize(() => {
                this.notificationService.appLoading = false;
            }))
            .subscribe(
                data => {
                    this.entityListFiltered = (data || []);
                },
                error => this.handleError({
                    userMessage: 'Ошибка при запросе списка заказов по фильтру!',
                    logMessage: `orderService.getListFiltered()`,
                    error
                } as AppError)
            );
    }

    orderDatePickerChange(event: MatDatepickerInputEvent<Date>) {
        this.orderFilter.orderDate = event.value;
    }

}
