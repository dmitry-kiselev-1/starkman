import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Category } from '../../../models/page/category';
import { CategoryService } from '../../../services/category.service';
import { NotificationService } from '../../../services/notification.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Photo } from '../../../models/page/photo';
import { PhotoService } from '../../../services/photo.service';
import { FroalaСontainerComponent } from "../../froala-container.component";
import { AppError } from "../../../models/app-error";

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent extends FroalaСontainerComponent implements OnInit {

  public query_url: string;
  public entity: Category = new Category();

  constructor(
    private notificationService: NotificationService,
    private photoService: PhotoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    protected snackBar: MatSnackBar) {
    super(snackBar);
  }

  ngOnInit() {
    this.componentTitle = this.activatedRoute.snapshot.data['title'];

    this.activatedRoute.params.subscribe(params => {
      this.query_url = params['category_url'];

      if (!this.query_url)
        { this.entity = new Category() }
      else
        { this.reload(this.query_url) }
    });
  }

  reload(url: string, silent: boolean = false) {
    if (!url) return;

    if (!silent) { this.notificationService.appLoading = true };
    this.categoryService.get(url)
      .then(item => {
        this.entity = (item || new Category());
        this.descriptionSelectedTabIndex = 0;
        this.reloadPhoto(url);
        if (!silent) { this.notificationService.appLoading = false };
      })
      .catch(error => {
        this.handleError({userMessage: "Ошибка при запросе списка категорий.", logMessage: `categoryService.get(${url})`, error} as AppError);
        if (!silent) { this.notificationService.appLoading = false };
      });
  }

  reloadPhoto(url: string, silent: boolean = false) {
    if (!url || !this.entity.Photo || !this.entity.Photo.Type) return;

    if (!silent) { this.notificationService.appLoading = true };
    let id = `${url}.${this.entity.Photo.Type}`;
    this.photoService.get(id)
      .then(item => {
        if (item && item.Base64String) {
          this.entity.Photo.Base64String = item.Base64String;
        }
        if (!silent) { this.notificationService.appLoading = false };
      })
      .catch(error => {
        this.handleError({userMessage: "Ошибка при запросе изображения.", logMessage: `photoService.get(${id}`, error} as AppError);
        if (!silent) { this.notificationService.appLoading = false };
      });
  }

  save() {
    if (!this.entity.Url || !this.query_url) return;

    this.notificationService.appLoading = true;

    // имена страниц являются их идентификаторами, поэтому, если если изменился url,
    // будет создана новая сущность, а сущность-дубль со старым именем необходимо удалить:
    const oldName = this.query_url;
    const newName = this.entity.Url;
    const oldPhoto = this.entity.Photo;

    // если есть изображение, сохраняем информацию о нём (т.к. изображения сохраняются отдельно):
    if( this.entity.Photo && this.entity.Photo.Base64String)
    {
      this.entity.Photo.Url = this.entity.Url;
      // перед сохранением массив байт изображения очищается:
      this.entity.Photo.Base64String = null;
    }

    this.categoryService.post(this.entity)
      .then(item => {

        // после сохранения изображению возвращается обратно массив байт:
        this.entity.Photo.Base64String = oldPhoto.Base64String;

        this.notificationService.categoryChange.emit({Url: this.entity.Url} as Category);
        this.router.navigateByUrl(`/category/${this.entity.Url}`);

        // если было переименование, сущности со старым именем необходимо удалить:
        if (oldName != newName) {
          // удаление фото:
          this.photoService.delete(`${oldName}${oldPhoto.Type}`)
            .then( result =>{
              this.notificationService.appLoading = false;
              this.showInfo(`Cохранено: "${this.entity.Title}"`);
            })
            .catch(error => {
              this.handleError({userMessage: "Ошибка при обновлении изображения категории.", logMessage: `photoService.delete(${oldName}${oldPhoto.Type}`, error} as AppError);
              this.notificationService.appLoading = false;
            });
        }
        else {
          // если переименования не было, удалять дубли не нужно и сохранение завершается:
          this.notificationService.appLoading = false;
          this.showInfo(`Cохранено: "${this.entity.Title}"`);
        }
      })
      .catch(error => {
        this.handleError({userMessage: "Ошибка при обновлении категории.", logMessage: `categoryService.post(${this.entity}`, error} as AppError);
        this.notificationService.appLoading = false;
      });
  }

  delete(url: string, needConfirmation: boolean = true, gotoNewAfterDelete: boolean = true) {
    if (needConfirmation
        ? confirm(`Удалить категорию "${this.entity.Title}"?`)
        : true ) {
      this.notificationService.appLoading = true;

      this.categoryService.delete(url)
        .then(item => {
          this.notificationService.categoryChange.emit({Url: this.entity.Url} as Category);
          if (gotoNewAfterDelete) {
            this.router.navigateByUrl("/category");
          }
          this.notificationService.appLoading = false;
        })
        .catch(error => {
          this.handleError({userMessage: "Ошибка при удалении категории.", logMessage: `categoryService.delete(${this.entity}`, error} as AppError);
          this.notificationService.appLoading = false;
        });

      // удаление фото:
      if (this.entity.Photo && this.entity.Photo.Type)
      {
        this.photoService.delete(`${url}${this.entity.Photo.Type}`)
          .then(result => {
            this.notificationService.appLoading = false;
            this.showInfo(`Cохранено: "${this.entity.Title}"`);
          })
          .catch(error => {
            this.handleError({
              userMessage: "Ошибка при обновлении изображения.",
              logMessage: `photoService.delete(${url}${this.entity.Photo.Type}`,
              error
            } as AppError);
            this.notificationService.appLoading = false;
          });
      }
    }

  }

  add() {
    this.router.navigateByUrl("/category");
  }

  addProduct() {
    this.router.navigateByUrl(`/product/${this.entity.Url}`);
  }

  onTitleInputEnter(value: string) {
    this.entity.Url = this.toUrl(value);
  }

}
