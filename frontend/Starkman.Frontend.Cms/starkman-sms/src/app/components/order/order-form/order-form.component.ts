import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
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
import { SelectionModel } from '@angular/cdk/collections';
import { DateService } from '../../../services/date.service';
import { Customer } from '../../../models/order/customer';
import { ConfirmationDialogData } from '../../../models/dialog/confirmation-dialog-data';
import { ConfirmationDialogComponent } from '../../dialog/confirmation-dialog/confirmation-dialog.component';
import { OfferSearchDialogComponent } from '../../dialog/offer-search-dialog/offer-search-dialog.component';
import { OfferSearchDialogData } from '../../../models/dialog/offer-search-dialog-data';
import * as _moment from 'moment';
import * as _lodash from 'lodash';
import { toUnicode } from 'punycode';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
    selector: 'app-order-form',
    templateUrl: './order-form.component.html',
    styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent extends BaseComponent implements OnInit {
    order_id: string;
    entity: Order = {id: "0", date: new Date() as Date, time: new Date() as Date, offerList: [] as Offer[], customer: {phoneCountryCode: "+7"} as Customer, status: OrderStatus.New} as Order;
    orderStatusCol: SelectItem[];
    offerColumns: string[] = ['sku', 'title', 'size', 'height', 'price', 'count', 'select'];
    selection: any;

    constructor(
        public notificationService: NotificationService,
        private dateService: DateService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private restService: OrderService,
        protected snackBar: MatSnackBar,
        public dialog: MatDialog) {
        super(snackBar, dialog);
        this.entityType = PageType.Order;
    }

    ngOnInit() {
        this.componentTitle = this.activatedRoute.snapshot.data['title'];

        this.activatedRoute.paramMap
            .subscribe(
                (params: ParamMap) => {
                    if (params.keys.length == 0) {
                        //debugger;
                        this.setNewId();
                    }
                    else {
                        //debugger;
                        this.order_id = params.get('order_id');
                        this.reload();
                    }
                },
                error => this.handleError(error)
            );

        (new EnumPipe()).transform(OrderStatus).subscribe(data => {
                this.orderStatusCol = data.map((v, i) =>
                    ({value: i, label: v} as SelectItem)) as SelectItem[];
            }
        );

        const initialSelection = [];
        const allowMultiSelect = true;
        this.selection = new SelectionModel<Offer>(allowMultiSelect, initialSelection);
    }

    setNewId() {
        this.notificationService.appLoading = true;
        this.restService.getNewId()
            .pipe(finalize(() => {
                this.notificationService.appLoading = false;
            }))
            .subscribe(
                id => {
                    //debugger;
                    if (!id)
                        this.entity.id = "1";
                    else
                        this.entity.id = (Number.parseInt(id) + 1).toString();
                },
                error => this.handleError({
                    userMessage: 'Ошибка при запросе номера нового заказа!',
                    logMessage: `${PageType[this.entityType]}Service.getNewId(${this.order_id})`,
                    error
                } as AppError)
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
                    this.entity.offerList = _lodash.sortBy(this.entity.offerList, (e) => (e as Offer).product.url)
                },
                error => this.handleError({
                    userMessage: 'Ошибка при запросе заказа!',
                    logMessage: `${PageType[this.entityType]}Service.get(${this.order_id})`,
                    error
                } as AppError)
            );
    }

    save() {
        if (!this.entity.id) return;

        if (this.entity.customer.phone[0] == '8') {
            this.entity.customer.phone = this.entity.customer.phone.substring(1);
        }

        this.entity.filterOrderDate = this.dateService.toString(this.entity.date, true);
        this.entity.filterCustomerPhone = this.entity.customer.phone;

        this.notificationService.appLoading = true;
        this.restService.post(this.entity)
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
        this.entity.offerList.forEach(o => total += o.price * o.count);
        return total;
    }

    deleteConfirmationDialog(): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: this.confirmationDialogData,
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            //console.log(`Dialog result: ${(result as ConfirmationDialogData).result}`);
            if ((result as ConfirmationDialogData).result == true)
                this.delete();
        });
    }

    offerDelete() {
        this.entity.offerList = _lodash.filter(this.entity.offerList,
            (offer) => !this.selection.selected.includes(offer)
        );
        this.selection.clear();
    }

    offerDeleteConfirmationDialog(): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: this.confirmationDialogData,
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            //console.log(`Dialog result: ${(result as ConfirmationDialogData).result}`);
            if ((result as ConfirmationDialogData).result == true)
                this.offerDelete();
        });
    }

    offerSearchDialogData: OfferSearchDialogData = {result: false} as OfferSearchDialogData;

    offerAddDialog() {
        const dialogRef = this.dialog.open(OfferSearchDialogComponent, {
            data: this.offerSearchDialogData,
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${(result as OfferSearchDialogData).result} ${(result as OfferSearchDialogData).data.length}`);
            if ((result as OfferSearchDialogData).result == true && (result as OfferSearchDialogData).data.length > 0)
                this.offerAdd((result as OfferSearchDialogData).data);
        });
    }

    orderExport() {

        if (!this.entity || !this.entity.id) return;

        let format = ".csv";
        let separator = ',';

        let csv = '\ufeff';

        csv += `"Заказ № ${this.entity.id} от ${this.entity.date.substring(0, 10)} в ${this.entity.time.substring(12, 5)} на сумму ${this.getTotal()}"`;
        csv += '\n\n';

        csv += `"Артикул"${separator}"Товар"${separator}"Размер"${separator}"Рост"${separator}"Цена"${separator}"Количество"${separator}"Сумма"`
        csv += '\n';

        this.entity.offerList.forEach<Offer>(offer =>
        {
            let o = offer as Offer;
            csv += `${o.product.sku}${separator}${o.product.title}${separator}${o.size}${separator}${o.height}${separator}${o.price}${separator}${o.count}${separator}${(o.price * o.count)}`;
            csv += '\n';
        });

        let blob = new Blob([csv],{
            type: 'text/csv;charset=utf-8;'
        });

        if(window.navigator.msSaveOrOpenBlob) {
            //debugger;
            navigator.msSaveOrOpenBlob(blob, `${this.entity.id}` + format);
        }
        else {
            //debugger;
            let link = document.createElement("a");
            link.style.display = 'none';
            document.body.appendChild(link);
            if(link.download !== undefined) {
                link.setAttribute('href', window.URL.createObjectURL(blob));
                link.setAttribute('download', `${this.entity.id}` + format);
                link.click();
            }
            else {
                //debugger;
                csv = 'data:text/csv;charset=utf-8,' + csv;
                window.open(encodeURI(csv));
            }
            //debugger;
            document.body.removeChild(link);
        }

    }

    offerAdd(data: Offer[]) {
        //debugger;
        this.entity.offerList = _lodash.concat(this.entity.offerList, data);
        this.selection.clear();
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
