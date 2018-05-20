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

  reload(url: string) {
    if (!url) return;

    this.notificationService.appLoading = true;
    this.categoryService.get(url)
      .then(item => {
        this.entity = (item || new Category());
        this.descriptionSelectedTabIndex = 0;
        this.reloadPhoto();
        this.notificationService.appLoading = false;
      })
      .catch(error => {
        this.handleError({userMessage: "Ошибка при чтении списка категорий.", logMessage: `categoryService.get(${url})`, error} as AppError);
        this.notificationService.appLoading = false;
      });
  }

  reloadPhoto() {
    if (!this.entity.Photo) return;

    this.notificationService.appLoading = true;
    this.photoService.get(`${this.entity.Photo.Url}.${this.entity.Photo.Type}`)
      .then(item => {
        this.entity.Photo.Base64String = item.Base64String;
        this.notificationService.appLoading = false;
      })
      .catch(error => {
        this.handleError(error);
        this.notificationService.appLoading = false;
      });
  }

  save() {
    if (!this.entity.Url) return;

    this.notificationService.appLoading = true;

    let photoBase64String: string;
    if (this.entity.Photo && this.entity.Photo.Base64String) {
      this.entity.Photo.Url = this.entity.Url;
      photoBase64String = this.entity.Photo.Base64String;
      this.entity.Photo.Base64String = null;
    }

    // если изменился Url, удаляем старую сущность и обновляем ссылки:
    if ((this.query_url != this.entity.Url) && (this.query_url != '')) {
      this.rename(this.query_url, this.entity.Url, this.entity.Url);
    }

    // сохраняем новую сущность:
    this.categoryService.post(this.entity)
      .then(item => {
        this.notificationService.categoryChange.emit({Url: this.entity.Url} as Category);
        this.router.navigateByUrl(`/category/${this.entity.Url}`);

        if (this.entity.Photo) {
          this.entity.Photo.Base64String = photoBase64String;
        }

        this.notificationService.appLoading = false;
        //this.reload(this.entity.Url);
      })
      .catch(error => {
        this.handleError(error);
        this.notificationService.appLoading = false;
      });
  }

  rename(oldUrl: string, oldUrlType: string, newUrl: string) {
    this.delete(oldUrl, false, false);

    this.photoService.rename(oldUrl, this.entity.Photo.Type, newUrl);

    // ToDo: переместить все товары из категории oldUrl в категорию newUrl
  }

  delete(url: string, needConfirmation: boolean = true, gotoNewAfterDelete: boolean = true) {
    if (needConfirmation
        ? confirm(`Удалить категорию "${this.entity.Title}"?`)
        : true ) {
      this.notificationService.appLoading = true;

      // this.openSnackBar(`Категорию ${this.entity.Title} нельзя удалить, т.к. она содержит товары`, "");

      this.categoryService.delete(url)
        .then(item => {
          this.notificationService.categoryChange.emit({Url: this.entity.Url} as Category);
          if (gotoNewAfterDelete) {
            this.router.navigateByUrl("/category");
          }
          this.notificationService.appLoading = false;
        })
        .catch(error => {
          this.handleError(error);
          this.notificationService.appLoading = false;
        });

      this.deletePhoto();
    }

  }

  deletePhoto() {
    if (!this.entity || !this.entity.Photo) return;

    let id = `${this.entity.Url}.${this.entity.Photo.Type}`;

    this.notificationService.appLoading = true;

    this.photoService.delete(id)
      .then(item => {
        this.entity.Photo = new Photo();
        this.notificationService.appLoading = false;
      })
      .catch(error => {
        this.handleError(error);
        this.notificationService.appLoading = false;
      });
  }

  add() {
    this.notificationService.appLoading = true;
    this.router.navigateByUrl("/category");
    this.notificationService.appLoading = false;
  }

  addProduct() {
    this.notificationService.appLoading = true;
    this.router.navigateByUrl(`/product/${this.entity.Url}`);
    this.notificationService.appLoading = false;
  }

  onTitleInputEnter(value: string) {
    this.entity.Url = this.toUrl(value);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
