import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from "../../base.component";
import { Product } from "../../../models/page/product";
import { MatDialog, MatSnackBar } from '@angular/material';
import * as _lodash from "lodash";

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent extends BaseComponent implements OnInit {

    @Input() entityList: Product[] = [];
    public entityListFiltered: Product[] = [];

    constructor(
        protected snackBar: MatSnackBar,
        public dialog: MatDialog) {
        super(snackBar, dialog);
    }

    ngOnInit() {
        this.entityListFiltered = Object.assign([{}], this.entityList);
    }

    public searchProduct(filterValue: string)
    {
        if (!filterValue || filterValue.length === 0) {
            this.entityListFiltered = this.entityList;
        }
        else {
            this.entityListFiltered = _lodash.filter(this.entityList, (entity) =>
                (
                    entity.title.toLowerCase().includes(filterValue.toLowerCase())
                    ||
                    entity.sku.toString().toLowerCase().includes(filterValue.toLowerCase()))
                );
        }
    }

}

