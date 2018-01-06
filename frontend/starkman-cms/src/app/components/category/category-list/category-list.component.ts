import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../services/category.service';
import {Category} from '../../../models/page/category.model';
import {BaseComponent} from '../../base.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent extends BaseComponent implements OnInit {

  constructor(private categoryService: CategoryService) {
    super();
  }

  public entityList: Category[] = [];

  ngOnInit() {

    this.categoryService.list()
      .then(items => {
        this.entityList = items as Category[];
      })
      .catch(error => {
        this.handleError(error);
      });
  }
}
