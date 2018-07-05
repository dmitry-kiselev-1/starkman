import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/page/category';
import { BaseComponent } from '../../base.component';
import { NotificationService } from "../../../services/notification.service";
import { MatSnackBar } from "@angular/material";
import { finalize } from 'rxjs/operators';
import { AppError } from '../../../models/app-error';
import * as _ from "lodash";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent extends BaseComponent implements OnInit {

  constructor(
    private notificationService: NotificationService,
    private categoryService: CategoryService,
    protected snackBar: MatSnackBar) {
    super(snackBar);
  }

  public entityList: Category[] = [];
  public selectedEntity: Category;

  ngOnInit() {
    this.reload();
    this.notificationService.categoryChange.subscribe((category) => { this.reload(category) });
  }

  reload(entity: Category = null)
  {
    this.notificationService.appLoading = true;
    this.categoryService.getList()
        .pipe(finalize(() => { this.notificationService.appLoading = false; }))
        .subscribe(
            data => {
                //debugger;

                if ((data as Category[]).length > 0) {
                    this.entityList = (data as Category[]).sort((a, b) => {
                        if (a.sortOrder > b.sortOrder) {
                            return 1;
                        }
                        if (a.sortOrder < b.sortOrder) {
                            return -1;
                        }
                        return 0;
                    });
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
