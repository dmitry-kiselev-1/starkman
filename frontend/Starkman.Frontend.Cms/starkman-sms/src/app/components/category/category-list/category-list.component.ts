import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/page/category';
import { BaseComponent } from '../../base.component';
import { NotificationService } from '../../../services/notification.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { AppError } from '../../../models/app-error';
import { Order } from '../../../models/order/order';
import { Product } from '../../../models/page/product';
import * as _lodash from 'lodash';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent extends BaseComponent implements OnInit {

    constructor(
        public notificationService: NotificationService,
        private categoryService: CategoryService,
        protected snackBar: MatSnackBar,
        public dialog: MatDialog) {
        super(snackBar, dialog);
    }

    public entityList: Category[] = [];
    public selectedEntity: Category;

    ngOnInit() {
        this.reload();
        this.notificationService.categoryChange.subscribe((category) => {
            this.reload(category);
        });
    }

    reload(entity: Category = null) {
        this.notificationService.appLoading = true;
        this.categoryService.getList()
            .pipe(finalize(() => {
                this.notificationService.appLoading = false;
            }))
            .subscribe(
                data => {
                    //debugger;
                    if ((data as Category[]).length > 0) {
                        this.entityList = _lodash.sortBy(data, item => (item as Category).sortOrder);

                        this.entityList.forEach(item =>
                            item.productList = _lodash.sortBy(item.productList, item => (item as Product).sortOrder) as Product[]);

                        this.selectedEntity = entity;
                    }
                    else
                        this.entityList = [];
                },
                error => this.handleError({
                    userMessage: 'Ошибка при запросе списка категорий!',
                    logMessage: `categoryService.getList()`,
                    error
                } as AppError)
            );
    }
}
