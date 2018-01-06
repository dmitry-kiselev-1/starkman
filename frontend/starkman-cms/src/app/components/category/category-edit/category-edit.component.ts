import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {Category} from '../../../models/page/category.model';
import {CategoryService} from '../../../services/category.service';
import {BaseComponent} from '../../base.component';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent extends BaseComponent implements OnInit {

  public category_url: string;
  public entity: Category = new Category();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService) {
    super();
  }

  ngOnInit() {
    this.componentTitle = this.activatedRoute.snapshot.data['title'];

    this.activatedRoute.params.subscribe(params => {
      this.category_url = params['category_url'];
      this.getEntity(this.category_url)
    });
  }

  getEntity(url: string)
  {
    if (!url) return;

    this.categoryService.get(url)
      .then(item => {
        this.entity = (item as Category) || new Category();
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  save()
  {
    this.categoryService.post(this.entity)
      .then(item => {
        this.getEntity(this.entity.Url);
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  delete()
  {
    this.categoryService.delete(this.entity.Url)
      .then(item => {
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  add()
  {
    this.router.navigateByUrl("/category/new");
  }

}
