import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {AppRootComponent} from './components/layout/app-root.component';
import {AppRoutingModule} from './app-routing.module';
import {MaterialDesignModule} from './material-design.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {CategoryListComponent} from './components/category/category-list/category-list.component';
import {CategoryService} from './services/category.service';
import {CategoryFormComponent} from './components/category/category-form/category-form.component';
import {NotificationService} from './services/notification.service';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {OrderListComponent} from './components/order/order-list/order-list/order-list.component';
import {SidenavComponent} from './components/layout/sidenav/sidenav/sidenav.component';
import { PhotoListComponent } from './components/photo/photo-list/photo-list.component';
import { PhotoFormComponent } from './components/photo/photo-form/photo-form.component';
import {PhotoService} from './services/photo.service';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { ProductService } from "./services/product.service";
import { PageFormComponent } from './components/page/page-form/page-form.component';
import { ConfirmationDialogComponent } from './component/dialog/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppRootComponent,
    CategoryListComponent,
    CategoryFormComponent,
    OrderListComponent,
    SidenavComponent,
    PhotoListComponent,
    PhotoFormComponent,
    ProductListComponent,
    ProductFormComponent,
    PageFormComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    MaterialDesignModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()
  ],
  providers: [NotificationService, CategoryService, PhotoService, ProductService],
  bootstrap: [AppRootComponent]
})
export class AppModule {}
