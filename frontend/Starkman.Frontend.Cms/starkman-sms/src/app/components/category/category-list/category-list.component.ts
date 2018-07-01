import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/page/category';
import { BaseComponent } from '../../base.component';
import { NotificationService } from "../../../services/notification.service";
import { MatSnackBar } from "@angular/material";
import { finalize } from 'rxjs/operators';
import { AppError } from '../../../models/app-error';

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
  public selectedCategory: Category;

  ngOnInit() {
    this.reload();
    this.notificationService.categoryChange.subscribe((category) => { this.reload(category) });
  }

  reload(category: Category = null)
  {
    this.notificationService.appLoading = true;
    this.categoryService.getList()
        .pipe(finalize(() => { this.notificationService.appLoading = false; }))
        .subscribe(
            data => {
                //debugger;
                this.entityList = ((data as Category[]).sort((a,b) => a.sortOrder > b.sortOrder) || []) as Category[];
                this.selectedCategory = category;
            },
            error => this.handleError({
                userMessage: 'Ошибка при запросе списка категорий!',
                logMessage: `categoryService.getList()`,
                error
            } as AppError)
        );
  }
}
