import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { Product } from '../../../models/page/product';
import { ProductService } from '../../../services/product.service';
import { NotificationService } from '../../../services/notification.service';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppError } from '../../../models/app-error';
import { BaseComponent } from '../../base.component';
import { finalize } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { ConfirmationDialogComponent } from '../../dialog/confirmation-dialog/confirmation-dialog.component';
import { EntityType } from '../../../models/entity-type';
import { Category } from '../../../models/page/category';

@Component({
  selector: 'app-product-form',
    templateUrl: "../../page/page-form/page-form.component.html",
    styleUrls: ['../../page/page-form/page-form.component.scss']
})
export class ProductFormComponent extends BaseComponent implements OnInit {

    public query_url: string;
    public parent_query_url: string;
    public entity: Product = {} as Product;

    constructor(
        public notificationService: NotificationService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private pageService: ProductService,
        protected snackBar: MatSnackBar) {
        super(snackBar);
        this.entityType = EntityType.Product;
    }

    ngOnInit() {
        this.componentTitle = this.activatedRoute.snapshot.data['title'];

        this.activatedRoute.paramMap
            .subscribe(
                (params: ParamMap) => {
                    //debugger;
                    let product_id = params.get('product_id');
                    let category_id = params.get('category_id');
                    if (category_id) {
                        this.query_url = product_id;
                        this.parent_query_url = category_id;
                        this.reload();
                    }
                    else
                        this.entity = {} as Product;
                },
                error => this.handleError(error)
            );
    }

    addCategory() {
        this.router.navigateByUrl('/category');
    }

    addProduct() {
        this.router.navigateByUrl(`/product/${this.entity.urlParent}`);
    }

    onTitleInputEnter(value: string) {
        this.entity.url = this.toUrl(value);
    }

    reload(notify: boolean = true) {
        if (!this.query_url) return;

        if (notify) {
            this.notificationService.appLoading = true;
        }

        this.pageService.get(this.query_url)
            .pipe(finalize(() => {
                if (notify) {
                    this.notificationService.appLoading = false;
                }
            }))
            .subscribe(
                data => {
                    //debugger;
                    this.entity = (data || {} as Product);
                },
                error => this.handleError({
                    userMessage: 'Ошибка при запросе товара!',
                    logMessage: `productService.get(${this.query_url})`,
                    error
                } as AppError)
            );
    }

    save() {
        if (!this.entity.url) return;

        this.notificationService.appLoading = true;

        // delete:
        this.pageService.delete(this.query_url)
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
                    this.entity.urlParent = this.parent_query_url;
                    this.entity.sortOrder = this.entity.sortOrder || 0;
                    this.pageService.post(this.entity.url, this.entity)
                        .pipe(finalize(() => this.notificationService.appLoading = false))
                        .subscribe(
                            httpResponse =>
                            {
                                //debugger;
                                if ((httpResponse as HttpResponse<any>).ok == true) {
                                    this.notificationService.categoryChange.emit({url: this.entity.url} as Product);
                                    console.log(`${this.entity.url} posted`);
                                }
                                else
                                    console.error(httpResponse);

                                // reload:
                                this.router.navigateByUrl(`/product/${this.entity.urlParent}/${this.entity.url}`);
                            },
                            error => this.handleError({
                                userMessage: 'Ошибка при добавлении товара!',
                                logMessage: `productService.post(${this.entity.url})`,
                                error
                            } as AppError)
                        );
                },
                error => this.handleError({
                    userMessage: 'Ошибка при удалении товара!',
                    logMessage: `productService.delete(${this.query_url})`,
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

        this.pageService.delete(this.query_url)
            .subscribe(
                httpResponse =>
                {
                    //debugger;
                    if ((httpResponse as HttpResponse<any>).ok == true) {
                        this.notificationService.categoryChange.emit({url: this.entity.urlParent} as Category);
                        console.log(`${this.query_url} deleted`);

                        // reload:
                        this.router.navigateByUrl(`/product/${this.entity.urlParent}`);
                    }
                    else
                        console.error(httpResponse);
                },
                error => this.handleError({
                    userMessage: `Ошибка при удалении ${EntityType[this.entityType]}!`,
                    logMessage: `${EntityType[this.entityType]}Service.delete(${this.query_url})`,
                    error
                } as AppError)
            );
    }

}
