import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {Category} from '../../../models/page/category.model';
import {CategoryService} from '../../../services/category.service';
import {BaseComponent} from '../../base.component';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent extends BaseComponent implements OnInit {

  public category_url: string;
  public entity: Category = new Category();

  constructor(
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService) {
    super();
  }

  ngOnInit() {
    this.componentTitle = this.activatedRoute.snapshot.data['title'];

    this.activatedRoute.params.subscribe(params => {
      this.category_url = params['category_url'];

      this.reload(this.category_url)
    });
  }

  reload(url: string) {

    if (!url) return;

    this.notificationService.appLoadingSet(true);
    this.categoryService.get(url)
      .then(item => {
        this.entity = (item as Category) || new Category();
        this.notificationService.appLoadingSet(false);
      })
      .catch(error => {
        this.handleError(error);
        this.notificationService.appLoadingSet(false);
      });
  }

  save()
  {
    this.notificationService.appLoadingSet(true);
    this.categoryService.post(this.entity)
      .then(item => {
        this.reload(this.entity.Url);
        this.notificationService.categoryChange.emit();
        this.notificationService.appLoadingSet(false);
      })
      .catch(error => {
        this.handleError(error);
        this.notificationService.appLoadingSet(false);
      });
  }

  delete()
  {
    this.notificationService.appLoadingSet(true);
    this.categoryService.delete(this.entity.Url)
      .then(item => {
        this.notificationService.categoryChange.emit();
        this.notificationService.appLoadingSet(false);
      })
      .catch(error => {
        this.handleError(error);
        this.notificationService.appLoadingSet(false);
      });
  }

  add()
  {
    this.notificationService.appLoadingSet(true);
    this.router.navigateByUrl("/category/new");
    this.notificationService.appLoadingSet(false);
  }

}
