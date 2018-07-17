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

import { ConfirmationDialogComponent } from './components/dialog/confirmation-dialog/confirmation-dialog.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CategoryFormComponent } from './components/category/category-form/category-form.component';
import { OrderListComponent } from './components/order/order-list/order-list.component';
import { OrderFormComponent } from './components/order/order-form/order-form.component';
import { PhotoFormComponent } from './components/photo/photo-form/photo-form.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { OrderService } from './services/order.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { OfferSearchDialogComponent } from './components/dialog/offer-search-dialog/offer-search-dialog.component';
import { OfferFormComponent } from './components/offer/offer-form/offer-form.component';
import { FilterFormComponent } from './components/filter/filter-form/filter-form.component';
import { ContentComponent } from './components/layout/content/content.component';
import { AuthGuardService } from './services/auth-guard.service';

@NgModule({
    declarations: [
        EnumPipe,
        BoolPipe,
        AppRootComponent,
        SidenavComponent,
        ConfirmationDialogComponent,
        CategoryListComponent,
        CategoryFormComponent,
        ProductListComponent,
        ProductFormComponent,
        OrderListComponent,
        OrderFormComponent,
        PhotoFormComponent,
        PageNotFoundComponent,
        OfferSearchDialogComponent,
        OfferFormComponent,
        FilterFormComponent,
        ContentComponent
    ],
    entryComponents: [
        ConfirmationDialogComponent,
        OfferSearchDialogComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,

        HttpClientModule,
        environment.production ?
            [] : HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
                delay: 250, passThruUnknownUrl: true, apiBase: 'api/', caseSensitiveSearch: false
            } as InMemoryBackendConfigArgs),

        AppRoutingModule,
        MaterialDesignModule,
        PrimeNgModule,
        NgBootstrapModule
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        ConfigService, NotificationService, AuthGuardService, DateService, CategoryService, PhotoService, ProductService, OrderService
    ],
    bootstrap: [AppRootComponent]
})
export class AppModule {
}
