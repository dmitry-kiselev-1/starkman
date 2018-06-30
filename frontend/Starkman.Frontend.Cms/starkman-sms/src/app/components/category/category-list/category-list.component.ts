import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/page/category';
import { BaseComponent } from '../../base.component';
import { NotificationService } from "../../../services/notification.service";
import { MatSnackBar } from "@angular/material";

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
      .then(items => {
        this.entityList = items as Category[];
        this.selectedCategory = category;
        this.notificationService.appLoading = false;
      })
      .catch(error => {
        this.handleError(error);
        this.notificationService.appLoading = false;
      });
  }
}
