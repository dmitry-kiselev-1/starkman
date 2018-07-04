import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { Category } from '../../../models/page/category';
import { CategoryService } from '../../../services/category.service';
import { NotificationService } from '../../../services/notification.service';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppError } from '../../../models/app-error';
import { BaseComponent } from '../../base.component';
import { finalize } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { ConfirmationDialogComponent } from '../../dialog/confirmation-dialog/confirmation-dialog.component';
import { EntityType } from '../../../models/entity-type';

@Component({
    selector: 'app-category-form',
    templateUrl: "../../page/page-form/page-form.component.html",
    styleUrls: ['../../page/page-form/page-form.component.scss']
})
export class CategoryFormComponent extends BaseComponent implements OnInit {

    public category_id: string;
    public entity: Category = {} as Category;

    constructor(
        public notificationService: NotificationService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private restService: CategoryService,
        protected snackBar: MatSnackBar) {
        super(snackBar);
        this.entityType = EntityType.Category;
    }

    ngOnInit() {
        this.componentTitle = this.activatedRoute.snapshot.data['title'];

        this.activatedRoute.paramMap
            .subscribe(
                (params: ParamMap) => {
                    this.category_id = params.get('category_id');
                    this.reload();
                },
                error => this.handleError(error)
            );
    }

    addProduct() {
        this.router.navigateByUrl(`/product/${this.category_id}`);
    }

    onTitleInputEnter(value: string) {
        this.entity.url = this.toUrl(value);
    }

    reload(notify: boolean = true) {
        if (!this.category_id) return;
        if (notify) { this.notificationService.appLoading = true; }
        this.restService.get(this.category_id)
            .pipe(finalize(() => {
                if (notify) { this.notificationService.appLoading = false; }
            }))
            .subscribe(
                data => {
                    //debugger;
                    this.entity = (data || {} as Category);
                },
                error => this.handleError({
                    userMessage: 'Ошибка при запросе категории!',
                    logMessage: `categoryService.get(${this.category_id})`,
                    error
                } as AppError)
            );
    }

    save() {
        if (!this.entity.url) return;
        this.notificationService.appLoading = true;
        this.entity.id = this.entity.url;
        this.restService.post(this.entity.url, this.entity)
            .pipe(finalize(() => this.notificationService.appLoading = false))
            .subscribe(
                httpResponse => {
                    this.notificationService.categoryChange.emit({url: this.entity.url} as Category);
                    console.log(`${this.entity.url} posted`);
                    this.router.navigateByUrl(`/category/${this.entity.id}`);
                },
                error => this.handleError({
                    userMessage: 'Ошибка при добавлении категории!',
                    logMessage: `categoryService.post(${this.entity.url})`,
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
        if (!this.category_id) return;
        this.notificationService.appLoading = true;
        this.restService.delete(this.category_id)
            .subscribe(
                httpResponse => {
                    this.notificationService.categoryChange.emit({url: this.category_id} as Category);
                    console.log(`${this.category_id} deleted`);
                    this.router.navigateByUrl(`/category`);
                },
                error => this.handleError({
                    userMessage: 'Ошибка при удалении категории!',
                    logMessage: `${EntityType[this.entityType]}Service.delete(${this.category_id})`,
                    error
                } as AppError)
            );
    }

}
