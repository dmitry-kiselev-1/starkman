import { Component, OnInit } from '@angular/core';
import { BaseComponent } from "../../../base.component";
import { Category } from "../../../../models/page/category.model";
import { Product } from "../../../../models/page/product.model";
import { Photo } from "../../../../models/page/photo.model";
import { PhotoListComponent } from "../../../photo/photo-list/photo-list.component";
import { forEach } from "@angular/router/src/utils/collection";

import * as _ from "lodash";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent extends BaseComponent implements OnInit {

  constructor() {
    super();
  }

  public entityList: Product[] = [];
  public entityListFiltered: Product[] = [];

  ngOnInit() {

    for (var i = 1; i <= 10; i++) {
      this.entityList.push({ Title: `Продукт ${i}`, Sku: 1, PhotoList: [] } as Product);
    }

    this.entityListFiltered = Object.assign([{}], this.entityList);
  }

  private searchProduct(filterValue: string)
  {
    if (!filterValue || filterValue.length === 0) {
      this.entityListFiltered = this.entityList;
    }
    else {
      this.entityListFiltered = _.filter(this.entityList, (entity) => entity.Title.includes(filterValue));
    }

    // this.entityList.filter(entity => entity.Title.includes(filterValue) );
  }

}

