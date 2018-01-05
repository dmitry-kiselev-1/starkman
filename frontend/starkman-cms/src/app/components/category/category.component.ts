import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../models/page/category.model';
import {BaseComponent} from '../base.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent extends BaseComponent implements OnInit {

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
