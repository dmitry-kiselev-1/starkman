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
import { PageType } from '../../../models/page/page-type';
import { Category } from '../../../models/page/category';
import { ConfirmationDialogData } from '../../../models/dialog/confirmation-dialog-data';
import { PhotoService } from '../../../services/photo.service';
import { Photo } from '../../../models/page/photo';
import { MatTabChangeEvent } from '@angular/material/tabs/typings/tab-group';

@Component({
    selector: 'app-product-form',
    templateUrl: '../../page/page-form/page-form.component.html',
    styleUrls: ['../../page/page-form/page-form.component.scss']
})
export class ProductFormComponent extends BaseComponent implements OnInit {

    public product_id: string;
    public category_id: string;
    public entity: Product = {} as Product;

    constructor(
        public notificationService: NotificationService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private restService: ProductService,
        private photoService: PhotoService,
        protected snackBar: MatSnackBar,
        public dialog: MatDialog) {
        super(snackBar, dialog);
        this.entityType = PageType.Product;
    }

    ngOnInit() {
        this.componentTitle = this.activatedRoute.snapshot.data['title'];

        this.activatedRoute.paramMap
            .subscribe(
                (params: ParamMap) => {
                    this.product_id = params.get('product_id');
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
        if (!this.category_id || !this.product_id) return;
        if (notify) {
            this.notificationService.appLoading = true;
        }
        this.restService.getProduct(this.category_id, this.product_id)
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
                    logMessage: `productService.get(${this.category_id}/${this.product_id})`,
                    error
                } as AppError)
            );
    }

    save() {
        if (!this.category_id || !this.entity.url) return;
        this.notificationService.appLoading = true;
        // ToDo:
        // обратиться к photoService и перенести в него base64String
        /*
        this.entity.photoList.forEach(photo => {
            this.photoService.postPage(this.category_id, this.entity);
            (photo as Photo).base64String = null;
            (photo as Photo).binaryString = null;
        });
        */
        this.restService.productExist(this.category_id, this.entity.url)
            .pipe(finalize(() => this.notificationService.appLoading = false))
            .subscribe(
                exist => {
                    if (exist && !this.product_id) {
                        this.showInfo(`Продукт "${this.entity.url}" уже имеется в категории "${this.category_id}"!`);
                    }
                    else
                    {
                        this.entity.id = this.entity.url;
                        this.entity.urlParent = this.category_id;
                        this.restService.postProduct(this.category_id, this.product_id, this.entity)
                            .pipe(finalize(() => this.notificationService.appLoading = false))
                            .subscribe(
                                httpResponse => {
                                    //debugger;
                                    this.notificationService.categoryChange.emit({url: this.entity.urlParent} as Category);
                                    console.log(`"${this.product_id}" deleted and "${this.entity.url}" posted`);
                                    this.router.navigateByUrl(`/product/${this.entity.urlParent}/${this.entity.url}`);
                                },
                                error => this.handleError({
                                    userMessage: 'Ошибка при добавлении товара!',
                                    logMessage: `productService.post(${this.category_id}, ${this.product_id}, ${JSON.stringify(this.entity)})`,
                                    error
                                } as AppError)
                            );
                    }
                },
                error => this.handleError({
                    userMessage: 'Ошибка при запросе товара!',
                    logMessage: `productService.get(${this.category_id}/${this.product_id})`,
                    error
                } as AppError)
            );
    }

    delete() {
        if (!this.product_id) return;
        this.notificationService.appLoading = true;
        this.restService.deleteProduct(this.category_id, this.product_id)
            .subscribe(
                httpResponse => {
                    this.notificationService.categoryChange.emit({url: this.category_id} as Category);
                    console.log(`${this.category_id}/${this.product_id} deleted`);
                    this.router.navigateByUrl(`/product/${this.category_id}`);
                },
                error => this.handleError({
                    userMessage: `Ошибка при удалении ${PageType[this.entityType]}!`,
                    logMessage: `${PageType[this.entityType]}Service.delete(${this.category_id}, ${this.product_id})`,
                    error
                } as AppError)
            );
    }

    deleteConfirmationDialog(): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: this.confirmationDialogData,
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            //console.log(`Dialog result: ${(result as ConfirmationDialogData).result}`);
            if ((result as ConfirmationDialogData).result == true)
                this.delete();
        });
    }

    filterTabActive: boolean = false;
    selectedTabChange(tab: MatTabChangeEvent)
    {
        //debugger;
        if (tab.index == 3)
            this.filterTabActive = true;
    }

}
