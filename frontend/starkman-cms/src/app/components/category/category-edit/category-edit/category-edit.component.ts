import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {Category} from '../../../../models/page/category.model';
import {CategoryService} from '../../../../services/category.service';
import {BaseComponent} from '../../../base.component';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent extends BaseComponent implements OnInit {

  public category_url: string;
  public title: string;
  public entity: Category = new Category();

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService) {
    super();
  }

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.data['title'];

    this.activatedRoute.params.subscribe(params => {
      this.category_url = params['category_url'];
      this.getEntity()
    });
  }

  getEntity()
  {
    if (!this.category_url) return;

    this.categoryService.get(this.category_url)
      .then(item => {
        this.entity = item as Category;
      })
      .catch(error => {
        this.handleError(error);
      });

  }
}
