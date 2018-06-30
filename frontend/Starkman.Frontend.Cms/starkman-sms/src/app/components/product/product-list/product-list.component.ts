import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from "../../base.component";
import { Category } from "../../../models/page/category";
import { Product } from "../../../models/page/product";
import { Photo } from "../../../models/page/photo";
import { PhotoListComponent } from "../../photo/photo-list/photo-list.component";
import { forEach } from "@angular/router/src/utils/collection";

import * as _ from "lodash";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent extends BaseComponent implements OnInit {

  @Input() entityList: Product[] = [];
  public entityListFiltered: Product[] = [];

  constructor(protected snackBar: MatSnackBar) {
    super(snackBar);
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
      this.entityListFiltered = _.filter(this.entityList, (entity) => entity.Title.includes(filterValue));
      // this.entityList.filter(entity => entity.Title.includes(filterValue) );
    }
  }

}

