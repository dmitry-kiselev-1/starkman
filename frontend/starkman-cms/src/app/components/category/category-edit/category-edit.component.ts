import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {Category} from '../../../models/page/category.model';
import {CategoryService} from '../../../services/category.service';
import {BaseComponent} from '../../base.component';
import {NotificationService} from '../../../services/notification.service';
import {MatDialog, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent extends BaseComponent implements OnInit {

  public query_url: string;
  public entity: Category = new Category();

  public froalaOptions: any = {
    placeholder: "Description (описание категории на русском)",
    height: 300,
    toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'fontFamily', 'fontSize', '|', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'insertHR', '-', 'insertLink', 'insertTable', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html']
    /*toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', '|', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertHR', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html']*/
  }

  constructor(
    private notificationService: NotificationService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService) {
    super();
  }

  ngOnInit()
  {
    this.componentTitle = this.activatedRoute.snapshot.data['title'];

    this.activatedRoute.params.subscribe(params => {
      this.query_url = params['category_url'];

      this.reload(this.query_url)
    });
  }

  reload(url: string)
  {
    if (!url) return;

    this.notificationService.appLoadingSet(true);
    this.categoryService.get(url)
      .then(item => {
        this.entity = (item || new Category());
        this.notificationService.appLoadingSet(false);
      })
      .catch(error => {
        this.handleError(error);
        this.notificationService.appLoadingSet(false);
      });
  }

  save()
  {
    if (!this.entity.Url) return;

    this.notificationService.appLoadingSet(true);

    // если изменился Url, удаляем старую сущность и обновляем ссылки:
    if (this.query_url != this.entity.Url) {
      this.changeUrl(this.query_url, this.entity.Url);
    }

    // сохраняем новую сущность:
    this.categoryService.post(this.entity)
      .then(item => {
        this.notificationService.categoryChange.emit();
        this.router.navigateByUrl(`/category/${this.entity.Url}`);
        this.notificationService.appLoadingSet(false);
        //this.reload(this.entity.Url);
      })
      .catch(error => {
        this.handleError(error);
        this.notificationService.appLoadingSet(false);
      });
  }

  changeUrl(oldUrl: string, newUrl: string)
  {
    this.delete(oldUrl, false, false);
    // ToDo: переместить все товары из категории oldUrl в категорию newUrl
  }

  delete(url: string, needConfirmation: boolean = true, gotoNewAfterDelete: boolean = true)
  {
    if (needConfirmation
        ? confirm(`Удалить категорию "${this.entity.Title}"?`)
        : true ) {
      this.notificationService.appLoadingSet(true);

      // this.openSnackBar(`Категорию ${this.entity.Title} нельзя удалить, т.к. она содержит товары`, "");

      this.categoryService.delete(url)
        .then(item => {
          this.notificationService.categoryChange.emit();
          if (gotoNewAfterDelete) {
            this.router.navigateByUrl("/category/new");
          }
          this.notificationService.appLoadingSet(false);
        })
        .catch(error => {
          this.handleError(error);
          this.notificationService.appLoadingSet(false);
        });
    }

  }

  add()
  {
    this.notificationService.appLoadingSet(true);
    this.router.navigateByUrl("/category/new");
    this.notificationService.appLoadingSet(false);
  }

  onTitleInputEnter(value: string)
  {
    this.entity.Url = this.toUrl(value);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
