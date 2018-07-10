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

    entityList: Offer[] = [];
    entityListFiltered: Offer[] = [];
    entityListSelected: Offer[] = [];

    constructor(
        public dialogRef: MatDialogRef<OfferSearchDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: OfferSearchDialogData) {
    }

    ngOnInit() {
    }

}
