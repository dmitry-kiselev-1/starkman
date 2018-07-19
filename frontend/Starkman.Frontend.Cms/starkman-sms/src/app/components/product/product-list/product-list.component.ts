import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from "../../base.component";
import { Product } from "../../../models/page/product";
import { MatDialog, MatSnackBar, MatTab } from '@angular/material';
import * as _lodash from "lodash";
import { MatTabChangeEvent } from '@angular/material/tabs/typings/tab-group';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent extends BaseComponent implements OnInit {

    @Input() entityList: Product[] = [];
    entityListFiltered: Product[] = [];

    constructor(
        protected snackBar: MatSnackBar,
        public dialog: MatDialog) {
        super(snackBar, dialog);
    }

    ngOnInit() {
        this.entityListFiltered = Object.assign([{}], this.entityList);
    }

    searchProduct(filterValue: string)
    {
        if (!filterValue || filterValue.length === 0) {
            this.entityListFiltered = this.entityList;
        }
        else {
            this.entityListFiltered = _lodash.filter(this.entityList, (entity) =>
                (
                    entity.title.toLowerCase().includes(filterValue.toLowerCase())
                    ||
                    entity.sku.toLowerCase().includes(filterValue.toLowerCase()))
                );
        }
    }
}

