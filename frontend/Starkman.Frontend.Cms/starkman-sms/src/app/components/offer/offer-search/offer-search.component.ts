import { Component, Input, OnInit } from '@angular/core';
import * as _lodash from 'lodash';
import { Product } from '../../../models/page/product';
import { MatSnackBar } from '@angular/material';
import { Offer } from '../../../models/order/offer';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-offer-search',
  templateUrl: './offer-search.component.html',
  styleUrls: ['./offer-search.component.scss']
})
export class OfferSearchComponent extends BaseComponent implements OnInit {

    @Input() entityList: Offer[] = [];
    public entityListFiltered: Offer[] = [];

    constructor(protected snackBar: MatSnackBar) {
        super(snackBar);
    }

    ngOnInit() {
        this.entityListFiltered = Object.assign([{}], this.entityList);
    }

    public searchProduct(filterValue: string)
    {
        /*
        if (!filterValue || filterValue.length === 0) {
            this.entityListFiltered = this.entityList;
        }
        else {
            this.entityListFiltered = _lodash.filter(this.entityList, (entity) =>
                (entity.title.includes(filterValue) || entity.sku.toString().includes(filterValue)));
        }
        */
    }

}
