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
                        this.reload();
                    }
                    else
                        this.entity = {} as Category;
                },
                error => this.handleError(error)
            );
    }

    reload(notify: boolean = true) {
        if (!this.query_url) return;

        if (notify) {
            this.notificationService.appLoading = true;
        }

        this.categoryService.get(this.query_url)
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
                    userMessage: 'Ошибка при запросе категории!',
                    logMessage: `categoryService.get(${this.query_url})`,
                    error
                } as AppError)
            );
    }

    save() {
        if (!this.entity.url) return;

        this.notificationService.appLoading = true;

        // delete:
        this.categoryService.delete(this.query_url)
            .subscribe(
                httpResponse =>
                {
                    //debugger;
                    if ((httpResponse as HttpResponse<any>).ok == true)
                        console.log(`${this.query_url} deleted`);
                    else
                        console.error(httpResponse);

                    // post:
                    this.entity.id = this.entity.url;
                    this.entity.sortOrder = this.entity.sortOrder || 0;
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

                                // reload:
                                this.router.navigateByUrl(`/category/${this.entity.id}`);
                            },
                            error => this.handleError({
                                userMessage: 'Ошибка при добавлении категории!',
                                logMessage: `categoryService.post(${this.entity.url})`,
                                error
                            } as AppError)
                        );
                },
                error => this.handleError({
                    userMessage: 'Ошибка при удалении категории!',
                    logMessage: `categoryService.delete(${this.query_url})`,
                    error
                } as AppError)
            );
    }

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
    delete() {
        if (!this.query_url) return;

        this.notificationService.appLoading = true;

        this.categoryService.delete(this.query_url)
            .subscribe(
                httpResponse =>
                {
                    //debugger;
                    if ((httpResponse as HttpResponse<any>).ok == true) {
                        this.notificationService.categoryChange.emit({url: this.entity.url} as Category);
                        console.log(`${this.query_url} deleted`);

                        // reload:
                        this.router.navigateByUrl(`/category`);
                    }
                    else
                        console.error(httpResponse);
                },
                error => this.handleError({
                    userMessage: 'Ошибка при удалении категории!',
                    logMessage: `categoryService.delete(${this.query_url})`,
                    error
                } as AppError)
            );
    }

    addCategory() {
        this.router.navigateByUrl('/category');
    }

    addProduct() {
        this.router.navigateByUrl(`/product/${this.entity.url}`);
    }

    onTitleInputEnter(value: string) {
        this.entity.url = this.toUrl(value);
    }

}
