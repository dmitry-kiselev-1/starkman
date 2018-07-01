import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { Category } from '../../../models/page/category';
import { CategoryService } from '../../../services/category.service';
import { NotificationService } from '../../../services/notification.service';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Photo } from '../../../models/page/photo';
import { PhotoService } from '../../../services/photo.service';
import { AppError } from '../../../models/app-error';
import { ConfirmationDialogComponent } from '../../dialog/confirmation-dialog/confirmation-dialog.component';
import { BaseComponent } from '../../base.component';
import { finalize } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-category-edit',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent extends BaseComponent implements OnInit {

    public query_url: string;
    public entity: Category = {} as Category;

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

        this.activatedRoute.paramMap
            .subscribe(
                (params: ParamMap) => {
                    //debugger;
                    let category_id = params.get('category_id');
                    if (category_id) {
                        this.query_url = category_id
                        this.reload(category_id);
                    }
                    else
                        this.entity = {} as Category;
                },
                error => this.handleError(error)
            );
    }

    reload(url: string, notify: boolean = true) {
        if (!url) return;

        if (notify) {
            this.notificationService.appLoading = true;
        }

        this.categoryService.get(url)
            .pipe(finalize(() => {
                if (notify) {
                    this.notificationService.appLoading = false;
                }
            }))
            .subscribe(
                data => {
                    //debugger;
                    this.entity = (data || {} as Category);
                },
                error => this.handleError({
                    userMessage: 'Ошибка при запросе списка категорий.',
                    logMessage: `categoryService.get(${url})`,
                    error
                } as AppError)
            );
    }

    save() {
        if (!this.entity.url || !this.query_url) return;

        this.notificationService.appLoading = true;

        this.categoryService.delete(this.query_url)
            .subscribe(
                httpResponse =>
                {
                    //debugger;
                    if ((httpResponse as HttpResponse<any>).ok == true)
                        console.log(`${this.query_url} deleted`);
                    else
                        console.error(httpResponse);

                    this.entity.id = this.entity.url;
                    this.categoryService.post(this.entity)
                        .pipe(finalize(() => this.notificationService.appLoading = false))
                        .subscribe(
                            httpResponse =>
                            {
                                //debugger;
                                if ((httpResponse as HttpResponse<any>).ok == true) {
                                    this.notificationService.categoryChange.emit({url: this.entity.url} as Category);
                                    console.log(`${this.entity.url} posted`);
                                }
                                else
                                    console.error(httpResponse);
                            },
                            error => this.handleError(error)
                        );
                },
                error => this.handleError(error)
            );
    }

    /*
    save() {
        debugger;
        if (!this.entity.url || !this.query_url) return;

        this.notificationService.appLoading = true;

        // имена страниц являются их идентификаторами, поэтому, если если изменился url,
        // будет создана новая сущность, а сущность-дубль со старым именем необходимо удалить:
        const oldName = this.query_url;
        const newName = this.entity.url;
        let oldEntity = {url: oldName} as Category;
        let oldPhoto = {type: this.entity.photo.type || null} as Photo;
        oldEntity.photo = oldPhoto;

        // если есть изображение, сохраняем информацию о нём (т.к. изображения сохраняются отдельно):
        if (this.entity.photo && this.entity.photo.base64String) {
            this.entity.photo.url = this.entity.url;
            // перед сохранением массив байт изображения очищается:
            this.entity.photo.base64String = null;
        }

        this.categoryService.post(this.entity)
            .then(item => {

                // после сохранения изображению возвращается обратно массив байт:
                if (this.entity.photo) {
                    this.entity.photo.base64String = oldEntity.photo.base64String;
                }

                this.notificationService.categoryChange.emit({url: this.entity.url} as Category);
                this.router.navigateByUrl(`/category/${this.entity.url}`);

                // если было переименование, сущности со старым именем необходимо удалить:
                if (oldName != newName) {
                    this.delete(oldEntity, false, false);
                }
                else {
                    // если переименования не было, удалять дубли не нужно и сохранение завершается:
                    this.notificationService.appLoading = false;
                    this.showInfo(`Cохранено: "${this.entity.title}"`);
                }
            })
            .catch(error => {
                this.handleError({
                    userMessage: 'Ошибка при обновлении категории.',
                    logMessage: `categoryService.post(${this.entity}`,
                    error
                } as AppError);
                this.notificationService.appLoading = false;
            });
    }
    */
    /*
      openDialog(): void {
        let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '250px',
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          //this.animal = result;
        });
      }
    */
    /*
    delete(category: Category, needConfirmation: boolean = true, gotoNewAfterDelete: boolean = true, silent: boolean = false) {
        debugger;
        if (!category.photo || !category.photo.type) {
            return;
        }

        if (needConfirmation ? confirm(`Удалить категорию "${this.entity.title}"?`) : true) {
            if (!silent) {
                this.notificationService.appLoading = true;
            }
            ;

            this.categoryService.delete(category.url)
                .then(item => {
                    this.notificationService.categoryChange.emit({url: this.entity.url} as Category);
                    if (gotoNewAfterDelete) {
                        this.router.navigateByUrl('/category');
                    }
                    if (!silent) {
                        this.notificationService.appLoading = false;
                    }
                    ;
                })
                .catch(error => {
                    this.handleError({
                        userMessage: 'Ошибка при удалении категории.',
                        logMessage: `categoryService.delete(${this.entity}`,
                        error
                    } as AppError);
                    this.notificationService.appLoading = false;
                });

            // удаление фото:
            if (category.photo && category.photo.type) {
                let photoId: string = `${category.url}${category.photo.type}`;
                this.photoService.delete(photoId)
                    .then(result => {
                        if (!silent) {
                            this.notificationService.appLoading = false;
                        }
                        ;
                        this.showInfo(`Удалено: "${category.title}"`);
                    })
                    .catch(error => {
                        this.handleError({
                            userMessage: 'Ошибка при удалении изображения.',
                            logMessage: `photoService.delete(${photoId}`,
                            error
                        } as AppError);
                        this.notificationService.appLoading = false;
                    });
            }
        }

    }
    */
    add() {
        this.router.navigateByUrl('/category');
    }

    addProduct() {
        //this.router.navigateByUrl(`/product/${this.entity.url}`);
    }

    onTitleInputEnter(value: string) {
        this.entity.url = this.toUrl(value);
    }

    /*
      reloadPhoto(url: string, silent: boolean = false) {
        if (!url || !this.entity.photo || !this.entity.photo.type) return;

        if (!silent) { this.notificationService.appLoading = true };
        let id = `${url}.${this.entity.photo.type}`;
        this.photoService.get(id)
          .then(item => {
            if (item && item.base64String) {
              this.entity.photo.base64String = item.base64String;
            }
            if (!silent) { this.notificationService.appLoading = false };
          })
          .catch(error => {
            this.handleError({userMessage: "Ошибка при запросе изображения.", logMessage: `photoService.get(${id}`, error} as AppError);
            if (!silent) { this.notificationService.appLoading = false };
          });
      }
    */

}
