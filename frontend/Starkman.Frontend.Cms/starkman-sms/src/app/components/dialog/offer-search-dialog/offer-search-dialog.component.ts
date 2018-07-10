import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OfferSearchDialogData } from '../../../models/dialog/offer-search-dialog-data';
import { Product } from '../../../models/page/product';
import { Offer } from '../../../models/order/offer';

@Component({
  selector: 'app-offer-search-dialog',
  templateUrl: './offer-search-dialog.component.html',
  styleUrls: ['./offer-search-dialog.component.scss']
})
export class OfferSearchDialogComponent implements OnInit {

    entityList: Offer[] = [] as Offer[];
    entityListFiltered: Offer[] = [] as Offer[];

    offerColumns: string[] = ['sku', 'title', 'size', 'height', 'price', 'count', 'select'];
    selection: any;

    constructor(
        public dialogRef: MatDialogRef<OfferSearchDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: OfferSearchDialogData) {
    }

    ngOnInit() {
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        debugger;
        const numSelected = this.selection.selected.length;
        const numRows = this.entityListFiltered.length;
        return numSelected == numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.entityListFiltered.forEach(row => this.selection.select(row));
    }

}
