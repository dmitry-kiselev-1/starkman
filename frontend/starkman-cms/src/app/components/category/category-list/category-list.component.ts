import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/page/category.model';
import { BaseComponent } from '../../base.component';
import { NotificationService } from "../../../services/notification.service";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent extends BaseComponent implements OnInit {

  constructor(
    private notificationService: NotificationService,
    private categoryService: CategoryService) {
    super();
  }

  public entityList: Category[] = [];
  public openedCategory: Category;

  ngOnInit() {
    this.reload();
    this.notificationService.categoryChange.subscribe((category) => { this.reload(category) });
  }

  reload(category: Category = null)
  {
    this.notificationService.appLoadingSet(true);
    this.categoryService.getList()
      .then(items => {
        this.entityList = items as Category[];
        this.openedCategory = category;
        this.notificationService.appLoadingSet(false);
      })
      .catch(error => {
        this.handleError(error);
        this.notificationService.appLoadingSet(false);
      });
  }
}
