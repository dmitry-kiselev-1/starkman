import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { OfferSearchDialogData } from '../../../models/dialog/offer-search-dialog-data';
import { Product } from '../../../models/page/product';
import { Offer } from '../../../models/order/offer';
import { finalize } from 'rxjs/operators';
import * as _lodash from 'lodash';
import { AppError } from '../../../models/app-error';
import { PageType } from '../../../models/page/page-type';
import { Order } from '../../../models/order/order';
import { BaseComponent } from '../../base.component';
import { NotificationService } from '../../../services/notification.service';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-offer-search-dialog',
  templateUrl: './offer-search-dialog.component.html',
  styleUrls: ['./offer-search-dialog.component.scss']
})
export class OfferSearchDialogComponent extends BaseComponent implements OnInit {

    entityList: Offer[] = [] as Offer[];
    entityListFiltered: Offer[] = [] as Offer[];

    offerColumns: string[] = ['sku', 'title', 'size', 'height', 'price', 'count', 'select'];
    selection: any;

    constructor(
        public dialogRef: MatDialogRef<OfferSearchDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: OfferSearchDialogData,

        public notificationService: NotificationService,
        private restService: OrderService,
        protected snackBar: MatSnackBar,
        public dialog: MatDialog) {
        super(snackBar, dialog);
    }

    ngOnInit() {
        this.reload();
    }

    reload(notify: boolean = true) {
        if (notify) { this.notificationService.appLoading = true; }
        this.restService.getListOffer()
            .pipe(finalize(() => {
                if (notify) { this.notificationService.appLoading = false; }
            }))
            .subscribe(
                data => {
                    debugger;
                    this.entityList = data as Offer[];
                    this.entityListFiltered = data as Offer[];
                },
                error => this.handleError({
                    userMessage: 'Ошибка при запросе списка торговых предложений!',
                    logMessage: `${PageType[this.entityType]}Service.getListOffer()`,
                    error
                } as AppError)
            );
    }

    /** Whether the number of selected elements matches the total number of rows. */
    /*isAllSelected() {
        debugger;
        const numSelected = this.selection.selected.length;
        const numRows = this.entityListFiltered.length;
        return numSelected == numRows;
    }*/

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    /*masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.entityListFiltered.forEach(row => this.selection.select(row));
    }*/

}
