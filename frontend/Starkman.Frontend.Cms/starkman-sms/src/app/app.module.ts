import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule, InMemoryBackendConfigArgs } from 'angular-in-memory-web-api';

import { NgBootstrapModule } from './modules/ng-bootstrap.module';
import { MaterialDesignModule } from './modules/material-design.module';
import { PrimeNgModule } from './modules/primeng.module';

import { AppRootComponent } from './components/layout/app-root.component';
import { EnumPipe } from './pipes/enum.pipe';
import { BoolPipe } from './pipes/bool.pipe';

import { environment } from '../environments/environment';
import { InMemoryDataService } from './services/in-memory-data.service';
import { ConfigService } from './services/config.service';
import { NotificationService } from './services/notification.service';
import { DateService } from './services/date.service';
import { PhotoService } from './services/photo.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';

import { SidenavComponent } from './components/layout/sidenav/sidenav.component';

import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CategoryFormComponent } from './components/category/category-form/category-form.component';
import { OrderListComponent } from './components/order/order-list/order-list.component';
import { OrderFormComponent } from './components/order/order-form/order-form.component';
import { PhotoListComponent } from './components/photo/photo-list/photo-list.component';
import { PhotoFormComponent } from './components/photo/photo-form/photo-form.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { ConfirmationDialogComponent } from './components/dialog/confirmation-dialog/confirmation-dialog.component';
import { OrderService } from './services/order.service';

@NgModule({
    declarations: [
        EnumPipe,
        BoolPipe,
        AppRootComponent,
        SidenavComponent,
        CategoryListComponent,
        CategoryFormComponent,
        ProductListComponent,
        ProductFormComponent,
        ConfirmationDialogComponent,
        OrderListComponent,
        OrderFormComponent,
        PhotoListComponent,
        PhotoFormComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,

        HttpClientModule,
        environment.production ?
            [] : HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
                delay: 500, passThruUnknownUrl: true, apiBase: 'api/', caseSensitiveSearch: false
            } as InMemoryBackendConfigArgs),

        AppRoutingModule,
        MaterialDesignModule,
        PrimeNgModule,
        NgBootstrapModule
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        ConfigService, NotificationService, DateService, CategoryService, PhotoService, ProductService, OrderService
    ],
    bootstrap: [AppRootComponent]
})
export class AppModule {
}
